const tabItems = [`メイン`, `使い方`, `更新履歴`] as const;
export type TabItems = (typeof tabItems)[number];

type Props = {
  activeTab: TabItems;
  setActiveTab: (tab: TabItems) => void;
};

export const Tabs = ({ activeTab, setActiveTab }: Props) => (
  <nav className="flex justify-center gap-2 border-b border-dashed border-blue-700">
    {tabItems.map((tab) => (
      <button
        key={tab}
        type="button"
        className={`h-fit w-fit rounded-t-lg border-x border-t p-2${
          activeTab === tab ? ` bg-blue-700 text-white` : ``
        }`}
        onClick={() => setActiveTab(tab)}
      >
        {tab}
      </button>
    ))}
  </nav>
);
