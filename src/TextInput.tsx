import { ChangeEvent, KeyboardEvent, useState } from "react";

type Props = {
  placeholder: string;
  onEnterPress: (text: string) => void;
};

const TextInput = ({ placeholder, onEnterPress }: Props) => {
  const [text, setText] = useState("");

  return (
    <input
      type="text"
      value={text}
      placeholder={placeholder}
      className="mr-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
      onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") return;
        if (!text.match(/\S/g)) return;

        onEnterPress(text);
        setText(``);
      }}
    />
  );
};

export default TextInput;
