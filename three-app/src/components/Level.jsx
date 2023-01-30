import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { RigidBody, CuboidCollider } from "@react-three/rapier";

THREE.ColorManagement.legacyMode = false

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

const limeMaterial = new THREE.MeshStandardMaterial({ color: 'lime' });
const blueMaterial = new THREE.MeshStandardMaterial({ color: 'cornflowerblue' });
const redMaterial = new THREE.MeshStandardMaterial({ color: 'orangered' });
const greyMaterial = new THREE.MeshStandardMaterial({ color: 'lightslategrey' });

const blockLength = 4;

export const SpinnnerObstacle = ({ position = [0, 0, 0] }) => {

    const obstacleRef = useRef();

    useFrame((state) => {

        const time = state.clock.getElapsedTime();
        const euler = new THREE.Euler(0, 0, time);

        const rotation = new THREE.Quaternion();
        rotation.setFromEuler(euler);

        obstacleRef.current.setNextKinematicRotation(rotation);
    });

    return (
        <group position={position}>
            <mesh geometry={boxGeometry} material={blueMaterial} position={[0, -0.1, 0]} scale={[4, 0.2, 4]} receiveShadow />
            <RigidBody ref={obstacleRef} type="kinematicPosition" position={[0, 2, 0]} restitution={0} friction={0}>
                <mesh geometry={boxGeometry} material={redMaterial} scale={[4, 0.3, 0.3]} castShadow receiveShadow />
            </RigidBody>
        </group>
    );
};

export const VerticalObstacle = ({ position = [0, 0, 0] }) => {

    const obstacleRef = useRef();

    useFrame((state) => {

        const time = state.clock.getElapsedTime();

        const verticalMovement = (Math.sin(time) * 1.85) + 2;

        const [x, y, z] = position;

        obstacleRef.current.setNextKinematicTranslation({ x, y: verticalMovement + y, z });
    });

    return (
        <group position={position}>
            <mesh geometry={boxGeometry} material={blueMaterial} position={[0, -0.1, 0]} scale={[4, 0.2, 4]} receiveShadow />
            <RigidBody ref={obstacleRef} type="kinematicPosition" position={[0, 2, 0]} restitution={0} friction={0}>
                <mesh geometry={boxGeometry} material={redMaterial} scale={[4, 0.3, 0.3]} castShadow receiveShadow />
            </RigidBody>
        </group>
    );
};

export const HorizontalObstacle = ({ position = [0, 0, 0] }) => {

    const obstacleRef = useRef();

    useFrame((state) => {

        const time = state.clock.getElapsedTime();

        const horizontalMovement = Math.sin(time) * 1.85;

        const [x, y, z] = position;

        obstacleRef.current.setNextKinematicTranslation({ x: horizontalMovement + x, y: y + 2, z });
    });

    return (
        <group position={position}>
            <mesh geometry={boxGeometry} material={blueMaterial} position={[0, -0.1, 0]} scale={[4, 0.2, 4]} receiveShadow />
            <RigidBody ref={obstacleRef} type="kinematicPosition" position={[0, 0.3, 0]} restitution={0} friction={0}>
                <mesh geometry={boxGeometry} material={redMaterial} scale={[0.3, 4, 0.3]} castShadow receiveShadow />
            </RigidBody>
        </group>
    );
};

const StartBlock = ({ position = [0, 0, 0] }) => {

    return (
        <group position={position}>
            <mesh
                geometry={boxGeometry}
                material={limeMaterial}
                position={[0, -0.1, 0]}
                scale={[4, 0.2, 4]}
                receiveShadow />
        </group>
    );
};

const EndBlock = ({ position = [0, 0, 0] }) => {

    return (
        <group position={position}>
            <mesh
                geometry={boxGeometry}
                material={limeMaterial}
                position={[0, -0.1, 0]}
                scale={[4, 0.2, 4]}
                receiveShadow />
        </group>
    );
};

const Bounds = ({ length = 1 }) => {

    return (
        <>
            <RigidBody type='fixed' restitution={0} friction={0}>
                <mesh
                    position={[2.15, 2, - (length * 2) + 2]}
                    geometry={boxGeometry}
                    material={greyMaterial}
                    scale={[0.3, 4, length * blockLength]}
                />
                <mesh
                    position={[-2.15, 2, -(length * 2) + 2]}
                    geometry={boxGeometry}
                    material={greyMaterial}
                    scale={[0.3, 4, length * blockLength]}
                    receiveShadow
                />
                <mesh
                    position={[0, 2, -(length * 4) + 2]}
                    geometry={boxGeometry}
                    material={greyMaterial}
                    scale={[blockLength, blockLength, 0.3]}
                    receiveShadow
                />
            </RigidBody>
            <CuboidCollider
                args={[2, 0.1, 2 * length]}
                position={[0, -0.1, -(length * 2) + 2]}
                restitution={0}
                friction={0}
            />
        </>
    )
};

export const Level = () => {

    const levelLength = 5;

    return (
        <>
            <StartBlock position={[0, 0, 0]} />
            <HorizontalObstacle position={[0, 0, -4]} />
            <VerticalObstacle position={[0, 0, -8]} />
            <SpinnnerObstacle position={[0, 0, -12]} />
            <EndBlock position={[0, 0, -16]} />
            <Bounds length={levelLength} />
        </>
    )
};