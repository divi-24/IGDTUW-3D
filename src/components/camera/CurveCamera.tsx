import { CatmullRomCurve3, MathUtils, PerspectiveCamera as PC, Vector3 } from "three";
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
  const { tabView, selectedBuilding, infoBoxes } = useStore();
  const savedProgressRef = useRef<number | null>(null);
  const orbitAngleRef = useRef(0);
  const returnJourneyRef = useRef({
    active: false,
    startPosition: null as Vector3 | null,
    endPosition: null as Vector3 | null,
    progress: 0
  });
  const movementPhaseRef = useRef({
    active: false,
    startPosition: new Vector3(),
    progress: 0,
    startedFromPath: false,
    initialAngle: 0
  });

  const targetScrollProgress = useRef(scrollProgress);

  const handleWheel = (e: WheelEvent) => {
    const v = targetScrollProgress.current + Math.sign(e.deltaY) * scrollSpeed;
    if (v >= 0) {
      targetScrollProgress.current = v;
    } else {
      targetScrollProgress.current = -1 * v;
    }
  };

  useEffect(() => {
    const handleForwardMovement = () => {
      targetScrollProgress.current += 1 * scrollSpeed * 3;
    };

    const handleBackwardMovement = () => {
      if (targetScrollProgress.current > 0) {
        targetScrollProgress.current -= -1 * scrollSpeed * 3;
      }
    };

    document.getElementById(forwardButtonId)?.addEventListener("click", handleForwardMovement);
    document.getElementById(backwardButtonId)?.addEventListener("click", handleBackwardMovement);

    if (tabView) {
      document.removeEventListener('wheel', handleWheel);
    } else {
      document.addEventListener("wheel", handleWheel);
    }
    return () => {
      document.removeEventListener("wheel", handleWheel);
      document.getElementById(forwardButtonId)?.removeEventListener("click", handleForwardMovement);
      document.getElementById(backwardButtonId)?.removeEventListener("click", handleBackwardMovement);
    };
  }, [tabView]);

  useEffect(() => {
    if (!selectedBuilding && savedProgressRef.current !== null) {
      const returnPoint = curve.getPoint(savedProgressRef.current);
      if (cameraRef.current) {
        cameraRef.current.position.lerp(returnPoint, 0.05);
      }
    }
  }, [selectedBuilding]);

  useFrame(() => {
    if (cameraRef.current) {
      if (selectedBuilding) {
        const selectedBox = infoBoxes.find(box => box.key.toString() === selectedBuilding);
        if (selectedBox) {
          if (savedProgressRef.current === null) {
            const currentPos = cameraRef.current.position.clone();
            
            // Always start from front of building (facing -Z direction)
            const initialAngle = Math.PI; // Start from front
            
            savedProgressRef.current = scrollProgress;
            movementPhaseRef.current = {
              active: true,
              startPosition: currentPos,
              progress: 0,
              startedFromPath: orbitAngleRef.current === 0,
              initialAngle: initialAngle
            };
          }

          const radius = 80;
          const buildingY = selectedBox.coordinates[1] - 20;
          const cameraHeight = 20;

          if (movementPhaseRef.current?.active) {
            // Much slower movement
            movementPhaseRef.current.progress += 0.001;
            const t = Math.min(movementPhaseRef.current.progress, 1);
            
            // Gentler easing for steadier motion
            const easeT = t * t * (3 - 2 * t); // Smoothstep easing

            // Calculate smooth orbit angle with slower rotation
            const orbitAngle = movementPhaseRef.current.initialAngle + (easeT * Math.PI * 0.2);
            orbitAngleRef.current = orbitAngle;

            const targetPosition = new Vector3(
              selectedBox.coordinates[0] + Math.cos(orbitAngle) * radius,
              buildingY + cameraHeight,
              selectedBox.coordinates[2] + Math.sin(orbitAngle) * radius
            );

            // Steady interpolation
            cameraRef.current.position.copy(
              movementPhaseRef.current.startPosition.clone().lerp(targetPosition, easeT)
            );

            if (t >= 1) {
              movementPhaseRef.current.active = false;
            }
          } else {
            // Slower continuous orbit
            orbitAngleRef.current += 0.002;
            const targetPosition = new Vector3(
              selectedBox.coordinates[0] + Math.cos(orbitAngleRef.current) * radius,
              buildingY + cameraHeight,
              selectedBox.coordinates[2] + Math.sin(orbitAngleRef.current) * radius
            );

            cameraRef.current.position.lerp(targetPosition, 0.05);
          }

          if (controlsRef.current) {
            controlsRef.current.setLookAt(
              cameraRef.current.position.x,
              cameraRef.current.position.y,
              cameraRef.current.position.z,
              selectedBox.coordinates[0],
              selectedBox.coordinates[1],
              selectedBox.coordinates[2],
              true
            );
          }
        }
      } else if (savedProgressRef.current !== null) {
        if (!returnJourneyRef.current.active) {
          returnJourneyRef.current = {
            active: true,
            startPosition: cameraRef.current.position.clone(),
            endPosition: curve.getPoint(savedProgressRef.current),
            progress: 0
          };
        }

        if (returnJourneyRef.current.active) {
          returnJourneyRef.current.progress += 0.01;
          
          const t = Math.sin(returnJourneyRef.current.progress * Math.PI * 0.5);
          
          cameraRef.current.position.lerpVectors(
            returnJourneyRef.current.startPosition!,
            returnJourneyRef.current.endPosition!,
            t
          );

          if (returnJourneyRef.current.progress >= 1) {
            cameraRef.current.position.copy(returnJourneyRef.current.endPosition!);
            setScrollProgress(savedProgressRef.current);
            targetScrollProgress.current = savedProgressRef.current;
            savedProgressRef.current = null;
            orbitAngleRef.current = 0;
            returnJourneyRef.current.active = false;
          }
        }
      } else {
        const newProgress = MathUtils.lerp(
          scrollProgress,
          targetScrollProgress.current,
          lerpFactor
        );
        setScrollProgress(newProgress);
        const point = curve.getPoint(newProgress);
        cameraRef.current.position.copy(point);
      }
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
