import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function App() {
  const divRef = useRef();

  useEffect(() => {
    // init
    let width = divRef.current.clientWidth;
    let height = divRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.01, 10);
    camera.position.z = 2; //z轴

    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2); // 大小
    const material = new THREE.MeshNormalMaterial();

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setAnimationLoop(animation);

    const divCurrent = divRef.current;
    divCurrent.appendChild(renderer.domElement);

    window.addEventListener('resize', handleResize);

    // handle window resize
    function handleResize() {
      width = divRef.current.clientWidth;
      height = divRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    }

    // animation
    function animation(time) {
      mesh.rotation.x = time / 2000;
      mesh.rotation.y = time / 1000;

      renderer.render(scene, camera);
    }

    return () => {
      renderer.setAnimationLoop(null);
      window.removeEventListener('resize', handleResize);
      divCurrent.removeChild(renderer.domElement);
      scene.remove(mesh);
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <div ref={divRef} style={{ height: '100vh' }} />;
}

export default App;
