import { ChangeEvent } from "react";

const assertTime = (value: string) => {
  console.assert(
    value === "" || !Number.isNaN(new Date(`2022-08-26T${value}:00`).getTime()),
    "Invalid time value!!"
  );
};

type Props = {
  value: string;
  isPass: boolean;
  onTimeChange: (time: string) => void;
  onIsPassChange: (isPass: boolean) => void;
};

export const TimeInput = ({
  value,
  isPass,
  onTimeChange,
  onIsPassChange,
}: Props) => {
  assertTime(value);

  return (
    <section className="flex items-baseline justify-between gap-x-4	">
      <input
        type="time"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          assertTime(e.target.value);
          onTimeChange(e.target.value);
        }}
        className={`grow rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 ${
          isPass ? `bg-gray-300` : `bg-gray-50`
        }`}
      />
      <section className="flex items-baseline gap-x-2">
        <p>通過</p>
        <input
          type="checkbox"
          checked={isPass}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onIsPassChange(e.target.checked)
          }
          className="mx-auto h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
        ></input>
      </section>
    </section>
  );
};
