import { ChangeEvent } from "react";

type Props = {
  onRepeatChange: (repeat: number) => void;
};

const RepeatInput = ({ onRepeatChange }: Props) => {
  return (
    <input
      type="number"
      placeholder="1"
      className="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        onRepeatChange(parseInt(e.target.value))
      }
    />
  );
};

export default RepeatInput;
