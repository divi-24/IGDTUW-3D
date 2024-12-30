import { CatmullRomCurve3, Vector3 } from "three";
import CurveCamera from "./CurveCamera";
import { useStore } from "../../context";

const DroneCamera = ({ debug = false }) => {
  const { droneScrollProgress, setDroneScrollProgress } = useStore();
  const curve = new CatmullRomCurve3([
    new Vector3(-70, 50, 180),
    new Vector3(-70, 50, -130),
    // new Vector3(0, 50, -130),
    new Vector3(70, 50, -130),
    new Vector3(70, 50, 100),
    new Vector3(0, 50, 170),
  ]);

  return (
    <CurveCamera
      lerpFactor={0.1}
      scrollSpeed={0.005}
      debug={debug}
      curve={curve}
      position={[-70, 50, 180]}
      scrollProgress={droneScrollProgress}
      setScrollProgress={setDroneScrollProgress}
      forwardButtonId="droneForward"
      backwardButtonId="droneBackward"
    />
  );
};

export default DroneCamera;
