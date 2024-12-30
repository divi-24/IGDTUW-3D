import { useStore } from "../../context"
import ControlsButtons from "./ControlsButtons"
import { useEffect, useState } from "react"

const MovementControls = () => {
    const { view } = useStore()
    const [w, setW] = useState<number>(0)

    useEffect(() => {
        setW(window.innerWidth)
    },[])
    
    if (w > 600) return <></>
    
    if (view == 1) return <ControlsButtons forwardButtonId="fpvForward" backwardButtonId="fpvBackward" />
    else if (view == 2) return <ControlsButtons forwardButtonId="droneForward" backwardButtonId="droneBackward" />
    else return <></>
}

export default MovementControls