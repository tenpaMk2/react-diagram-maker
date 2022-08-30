import { useEffect, useState } from "react";
import IsMoveForward from "./IsMoveForward";
import RepeatInput from "./RepeatInput";
import TimeInput from "./TimeInput";

export type XYKey = { x: string; y: string; key: string; value: string };

export type TrainDataset = {
  label: string;
  data: XYKey[];
  borderColor: string; // ex: "rgba(255, 99, 132, 1)"
  backgroundColor: string; // ex: "rgba(255, 99, 132, 0.5)",
  repeat: number;
  isMoveForward: boolean;
};

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

type Props = {
  train: string;
  timetableStations: string[];
  inputKeys: string[];
  colorIdx: number;
  onDatasetChange: (newDataset: TrainDataset) => void;
};

const TimeListEachTrain = ({
  train,
  timetableStations,
  inputKeys,
  colorIdx,
  onDatasetChange,
}: Props) => {
  const [trainDataset, setTrainDataset] = useState<TrainDataset>({
    label: train,
    data: [],
    borderColor: colors[colorIdx].borderColor,
    backgroundColor: colors[colorIdx].backgroundColor,
    repeat: 1,
    isMoveForward: false,
  });

  useEffect(() => {
    onDatasetChange(trainDataset);
  }, [trainDataset]);

  useEffect(() => {
    setTrainDataset((prev) => {
      const prevKeys = prev.data.map((xYKey) => xYKey.key);

      if (JSON.stringify(prevKeys) === JSON.stringify(inputKeys)) {
        return prev;
      }

      const blankXYKeys: XYKey[] = inputKeys.map((key, idx) => ({
        x: "",
        y: timetableStations[idx],
        key: key,
        value: "",
      }));

      const newData = blankXYKeys.map((blankXYKey) => {
        const searchResult = prev.data.filter(
          (xykey) => xykey.key === blankXYKey.key
        );
        return searchResult.length === 1 ? searchResult[0] : blankXYKey;
      });

      return { ...prev, data: newData };
    });
  }, [inputKeys]);

  const onTimeChange = (
    time: string,
    dataIdx: number,
    station: string,
    key: string
  ) => {
    setTrainDataset((prev) => {
      const date = new Date(`2022-08-26T${time}:00`);
      if (Number.isNaN(date.getTime())) {
        return prev;
      }

      const prevDate = new Date(prev.data[dataIdx].x);
      if (Number.isNaN(prevDate.getTime())) {
        const newData = [...prev.data];
        newData[dataIdx] = {
          x: date.toISOString(),
          y: station,
          key: key,
          value: time,
        };
        return {
          ...prev,
          data: newData,
        };
      }

      if (!prev.isMoveForward) {
        const newData = [...prev.data];

        newData[dataIdx] = {
          x: date.toISOString(),
          y: prev.data[dataIdx].y,
          key: prev.data[dataIdx].key,
          value: `${("00" + date.getHours()).slice(-2)}:${(
            "00" + date.getMinutes()
          ).slice(-2)}`,
        };

        return { ...prev, data: newData };
      }

      const newData = [...prev.data];
      const diffMS = date.getTime() - prevDate.getTime();
      for (let idx = dataIdx; idx < prev.data.length; idx++) {
        const date = new Date(prev.data[idx].x);
        if (Number.isNaN(date.getTime())) continue;

        date.setMilliseconds(diffMS);
        newData[idx] = {
          x: date.toISOString(),
          y: prev.data[idx].y,
          key: prev.data[idx].key,
          value: `${("00" + date.getHours()).slice(-2)}:${(
            "00" + date.getMinutes()
          ).slice(-2)}`,
        };
      }

      return { ...prev, data: newData };
    });
  };

  const onRepeatChange = (repeat: number) => {
    setTrainDataset((prev) => ({ ...prev, repeat: repeat }));
  };

  const onIsMoveForwardChange = (isMoveForward: boolean) => {
    setTrainDataset((prev) => ({ ...prev, isMoveForward: isMoveForward }));
  };

  const getValueByKey = (key: string) => {
    const filtered = trainDataset.data.filter((xYKey) => xYKey.key === key);
    return filtered.length === 1 ? filtered[0].value : "";
  };

  return (
    <>
      <h3 className="text-center text-xl">{train}</h3>

      {timetableStations.length ? (
        <>
          <IsMoveForward onIsMoveForwardChange={onIsMoveForwardChange} />
          <RepeatInput onRepeatChange={onRepeatChange} />
        </>
      ) : (
        <>
          <div></div>
          <div></div>
        </>
      )}

      {inputKeys.map((key, idx) => (
        <TimeInput
          key={key}
          value={getValueByKey(key)}
          onTimeChange={(time: string) => {
            onTimeChange(time, idx, timetableStations[idx], key);
          }}
        />
      ))}
    </>
  );
};

export default TimeListEachTrain;
