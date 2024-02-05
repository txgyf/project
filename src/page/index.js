import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function App() {
  const divRef = useRef();

  useEffect(() => {
    // init
    let width = 800;
    let height = 500;
    // 实例化一个透视投影相机对象
    const camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 1000); // https://juejin.cn/post/7231089453695238204
    // camera.position.set(3, 2, 29);
    camera.lookAt(0, 0, 0); // 相机观察位置
    const scene = new THREE.Scene(); // 创建三维场景

    // 圆柱体 CylinderGeometry  球体  SphereGeometry   圆锥 ConeGeometry  矩形平面 PlaneGeometry  圆平面  CircleGeometry
    // const geometry = new THREE.BoxGeometry(10, 10, 10); // 创建的长方体大小
    const geometry = new THREE.BoxGeometry(100, 60, 20);

    // const material = new THREE.MeshNormalMaterial(); // 材质
    const material = new THREE.MeshBasicMaterial({
      //可以看到坐标原点
      color: 0x0000ff, //设置材质颜色
      transparent: true, //开启透明
      opacity: 0.5, //设置透明度
    });

    const mesh = new THREE.Mesh(geometry, material); // 网格模型
    // mesh.position.set(0, 0, 1); // x y z轴 默认为0
    mesh.position.set(100, 0, 0);
    scene.add(mesh);
    camera.position.set(-100, 0, 0);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setAnimationLoop(animation);

    const divCurrent = divRef.current;
    divCurrent.appendChild(renderer.domElement);

    window.addEventListener('resize', handleResize);

    const axesHelper = new THREE.AxesHelper(150);
    scene.add(axesHelper);

    // handle window resize
    function handleResize() {
      width = divRef.current.clientWidth;
      height = divRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    }

    // animation;
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
