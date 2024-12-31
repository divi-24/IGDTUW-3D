import "../../styles/tab.css";
import { useStore } from "../../context";

const Modal = () => {
  const { 
    tab, 
    setTab, 
    setTabView, 
    setSelectedBuilding, 
    infoBoxes
  } = useStore();
  
  const handleClose = () => {
    // Order matters here - first clear selected building
    setSelectedBuilding(null);
    // Then close the dialog
    setTabView(false);
    setTab(0);
  };

  const data = infoBoxes.find(box => box.key === tab);
  if (!data) return null;

  return (
    <div className="info-dialog">
      <div className="info-content">
        <button className="close-button" onClick={handleClose}>×</button>
        <h3>{data.name}</h3>
        <div className="info-text">
          {data?.text?.split("\n").map((line, index) => (
            <div key={index}>
              <div dangerouslySetInnerHTML={{ __html: line }}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;