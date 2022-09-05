import { colorToRGBA } from "./lib/Color";
import { TrainDataset } from "./TimeInputsEachTrain";

type Props = {
  stations: string[];
  trainDatasets: TrainDataset[];
};

const RouteMapSection = ({ stations, trainDatasets }: Props) => {
  const eachTrainDatas = trainDatasets.map((trainDataset) => {
    const isPasses = stations.map((station) => {
      const notPasses = trainDataset.data.filter(
        (d) => d.y === station && !d.isPass
      );
      return notPasses.length === 0;
    });

    return {
      train: trainDataset.train,
      color: trainDataset.color,
      stationData: isPasses.map((isPass, idx) => ({
        station: stations[idx],
        isPass: isPass,
      })),
    };
  });

  return (
    <section className="mx-4 my-8 flex flex-col gap-2">
      <h2 className="text-2xl">路線図</h2>

      <section
        className="grid overflow-scroll rounded-xl bg-white p-8"
        style={{
          gridTemplateColumns: `repeat(${stations.length},1fr) max-content`,
        }}
      >
        {eachTrainDatas.map((trainData) => (
          <>
            {trainData.stationData.map((d) => (
              <div
                key={`${trainData.train}${d.station}`}
                className="flex items-center"
              >
                <div
                  className="grow p-1"
                  style={{ backgroundColor: colorToRGBA(trainData.color) }}
                >
                  <div
                    className={`m-auto h-4 w-4 rounded-full ${
                      d.isPass ? "" : "bg-white"
                    }`}
                  ></div>
                </div>
              </div>
            ))}
            <div key={trainData.train} className="p-2 text-xl">
              {trainData.train}
            </div>
          </>
        ))}

        {stations.map((station) => (
          <div key={station} className="flex justify-center text-xl">
            <div style={{ writingMode: "vertical-rl" }}>{station}</div>
          </div>
        ))}
        <div></div>
      </section>
    </section>
  );
};

export default RouteMapSection;
