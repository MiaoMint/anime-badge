import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    forward: THREE.Mesh;
    back: THREE.Mesh;
    ring: THREE.Mesh;
    needle: THREE.Mesh;
  };
  materials: {
    front: THREE.MeshStandardMaterial;
    metal: THREE.MeshStandardMaterial;
  };
};

export interface ModelProps extends React.ComponentProps<"group"> {
  imageUrl?: string;
}

export function Model1(props: ModelProps) {
  const { nodes, materials } = useGLTF("/model1.gltf") as GLTFResult;
  const getMaterial = (image: string) => {
    const texture = new THREE.TextureLoader().load(image);
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    const material = new THREE.MeshStandardMaterial({
      map: texture,
    });
    return material;
  };

  const material = props.imageUrl
    ? getMaterial(props.imageUrl)
    : materials.front;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.forward.geometry}
        material={material}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.back.geometry}
        material={materials.metal}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ring.geometry}
        material={materials.metal}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.needle.geometry}
        material={materials.metal}
        position={[0, 0.179, -0.147]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
      />
    </group>
  );
}

useGLTF.preload("/model1.gltf");
