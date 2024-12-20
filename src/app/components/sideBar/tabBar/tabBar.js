"use client";
import { useState } from "react";

export default function TabBar({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);
  const activeStyle = "bg-zinc-100 dark:bg-zinc-700 font-bold";

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-2 px-2 py-2 border-b border-zinc-100 dark:border-gray-700">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`text-sm cursor-pointer py-1 px-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-md ${
              activeTab === index ? activeStyle : ""
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.name}
          </div>
        ))}
      </div>
      <div className="flex-grow overflow-y-auto">{tabs[activeTab].content}</div>
    </div>
  );
}
