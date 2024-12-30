import * as THREE from 'three'
import { MeshProps } from "@react-three/fiber"


const Mesh = ({ material, ...props}: MeshProps) => {
    const emmisiveMaterial = new THREE.MeshStandardMaterial({
        color: "red",
        emissive: "red",
        emissiveIntensity: 1
    })
  return (
    <mesh {...props} material={emmisiveMaterial}>
    </mesh>
  )
}

export default Mesh