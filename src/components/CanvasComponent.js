import React, { Suspense, useMemo, useState, useRef } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import {
  Loader,
  Preload,
  OrbitControls,
  PerspectiveCamera,
  Stars,
} from "@react-three/drei";

import SpaceBrute from "./CanvasComponents/SpaceBrute";

function CanvasComponent() {
  const model_1 = useLoader(GLTFLoader, "/models/space_brute/scene.gltf");
  // const model_2 = useLoader(GLTFLoader, "/models/sun_model/scene.gltf");

  const pointerDownEffect = (e) => {
    console.log(e.object);
    // e.object.scale = .03
  };

  console.log(model_1.scene);
  return (
    <div className="canvas-container">
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <PerspectiveCamera makeDefault position={[0, 0, 17]} fov={75}>
            <pointLight intensity={1} position={[-10, -25, -10]} />
            <spotLight
              castShadow
              intensity={2.25}
              angle={0.2}
              penumbra={1}
              position={[-25, 20, -15]}
              shadow-mapSize={[1024, 1024]}
              shadow-bias={-0.0001}
            />
          </PerspectiveCamera>
          {/* <fog attach="fog" color="hotpink" near={1} far={10} /> */}
          <group>
            <primitive
              object={model_2.scene}
              scale={0.001}
              position={[15, 6, 3]}
              rotation={[0.5, 0.5, 0.0]}
            />
          </group>
          <Physics>
            <SpaceBrute />
          </Physics>
          {/* <OrbitControls /> */}
          <Stars radius={500} depth={50} count={1000} factor={10} />
          <Preload all />
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
}

export default CanvasComponent;
