import { View } from "./components/view";
import "./App.css";
import { useStore } from "./context";
import { Loader } from "./components/loader";
import { Suspense } from "react";
import { Tab } from "./components/tab";
import { SoundButton } from "./components/sound";
import { PresetButton } from "./components/environment";
import { MovementControls } from "./components/controls";

const App = () => {
  const { view, setView } = useStore();

  return (
    <main className="main">
      <div className="three-view">
        <Tab />
        <SoundButton />
        <MovementControls />
        <PresetButton />
        <Suspense fallback={<Loader />}>
          <select
            className="view-select"
            name="Camera View"
            value={view}
            onChange={(e) => setView(parseInt(e.target.value))}
          >
            <option disabled>Select View</option>
            <option value={1}>FPV View</option>
            <option value={2}>Drone View</option>
            <option value={3}>Garden View</option>
          </select>
          <View />
        </Suspense>
      </div>
    </main>
  );
};

export default App;
