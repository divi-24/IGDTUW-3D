import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs"
import "../../styles/controls.css"

type ControlsButtonsProp = {
    forwardButtonId: string
    backwardButtonId: string
}

const ControlsButtons = ({ forwardButtonId, backwardButtonId }: ControlsButtonsProp) => {
  return (
    <div className="controls-button">
        <span id={forwardButtonId} className="forward"><BsArrowUpCircle color="white" size={30} /></span>
        <span id={backwardButtonId} className="backward"><BsArrowDownCircle color="white" size={30} /></span>
    </div>
  )
}

export default ControlsButtons