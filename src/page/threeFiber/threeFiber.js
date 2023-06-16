import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function Box() {
  const meshRef = useRef();
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta / 2;
      meshRef.current.rotation.y += delta;
    }
  });
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <meshNormalMaterial />
    </mesh>
  );
}

function App() {
  return (
    <Canvas
      camera={{ fov: 70, near: 0.01, far: 100, position: [0, 0, 2] }}
      style={{ height: '100vh', backgroundColor: 'black' }}
    >
      <Box />
    </Canvas>
  );
}

export default App;
