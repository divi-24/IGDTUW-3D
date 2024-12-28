import { useHelper } from "@react-three/drei"
import { CameraHelper as CH } from "three"

export const CameraHelper = ({ cameraRef }: { cameraRef: any }) => {
    useHelper(cameraRef, CH)

    return null
}