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
import TimeInputsSection, {
  stationsToDownAndUpStations,
  stationsToTimeInputsLabels,
} from "./TimeInputsSection";
import ChartSection from "./ChartSection";
import Footer from "./Footer";
import { TrainDataset, XYKey } from "./TimeInputsEachTrain";
import TimetableSection from "./TimetableSection";

ChartJS.register(...registerables);

const colors = [
  {
    borderColor: "rgba(255, 99, 132, 1)",
    backgroundColor: "rgba(255, 99, 132, 0.5)",
  },
  {
    borderColor: "rgba(255, 159, 64, 1)",
    backgroundColor: "rgba(255, 159, 64, 0.5)",
  },
  {
    borderColor: "rgba(255, 205, 86, 1)",
    backgroundColor: "rgba(255, 205, 86, 0.5)",
  },
  {
    borderColor: "rgba(75, 192, 192, 1)",
    backgroundColor: "rgba(75, 192, 192, 0.5)",
  },
  {
    borderColor: "rgba(54, 162, 235, 1)",
    backgroundColor: "rgba(54, 162, 235, 0.5)",
  },
  {
    borderColor: "rgb(a153, 102, 255, 1)",
    backgroundColor: "rgb(a153, 102, 255, 0.5)",
  },
  {
    borderColor: "rgba(201, 203, 20, 17",
    backgroundColor: "rgba(201, 203, 20, 0.57",
  },
];

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
  const [trainDatasets, setTrainDatasets] = useState<TrainDataset[]>([]);

  const onChangeStations = (stations: string[]) => {
    setTrainDatasets((prev) => {
      const downAndUpStations = stationsToDownAndUpStations(stations);
      const timeInputsLabels = stationsToTimeInputsLabels(stations);

      const newTrainDatasets = prev.map((prevTrainDataset) => {
        const prevTimeInputsLabels = prevTrainDataset.data.map(
          (xYKey) => xYKey.key
        );

        if (
          JSON.stringify(prevTimeInputsLabels) ===
          JSON.stringify(timeInputsLabels)
        )
          return prevTrainDataset;

        const blankXYKeys: XYKey[] = timeInputsLabels.map((label, idx) => ({
          x: new Date("invalid"),
          y: downAndUpStations[idx],
          key: label,
          isPass: false,
        }));

        const newData = blankXYKeys.map((blankXYKey) => {
          const searchResult = prevTrainDataset.data.filter(
            (xykey) => xykey.key === blankXYKey.key
          );
          return searchResult.length === 1 ? searchResult[0] : blankXYKey;
        });

        return { ...prevTrainDataset, data: newData };
      });

      return newTrainDatasets;
    });
  };

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
  };

  const data: ChartData<"scatter"> = {
    datasets: trainDatasetsToChartDatasets(trainDatasets),
  };

  const addStation = (newStationName: string) => {
    setStations((prevStations) => {
      const newStations = [...prevStations];
      newStations.push(newStationName);

      onChangeStations(newStations);
      return newStations;
    });
  };

  const removeStation = (stationName: string) => {
    setStations((prevStations) => {
      const newStations = prevStations.filter(
        (prevStationName) => prevStationName !== stationName
      );

      onChangeStations(newStations);
      return newStations;
    });
  };

  const addTrain = (trainName: string) => {
    setTrainDatasets((prev) => {
      const filtered = prev.filter(
        (prevTrainDataset) => prevTrainDataset.train === trainName
      );
      if (0 < filtered.length) {
        // TODO: alert existed train name.
        return prev;
      }

      const downAndUpStations = stationsToDownAndUpStations(stations);
      const timeInputsLabels = stationsToTimeInputsLabels(stations);

      const initialTrainDataset: TrainDataset = {
        train: trainName,
        data: timeInputsLabels.map((timeInputslabel, idx) => ({
          x: new Date("invalid"),
          y: downAndUpStations[idx],
          key: timeInputslabel,
          isPass: false,
        })),
        borderColor: colors[prev.length].borderColor, // todo: limit length
        backgroundColor: colors[prev.length].backgroundColor,
        repeat: 1,
        isMoveForward: false,
      };

      return [...prev, initialTrainDataset];
    });
  };

  const onIsMoveForwardChange = (trainName: string, isMoveForward: boolean) => {
    setTrainDatasets((prev) => {
      const trains = prev.map((prevTrainDataset) => prevTrainDataset.train);
      const idx = trains.indexOf(trainName);
      if (idx === -1) return prev; // TODO: error invalid trainName

      const newTrainDatasets = [...prev];
      newTrainDatasets[idx].isMoveForward = isMoveForward;

      return newTrainDatasets;
    });
  };

  const onRepeatChange = (trainName: string, repeat: number) => {
    setTrainDatasets((prev) => {
      const trains = prev.map((prevTrainDataset) => prevTrainDataset.train);
      const idx = trains.indexOf(trainName);
      if (idx === -1) return prev; // TODO: error invalid trainName

      const newTrainDatasets = [...prev];
      newTrainDatasets[idx].repeat = repeat;

      return newTrainDatasets;
    });
  };

  const onTimeChange = (trainName: string, key: string, time: Date) => {
    setTrainDatasets((prev) => {
      const trains = prev.map((prevTrainDataset) => prevTrainDataset.train);
      const trainIdx = trains.indexOf(trainName);
      if (trainIdx === -1) {
        // TODO: error invalid trainName;
        return prev;
      }
      const prevTrainDataset = prev[trainIdx];

      const keys = prevTrainDataset.data.map((xYKey) => xYKey.key);
      const dataIdx = keys.indexOf(key);
      if (dataIdx === -1) {
        // TODO: error invalid key;
        return prev;
      }

      const diffMS =
        time.getTime() - prevTrainDataset.data[dataIdx].x.getTime();

      if (!prevTrainDataset.isMoveForward || Number.isNaN(diffMS)) {
        const newXYKey = {
          ...prevTrainDataset.data[dataIdx],
          key: key,
          x: time,
        };
        const newData = [...prevTrainDataset.data];
        newData[dataIdx] = newXYKey;

        const newTrainDataset = { ...prevTrainDataset, data: newData };

        const newTrainDatasets = [...prev];
        newTrainDatasets[trainIdx] = newTrainDataset;

        return newTrainDatasets;
      }

      const newData = [...prevTrainDataset.data];
      for (let idx = dataIdx; idx < newData.length; idx++) {
        const prevTime = prevTrainDataset.data[idx].x;
        if (Number.isNaN(prevTime.getTime())) continue;

        prevTime.setMilliseconds(diffMS);
        newData[idx] = {
          x: prevTime,
          y: prevTrainDataset.data[idx].y,
          key: prevTrainDataset.data[idx].key,
          isPass: prevTrainDataset.data[idx].isPass,
        };
      }

      const newTrainDataset = { ...prevTrainDataset, data: newData };

      const newTrainDatasets = [...prev];
      newTrainDatasets[trainIdx] = newTrainDataset;

      return newTrainDatasets;
    });
  };

  const onIsPassChange = (trainName: string, key: string, isPass: boolean) => {
    setTrainDatasets((prev) => {
      const trains = prev.map((prevTrainDataset) => prevTrainDataset.train);
      const trainIdx = trains.indexOf(trainName);
      if (trainIdx === -1) {
        // TODO: error invalid trainName;
        return prev;
      }
      const prevTrainDataset = prev[trainIdx];

      const keys = prevTrainDataset.data.map((xYKey) => xYKey.key);
      const dataIdx = keys.indexOf(key);
      if (dataIdx === -1) {
        // TODO: error invalid key;
        return prev;
      }

      const newXYKey = {
        ...prevTrainDataset.data[dataIdx],
        key: key,
        isPass: isPass,
      };

      const newData = [...prevTrainDataset.data];
      newData[dataIdx] = newXYKey;

      const newTrainDataset = { ...prevTrainDataset, data: newData };

      const newTrainDatasets = [...prev];
      newTrainDatasets[trainIdx] = newTrainDataset;

      return newTrainDatasets;
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
        addTrain={addTrain}
        onIsMoveForwardChange={onIsMoveForwardChange}
        onRepeatChange={onRepeatChange}
        onTimeChange={onTimeChange}
        onIsPassChange={onIsPassChange}
      />

      <ChartSection options={options} data={data} />

      <TimetableSection data={data} />

      <Footer />
    </div>
  );
};

export default App;
