import React, { Suspense, useEffect, useState } from "react";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./toy_desktop_computer/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={0.3} groundColor='black' />
      <pointLight intensity={1} />
      <spotLight
        position={[50, 0, 0]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 1.75 : 2.75}
        position={[0, -1.2, 0]}
        rotation={[0, 1.4, 0]} />

    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // event listener for when the screen size changes
    const mediaQuery = window.matchMedia('(max-width: 500px)');

    // setting the inital value of the 'isMobile" variable
    setIsMobile(mediaQuery.matches);

    // callback function to handle the changes for the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }
  }, [])

  return (
    <Canvas frameLoop="demand" shadows camera={{ position: [20, 3, 5], fov: 25 }} gl={{ preserveDrawingBuffer: true }}>
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false}
          autoRotate
          autoRotateSpeed={-5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />

    </Canvas>
  );
};

export default ComputersCanvas;