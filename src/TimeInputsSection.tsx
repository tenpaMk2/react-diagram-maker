import { ChangeEvent, KeyboardEvent, useState } from "react";
import TimeListEachTrain, { TrainDataset } from "./TimeInputsEachTrain";
import TimeInputsStationsAndOthers from "./TimeInputsStationsAndOthers";

export const stationsToDownAndUpStations = (stations: string[]): string[] => {
  const downAndUpSingle = [...stations, ...stations.slice(0, -1).reverse()];
  let double: string[] = [];
  downAndUpSingle.forEach((station) => double.push(station, station));
  double.shift();
  return double;
};

export const stationsToTimeInputsLabels = (stations: string[]): string[] => {
  let timeInputsLabels: string[] = [];
  stations.forEach((station, idx) => {
    if (idx !== 0) {
      timeInputsLabels.push(`↓${station}:着`);
    }
    if (idx !== stations.length - 1) {
      timeInputsLabels.push(`↓${station}:発`);
    }
  });
  [...stations].reverse().forEach((station, idx) => {
    if (idx !== 0) {
      timeInputsLabels.push(`↑${station}:着`);
    }
    timeInputsLabels.push(`↑${station}:発`);
  });

  return timeInputsLabels;
};

type Props = {
  stations: string[];
  trainDatasets: TrainDataset[];
  addTrain: (trainName: string) => void;
  onIsMoveForwardChange: (trainName: string, isMoveForward: boolean) => void;
  onRepeatChange: (trainName: string, repeat: number) => void;
  onTimeChange: (trainName: string, key: string, time: Date) => void;
};

const TimeInputsSection = ({
  stations,
  trainDatasets,
  addTrain,
  onIsMoveForwardChange,
  onRepeatChange,
  onTimeChange,
}: Props) => {
  const [trainText, setTrainText] = useState<string>("");

  const timeInputsLabels = stationsToTimeInputsLabels(stations);

  const tempStyleForBug = {
    gridTemplateRows: `repeat(${
      timeInputsLabels.length + 3
    }, minmax(min-content, max-content)`,
  };

  return (
    <section className="mx-4 my-8 flex auto-cols-min flex-col gap-4">
      <h2 className="text-2xl">時刻入力</h2>

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

          addTrain(trainText);
          setTrainText("");
        }}
      />

      <div
        className={`grid grid-flow-col auto-rows-min items-baseline gap-x-4 gap-y-2 rounded-xl bg-white p-4`}
        style={tempStyleForBug}
      >
        <TimeInputsStationsAndOthers timeInputsStations={timeInputsLabels} />

        {trainDatasets.map((trainDataset) => (
          <TimeListEachTrain
            key={trainDataset.train}
            trainDataset={trainDataset}
            onIsMoveForwardChange={onIsMoveForwardChange}
            onRepeatChange={onRepeatChange}
            onTimeChange={onTimeChange}
          />
        ))}
      </div>
    </section>
  );
};

export default TimeInputsSection;
