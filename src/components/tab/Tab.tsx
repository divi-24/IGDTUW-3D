import { useEffect, useState } from "react";
import { useStore } from "../../context";
import "../../styles/tab.css";
import { InfoBox } from "../../types/InfoBox";

const Tab = () => {
  const { tab, infoBoxes } = useStore();
  const [box, setBox] = useState<InfoBox>();

  useEffect(() => {
    setBox(infoBoxes.find((box) => box.key === tab));
  }, [tab]);

  if (tab === 0)
    return (
      <div className="side-bar">
        <h3>IGDTUW 3D Map</h3>
      </div>
    );

  return (
    <div className="side-bar">
      <h3>{box?.name}</h3>
    </div>
  );
};

export default Tab;
