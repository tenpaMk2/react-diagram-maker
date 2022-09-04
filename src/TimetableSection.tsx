import { ReactNode } from "react";
import { TrainDataset, XYKey } from "./TimeInputsEachTrain";

const extrudeXYKeysOnlyDeparture = (xYKeys: XYKey[]) =>
  xYKeys.filter((xYKey) => xYKey.key.match(/発$/g));

type Props = {
  trainDatasets: TrainDataset[];
};

const TimetableSection = ({ trainDatasets }: Props) => {
  const xYKeysOnlyDeparture =
    trainDatasets.length === 0
      ? []
      : extrudeXYKeysOnlyDeparture(trainDatasets[0].data);
  const departureStations = xYKeysOnlyDeparture.map((xYKey) => xYKey.key);

  const baseDatas: {
    key: string;
    date: Date;
    color: string;
    repeat: number;
  }[] = [];
  trainDatasets.forEach((trainDataset) => {
    const intervalMS =
      trainDataset.data[trainDataset.data.length - 1].x.getTime() -
      trainDataset.data[0].x.getTime();

    const repeat = Number.isNaN(intervalMS) ? 1 : trainDataset.repeat;

    trainDataset.data.forEach((xYKey, idx) => {
      for (let i = 0; i < repeat; i++) {
        const newDate = new Date(xYKey.x);
        newDate.setMilliseconds(intervalMS * i);

        if (idx === trainDataset.data.length - 1 && i === repeat - 1) {
          // skip last time
          continue;
        }

        baseDatas.push({
          key: xYKey.key,
          date: newDate,
          color: trainDataset.borderColor,
          repeat: trainDataset.repeat,
        });
      }
    });
  });

  const timetables = departureStations.map((departureStation) => {
    const eachDepartureDatas = baseDatas
      .filter((baseData) => baseData.key === departureStation)
      .map((data) => ({
        color: data.color,
        date: data.date,
        repeat: data.repeat,
      }));

    const hourAndMinutes: ReactNode[][] = [];
    for (let hour = 0; hour < 24; hour++) {
      const minuteAndColors: { minute: number; color: string }[] = [];
      const hourDatas = eachDepartureDatas.filter(
        (data) => data.date.getHours() === hour
      );

      hourDatas.forEach((hourData) => {
        minuteAndColors.push({
          minute: hourData.date.getMinutes(),
          color: hourData.color,
        });
      });

      hourAndMinutes[hour] = [
        <div className="flex items-center justify-center border bg-blue-700 p-2 text-white">
          <time key={`time:${hour}`}>{hour}</time>
        </div>,
        <div
          key={`div:${hour}`}
          className={`flex border text-2xl ${
            hour % 2 ? "bg-white" : "bg-blue-100"
          }`}
        >
          {minuteAndColors.map((minuteAndColor) => (
            <p
              key={`${minuteAndColor.minute}${minuteAndColor.color}`}
              className={"p-2 font-bold"}
              style={{ color: minuteAndColor.color }}
            >
              {String(minuteAndColor.minute).padStart(2, "0")}
            </p>
          ))}
        </div>,
      ];
    }

    return (
      <section
        key={departureStation}
        className="grid grid-cols-[min-content_max-content] text-center text-xl"
      >
        <h3 className="col-span-2 border bg-blue-700 py-2 px-4 text-center text-2xl text-white">
          {departureStation}
        </h3>
        {hourAndMinutes}
      </section>
    );
  });

  return (
    <section className="mx-4 my-8 flex flex-col gap-2">
      <h2 className="text-2xl">時刻表</h2>
      <section className="flex flex-wrap justify-around gap-8 rounded-xl bg-white p-8">
        {timetables}
      </section>
    </section>
  );
};

export default TimetableSection;
