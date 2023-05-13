import { useEffect, useReducer } from "react";
import { StationSection } from "./StationSection";
import { TimeInputsSection } from "./TimeInputsSection";
import { ChartSection } from "./ChartSection";
import { Footer } from "./Footer";
import { TimetableSection } from "./TimetableSection";
import { reducer } from "./reducer/reducer";
import { RouteMapSection } from "./RouteMapSection";
import { SaveLoadSection } from "./SaveLoadSection";
import { getInitialState } from "./lib/initial-state";

const handleBeforeUnloadEvent = (event: BeforeUnloadEvent) => {
  event.preventDefault();
  event.returnValue = ``;
};

export const App = () => {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  useEffect(() => {
    window.addEventListener(`beforeunload`, handleBeforeUnloadEvent, true);
    return () =>
      window.removeEventListener(`beforeunload`, handleBeforeUnloadEvent, true);
  }, []);

  return (
    <div className="m-4 flex flex-col gap-4 rounded-lg bg-slate-100 py-4">
      <h1 className="text-center text-4xl text-gray-900">
        ダイヤグラム生成くん
      </h1>

      <div className="flex flex-col gap-8 px-4">
        <StationSection stations={state.stations} dispatch={dispatch} />

        <TimeInputsSection state={state} dispatch={dispatch} />

        <ChartSection state={state} />

        <TimetableSection trainDatasets={state.trainDatasets} />

        <RouteMapSection state={state} />

        <SaveLoadSection state={state} dispatch={dispatch} />
      </div>

      <Footer />
    </div>
  );
};
