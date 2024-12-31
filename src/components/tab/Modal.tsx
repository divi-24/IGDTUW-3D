import { FaTimes } from "react-icons/fa";
import "../../styles/tab.css";
import { InfoBox } from "../../types/InfoBox";


type InfoModalProps = {
    data: InfoBox | undefined,
    view: boolean,
    setView: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal = ({ data, view, setView }: InfoModalProps) => {

    if (!view) {
        return <></>
    }

    return (
        <>
            <div className="modal-overlay" />
            <div className="modal">
                <div className="modal-header">
                    <h2>{data?.name}</h2>
                    <span className="modal-close" onClick={() => setView(false)}><FaTimes color="#3f3e3e" size={30} /></span>
                </div>

                <div className="modal-content">
                    {data?.text?.split("\n").map(line => (
                        <>
                            <div dangerouslySetInnerHTML={{ __html: line }}></div>
                            <br />
                        </>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Modal