import { useStore } from "../../context";
import "../../styles/preset.css";
import { preset, presetList } from "../../constant/preset";

const PresetButton = () => {
  const { setPreset, preset } = useStore();
  return (
    <select
      className="select-preset"
      value={preset}
      onChange={(e) => setPreset(e.target.value as preset)}
    >
      <option disabled>Select Preset</option>
      {presetList.map((preset) => (
        <option key={preset} value={preset}>
          {preset}
        </option>
      ))}
    </select>
  );
};

export default PresetButton;
