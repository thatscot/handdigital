import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { useKeyboardControls } from '@react-three/drei';

export const Player = () => {
    const playerRef = useRef(null);
    const [_, getKeys] = useKeyboardControls();

    useFrame((_, delta) => {
        if (!playerRef.current) {
            return;
        }

        const { forward, back, left, right, up, down } = getKeys();

        const velocity = 5 * delta;
        const position = playerRef.current.translation();

        if (forward) {
            playerRef.current.setTranslation({ x: position.x, y: position.y, z: position.z - velocity});
        };

        if (back) {
            playerRef.current.setTranslation({ x: position.x, y: position.y, z: position.z + velocity});
        };

        if (left) {
            playerRef.current.setTranslation({ x: position.x - velocity , y: position.y, z: position.z});
        };

        if (right) {
            playerRef.current.setTranslation({ x: position.x + velocity, y: position.y, z: position.z});
        };

        if (up) {
            playerRef.current.setTranslation({ x: position.x, y: position.y + velocity, z: position.z});
        };

        if (down) {
            playerRef.current.setTranslation({ x: position.x, y: position.y - velocity, z: position.z});
        };

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