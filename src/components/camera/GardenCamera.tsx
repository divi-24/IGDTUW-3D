import { CatmullRomCurve3, Vector3 } from "three";
import CurveCamera from "./CurveCamera";
import { useStore } from "../../context";

const GardenCamera = ({ debug = true }) => {
  const { gardenScrollProgress, setGardenScrollProgress } = useStore();
  const curve = new CatmullRomCurve3([
    new Vector3(0, 0, -27),
    new Vector3(0, 1, -27),
  ]);

  return (
    <CurveCamera
      debug={debug}
      lerpFactor={0.1}
      scrollSpeed={0.00005}
      curve={curve}
      position={[0, 0, -27]}
      scrollProgress={gardenScrollProgress}
      setScrollProgress={setGardenScrollProgress}
      forwardButtonId="gardenForward"
      backwardButtonId="gardenBackward"
    />
  );
};

export default GardenCamera;
