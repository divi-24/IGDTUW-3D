import { useStore } from "../../context"
import DroneCamera from "./DroneCamera"
import FPVCamera from "./FPVCamera"
import GardenCamera from "./GardenCamera"

const Camera = () => {

    const { view } = useStore()

  
    if (view == 1) return <FPVCamera />
    else if (view == 2) return <DroneCamera />
    else return <GardenCamera debug={true} />
}

export default Camera