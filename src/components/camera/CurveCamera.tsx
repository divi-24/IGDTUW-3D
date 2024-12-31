import { CatmullRomCurve3, MathUtils, PerspectiveCamera as PC } from "three";
import DebugCurve from "../../utils/DebugCurve";
import { CameraControls, PerspectiveCamera } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useStore } from "../../context";

type CurveCameraProps = {
  debug: boolean;
  lerpFactor: number;
  scrollSpeed: number;
  curve: CatmullRomCurve3;
  position: [number, number, number];
  scrollProgress: number;
  setScrollProgress: React.Dispatch<React.SetStateAction<number>>;
  forwardButtonId: string;
  backwardButtonId: string;
};

const CurveCamera = ({
  curve,
  position,
  debug = false,
  lerpFactor,
  scrollSpeed,
  scrollProgress,
  setScrollProgress,
  forwardButtonId,
  backwardButtonId,
}: CurveCameraProps) => {
  const cameraRef = useRef<PC>(null);
  const controlsRef = useRef<CameraControls>(null);

  const { tabView } = useStore()

  const targetScrollProgress = useRef(scrollProgress);

  const handleWheel = (e: WheelEvent) => {
    const v = targetScrollProgress.current + Math.sign(e.deltaY) * scrollSpeed;
    if (v >= 0) {
      targetScrollProgress.current = v
    } else {
      targetScrollProgress.current = -1 * v
    }
  };


  useEffect(() => {

    const handleForwardMovement = () => {
      targetScrollProgress.current += 1 * scrollSpeed * 3
    }

    const handleBackwardMovement = () => {
      const v = targetScrollProgress.current - 3 * scrollSpeed;
      if (v >= 0) {
        targetScrollProgress.current = v
      } else {
        targetScrollProgress.current = 0
      }
    }

    document.getElementById(forwardButtonId)?.addEventListener("click", handleForwardMovement)
    document.getElementById(backwardButtonId)?.addEventListener("click", handleBackwardMovement)

    if (tabView) {
      document.removeEventListener('wheel', handleWheel)
    } else {
      document.addEventListener("wheel", handleWheel)
    }
    return () => {
      document.removeEventListener("wheel", handleWheel);
      document.getElementById(forwardButtonId)?.removeEventListener("click", handleForwardMovement)
      document.getElementById(backwardButtonId)?.removeEventListener("click", handleBackwardMovement)
    };
  }, [tabView]);

  useFrame(() => {
    if (cameraRef.current) {
      const newProgress = MathUtils.lerp(
        scrollProgress,
        targetScrollProgress.current,
        lerpFactor
      );

      setScrollProgress(newProgress);
      const point = curve.getPoint(newProgress);
      cameraRef.current?.position.copy(point);
    }
  });

  return (
    <>
      {debug && <DebugCurve curve={curve} />}
      <PerspectiveCamera
        makeDefault
        ref={cameraRef}
        fov={75}
        position={position}
      />
      <CameraControls ref={controlsRef} camera={cameraRef.current as PC} />
    </>
  );
};

export default CurveCamera;
