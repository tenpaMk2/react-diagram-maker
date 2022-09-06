import TrashCan from "./svg/Trashcan";

type Props = {
  onClick: () => void;
};

const TrashButton = ({ onClick }: Props) => (
  <button
    type="button"
    className="h-fit w-fit rounded-lg bg-red-600 p-2 text-white hover:bg-red-500"
    onClick={onClick}
  >
    <TrashCan />
  </button>
);

export default TrashButton;
