export const ChangeLog = () => (
  <>
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl text-gray-800">v1.6.0</h2>
      <div className="flex flex-col gap-2 rounded-xl bg-white p-4">
        <p>🐛: 重複した駅名を入力できてしまうのを修正。</p>
        <p>⚡️: 重複した列車名を入力しようとしたらアラートを出すように。</p>
        <p>⬆️: Viteをv4、Chart.jsをv4に更新。</p>
        <p>✨: 初期状態でデモ用の入力とダイヤグラムを表示するように。</p>
        <p>💄: セクション名などを改善。</p>
        <p>⚡️: favicon追加。</p>
        <p>⚡️: JSの容量削減(ちょっとだけページの表示速度アップ)。</p>
        <p>⚡️: シェアボタンを更に追加。</p>
        <p>⚡️: ページを離れるときにアラートを出すように。</p>
        <p>
          🐛:
          『列車と発着時刻』セクションの左端の列の表示がおかしかったのを修正。
        </p>
        <p>⚡️: 『使い方』と『更新履歴』のタブを追加。</p>
      </div>
    </section>
    <section className="flex flex-col gap-4">
      <h2 className="text-2xl text-gray-800">v1.5.0以前</h2>
      <div className="flex flex-col gap-2 rounded-xl bg-white p-4">
        <p>
          <a
            href="https://github.com/tenpaMk2/react-diagram-maker/"
            className="text-blue-500 underline"
          >
            GitHub
          </a>
          見て。
        </p>
      </div>
    </section>
  </>
);
