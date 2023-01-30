import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { useKeyboardControls } from '@react-three/drei';
import { io } from 'socket.io-client';

export const Player = () => {
  const playerRef = useRef(null);
  const [_, getKeys] = useKeyboardControls();

  const socket = io('http://localhost:3000');

  const [isConnected, setIsConnected] = useState(false);
  const [action, setAction] = useState({
    name: undefined,
    lifecycle: undefined,
  });

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('message', ({ name, lifecycle }) => {
      console.log({ command: { name, lifecycle } });
      setAction({ name, lifecycle });
    });

    return () => {
      socket.off('disconnect');
      socket.off('connect');
      socket.off('message');
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
      console.log('stop');
      playerRef.current.setTranslation({
        x: playerPosition.x,
        y: playerPosition.y,
        z: playerPosition.z,
      });
    } else if (lifecycle === 'start') {
      switch (name) {
        case 'forward': {
          console.log('forward');
          playerRef.current.setTranslation({
            x: playerPosition.x,
            y: playerPosition.y,
            z: playerPosition.z - velocity,
          });
          break;
        }
        case 'backward': {
          console.log('back');
          playerRef.current.setTranslation({
            x: playerPosition.x,
            y: playerPosition.y,
            z: playerPosition.z + velocity,
          });
          break;
        }
        case 'up': {
          console.log('up');
          playerRef.current.setTranslation({
            x: playerPosition.x,
            y: playerPosition.y + velocity,
            z: playerPosition.z,
          });
          break;
        }
        case 'down': {
          console.log('down');
          playerRef.current.setTranslation({
            x: playerPosition.x,
            y: playerPosition.y - velocity,
            z: playerPosition.z,
          });
          break;
        }
        case 'left': {
          console.log('left');
          playerRef.current.setTranslation({
            x: playerPosition.x - velocity,
            y: playerPosition.y,
            z: playerPosition.z,
          });
          break;
        }
        case 'right': {
          console.log('right');
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

    state.camera.position.copy(cameraPosition);
    state.camera.lookAt(cameraTarget);
  });

  return (
    <RigidBody
      ref={playerRef}
      lockRotations
      linearDamping={1}
      position={[0, 1, 0]}
      restitution={0}
      friction={0}
    >
      <mesh castShadow>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </RigidBody>
  );
};
