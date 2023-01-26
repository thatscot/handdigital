import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from "@react-three/rapier";


const Box = ({ dimensions = [1, 1, 1], position = [0, 0, 0], scale = [1, 1, 1], color = 'limegreen', castShadow = false }) => {

    return (
        <mesh position={position} scale={scale} castShadow={castShadow} receiveShadow>
            <boxGeometry args={dimensions} />
            <meshStandardMaterial color={color} />
        </mesh>
    )
};

const SpinnnerObstacle = ({ position = [0, 0, 0] }) => {

    const obstacleRef = useRef();

    useFrame((state) => {

        const time = state.clock.getElapsedTime();
        const euler = new THREE.Euler(0, time, 0);

        const rotation = new THREE.Quaternion();
        rotation.setFromEuler(euler);

        obstacleRef.current.setNextKinematicRotation(rotation);
    });

    return (
        <group position={position}>
            <Box dimensions={[4, 0.2, 4]} position={[0, -0.1, 0]} color='greenyellow' />

            <RigidBody ref={obstacleRef} type="kinematicPosition" position={[0, 0.3, 0]} restitution={ 0.2 } friction={ 0 }>
                <Box color='orangered' scale={[3.5, 0.3, 0.3]} castShadow />
            </RigidBody>
        </group>
    );
};

const VerticalObstacle = ({ position = [0, 0, 0] }) => {

    const obstacleRef = useRef();

    useFrame((state) => {

        const time = state.clock.getElapsedTime();

        const verticalMovement = Math.sin(time) + 1.15;

        const [x, y, z] = position;

        obstacleRef.current.setNextKinematicTranslation({ x, y: verticalMovement + y, z });
    });

    return (
        <group position={position}>
            <Box dimensions={[4, 0.2, 4]} position={[0, -0.1, 0]} color='greenyellow' />

            <RigidBody ref={obstacleRef} type="kinematicPosition" position={[0, 0.3, 0]} restitution={ 0.2 } friction={ 0 }>
                <Box color='orangered' scale={[3.5, 0.3, 0.3]} castShadow />
            </RigidBody>
        </group>
    );
};

const HorizontalObstacle = ({ position = [0, 0, 0] }) => {

    const obstacleRef = useRef();

    useFrame((state) => {

        const time = state.clock.getElapsedTime();

        const horizontalMovement = Math.sin(time) * 1.25;

        const [x, y, z] = position;

        obstacleRef.current.setNextKinematicTranslation({ x: horizontalMovement + x , y: y + 0.75, z });
    });

    return (
        <group position={position}>
            <Box dimensions={[4, 0.2, 4]} position={[0, -0.1, 0]} color='greenyellow' />

            <RigidBody ref={obstacleRef} type="kinematicPosition" position={[0, 0.3, 0]} restitution={ 0.2 } friction={ 0 }>
                <Box color='orangered' scale={[1.5, 1.5, 0.3]} castShadow />
            </RigidBody>
        </group>
    );
};

const Block = ({ position = [0, 0, 0] }) => {

    return (
        <group position={position}>
            <Box dimensions={[4, 0.2, 4]} position={[0, -0.1, 0]} />
        </group>
    );
};


export const Level = () => {

    return (
        <>
            <Block position={[0, 0, 12]} />
            <SpinnnerObstacle position={[0, 0, 8]} />
            <VerticalObstacle position={[0, 0, 4]} />
            <HorizontalObstacle position={[0, 0, 0]} />
        </>
    )
};