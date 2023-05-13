export const Usage = () => (
  <>
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl text-gray-800">使い方</h2>
      <div className="flex flex-col gap-2 rounded-xl bg-white p-4">
        <p>雰囲気で使えると思います(丸投げ)。</p>
        <p>
          そもそもダイヤの組み方が分からない人は、後述する参考動画などを見てね。
        </p>
        <p>
          バグを見つけたら、
          <a
            href="https://twitter.com/tenpaMk2"
            className="text-blue-500 underline"
          >
            Twitter(@tenpaMk2)
          </a>
          か、
          <a
            href="https://github.com/tenpaMk2/react-diagram-maker/issues"
            className="text-blue-500 underline"
          >
            GitHubのIssues
          </a>
          に連絡ください。
        </p>
      </div>
    </section>
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl text-gray-800">参考動画</h2>

      <div className="flex justify-center rounded-xl bg-white p-4">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/jOFI3_ZDLYk"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </section>
  </>
);
