import { useStore } from "../../context";
import Modal from "./Modal";

const Tab = () => {
  const { tabView } = useStore();
  return tabView ? <Modal /> : null;
};

export default Tab;
