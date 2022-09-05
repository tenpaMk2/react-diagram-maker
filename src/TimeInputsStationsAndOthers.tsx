type Props = { timeInputsStations: string[] };

const TimeInputsStationsAndOthers = ({ timeInputsStations }: Props) => (
  <>
    {timeInputsStations.length ? (
      <>
        <div className="sticky left-0 h-full border-r-2 bg-white px-2 text-right"></div>
        <div className="sticky left-0 h-full border-r-2 bg-white px-2 text-right">
          色
        </div>
        <div className="sticky left-0 h-full border-r-2 bg-white px-2 text-right">
          連動繰り上げ
        </div>
        <div className="sticky left-0 h-full border-r-2 bg-white px-2 text-right">
          繰り返し回数
        </div>
      </>
    ) : null}
    {timeInputsStations.map((key) => (
      <div
        key={key}
        className="sticky left-0 h-full border-r-2 bg-white px-2 text-right odd:pb-8"
      >
        {key}
      </div>
    ))}
  </>
);

export default TimeInputsStationsAndOthers;
