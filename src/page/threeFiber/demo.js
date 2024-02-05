import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function App() {
  const divRef = useRef();

  useEffect(() => {
    // 1、创建场景
    const scene = new THREE.Scene();

    // 2、创建相机
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // 设置相机位置
    camera.position.set(2, 1, 7);
    scene.add(camera);
    // 添加物体
    // 创建几何体
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    // 根据几何体和材质创建物体
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    // 将几何体添加到场景中
    scene.add(cube);

    // 初始化渲染器
    const renderer = new THREE.WebGLRenderer();
    // 设置渲染的尺寸大小
    renderer.setSize(1200, 800);

    renderer.setAnimationLoop(animation);
    const divCurrent = divRef.current;

    // 添加世界坐标辅助器
    const axesHelper = new THREE.AxesHelper(8);
    scene.add(axesHelper);

    // 将webgl渲染的canvas内容添加到body
    divCurrent.appendChild(renderer.domElement);

    // 添加轨道
    const controls = new OrbitControls(camera, renderer.domElement);
    // 设置带阻尼的惯性
    controls.enableDamping = true;
    //设置阻尼系数
    controls.dampingFactor = 0.03;
    //设置旋转
    controls.autoRotate = true;
    // 渲染场景
    function animation(time) {
      controls.update();
      // cube.rotation.x = time / 2000;
      // cube.rotation.y = time / 1000;

      renderer.render(scene, camera);
    }

    return () => {
      renderer.setAnimationLoop(null);
      divCurrent.removeChild(renderer.domElement);
      scene.remove(cube);
      cubeGeometry.dispose();
      cubeMaterial.dispose();
    };
  }, []);

  return <div ref={divRef} style={{ height: '100vh' }} />;
}

export default App;
