import { RGBColor } from "react-color";
import { State } from "../reducer/reducer";

export const jSONToState = (json: string) => {
  try {
    const obj = JSON.parse(json);

    for (const station of obj.stations) {
      if (typeof station !== "string")
        throw new Error("`obj.stations[n]` are not string.");
    }

    for (const trainDataset of obj.trainDatasets) {
      if (typeof trainDataset.train !== "string")
        throw new Error("`obj.trainDatasets[n].train` are not string.");

      for (const xYKey of trainDataset.data) {
        if (typeof xYKey.x !== "string" && xYKey.x !== null)
          throw new Error(
            "`obj.trainDatasets[n].xYKey[n].x` are not (string or null)."
          );
        if (typeof xYKey.y !== "string")
          throw new Error("`obj.trainDatasets[n].xYKey[n].y` are not string.");
        if (typeof xYKey.key !== "string")
          throw new Error(
            "`obj.trainDatasets[n].xYKey[n].key` are not string."
          );
        if (typeof xYKey.isPass !== "boolean")
          throw new Error(
            "`obj.trainDatasets[n].xYKey[n].isPass` are not boolean."
          );
      }

      if (
        typeof trainDataset.color.a !== "number" &&
        trainDataset.color.a !== undefined
      )
        throw new Error(
          "`obj.trainDatasets[n].color.a` are not (number or undefined)."
        );
      if (typeof trainDataset.color.r !== "number")
        throw new Error("`obj.trainDatasets[n].color.r` are not number.");
      if (typeof trainDataset.color.g !== "number")
        throw new Error("`obj.trainDatasets[n].color.g` are not number.");
      if (typeof trainDataset.color.b !== "number")
        throw new Error("`obj.trainDatasets[n].color.b` are not number.");

      if (typeof trainDataset.repeat !== "number")
        throw new Error("`obj.trainDatasets[n].repeat` are not number.");

      if (typeof trainDataset.isMoveForward !== "boolean")
        throw new Error(
          "`obj.trainDatasets[n].isMoveForward` are not boolean."
        );
    }

    const o = obj as {
      stations: string[];
      trainDatasets: {
        train: string;
        data: {
          x: string;
          y: string;
          key: string;
          isPass: boolean;
        }[];
        color: RGBColor;
        repeat: number;
        isMoveForward: boolean;
      }[];
    };

    return {
      ...o,
      trainDatasets: o.trainDatasets.map((trainDataset) => ({
        ...trainDataset,
        data: trainDataset.data.map((xYKey) => ({
          ...xYKey,
          x: new Date(xYKey.x ? xYKey.x : "invalid time"),
        })),
      })),
    } as State;
  } catch (e) {
    alert(e);
    return null;
  }
};
