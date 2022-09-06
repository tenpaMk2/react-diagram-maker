import { useReducer, useState } from "react";
import StationSection from "./StationSection";
import TimeInputsSection from "./TimeInputsSection";
import ChartSection from "./ChartSection";
import Footer from "./Footer";
import TimetableSection from "./TimetableSection";
import { reducer } from "./reducer/reducer";
import RouteMapSection from "./RouteMapSection";
import SaveLoadSection from "./SaveLoadSection";

const App = () => {
  const [stations, setStations] = useState<string[]>([]);
  const [trainDatasets, dispatch] = useReducer(reducer, []);

  const addStation = (newStationName: string) => {
    setStations((prevStations) => {
      const newStations = [...prevStations];
      newStations.push(newStationName);

      dispatch({ type: "changeStations", payload: { stations: newStations } });
      return newStations;
    });
  };

  const removeStation = (stationName: string) => {
    setStations((prevStations) => {
      const newStations = prevStations.filter(
        (prevStationName) => prevStationName !== stationName
      );

      dispatch({ type: "changeStations", payload: { stations: newStations } });
      return newStations;
    });
  };

  const changeStations = (stations: string[]) => {
    setStations(stations);
    dispatch({ type: "changeStations", payload: { stations: stations } });
  };

  return (
    <div className="m-4 rounded-lg bg-slate-100 p-4">
      <h1 className="text-center text-4xl text-gray-900">
        ダイヤグラム生成くん
      </h1>

      <StationSection
        stations={stations}
        addStation={addStation}
        removeStation={removeStation}
      />

      <TimeInputsSection
        stations={stations}
        trainDatasets={trainDatasets}
        dispatch={dispatch}
      />

      <ChartSection stations={stations} trainDatasets={trainDatasets} />

      <TimetableSection trainDatasets={trainDatasets} />

      <RouteMapSection stations={stations} trainDatasets={trainDatasets} />

      <SaveLoadSection
        stations={stations}
        trainDatasets={trainDatasets}
        changeStations={changeStations}
        dispatch={dispatch}
      />

      <Footer />
    </div>
  );
};

export default App;
