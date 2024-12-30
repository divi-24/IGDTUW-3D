import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Group } from "three";
import { useStore } from "../../context";

const Pointer = ({
  position,
  color,
  id,
}: {
  position: [number, number, number];
  color: string;
  id: number;
}) => {
  const ref = useRef<Group>();
  const [hover, setHover] = useState<boolean>(false);
  const { setTab, setTabView } = useStore();

  useFrame(() => {
    if (ref.current && !hover) {
      ref.current.position.set(
        position[0],
        position[1] + Math.sin(Date.now() * 0.005) * 0.5,
        position[2]
      );
    }
  });

  const handleClick = () => {
    setTab(id)
    setTabView(true)
  }

  return (
    <group
      ref={ref as any}
      scale={hover ? 3 : 2}
      rotation={[0, 0, Math.PI]}
      onClick={handleClick}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {/* Pointer (Cone) */}
      <mesh position={[0, 1, 0]}>
        <coneGeometry args={[0.5, 2, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Base (Sphere) */}
      <mesh position={[0, -1, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};

Pointer.defaultProps = {
  color: "red",
};

export default Pointer;
