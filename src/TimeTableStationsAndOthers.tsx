type Props = { timetableStations: string[] };

const TimeTableStationsAndOthers = ({ timetableStations }: Props) => (
  <>
    {timetableStations.length ? (
      <>
        <div className="text-right"></div>
        <div className="pb-4 text-right">連動繰り上げ</div>
        <div className="pb-4 text-right">繰り返し回数</div>
      </>
    ) : null}
    {timetableStations.map((key) => (
      <div key={key} className="text-right odd:pb-8">
        {key}
      </div>
    ))}
  </>
);

export default TimeTableStationsAndOthers;
