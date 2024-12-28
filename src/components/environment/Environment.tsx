import { Environment as Env } from "@react-three/drei";
import { useStore } from "../../context";

const Environment = () => {
  const { preset } = useStore();

  return <Env preset={preset} />;
};

export default Environment;
