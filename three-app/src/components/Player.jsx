import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { useKeyboardControls } from '@react-three/drei';

export const Player = () => {
    const playerRef = useRef(null);
    const [_, getKeys] = useKeyboardControls();

    useFrame((state, delta) => {
        if (!playerRef.current) {
            return;
        }

        // Movement
        const { forward, back, left, right, up, down } = getKeys();

        const velocity = 5 * delta;
        const playerPosition = playerRef.current.translation();

        if (forward) {
            playerRef.current.setTranslation({ x: playerPosition.x, y: playerPosition.y, z: playerPosition.z - velocity});
        };

        if (back) {
            playerRef.current.setTranslation({ x: playerPosition.x, y: playerPosition.y, z: playerPosition.z + velocity});
        };

        if (left) {
            playerRef.current.setTranslation({ x: playerPosition.x - velocity , y: playerPosition.y, z: playerPosition.z});
        };

        if (right) {
            playerRef.current.setTranslation({ x: playerPosition.x + velocity, y: playerPosition.y, z: playerPosition.z});
        };

        if (up) {
            playerRef.current.setTranslation({ x: playerPosition.x, y: playerPosition.y + velocity, z: playerPosition.z});
        };

        if (down) {
            playerRef.current.setTranslation({ x: playerPosition.x, y: playerPosition.y - velocity, z: playerPosition.z});
        };

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
        <RigidBody ref={playerRef} lockRotations linearDamping={ 1 } position={[0, 1, 0]} restitution={0} friction={0}>
            <mesh castShadow>
                <boxGeometry args={[0.5, 0.5, 0.5]} />
                <meshStandardMaterial color='hotpink' />
            </mesh>
        </RigidBody>
    )
};