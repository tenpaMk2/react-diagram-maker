import { ChangeEvent, Dispatch, KeyboardEvent, useState } from "react";
import { Actions } from "./reducer/reducer";
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
  dispatch: Dispatch<Actions>;
};

const TimeInputsSection = ({ stations, trainDatasets, dispatch }: Props) => {
  const [trainText, setTrainText] = useState<string>("");

  const timeInputsLabels = stationsToTimeInputsLabels(stations);

  const gridTemplateRowsStyle = {
    gridTemplateRows: `repeat(${
      timeInputsLabels.length + 4
    }, minmax(min-content, max-content)`,
    gridTemplateColumns: "max-content",
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

          dispatch({
            type: "addTrain",
            payload: { train: trainText, stations: stations },
          });
          setTrainText("");
        }}
      />

      <div
        className={`grid grid-flow-col items-baseline gap-x-4 overflow-scroll rounded-xl bg-white py-4 pr-4`}
        style={gridTemplateRowsStyle}
      >
        <TimeInputsStationsAndOthers timeInputsStations={timeInputsLabels} />

        {trainDatasets.map((trainDataset) => (
          <TimeListEachTrain
            key={trainDataset.train}
            trainDataset={trainDataset}
            dispatch={dispatch}
          />
        ))}
      </div>
    </section>
  );
};

export default TimeInputsSection;
