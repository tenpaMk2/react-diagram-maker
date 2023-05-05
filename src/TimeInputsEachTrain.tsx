import { Dispatch, RefObject, useEffect, useRef, useState } from "react";
import { CirclePicker, ColorResult, RGBColor } from "react-color";
import IsMoveForward from "./IsMoveForward";
import { colorToRGBA } from "./lib/Color";
import { Actions } from "./reducer/reducer";
import RepeatInput from "./RepeatInput";
import TimeInput from "./TimeInput";
import TrashButton from "./TrashButton";

export type XYKey = { x: Date; y: string; key: string; isPass: boolean };

export type TrainDataset = {
  train: string;
  data: XYKey[];
  color: RGBColor;
  repeat: number;
  isMoveForward: boolean;
};

const dateToInputValue = (time: Date) =>
  Number.isNaN(time.getTime())
    ? ``
    : `${(`00` + time.getHours()).slice(-2)}:${(`00` + time.getMinutes()).slice(
        -2
      )}`;

const inputValueToDate = (inputValue: string) =>
  new Date(`2022-08-26T${inputValue}:00`);

/**
 * detect outside click
 * @see https://hashnode.com/post/useonclickoutside-custom-hook-to-detect-the-mouse-click-on-outside-typescript-ckrejmy3h0k5r91s18iu42t28
 */
const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current;
      if (!el || el.contains((event?.target as Node) || null)) return;

      handler(event); // Call the handler only if the click is outside of the element passed.
    };

    document.addEventListener(`mousedown`, listener);
    document.addEventListener(`touchstart`, listener);

    return () => {
      document.removeEventListener(`mousedown`, listener);
      document.removeEventListener(`touchstart`, listener);
    };
  }, [ref, handler]); // Reload only if ref or handler changes
};

type Props = {
  trainDataset: TrainDataset;
  dispatch: Dispatch<Actions>;
};

const TimeListEachTrain = ({ trainDataset, dispatch }: Props) => {
  const [hidden, setHidden] = useState<`hidden` | ``>(`hidden`);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setHidden(`hidden`));

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

  const removeTrain = () => {
    dispatch({
      type: `removeTrain`,
      payload: {
        train: trainDataset.train,
      },
    });
  };

  const onChangeComplete = (color: ColorResult) => {
    setHidden(`hidden`);
    dispatch({
      type: `changeColor`,
      payload: { train: trainDataset.train, color: color.rgb },
    });
  };

  return (
    <>
      <div className="flex items-center justify-center gap-4 py-4 text-2xl">
        <h3>{trainDataset.train}</h3>
        <TrashButton onClick={removeTrain} />
      </div>

      {trainDataset.data.length ? (
        <>
          <div className="flex flex-col items-center">
            <button
              onClick={() => setHidden("")}
              className={`h-8 w-8 rounded-full border-4 border-gray-100 shadow-md`}
              style={{ backgroundColor: colorToRGBA(trainDataset.color) }}
            >
              &nbsp;
            </button>
            <div ref={ref} className={`bg-white p-4 shadow-lg ${hidden}`}>
              <CirclePicker
                color={trainDataset.color}
                width="100%"
                colors={[
                  "#f44336",
                  "#e91e63",
                  "#9c27b0",
                  "#673ab7",
                  "#3f51b5",
                  "#2196f3",
                  "#03a9f4",
                  "#00bcd4",
                  "#009688",
                  "#4caf50",
                  "#8bc34a",
                  "#cddc39",
                  "#000000",
                  "#ffc107",
                  "#ff9800",
                  "#ff5722",
                  "#795548",
                  "#607d8b",
                ]}
                onChangeComplete={onChangeComplete}
              />
            </div>
          </div>
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
