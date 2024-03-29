import { ChangeEvent } from "react";

type Props = {
  value: number;
  onRepeatChange: (repeat: number) => void;
};

export const RepeatInput = ({ value, onRepeatChange }: Props) => {
  return (
    <input
      type="number"
      value={value}
      placeholder="1"
      className="my-4 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        onRepeatChange(parseInt(e.target.value))
      }
    />
  );
};
