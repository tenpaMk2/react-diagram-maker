import { ChangeEvent, Dispatch, KeyboardEvent, useState } from "react";
import { Actions } from "./reducer/reducer";
import Station from "./Station";

type Props = {
  stations: string[];
  dispatch: Dispatch<Actions>;
};

const StationSection = ({ stations, dispatch }: Props) => {
  const [text, setText] = useState("");

  return (
    <section className="mx-4 my-8 flex flex-col gap-4">
      <h2 className="text-2xl text-gray-800">駅一覧</h2>

      <input
        type="text"
        value={text}
        placeholder="駅名を入力"
        className="mr-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
        onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key !== "Enter") return;
          if (!text.match(/\S/g)) return;

          dispatch({ type: "addStation", payload: { station: text } });
          setText("");
        }}
      />

      {/* create timeline */}
      <div className="rounded-xl bg-white p-8">
        {stations.map((station, idx) => (
          <Station
            key={station}
            stationName={station}
            isLast={idx === stations.length - 1}
            removeStation={(station: string) =>
              dispatch({ type: "removeStation", payload: { station: station } })
            }
          />
        ))}
      </div>
    </section>
  );
};

export default StationSection;
