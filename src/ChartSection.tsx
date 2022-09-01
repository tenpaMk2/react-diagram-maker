import { ChartData, ChartOptions } from "chart.js";
import { ChangeEvent, useState } from "react";
import { Scatter } from "react-chartjs-2";

type Props = {
  options: ChartOptions<"scatter">;
  data: ChartData<"scatter">;
};

const ChartSection = ({ options, data }: Props) => {
  const [height, setHeight] = useState<number>(50);

  return (
    <section className="mx-4 my-8 flex flex-col gap-2">
      <h2 className="text-2xl">ダイヤグラム</h2>
      <div className="my-4 flex flex-row gap-2">
        <p>グラフの高さ:</p>
        <input
          type="range"
          min="1"
          max="100"
          value={height}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setHeight(parseInt(e.target.value))
          }
          className="grow"
        ></input>
      </div>
      <div style={{ height: `${height}vh` }}>
        <Scatter
          options={options}
          data={data}
          className="rounded-xl bg-white"
        />
      </div>
    </section>
  );
};

export default ChartSection;
