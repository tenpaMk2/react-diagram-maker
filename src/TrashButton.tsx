import { TrashCan } from "./svg/TrashCan";

type Props = {
  onClick: () => void;
};

export const TrashButton = ({ onClick }: Props) => (
  <button
    type="button"
    className="h-fit w-fit rounded-lg bg-red-600 p-2 text-white hover:bg-red-500"
    onClick={onClick}
  >
    <TrashCan />
  </button>
);
