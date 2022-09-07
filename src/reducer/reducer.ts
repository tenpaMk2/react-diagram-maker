import { RGBColor } from "react-color";
import { TrainDataset, XYKey } from "../TimeInputsEachTrain";
import {
  stationsToDownAndUpStations,
  stationsToTimeInputsLabels,
} from "../TimeInputsSection";

export type State = {
  stations: string[];
  trainDatasets: TrainDataset[];
};

export type Actions =
  | { type: "addStation"; payload: { station: string } }
  | { type: "removeStation"; payload: { station: string } }
  | { type: "addTrain"; payload: { train: string } }
  | { type: "removeTrain"; payload: { train: string } }
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
    }
  | {
      type: "changeColor";
      payload: { train: string; color: RGBColor };
    }
  | {
      type: "changeFullState";
      payload: { state: State };
    };

const changeStations = (
  prevTrainDatasets: TrainDataset[],
  newStations: string[]
) => {
  const downAndUpStations = stationsToDownAndUpStations(newStations);
  const timeInputsLabels = stationsToTimeInputsLabels(newStations);

  return prevTrainDatasets.map((prevTrainDataset) => {
    const prevTimeInputsLabels = prevTrainDataset.data.map(
      (xYKey) => xYKey.key
    );

    if (
      JSON.stringify(prevTimeInputsLabels) === JSON.stringify(timeInputsLabels)
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
};

export const reducer = (prevState: State, action: Actions): State => {
  switch (action.type) {
    case "addStation": {
      if (prevState.stations.includes(action.payload.station)) {
        return prevState;
      }

      const newStations = [...prevState.stations, action.payload.station];
      const newTrainDatasets = changeStations(
        prevState.trainDatasets,
        newStations
      );

      return {
        stations: newStations,
        trainDatasets: newTrainDatasets,
      };
    }

    case "removeStation": {
      const newStations = prevState.stations.filter(
        (station) => station !== action.payload.station
      );
      const newTrainDatasets = changeStations(
        prevState.trainDatasets,
        newStations
      );

      return {
        stations: newStations,
        trainDatasets: newTrainDatasets,
      };
    }

    case "addTrain": {
      const filtered = prevState.trainDatasets.filter(
        (prevTrainDataset) => prevTrainDataset.train === action.payload.train
      );
      if (0 < filtered.length) return prevState;

      const downAndUpStations = stationsToDownAndUpStations(prevState.stations);
      const timeInputsLabels = stationsToTimeInputsLabels(prevState.stations);

      const initialTrainDataset: TrainDataset = {
        train: action.payload.train,
        data: timeInputsLabels.map((timeInputslabel, idx) => ({
          x: new Date("invalid"),
          y: downAndUpStations[idx],
          key: timeInputslabel,
          isPass: false,
        })),
        color: { r: 0, g: 0, b: 0, a: 1 },
        repeat: 1,
        isMoveForward: false,
      };

      return {
        ...prevState,
        trainDatasets: [...prevState.trainDatasets, initialTrainDataset],
      };
    }

    case "removeTrain": {
      return {
        ...prevState,
        trainDatasets: prevState.trainDatasets.filter(
          (prevTrainDataset) => prevTrainDataset.train !== action.payload.train
        ),
      };
    }

    case "changeIsMoveForward": {
      const prevTrainDatasets = prevState.trainDatasets;
      const trains = prevTrainDatasets.map(
        (prevTrainDataset) => prevTrainDataset.train
      );
      const idx = trains.indexOf(action.payload.train);
      if (idx === -1) return prevState; // TODO: error invalid trainName

      const newTrainDatasets = [...prevTrainDatasets];
      newTrainDatasets[idx].isMoveForward = action.payload.isMoveForward;

      return {
        ...prevState,
        trainDatasets: newTrainDatasets,
      };
    }

    case "changeRepeat": {
      const prevTrainDatasets = prevState.trainDatasets;
      const trains = prevTrainDatasets.map(
        (prevTrainDataset) => prevTrainDataset.train
      );
      const idx = trains.indexOf(action.payload.train);
      if (idx === -1) return prevState; // TODO: error invalid trainName

      const newTrainDatasets = [...prevTrainDatasets];
      newTrainDatasets[idx].repeat = action.payload.repeat;

      return {
        ...prevState,
        trainDatasets: newTrainDatasets,
      };
    }

    case "changeTime": {
      const prevTrainDatasets = prevState.trainDatasets;
      const trains = prevTrainDatasets.map(
        (prevTrainDataset) => prevTrainDataset.train
      );
      const trainIdx = trains.indexOf(action.payload.train);
      if (trainIdx === -1) {
        // TODO: error invalid trainName;
        return prevState;
      }
      const prevTrainDataset = prevTrainDatasets[trainIdx];

      const keys = prevTrainDataset.data.map((xYKey) => xYKey.key);
      const dataIdx = keys.indexOf(action.payload.key);
      if (dataIdx === -1) {
        // TODO: error invalid key;
        return prevState;
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

        return {
          ...prevState,
          trainDatasets: newTrainDatasets,
        };
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

      return {
        ...prevState,
        trainDatasets: newTrainDatasets,
      };
    }

    case "changeIsPass": {
      const prevTrainDatasets = prevState.trainDatasets;
      const trains = prevTrainDatasets.map(
        (prevTrainDataset) => prevTrainDataset.train
      );
      const trainIdx = trains.indexOf(action.payload.train);
      if (trainIdx === -1) {
        // TODO: error invalid trainName;
        return prevState;
      }
      const prevTrainDataset = prevTrainDatasets[trainIdx];

      const keys = prevTrainDataset.data.map((xYKey) => xYKey.key);
      const dataIdx = keys.indexOf(action.payload.key);
      if (dataIdx === -1) {
        // TODO: error invalid key;
        return prevState;
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

      return {
        ...prevState,
        trainDatasets: newTrainDatasets,
      };
    }

    case "changeColor": {
      const prevTrainDatasets = prevState.trainDatasets;
      const trains = prevTrainDatasets.map(
        (prevTrainDataset) => prevTrainDataset.train
      );
      const trainIdx = trains.indexOf(action.payload.train);
      if (trainIdx === -1) {
        // TODO: error invalid trainName;
        return prevState;
      }
      const prevTrainDataset = prevTrainDatasets[trainIdx];

      const newTrainDataset = {
        ...prevTrainDataset,
        color: action.payload.color,
      };

      const newTrainDatasets = [...prevTrainDatasets];
      newTrainDatasets[trainIdx] = newTrainDataset;

      return {
        ...prevState,
        trainDatasets: newTrainDatasets,
      };
    }

    case "changeFullState": {
      return action.payload.state;
    }
  }
};
