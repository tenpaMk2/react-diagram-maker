import {
  Chart as ChartJS,
  ChartData,
  ChartDataset,
  ChartOptions,
  registerables,
} from "chart.js";
import "chartjs-adapter-moment";
import { useReducer, useState } from "react";
import StationSection from "./StationSection";
import TimeInputsSection from "./TimeInputsSection";
import ChartSection from "./ChartSection";
import Footer from "./Footer";
import { TrainDataset } from "./TimeInputsEachTrain";
import TimetableSection from "./TimetableSection";
import { reducer } from "./reducer/reducer";

ChartJS.register(...registerables);

const trainDatasetsToChartDatasets = (
  trainDatasets: TrainDataset[]
): ChartDataset<"scatter">[] =>
  trainDatasets.map((trainDataset): ChartDataset<"scatter"> => {
    if (trainDataset.data.length === 0)
      return {
        label: trainDataset.train,
        data: [],
        borderColor: trainDataset.borderColor,
        backgroundColor: trainDataset.backgroundColor,
      };

    const notPassXYKeys = trainDataset.data.filter((xYKey) => !xYKey.isPass);

    type XY = { x: Date; y: string };
    const data: XY[] = notPassXYKeys.map((xYKey) => {
      return { x: new Date(xYKey.x), y: xYKey.y };
    });

    const startTimeMS = data[0].x.getTime();
    if (Number.isNaN(startTimeMS))
      return {
        label: trainDataset.train, // @ts-ignore
        data: data,
        borderColor: trainDataset.borderColor,
        backgroundColor: trainDataset.backgroundColor,
      };

    const endTimeMS = data[data.length - 1].x.getTime();
    if (Number.isNaN(endTimeMS))
      return {
        label: trainDataset.train, // @ts-ignore
        data: data,
        borderColor: trainDataset.borderColor,
        backgroundColor: trainDataset.backgroundColor,
      };

    const intervalMS = endTimeMS - startTimeMS;

    let repeatedData: XY[] = [];
    for (let i = 0; i < trainDataset.repeat; i++) {
      repeatedData.push(
        ...data.map((xY) => {
          const newX = new Date(xY.x);
          newX.setMilliseconds(intervalMS * i);

          return {
            x: newX,
            y: xY.y,
          };
        })
      );
    }

    return {
      label: trainDataset.train, // @ts-ignore
      data: repeatedData,
      borderColor: trainDataset.borderColor,
      backgroundColor: trainDataset.backgroundColor,
    };
  });

const App = () => {
  const [stations, setStations] = useState<string[]>([]);
  const [trainDatasets, dispatch] = useReducer(reducer, []);

  const options: ChartOptions<"scatter"> = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "hour",
          stepSize: 1,
          displayFormats: {
            hour: "HH:mm",
          },
        },
      },
      y: {
        type: "category",
        labels: stations,
      },
    },
    showLine: true,
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
  };

  const data: ChartData<"scatter"> = {
    datasets: trainDatasetsToChartDatasets(trainDatasets),
  };

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

      <ChartSection options={options} data={data} />

      <TimetableSection trainDatasets={trainDatasets} />

      <Footer />
    </div>
  );
};

export default App;
