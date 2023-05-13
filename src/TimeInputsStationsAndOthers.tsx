type Props = { timeInputsStations: string[] };

const wrapperStyle = `sticky left-0 h-full border-r-2 bg-white px-2`;
const innerStyle = `flex h-full items-center justify-end`;

export const TimeInputsStationsAndOthers = ({ timeInputsStations }: Props) => (
  <>
    {timeInputsStations.length ? (
      <>
        <div className={wrapperStyle} />
        <div className={wrapperStyle}>
          <div className={innerStyle}>色</div>
        </div>
        <div className={wrapperStyle}>
          <div className={innerStyle}>連動繰り上げ</div>
        </div>
        <div className={wrapperStyle}>
          <div className={innerStyle}>繰り返し回数</div>
        </div>
      </>
    ) : null}
    {timeInputsStations.map((label) => (
      <div
        key={label}
        className={`${wrapperStyle}${label.endsWith(`着`) ? ` pt-6` : ``}`}
      >
        <div className={innerStyle}>{label}</div>
      </div>
    ))}
  </>
);
