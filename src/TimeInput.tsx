import { ChangeEvent, useState } from "react";
import useUpdateEffect from "./useUpdateEffect";

type Props = {
  onTimeChange: (time: string) => void;
};

const TimeInput = ({ onTimeChange }: Props) => {
  const [text, setText] = useState("");

  useUpdateEffect(() => {
    onTimeChange(text);
  }, [text]);

  return (
    <input
      type="time"
      value={text}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
      className="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
    />
  );
};

export default TimeInput;
