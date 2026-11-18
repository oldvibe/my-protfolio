'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line } from '@react-three/drei';
import { useRef } from 'react';
import type { Group } from 'three';

function EngineeredObject() {
  const group = useRef<Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.08;
    group.current.rotation.x = state.pointer.y * 0.14;
  });
  return <group ref={group} position={[0.95, 0.2, 0]}>
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
      <mesh rotation={[0.6, 0.1, 0.3]}><icosahedronGeometry args={[1.05, 1]} /><meshStandardMaterial color="#8c0b22" wireframe emissive="#3a0011" emissiveIntensity={0.7} /></mesh>
      <mesh rotation={[1.2, 0.8, 0]}><torusGeometry args={[1.48, 0.012, 12, 80]} /><meshBasicMaterial color="#f3d9dd" transparent opacity={0.48} /></mesh>
      <mesh rotation={[-0.7, 0.4, 1]}><torusGeometry args={[1.82, 0.008, 12, 80]} /><meshBasicMaterial color="#e50935" transparent opacity={0.52} /></mesh>
      <Line points={[[-1.6, -0.5, 0], [0.1, 0.3, 0], [1.7, -0.5, 0]]} color="#e50935" transparent opacity={0.7} lineWidth={1} />
    </Float>
  </group>;
}

export default function HeroScene() {
  return <div className="hero-webgl" aria-hidden="true"><Canvas dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }} camera={{ position: [0, 0, 5], fov: 42 }}><ambientLight intensity={0.35} /><pointLight color="#e50935" position={[2, 2, 3]} intensity={5} /><pointLight color="#8f9baa" position={[-2, -1, 2]} intensity={1.1} /><EngineeredObject /></Canvas></div>;
}
