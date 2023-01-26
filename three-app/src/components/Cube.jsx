import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import useKeyboard from './Keyboard';

export const Cube = () => {
    const cubeRef = useRef(null);
    const keyMap = useKeyboard();

    useFrame((state, delta) => {
        if (!cubeRef.current) {
            return;
        }

        const movementSpeed = 10;

        // Positioning
        keyMap['KeyA'] && (cubeRef.current.position.x -= movementSpeed * delta) && (state.camera.position.x -= movementSpeed * delta);
        keyMap['KeyD'] && (cubeRef.current.position.x += movementSpeed * delta) && (state.camera.position.x += movementSpeed * delta);
        keyMap['KeyW'] && (cubeRef.current.position.z -= movementSpeed * delta) && (state.camera.position.z -= movementSpeed * delta);
        keyMap['KeyS'] && (cubeRef.current.position.z += movementSpeed * delta) && (state.camera.position.z += movementSpeed * delta);
        keyMap['ArrowDown'] && (cubeRef.current.position.y -= movementSpeed * delta) && (state.camera.position.y -= movementSpeed * delta);
        keyMap['ArrowUp'] && (cubeRef.current.position.y += movementSpeed * delta) && (state.camera.position.y += movementSpeed * delta);

        state.camera.lookAt(cubeRef.current.position);
        state.camera.updateProjectionMatrix();
    });

    return (
        <mesh ref={cubeRef} receiveShadow position={[0, 0.5, 0]}>
            <boxGeometry />
            <meshStandardMaterial color='hotpink' />
        </mesh>
    )
};