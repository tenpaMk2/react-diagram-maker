type Props = { timeInputsStations: string[] };

const TimeInputsStationsAndOthers = ({ timeInputsStations }: Props) => (
  <>
    {timeInputsStations.length ? (
      <>
        <div className="text-right"></div>
        <div className="pb-4 text-right">連動繰り上げ</div>
        <div className="pb-4 text-right">繰り返し回数</div>
      </>
    ) : null}
    {timeInputsStations.map((key) => (
      <div key={key} className="text-right even:pb-8">
        {key}
      </div>
    ))}
  </>
);

export default TimeInputsStationsAndOthers;
