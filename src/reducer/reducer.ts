import { TrainDataset, XYKey } from "../TimeInputsEachTrain";
import {
  stationsToDownAndUpStations,
  stationsToTimeInputsLabels,
} from "../TimeInputsSection";

const colors = [
  {
    borderColor: "rgba(255,99,132,1)", // Never use space because of tailwind's restriction
    backgroundColor: "rgba(255,99,132,0.5)",
  },
  {
    borderColor: "rgba(255,159,64,1)",
    backgroundColor: "rgba(255,159,64,0.5)",
  },
  {
    borderColor: "rgba(255,205,86,1)",
    backgroundColor: "rgba(255,205,86,0.5)",
  },
  {
    borderColor: "rgba(75,192,192,1)",
    backgroundColor: "rgba(75,192,192,0.5)",
  },
  {
    borderColor: "rgba(54,162,235,1)",
    backgroundColor: "rgba(54,162,235,0.5)",
  },
  {
    borderColor: "rgba(153,102,255,1)",
    backgroundColor: "rgb(153,102,255,0.5)",
  },
  {
    borderColor: "rgba(201,203,207,1)",
    backgroundColor: "rgba(201,203,207,0.5)",
  },
];

export type Actions =
  | { type: "changeStations"; payload: { stations: string[] } }
  | { type: "addTrain"; payload: { train: string; stations: string[] } }
  | { type: "changeRepeat"; payload: { train: string; repeat: number } }
  | {
      type: "changeTime";
      payload: { train: string; key: string; time: Date };
    }
  | {
      type: "changeIsPass";
      payload: { train: string; key: string; isPass: boolean };
    }
  | {
      type: "changeIsMoveForward";
      payload: { train: string; isMoveForward: boolean };
    };

export const reducer = (
  prevTrainDatasets: TrainDataset[],
  action: Actions
): TrainDataset[] => {
  switch (action.type) {
    case "changeStations": {
      const downAndUpStations = stationsToDownAndUpStations(
        action.payload.stations
      );
      const timeInputsLabels = stationsToTimeInputsLabels(
        action.payload.stations
      );

      return prevTrainDatasets.map((prevTrainDataset) => {
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
    }

    case "addTrain": {
      const filtered = prevTrainDatasets.filter(
        (prevTrainDataset) => prevTrainDataset.train === action.payload.train
      );
      if (0 < filtered.length) {
        // TODO: alert existed train name.
        return prevTrainDatasets;
      }

      const downAndUpStations = stationsToDownAndUpStations(
        action.payload.stations
      );
      const timeInputsLabels = stationsToTimeInputsLabels(
        action.payload.stations
      );

      const initialTrainDataset: TrainDataset = {
        train: action.payload.train,
        data: timeInputsLabels.map((timeInputslabel, idx) => ({
          x: new Date("invalid"),
          y: downAndUpStations[idx],
          key: timeInputslabel,
          isPass: false,
        })),
        borderColor:
          colors[prevTrainDatasets.length % colors.length].borderColor, // todo: limit length
        backgroundColor:
          colors[prevTrainDatasets.length % colors.length].backgroundColor,
        repeat: 1,
        isMoveForward: false,
      };

      return [...prevTrainDatasets, initialTrainDataset];
    }

    case "changeIsMoveForward": {
      const trains = prevTrainDatasets.map(
        (prevTrainDataset) => prevTrainDataset.train
      );
      const idx = trains.indexOf(action.payload.train);
      if (idx === -1) return prevTrainDatasets; // TODO: error invalid trainName

      const newTrainDatasets = [...prevTrainDatasets];
      newTrainDatasets[idx].isMoveForward = action.payload.isMoveForward;

      return newTrainDatasets;
    }

    case "changeRepeat": {
      const trains = prevTrainDatasets.map(
        (prevTrainDataset) => prevTrainDataset.train
      );
      const idx = trains.indexOf(action.payload.train);
      if (idx === -1) return prevTrainDatasets; // TODO: error invalid trainName

      const newTrainDatasets = [...prevTrainDatasets];
      newTrainDatasets[idx].repeat = action.payload.repeat;

      return newTrainDatasets;
    }

    case "changeTime": {
      const trains = prevTrainDatasets.map(
        (prevTrainDataset) => prevTrainDataset.train
      );
      const trainIdx = trains.indexOf(action.payload.train);
      if (trainIdx === -1) {
        // TODO: error invalid trainName;
        return prevTrainDatasets;
      }
      const prevTrainDataset = prevTrainDatasets[trainIdx];

      const keys = prevTrainDataset.data.map((xYKey) => xYKey.key);
      const dataIdx = keys.indexOf(action.payload.key);
      if (dataIdx === -1) {
        // TODO: error invalid key;
        return prevTrainDatasets;
      }

      const diffMS =
        action.payload.time.getTime() -
        prevTrainDataset.data[dataIdx].x.getTime();

      if (!prevTrainDataset.isMoveForward || Number.isNaN(diffMS)) {
        const newXYKey = {
          ...prevTrainDataset.data[dataIdx],
          key: action.payload.key,
          x: action.payload.time,
        };
        const newData = [...prevTrainDataset.data];
        newData[dataIdx] = newXYKey;

        const newTrainDataset = { ...prevTrainDataset, data: newData };

        const newTrainDatasets = [...prevTrainDatasets];
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

      const newTrainDatasets = [...prevTrainDatasets];
      newTrainDatasets[trainIdx] = newTrainDataset;

      return newTrainDatasets;
    }

    case "changeIsPass": {
      const trains = prevTrainDatasets.map(
        (prevTrainDataset) => prevTrainDataset.train
      );
      const trainIdx = trains.indexOf(action.payload.train);
      if (trainIdx === -1) {
        // TODO: error invalid trainName;
        return prevTrainDatasets;
      }
      const prevTrainDataset = prevTrainDatasets[trainIdx];

      const keys = prevTrainDataset.data.map((xYKey) => xYKey.key);
      const dataIdx = keys.indexOf(action.payload.key);
      if (dataIdx === -1) {
        // TODO: error invalid key;
        return prevTrainDatasets;
      }

      const newXYKey = {
        ...prevTrainDataset.data[dataIdx],
        key: action.payload.key,
        isPass: action.payload.isPass,
      };

      const newData = [...prevTrainDataset.data];
      newData[dataIdx] = newXYKey;

      const newTrainDataset = { ...prevTrainDataset, data: newData };

      const newTrainDatasets = [...prevTrainDatasets];
      newTrainDatasets[trainIdx] = newTrainDataset;

      return newTrainDatasets;
    }
  }
};
