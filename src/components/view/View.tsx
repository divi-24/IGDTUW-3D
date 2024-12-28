import { Canvas } from "@react-three/fiber";
import "../../styles/model.css";
import { Sky } from "@react-three/drei";
import Camera from "../camera";
import { Model } from "../models";
// import { PointerCollections } from "../pointer";
import { Environment } from "../environment";

const View = () => {
  return (
    <Canvas fallback={<div>Sorry no WebGL supported!</div>}>
      <Sky
        sunPosition={[10, 10, 10]}
        distance={450}
        inclination={0.49}
        turbidity={0.5}
      />
      <Environment />
      
      <ambientLight color="black" intensity={0.3} position={[0, 10, 0]} />
      <directionalLight position={[0, -10, 180]} intensity={1} color="white" castShadow />
      <Model
        rotation={[0, Math.PI / 2, 0]}
        scale={[0.5, 0.5, 0.5]}
        position={[0, -10, 0]}
      />
      {/* <PointerCollections /> */}
      <Camera />
      
    </Canvas>
  );
};

export default View;
