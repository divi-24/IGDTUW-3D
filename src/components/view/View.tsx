import { Canvas } from "@react-three/fiber";
import "../../styles/model.css";
import { Sky, Stats } from "@react-three/drei";
import Camera from "../camera";
import { Model } from "../models";
import { PointerCollections } from "../pointer";
import { Environment } from "../environment";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

const View = () => {
  return (
    <Canvas shadows fallback={<div>Sorry no WebGL supported!</div>}>
      <Sky
        sunPosition={[10, 10, 10]}
        distance={450}
        inclination={0.49}
        turbidity={0.5}
      />
      <Environment />
      <Stats />

      <ambientLight color="white" intensity={0.3} position={[0, 10, 0]} />
      {/* <directionalLight position={[0, -10, 180]} intensity={1} color="white" castShadow /> */}
      <directionalLight
        castShadow
        position={[5, 10, 5]}
        intensity={1}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-near={1}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <Model
        rotation={[0, Math.PI / 2, 0]}
        scale={[0.5, 0.5, 0.5]}
        position={[0, -10, 0]}
      />
      <PointerCollections />
      <Camera />

      <EffectComposer>
        <Bloom
          intensity={0.3}
          luminanceThreshold={0.3}
          luminanceSmoothing={0.3}
          height={300}
        />
      </EffectComposer>
    </Canvas>
  );
};

export default View;
