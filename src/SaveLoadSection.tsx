import { ChangeEvent, Dispatch, MouseEvent } from "react";
import { Actions, State } from "./reducer/reducer";

type Props = {
  state: State;
  dispatch: Dispatch<Actions>;
};

const SaveLoadSection = ({ state, dispatch }: Props) => {
  /**
   * @see https://codesandbox.io/s/4t2xb
   */
  const download = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(state)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `diagram-${new Date().toJSON().slice(0, 10)}.json`;

    link.click();
  };

  const upload = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const fileReader = new FileReader();

    fileReader.onerror = (e: ProgressEvent<FileReader>) => {
      console.log(e);
      alert(e.target?.error);
    };

    fileReader.onload = (e: ProgressEvent<FileReader>) => {
      const result = e.target!.result;
      if (typeof result !== "string") return;

      let parsed;
      try {
        parsed = JSON.parse(result);
      } catch (e) {
        alert(e);
        return;
      }

      const obj = parsed as State;

      dispatch({
        type: "changeFullState",
        payload: { state: obj },
      });
    };

    fileReader.readAsText(event.target.files![0], "UTF-8");
  };

  return (
    <>
      <section className="mx-4 my-8 flex flex-col gap-2">
        <h2 className="text-2xl">保存</h2>

        <section className="flex flex-col justify-center gap-4 rounded-xl bg-white p-8">
          <button
            type="button"
            onClick={download}
            className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            保存
          </button>
        </section>
      </section>
      <section className="mx-4 my-8 flex flex-col gap-2">
        <h2 className="text-2xl">読み込み</h2>

        <section className="flex flex-col justify-center gap-4 rounded-xl bg-white p-8">
          <div className="flex w-full items-center justify-center">
            <label
              htmlFor="dropzone-file"
              className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center gap-2 text-gray-500">
                <svg
                  aria-hidden="true"
                  className="mb-3 h-10 w-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="text-sm font-semibold">クリックでアップロード</p>
                <p className="text-sm">またはドラッグ&ドロップしてください。</p>
                <p className="text-xs">JSON</p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                accept="application/JSON"
                onChange={upload}
                className="hidden"
              />
            </label>
          </div>
        </section>
      </section>
    </>
  );
};

export default SaveLoadSection;
