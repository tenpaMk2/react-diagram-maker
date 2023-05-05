import { Dispatch } from "react";
import { Actions, State } from "./reducer/reducer";
import TextInput from "./TextInput";
import TimeListEachTrain from "./TimeInputsEachTrain";
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
  state: State;
  dispatch: Dispatch<Actions>;
};

const TimeInputsSection = ({ state, dispatch }: Props) => {
  const timeInputsLabels = stationsToTimeInputsLabels(state.stations);

  const gridTemplateRowsStyle = {
    gridTemplateRows: `repeat(${
      timeInputsLabels.length + 4
    }, minmax(min-content, max-content)`,
    gridTemplateColumns: "max-content",
  };

  return (
    <section className="mx-4 my-8 flex auto-cols-min flex-col gap-4">
      <h2 className="text-2xl">時刻入力</h2>

      <TextInput
        placeholder="電車名を入力"
        onEnterPress={(text: string) => {
          const filtered = state.trainDatasets.filter(
            (trainDataset) => trainDataset.train === text
          );
          if (0 < filtered.length) {
            alert(`列車名が重複しています。`);
            return;
          }
          dispatch({
            type: `addTrain`,
            payload: { train: text },
          });
        }}
      />

      <div
        className={`grid grid-flow-col items-baseline gap-x-4 overflow-scroll rounded-xl bg-white py-4 pr-4`}
        style={gridTemplateRowsStyle}
      >
        <TimeInputsStationsAndOthers timeInputsStations={timeInputsLabels} />

        {state.trainDatasets.map((trainDataset) => (
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
