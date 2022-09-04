type Props = { timeInputsStations: string[] };

const TimeInputsStationsAndOthers = ({ timeInputsStations }: Props) => (
  <>
    {timeInputsStations.length ? (
      <>
        <div className="self-strech sticky left-0 border-r-2 bg-white px-2 text-right"></div>
        <div className="self-strech sticky left-0 border-r-2 bg-white px-2 pb-4 text-right">
          連動繰り上げ
        </div>
        <div className="self-strech sticky left-0 border-r-2 bg-white px-2 pb-4 text-right">
          繰り返し回数
        </div>
      </>
    ) : null}
    {timeInputsStations.map((key) => (
      <div
        key={key}
        className="self-strech sticky left-0 border-r-2 bg-white px-2 text-right even:pb-8"
      >
        {key}
      </div>
    ))}
  </>
);

export default TimeInputsStationsAndOthers;
