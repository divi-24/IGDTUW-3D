import { useStore } from "../../context";
import { INFO_BOXES_DATA } from "../../constant/infoBox";

const Modal = () => {
  const { selectedBuilding, setSelectedBuilding, setTabView } = useStore();

  const handleClose = () => {
    setSelectedBuilding(null);
    setTabView(false);
  };

  const data = INFO_BOXES_DATA.find(
    (box) => box.key.toString() === selectedBuilding
  );

  if (!data) return null;

  return (
    <div className="info-dialog">
      <div className="info-content">
        <button className="close-button" onClick={handleClose}>×</button>
        <h3>{data.name}</h3>
        <p>{data.text}</p>
      </div>
    </div>
  );
};

export default Modal;