import { useReducer } from "react";
import StationSection from "./StationSection";
import TimeInputsSection from "./TimeInputsSection";
import ChartSection from "./ChartSection";
import Footer from "./Footer";
import TimetableSection from "./TimetableSection";
import { reducer } from "./reducer/reducer";
import RouteMapSection from "./RouteMapSection";
import SaveLoadSection from "./SaveLoadSection";
import { getInitialState } from "./lib/initial-state";

const App = () => {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  return (
    <div className="m-4 rounded-lg bg-slate-100 p-4">
      <h1 className="text-center text-4xl text-gray-900">
        ダイヤグラム生成くん
      </h1>

      <StationSection stations={state.stations} dispatch={dispatch} />

      <TimeInputsSection state={state} dispatch={dispatch} />

      <ChartSection state={state} />

      <TimetableSection trainDatasets={state.trainDatasets} />

      <RouteMapSection state={state} />

      <SaveLoadSection state={state} dispatch={dispatch} />

      <Footer />
    </div>
  );
};

export default App;
