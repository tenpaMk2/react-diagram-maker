import DownArrow from "./svg/DownArrow";
import TrashButton from "./TrashButton";

type Props = {
  stationName: string;
  isLast: boolean;
  removeStation: (staionName: string) => void;
};

const Station = ({ stationName, isLast, removeStation }: Props) => (
  <div className="flex gap-4">
    <div className="flex flex-col items-center">
      <div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full border">
          <DownArrow />
        </div>
      </div>
      <div className="h-full w-px bg-gray-300"></div>
    </div>
    <div className={isLast ? `pt-1` : `pb-8 pt-2`}>
      <p className="text-xl font-bold text-gray-600">{stationName}</p>
    </div>
    <TrashButton onClick={() => removeStation(stationName)} />
  </div>
);

export default Station;
