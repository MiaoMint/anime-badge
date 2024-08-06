"use client";
import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { ModelProps } from "./Model1";

type GLTFResult = GLTF & {
  nodes: {
    Object_4: THREE.Mesh;
    Object_5: THREE.Mesh;
    Object_7: THREE.Mesh;
  };
  materials: {
    main: THREE.MeshStandardMaterial;
    hrom: THREE.MeshStandardMaterial;
  };
};

export function Model2(props: ModelProps) {
  const { nodes, materials } = useGLTF("/model2.gltf") as GLTFResult;
  const getMaterial = (image: string) => {
    const texture = new THREE.TextureLoader().load(image);
    texture.colorSpace = THREE.SRGBColorSpace;
    const material = new THREE.MeshStandardMaterial({
      map: texture,
    });
    return material;
  };

  const material = props.imageUrl
    ? getMaterial(props.imageUrl)
    : materials.main;

  return (
    <group {...props} dispose={null}>
      <group position={[0, 0.001, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <group position={[0, 0.298, 0]} scale={[1, 0.079, 1]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_4.geometry}
            material={material}
            rotation={[-Math.PI, 0, -Math.PI]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_5.geometry}
            material={materials.hrom}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_7.geometry}
            material={materials.hrom}
            position={[-0.121, -4.461, 0]}
            scale={[0.285, 2.486, 0.221]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/model2.gltf");
