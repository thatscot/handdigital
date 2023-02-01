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
} from '../utils/sockets';
import { Drone } from './Drone';
import { useXR } from '@react-three/xr';

export const Player = () => {
  const playerRef = useRef(null);
  console.log(useXR((state) => state));

  const [smoothCameraPosition] = useState(() => new THREE.Vector3());
  const [smoothCameraTarget] = useState(() => new THREE.Vector3());

  const [action, setAction] = useState({
    name: undefined,
    lifecycle: undefined,
  });

  useEffect(() => {
    initiateSocketConnection();

    onConnect();
    onDisconnect();

    onMessageHandler(setAction);

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
