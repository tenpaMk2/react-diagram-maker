import { colorToRGBA } from "./lib/Color";
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
  const departureStations = xYKeysOnlyDeparture
    .map((xYKey) => xYKey.key)
    .slice(0, -1); // skip last because the up and first station is invalid.

  const validTrainDatasets = trainDatasets.filter(
    (trainDataset) => trainDataset.data.length !== 0
  );

  type FlattenedData = {
    key: string;
    date: Date;
    color: string;
    train: string;
  };
  const flattenedDatas = ([] as FlattenedData[]).concat(
    ...validTrainDatasets.map((trainDataset) => {
      const candidateIntervalMS =
        trainDataset.data[trainDataset.data.length - 1].x.getTime() -
        trainDataset.data[0].x.getTime();

      const intervalMS = Number.isNaN(candidateIntervalMS)
        ? 0
        : candidateIntervalMS;
      const repeat = intervalMS ? trainDataset.repeat : 1;

      return ([] as FlattenedData[]).concat(
        ...trainDataset.data.map((xYKey) =>
          [...Array(repeat).keys()].map((i) => {
            const newDate = new Date(xYKey.x);
            newDate.setMilliseconds(intervalMS * i);

            return {
              key: xYKey.key,
              date: newDate,
              color: colorToRGBA(trainDataset.color),
              train: trainDataset.train,
            };
          })
        )
      );
    })
  );

  const timetables = departureStations.map((departureStation) => {
    const eachDepartureDatas = flattenedDatas
      .filter((baseData) => baseData.key === departureStation)
      .map((data) => ({
        color: data.color,
        date: data.date,
        train: data.train,
      }));

    const hourAndMinutes = [...Array(24).keys()].map((hour) => {
      type MinuteAndColors = { minute: number; color: string };
      const hourDatas = eachDepartureDatas.filter(
        (data) => data.date.getHours() === hour
      );

      const minuteAndColors = hourDatas.map((hourData) => ({
        minute: hourData.date.getMinutes(),
        color: hourData.color,
        train: hourData.train,
      }));
      minuteAndColors.sort(
        (a: MinuteAndColors, b: MinuteAndColors) => a.minute - b.minute
      );

      return [
        <div
          key={`time:${hour}`}
          className="flex items-center justify-center border bg-blue-700 p-2 text-white"
        >
          <time>{hour}</time>
        </div>,
        <div
          key={`div:${hour}`}
          className={`flex border text-2xl ${
            hour % 2 ? "bg-white" : "bg-blue-100"
          }`}
        >
          {minuteAndColors.map((minuteAndColor) => (
            <p
              key={`${minuteAndColor.train}${minuteAndColor.minute}`}
              className={"p-2 font-bold"}
              style={{ color: minuteAndColor.color }}
            >
              {String(minuteAndColor.minute).padStart(2, "0")}
            </p>
          ))}
        </div>,
      ];
    });

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
