import { DownArrow } from "./svg/DownArrow";
import { TrashButton } from "./TrashButton";

type Props = {
  stationName: string;
  isFirst: boolean;
  isLast: boolean;
  removeStation: (staionName: string) => void;
};

const borderStyle = `h-full min-h-[0.5rem] w-px bg-gray-300`;

export const Station = ({
  stationName,
  isFirst,
  isLast,
  removeStation,
}: Props) => (
  <>
    <div className="flex h-full flex-col items-center">
      <div className={`${borderStyle}${isFirst ? ` invisible` : ``}`} />
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border">
        <DownArrow />
      </div>
      <div className={`${borderStyle}${isLast ? ` invisible` : ``}`} />
    </div>
    <div className="text-xl font-bold text-gray-600">{stationName}</div>
    <TrashButton onClick={() => removeStation(stationName)} />
  </>
);
