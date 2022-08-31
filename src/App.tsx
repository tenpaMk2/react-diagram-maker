import {
  Chart as ChartJS,
  ChartData,
  ChartDataset,
  ChartOptions,
  registerables,
} from "chart.js";
import "chartjs-adapter-moment";
import { useState } from "react";
import StationSection from "./StationSection";
import TimeSection from "./TimeSection";
import { TrainDataset } from "./TimeListEachTrain";
import ChartSection from "./ChartSection";

ChartJS.register(...registerables);

const createDatasets = (
  trainDatasets: TrainDataset[]
): ChartDataset<"scatter">[] =>
  trainDatasets.map((trainDataset): ChartDataset<"scatter"> => {
    if (trainDataset.data.length === 0)
      return {
        label: trainDataset.label,
        data: [],
        borderColor: trainDataset.borderColor,
        backgroundColor: trainDataset.backgroundColor,
      };

    type XY = { x: string; y: string };
    const data: XY[] = trainDataset.data.map((xYKey) => {
      return { x: xYKey.x, y: xYKey.y };
    });

    const startTimeMS = new Date(trainDataset.data[0].x).getTime();
    if (Number.isNaN(startTimeMS))
      return {
        label: trainDataset.label, // @ts-ignore
        data: data,
        borderColor: trainDataset.borderColor,
        backgroundColor: trainDataset.backgroundColor,
      };

    const endTimeMS = new Date(
      trainDataset.data[trainDataset.data.length - 1].x
    ).getTime();
    if (Number.isNaN(endTimeMS))
      return {
        label: trainDataset.label, // @ts-ignore
        data: data,
        borderColor: trainDataset.borderColor,
        backgroundColor: trainDataset.backgroundColor,
      };

    const intervalMS = endTimeMS - startTimeMS;

    let repeatedData: XY[] = [];
    for (let i = 0; i < trainDataset.repeat; i++) {
      repeatedData.push(
        ...data.map((xY) => {
          const repeatedXDate = new Date(xY.x);
          repeatedXDate.setMilliseconds(intervalMS * i);

          if (Number.isNaN(repeatedXDate.getTime()))
            return {
              x: "",
              y: xY.y,
            };

          return {
            x: repeatedXDate.toISOString(),
            y: xY.y,
          };
        })
      );
    }

    return {
      label: trainDataset.label, // @ts-ignore
      data: repeatedData,
      borderColor: trainDataset.borderColor,
      backgroundColor: trainDataset.backgroundColor,
    };
  });

const App = () => {
  const [stations, setStations] = useState<string[]>([]);
  const [trainDatasets, setTrainDatasets] = useState<TrainDataset[]>([]);

  const options: ChartOptions<"scatter"> = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "hour",
          stepSize: 1,
          displayFormats: {
            hour: "hh:mm",
          },
        },
      },
      y: {
        type: "category",
        labels: stations,
      },
    },
    showLine: true,
  };

  const data: ChartData<"scatter"> = {
    datasets: createDatasets(trainDatasets),
  };

  const addStation = (newStationName: string) => {
    setStations((prevStations) => {
      const newStations = [...prevStations];
      newStations.push(newStationName);
      return newStations;
    });
  };

  const removeStation = (stationName: string) => {
    setStations((prevStations) =>
      prevStations.filter((prevStationName) => prevStationName !== stationName)
    );
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

      <TimeSection
        stations={stations}
        onTrainDatasetsChange={(newTrainDatasets: TrainDataset[]) =>
          setTrainDatasets(newTrainDatasets)
        }
      />

      <ChartSection options={options} data={data} />
    </div>
  );
};

export default App;
