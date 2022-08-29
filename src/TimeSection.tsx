import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import TimeListEachTrain, { TrainDataset } from "./TimeListEachTrain";
import TimeTableStationsAndOthers from "./TimeTableStationsAndOthers";

const createStationsForTimetable = (
  stations: string[]
): [string[], string[]] => {
  const downAndUpSingle = [...stations, ...stations.slice(0, -1).reverse()];
  let double: string[] = [];
  downAndUpSingle.forEach((station) => double.push(station, station));
  double.shift();

  let downAndUpKeys: string[] = [];
  stations.forEach((station, idx) => {
    if (idx !== 0) {
      downAndUpKeys.push(`↓${station}:着`);
    }
    if (idx !== stations.length - 1) {
      downAndUpKeys.push(`↓${station}:発`);
    }
  });
  [...stations].reverse().forEach((station, idx) => {
    if (idx !== 0) {
      downAndUpKeys.push(`↑${station}:着`);
    }
    downAndUpKeys.push(`↑${station}:発`);
  });

  return [double, downAndUpKeys];
};

type Props = {
  stations: string[];
  onTrainDatasetsChange: (newDatasets: TrainDataset[]) => void;
};

const TimeSection = ({
  stations,
  onTrainDatasetsChange: onDatasetsChange,
}: Props) => {
  const [trains, setTrains] = useState<string[]>([]);
  const [trainText, setTrainText] = useState<string>("");
  const [trainDatasets, setTrainDatasets] = useState<TrainDataset[]>([]);

  // initilize `trainDatasets` when `trains` change.
  useEffect(() => {
    setTrainDatasets((prev: TrainDataset[]) => {
      return trains.map((train) => {
        const filtered = prev.filter(
          (trainDataset) => trainDataset.label === train
        );

        if (2 <= filtered.length) throw new Error("Duplicate train names!!");
        if (filtered.length === 1) return filtered[0];

        return {
          label: train,
          data: [],
          borderColor: "",
          backgroundColor: "",
          repeat: 1,
        };
      });
    });
  }, [trains]);

  useEffect(() => {
    onDatasetsChange(trainDatasets);
  }, [trainDatasets]);

  const [timetableStations, timetableLabels] =
    createStationsForTimetable(stations);
  const tempStyleForBug = {
    gridTemplateRows: `repeat(${
      timetableLabels.length + 2
    }, minmax(min-content, max-content)`,
  };

  return (
    <section className="mx-4 my-8 flex auto-cols-min flex-col gap-4">
      <h2 className="text-2xl">時刻表</h2>

      <input
        type="text"
        value={trainText}
        placeholder="電車名を入力"
        className="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTrainText(e.target.value)
        }
        onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key !== "Enter") return;
          if (!trainText.match(/\S/g)) return;

          setTrains((prev) => [...prev, trainText]);
          setTrainText("");
        }}
      />

      <div
        className={`grid grid-flow-col auto-rows-min items-baseline gap-x-4 gap-y-2`}
        style={tempStyleForBug}
      >
        <TimeTableStationsAndOthers timetableStations={timetableLabels} />

        {trains.map((train, idx) => (
          <TimeListEachTrain
            train={train}
            timetableStations={timetableStations}
            inputKeys={timetableLabels}
            colorIdx={idx}
            onDatasetChange={(newDataset: TrainDataset) => {
              const newDatasets = [...trainDatasets];
              newDatasets[idx] = newDataset;
              setTrainDatasets(newDatasets);
            }}
            key={train}
          />
        ))}
      </div>
    </section>
  );
};

export default TimeSection;
