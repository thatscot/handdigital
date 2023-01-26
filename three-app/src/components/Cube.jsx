import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import useKeyboard from './Keyboard';

export const Cube = () => {
    const cubeRef = useRef(null);
    const keyMap = useKeyboard();

    useFrame((state, delta) => {
        if (!cubeRef.current) {
            return;
        }

        // Positioning
        keyMap['KeyA'] && (cubeRef.current.position.x -= 1 * delta);
        keyMap['KeyD'] && (cubeRef.current.position.x += 1 * delta);
        keyMap['KeyW'] && (cubeRef.current.position.z -= 1 * delta);
        keyMap['KeyS'] && (cubeRef.current.position.z += 1 * delta);
        keyMap['ArrowDown'] && (cubeRef.current.position.y -= 1 * delta);
        keyMap['ArrowUp'] && (cubeRef.current.position.y += 1 * delta);

        // Rotation
        keyMap['ArrowLeft'] && (cubeRef.current.rotation.y += 1 * delta);
        keyMap['ArrowRight'] && (cubeRef.current.rotation.y -= 1 * delta);

        state.camera.lookAt(cubeRef.current.position);
        state.camera.updateProjectionMatrix();
    });

    return (
        <RigidBody colliders='cuboid'>
            <group ref={cubeRef}>
            <PerspectiveCamera
                makeDefault
                position={[5, 5, 5]}
            />
            <mesh receiveShadow position={[0, 1, 0]}>
                <boxGeometry />
                <meshStandardMaterial color='hotpink' />
            </mesh>
            </group>
        </RigidBody>
    )
};