import { useStore } from "../../context";
import Pointer from "./Pointer";

const PointerCollections = () => {
  const { infoBoxes } = useStore();

  return infoBoxes.map((box) => (
    <Pointer
      key={box.key}
      id={box.key}
      position={box.coordinates}
      color={box.color}
    />
  ));
};

export default PointerCollections;
