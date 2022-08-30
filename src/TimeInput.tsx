import { ChangeEvent } from "react";

const assertTime = (value: string) => {
  console.assert(
    value === "" || !Number.isNaN(new Date(`2022-08-26T${value}:00`).getTime()),
    "Invalid time value!!"
  );
};

type Props = {
  value: string;
  onTimeChange: (time: string) => void;
};

const TimeInput = ({ value, onTimeChange }: Props) => {
  assertTime(value);

  return (
    <input
      type="time"
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        assertTime(e.target.value);
        onTimeChange(e.target.value);
      }}
      className="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
    />
  );
};

export default TimeInput;
