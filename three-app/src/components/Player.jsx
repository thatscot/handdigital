import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import {
  disconnectSocket,
  initiateSocketConnection,
  onMessageHandler,
  onConnect,
  onDisconnect,
  onTime,
} from '../utils/sockets';
import { Drone } from './Drone';
import { useGameContext } from '../hooks';
import { GAME_STATE } from '../utils/constants';

export const Player = () => {
  const playerRef = useRef(null);

  const [smoothCameraPosition] = useState(() => new THREE.Vector3(20, 20, 20));
  const [smoothCameraTarget] = useState(() => new THREE.Vector3());
  const { gameState, resetGame, completeGame, setBestTime } = useGameContext();
  const [action, setAction] = useState({
    name: undefined,
    lifecycle: undefined,
  });

  useEffect(() => {
    initiateSocketConnection();

    onConnect();
    onDisconnect();

    onMessageHandler(setAction);
    onTime(setBestTime);

    return () => {
      disconnectSocket();
    };
  }, []);

  useFrame((state, delta) => {
    if (!playerRef.current) {
      return;
    }

    // Movement
    const { name, lifecycle } = action;

    const velocity = 5 * delta;
    const playerPosition = playerRef.current.translation();

    if (gameState === GAME_STATE.LOADED) {
      playerRef.current.setTranslation({ x: 0, y: 1, z: 0 });
    }

    if (gameState === GAME_STATE.GAME_OVER) {
      playerRef.current.setTranslation({ x: 0, y: 1, z: 0 });
      resetGame();
      return;
    }

    if (playerPosition.z < -18 && gameState !== GAME_STATE.LOADED) {
      completeGame();
    }

    if (gameState === GAME_STATE.STARTED) {
      if (lifecycle === 'end') {
        playerRef.current.setTranslation({
          x: playerPosition.x,
          y: playerPosition.y,
          z: playerPosition.z,
        });
      } else if (lifecycle === 'start') {
        switch (name) {
          case 'forward': {
            playerRef.current.setTranslation({
              x: playerPosition.x,
              y: playerPosition.y,
              z: playerPosition.z - velocity,
            });
            break;
          }
          case 'backward': {
            playerRef.current.setTranslation({
              x: playerPosition.x,
              y: playerPosition.y,
              z: playerPosition.z + velocity,
            });
            break;
          }
          case 'up': {
            playerRef.current.setTranslation({
              x: playerPosition.x,
              y: playerPosition.y + velocity,
              z: playerPosition.z,
            });
            break;
          }
          case 'down': {
            playerRef.current.setTranslation({
              x: playerPosition.x,
              y: playerPosition.y - velocity,
              z: playerPosition.z,
            });
            break;
          }
          case 'left': {
            playerRef.current.setTranslation({
              x: playerPosition.x - velocity,
              y: playerPosition.y,
              z: playerPosition.z,
            });
            break;
          }
          case 'right': {
            playerRef.current.setTranslation({
              x: playerPosition.x + velocity,
              y: playerPosition.y,
              z: playerPosition.z,
            });
            break;
          }
        }
      }
    }

    // Camera
    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(playerPosition);
    cameraPosition.z += 4;
    cameraPosition.y += 0.75;

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(playerPosition);
    cameraTarget.y += 0.25;

    smoothCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothCameraTarget.lerp(cameraTarget, 5 * delta);

    state.camera.position.copy(smoothCameraPosition);
    state.camera.lookAt(smoothCameraTarget);
  });

  return (
    <RigidBody
      ref={playerRef}
      colliders={'hull'}
      lockRotations
      linearDamping={1}
      position={[0, 1, 0]}
      restitution={0}
      friction={0}
    >
      <Drone scale={[0.1, 0.1, 0.1]} />
    </RigidBody>
  );
};
