function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs({ tabs, onTabChange }) {
  // Handle selection change for mobile view
  const handleSelectChange = (event) => {
    const selectedTabName = event.target.value;
    onTabChange(selectedTabName);
  };

  // Handle click for desktop view
  const handleClick = (tabName) => (event) => {
    event.preventDefault(); // Prevent default link behavior
    onTabChange(tabName);
  };

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          onChange={handleSelectChange}
          defaultValue={tabs.find((tab) => tab.current).name}
        >
          {tabs.map((tab) => (
            <option key={tab.name} value={tab.name}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={handleClick(tab.name)}
              className={classNames(
                tab.current
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-500 hover:text-gray-700",
                "rounded-md px-3 py-2 text-sm font-medium"
              )}
              aria-current={tab.current ? "page" : undefined}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
