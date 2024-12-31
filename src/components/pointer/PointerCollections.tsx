import { useStore } from "../../context";
import { useRef, useEffect } from "react";
import { Vector3 } from "three";
import Pointer from "./Pointer";
import { useFrame } from "@react-three/fiber";

const PointerCollections = () => {
  const { infoBoxes } = useStore();

  return (
    <>
      {infoBoxes.map((box) => (
        <Pointer
          key={box.key}
          id={box.key}
          position={box.coordinates as [number, number, number]}
          color={box.color || "red"}
        />
      ))}
    </>
  );
};

export default PointerCollections;
