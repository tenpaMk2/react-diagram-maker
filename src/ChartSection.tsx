import {
  Chart as ChartJS,
  ChartData,
  ChartDataset,
  ChartOptions,
  TimeScale,
  CategoryScale,
  PointElement,
  LineElement,
  Legend,
  Title,
  SubTitle,
  Tooltip,
} from "chart.js";
import "chartjs-adapter-moment";
import { ChangeEvent, useState } from "react";
import { Scatter } from "react-chartjs-2";
import { colorToRGBA, colorToBackgroundRGBA } from "./lib/Color";
import { State } from "./reducer/reducer";
import { TrainDataset } from "./TimeInputsEachTrain";

ChartJS.register(
  TimeScale,
  CategoryScale,
  PointElement,
  LineElement,
  Legend,
  Title,
  SubTitle,
  Tooltip
);

const trainDatasetsToChartDatasets = (
  trainDatasets: TrainDataset[]
): ChartDataset<`scatter`>[] =>
  trainDatasets.map((trainDataset): ChartDataset<`scatter`> => {
    if (trainDataset.data.length === 0)
      return {
        label: trainDataset.train,
        data: [],
        borderColor: colorToRGBA(trainDataset.color),
        backgroundColor: colorToBackgroundRGBA(trainDataset.color),
      };

    const notPassXYKeys = trainDataset.data.filter((xYKey) => !xYKey.isPass);

    type XY = { x: Date; y: string };
    const data: XY[] = notPassXYKeys.map((xYKey) => {
      return { x: new Date(xYKey.x), y: xYKey.y };
    });

    const startTimeMS = data[0].x.getTime();
    if (Number.isNaN(startTimeMS))
      return {
        label: trainDataset.train, // @ts-ignore
        data: data,
        borderColor: colorToRGBA(trainDataset.color),
        backgroundColor: colorToBackgroundRGBA(trainDataset.color),
      };

    const endTimeMS = data[data.length - 1].x.getTime();
    if (Number.isNaN(endTimeMS))
      return {
        label: trainDataset.train, // @ts-ignore
        data: data,
        borderColor: colorToRGBA(trainDataset.color),
        backgroundColor: colorToBackgroundRGBA(trainDataset.color),
      };

    const intervalMS = endTimeMS - startTimeMS;

    let repeatedData: XY[] = [];
    for (let i = 0; i < trainDataset.repeat; i++) {
      repeatedData.push(
        ...data.map((xY) => {
          const newX = new Date(xY.x);
          newX.setMilliseconds(intervalMS * i);

          return {
            x: newX,
            y: xY.y,
          };
        })
      );
    }

    return {
      label: trainDataset.train, // @ts-ignore
      data: repeatedData,
      borderColor: colorToRGBA(trainDataset.color),
      backgroundColor: colorToBackgroundRGBA(trainDataset.color),
    };
  });

type Props = { state: State };

const ChartSection = ({ state }: Props) => {
  const [height, setHeight] = useState<number>(50);

  const options: ChartOptions<`scatter`> = {
    scales: {
      x: {
        type: `time`,
        time: {
          unit: `hour`,
          displayFormats: {
            hour: `HH:mm`,
          },
        },
        ticks: {
          stepSize: 1,
        },
      },
      y: {
        type: `category`,
        labels: state.stations,
      },
    },
    showLine: true,
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
  };

  const data: ChartData<`scatter`> = {
    datasets: trainDatasetsToChartDatasets(state.trainDatasets),
  };

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
          plugins={[
            {
              id: "custom_canvas_background_color",
              beforeDraw: (chart: any) => {
                const { ctx } = chart;
                ctx.save();
                ctx.globalCompositeOperation = "destination-over";
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, chart.width, chart.height);
                ctx.restore();
              },
            },
          ]}
          className="rounded-xl"
        />
      </div>
    </section>
  );
};

export default ChartSection;
