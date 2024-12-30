import { CatmullRomCurve3, Vector3 } from "three";
import CurveCamera from "./CurveCamera";
import { useStore } from "../../context";

const FPVCamera = ({ debug = false }) => {
  const { fpvScrollProgress, setFpvScrollProgress } = useStore();

  const curve = new CatmullRomCurve3([
    new Vector3(0, -10, 135),
    new Vector3(0, -7, 95),
    new Vector3(-15, -7, 85),
    new Vector3(-32, -7, 70),
    new Vector3(-40, -7, 10),
    new Vector3(-40, -7, -45),
    new Vector3(-37, -7, -85),
    new Vector3(10, -7, -86.5),
    new Vector3(42, -7, -87),
    new Vector3(44, -7, -45),
    new Vector3(44, -7, 10),
    new Vector3(42, -7, 55),
    new Vector3(20, -9, 85),
    new Vector3(0, -7, 95),
  ]);

  return (
    <CurveCamera
      debug={debug}
      scrollSpeed={0.00005}
      lerpFactor={0.1}
      curve={curve}
      position={[0, -10, 135]}
      scrollProgress={fpvScrollProgress}
      setScrollProgress={setFpvScrollProgress}
    />
  );
};

export default FPVCamera;
