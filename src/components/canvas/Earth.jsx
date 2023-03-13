import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import CanvasLoader from '../Loader';

const Earth = () => {
  const earth = useGLTF('./low_poly_earth/scene.gltf')

  return (
    <mesh>
      <hemisphereLight intensity={0.4} groundColor='black'/>
      <spotLight
        position={[50, 0, 0]}
        angle={0.12}
        penumbra={1}
        intensity={0.5}
        castShadow/>
      <primitive
        object={earth.scene}
        shadows
        scale={2.1}
        position={[0, 0.1, 0]}
        rotation={[0, 0, 0]} />
    </mesh>
  )
}

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop='demand'
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        position: [-4, 3, 6]
      }}>

      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={-5}
          enableZoom={false}/>
        <Earth />
      </Suspense>
    </Canvas>

  )
}

export default EarthCanvas;