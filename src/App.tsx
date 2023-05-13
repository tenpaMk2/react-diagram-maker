import { useEffect, useReducer, useState } from "react";
import { StationSection } from "./StationSection";
import { TimeInputsSection } from "./TimeInputsSection";
import { ChartSection } from "./ChartSection";
import { Footer } from "./Footer";
import { TimetableSection } from "./TimetableSection";
import { reducer } from "./reducer/reducer";
import { RouteMapSection } from "./RouteMapSection";
import { SaveLoadSection } from "./SaveLoadSection";
import { getInitialState } from "./lib/initial-state";
import { Tabs, TabItems } from "./Tabs";

const handleBeforeUnloadEvent = (event: BeforeUnloadEvent) => {
  event.preventDefault();
  event.returnValue = ``;
};

export const App = () => {
  const [state, dispatch] = useReducer(reducer, getInitialState());
  const [activeTab, setActiveTab] = useState<TabItems>(`メイン`);

  useEffect(() => {
    window.addEventListener(`beforeunload`, handleBeforeUnloadEvent, true);
    return () =>
      window.removeEventListener(`beforeunload`, handleBeforeUnloadEvent, true);
  }, []);

  const contents = {
    メイン: (
      <>
        <StationSection stations={state.stations} dispatch={dispatch} />
        <TimeInputsSection state={state} dispatch={dispatch} />
        <ChartSection state={state} />
        <TimetableSection trainDatasets={state.trainDatasets} />
        <RouteMapSection state={state} />
        <SaveLoadSection state={state} dispatch={dispatch} />
      </>
    ),
    使い方: <>WIP</>,
    更新履歴: <>WIP</>,
  };

  return (
    <div className="m-4 flex flex-col gap-4 rounded-lg bg-slate-100 py-4">
      <h1 className="text-center text-4xl text-gray-900">
        ダイヤグラム生成くん
      </h1>

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex flex-col gap-8 px-4">{contents[activeTab]}</div>

      <Footer />
    </div>
  );
};
