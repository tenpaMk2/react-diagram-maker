import { Dispatch } from "react";
import { Actions } from "./reducer/reducer";
import { Station } from "./Station";
import { TextInput } from "./TextInput";

type Props = {
  stations: string[];
  dispatch: Dispatch<Actions>;
};

export const StationSection = ({ stations, dispatch }: Props) => (
  <section className="flex flex-col gap-4">
    <h2 className="text-2xl text-gray-800">駅</h2>

    <TextInput
      placeholder="駅名を入力"
      onEnterPress={(text: string) => {
        if (stations.includes(text)) {
          alert(`駅名が重複しています`);
          return;
        }
        dispatch({ type: `addStation`, payload: { station: text } });
      }}
    />

    {/* create timeline */}
    <div className="rounded-xl bg-white p-8">
      <div className="grid w-fit grid-cols-[min-content_repeat(1,minmax(0,_1fr))_max-content] items-center gap-x-4">
        {stations.map((station, idx) => (
          <Station
            key={station}
            stationName={station}
            isFirst={idx === 0}
            isLast={idx === stations.length - 1}
            removeStation={(station: string) =>
              dispatch({
                type: `removeStation`,
                payload: { station: station },
              })
            }
          />
        ))}
      </div>
    </div>
  </section>
);
