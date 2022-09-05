import TrashButton from "./TrashButton";

type Props = {
  stationName: string;
  isLast: boolean;
  removeStation: (staionName: string) => void;
};

const Station = ({ stationName, isLast, removeStation }: Props) => {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 13l-5 5m0 0l-5-5m5 5V6"
              />
            </svg>
          </div>
        </div>
        <div className="h-full w-px bg-gray-300"></div>
      </div>
      <div className={`${isLast ? "pt-1" : "pt-2 pb-8"}`}>
        <p className="text-xl font-bold text-gray-600">{stationName}</p>
      </div>
      <TrashButton onClick={() => removeStation(stationName)} />
    </div>
  );
};

export default Station;
