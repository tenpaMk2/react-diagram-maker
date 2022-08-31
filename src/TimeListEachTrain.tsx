import IsMoveForward from "./IsMoveForward";
import RepeatInput from "./RepeatInput";
import TimeInput from "./TimeInput";
import { stationsToTimetableLabels } from "./TimeSection";

export type XYKey = { x: Date; y: string; key: string };

export type TrainDataset = {
  train: string;
  data: XYKey[];
  borderColor: string; // ex: "rgba(255, 99, 132, 1)"
  backgroundColor: string; // ex: "rgba(255, 99, 132, 0.5)",
  repeat: number;
  isMoveForward: boolean;
};

const dateToInputValue = (time: Date) =>
  Number.isNaN(time.getTime())
    ? ""
    : `${("00" + time.getHours()).slice(-2)}:${("00" + time.getMinutes()).slice(
        -2
      )}`;

const inputValueToDate = (inputValue: string) =>
  new Date(`2022-08-26T${inputValue}:00`);

type Props = {
  stations: string[];
  trainDataset: TrainDataset;
  onIsMoveForwardChange: (trainName: string, isMoveForward: boolean) => void;
  onRepeatChange: (trainName: string, repeat: number) => void;
  onTimeChange: (trainName: string, key: string, time: Date) => void;
};

const TimeListEachTrain = ({
  stations,
  trainDataset,
  onIsMoveForwardChange,
  onRepeatChange,
  onTimeChange,
}: Props) => {
  return (
    <>
      <h3 className="text-center text-xl">{trainDataset.train}</h3>

      {stations.length ? (
        <>
          <IsMoveForward
            onIsMoveForwardChange={(is: boolean) =>
              onIsMoveForwardChange(trainDataset.train, is)
            }
          />
          <RepeatInput
            onRepeatChange={(repeat: number) =>
              onRepeatChange(trainDataset.train, repeat)
            }
          />
        </>
      ) : (
        <>
          <div></div>
          <div></div>
        </>
      )}

      {stationsToTimetableLabels(stations).map((label, idx) => {
        console.log(label);
        return (
          <TimeInput
            key={label}
            value={dateToInputValue(trainDataset.data[idx].x)}
            onTimeChange={(time: string) => {
              onTimeChange(
                trainDataset.train,
                trainDataset.data[idx].key,
                inputValueToDate(time)
              );
            }}
          />
        );
      })}
    </>
  );
};

export default TimeListEachTrain;
