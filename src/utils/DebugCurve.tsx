import * as THREE from "three"

 
const DebugCurve = ({ curve }: { curve: THREE.CatmullRomCurve3 }) => {
    const points = curve.getPoints(50)
    const geometry = new THREE.BufferGeometry().setFromPoints(points)

    return (
        <line>
            <bufferGeometry attach="geometry" {...geometry} />
            <lineBasicMaterial attach="material" color="red" />
        </line>
    )
}

export default DebugCurve