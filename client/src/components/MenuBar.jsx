import PropTypes from "prop-types";

MenuBar.propTypes = {
  query: PropTypes.string,
  sortBy: PropTypes.string,
  category: PropTypes.string,
  timeStamp: PropTypes.string,
  setQuery: PropTypes.func,
  setSortBy: PropTypes.func,
  setCategory: PropTypes.func,
  setTimeStamp: PropTypes.func,
  setLastChanged: PropTypes.func,
};
function MenuBar({
  query,
  setQuery,
  sortBy,
  setSortBy,
  category,
  setCategory,
  timeStamp,
  setTimeStamp,
  setLastChanged,
}) {
  return (
    <div className="flex w-[95%] flex-col justify-around gap-4 rounded-xl border-2 border-blue-500 p-4 shadow-xl md:w-4/5 lg:flex-row">
      <section className="flex w-full justify-between gap-4 lg:w-1/2">
        <input
          className="w-1/2 rounded-3xl border border-blue-500 px-2 py-1 focus:outline-none"
          value={query}
          placeholder="Search your expense"
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="w-1/2 rounded-3xl border border-blue-500 px-4 py-1 focus:outline-none"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="recent">Sort By Most Recent</option>
          <option value="oldest">Sort By Oldest First</option>
          <option value="highest">Sort By Highest First</option>
          <option value="lowest">Sort By Lowest First</option>
        </select>
      </section>
      <section className="flex w-full justify-between gap-4 lg:w-1/2">
        <input
          className="w-1/2 rounded-3xl border border-blue-500 px-4 py-1 focus:outline-none"
          type="month"
          value={timeStamp}
          onChange={(e) => {
            setTimeStamp(e.target.value);
            setLastChanged("timeStamp");
          }}
        />
        <select
          className="w-1/2 rounded-3xl border border-blue-500 px-4 py-1 focus:outline-none"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setLastChanged("category");
          }}
        >
          <option value="all">All Categories</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Housing">Housing</option>
          <option value="Transport">Transport</option>
          <option value="Food">Food</option>
          <option value="Healthcare">Health Care</option>
          <option value="Education">Education</option>
          <option value="Investment">Investment</option>
          <option value="Debt">Debt Payments</option>
          <option value="Insuarance">Insuarance</option>
          <option value="Personalcare">Personal Care</option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>
      </section>
    </div>
  );
}

export default MenuBar;
