import { ChartData, ChartOptions } from "chart.js";
import { Scatter } from "react-chartjs-2";

type Props = {
  options: ChartOptions<"scatter">;
  data: ChartData<"scatter">;
};

const ChartSection = ({ options, data }: Props) => {
  return (
    <section className="mx-4 my-8 flex flex-col gap-2">
      <h2 className="text-2xl">ダイヤグラム</h2>
      <Scatter options={options} data={data} className="rounded-xl bg-white" />
    </section>
  );
};

export default ChartSection;
