import React, { useState, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useBox } from "@react-three/cannon";
import {
  OrbitControls,
  PresentationControls,
  ContactShadows,
  Cloud,
} from "@react-three/drei";

function SpaceBrute(props) {
  const model_1 = useLoader(GLTFLoader, "/models/space_brute/scene.gltf");

  const objRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    objRef.current.rotation.x = -Math.PI / 1.75 + Math.cos(t / 4) / 8;
    objRef.current.rotation.y = Math.sin(t / 4) / 8;
    objRef.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20;
    objRef.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
  });

  return (
    <>
      <fog attach="fog" args={["#272730", 16, 40]} />
      <PresentationControls
        global
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 1500 }}
        rotation={[0, 0.2, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 2]}
      >
        <group ref={objRef} dispose={null}>
          {/* <Cloud
            opacity={0.5}
            speed={0.4} // Rotation speed
            width={5} // Width of the full cloud
            depth={2} // Z-dir depth
            segments={10} // Number of particles
          /> */}
          <primitive
            object={model_1.scene}
            scale={0.02}
            position={[-1, 0, 0]}
            rotation={[2, 0.5, 0.1]}
          />
        </group>
      </PresentationControls>
      <ContactShadows
        rotation-x={Math.PI / 2}
        position={[0, -1.4, 0]}
        opacity={0.75}
        width={10}
        height={10}
        blur={2.6}
        far={2}
      />
    </>
  );
}

export default SpaceBrute;
