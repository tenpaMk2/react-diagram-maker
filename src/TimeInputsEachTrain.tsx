import { Dispatch } from "react";
import IsMoveForward from "./IsMoveForward";
import { Actions } from "./reducer/reducer";
import RepeatInput from "./RepeatInput";
import TimeInput from "./TimeInput";

export type XYKey = { x: Date; y: string; key: string; isPass: boolean };

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
  trainDataset: TrainDataset;
  dispatch: Dispatch<Actions>;
};

const TimeListEachTrain = ({ trainDataset, dispatch }: Props) => {
  const onRepeatChange = (repeat: number) => {
    dispatch({
      type: "changeRepeat",
      payload: { train: trainDataset.train, repeat: repeat },
    });
  };

  const onIsMoveForwardChange = (isMoveForward: boolean) => {
    dispatch({
      type: "changeIsMoveForward",
      payload: { train: trainDataset.train, isMoveForward: isMoveForward },
    });
  };

  const onTimeChange = (key: string, inputValue: string) => {
    dispatch({
      type: "changeTime",
      payload: {
        train: trainDataset.train,
        key: key,
        time: inputValueToDate(inputValue),
      },
    });
  };

  const onIsPassChange = (key: string, isPass: boolean) => {
    dispatch({
      type: "changeIsPass",
      payload: {
        train: trainDataset.train,
        key: key,
        isPass: isPass,
      },
    });
  };

  return (
    <>
      <h3 className="text-center text-xl">{trainDataset.train}</h3>

      {trainDataset.data.length ? (
        <>
          <IsMoveForward onIsMoveForwardChange={onIsMoveForwardChange} />
          <RepeatInput
            value={trainDataset.repeat}
            onRepeatChange={onRepeatChange}
          />
        </>
      ) : (
        <>
          <div></div>
          <div></div>
        </>
      )}

      {trainDataset.data.map((xYKey) => (
        <TimeInput
          key={xYKey.key}
          value={dateToInputValue(xYKey.x)}
          isPass={xYKey.isPass}
          onTimeChange={(inputValue: string) => {
            onTimeChange(xYKey.key, inputValue);
          }}
          onIsPassChange={(isPass: boolean) =>
            onIsPassChange(xYKey.key, isPass)
          }
        />
      ))}
    </>
  );
};

export default TimeListEachTrain;
