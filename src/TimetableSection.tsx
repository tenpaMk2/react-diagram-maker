import { ChartData } from "chart.js";
import { ReactNode } from "react";

type Props = {
  data: ChartData<"scatter">;
};

const TimetableSection = ({ data }: Props) => {
  const hourAndMinutes: ReactNode[][] = [];

  for (let hour = 0; hour < 24; hour++) {
    hourAndMinutes[hour] = [<time>{hour}</time>, <div>🚧</div>];
  }

  return (
    <section className="mx-4 my-8 flex flex-col gap-2">
      <h2 className="text-2xl">時刻表: 🚧WIP🚧</h2>

      <div
        className={`grid grid-cols-2 items-baseline gap-x-4 gap-y-2 rounded-xl bg-white p-4`}
      >
        {hourAndMinutes}
      </div>
    </section>
  );
};

export default TimetableSection;
