import { ChangeEvent } from "react";

type Props = {
  onIsMoveForwardChange: (isMoveForward: boolean) => void;
};

export const IsMoveForward = ({ onIsMoveForwardChange }: Props) => {
  return (
    <input
      type="checkbox"
      value=""
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        onIsMoveForwardChange(e.target.checked)
      }
      className="mx-auto my-4 h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
    ></input>
  );
};
