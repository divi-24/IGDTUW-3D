import { useEffect, useState } from "react";
import { useStore } from "../../context";
import "../../styles/tab.css";
import { InfoBox } from "../../types/InfoBox";
import Modal from "./Modal";

const Tab = () => {
  const { tab, infoBoxes, tabView, setTabView } = useStore();
  const [box, setBox] = useState<InfoBox>();
  
  useEffect(() => {
    setBox(infoBoxes.find((box) => box.key === tab));
  }, [tab, infoBoxes]);

  return (
    <>
      <Modal data={box} view={tabView} setView={setTabView} />
      <div className="modal-toogle" onClick={() => setTabView(true)}>
        <h3>{box?.name}</h3>
      </div>
    </>
  );
};

export default Tab;
