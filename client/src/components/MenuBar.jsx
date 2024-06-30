import PropTypes from "prop-types";

MenuBar.propTypes = {
  query: PropTypes.string,
  sortBy: PropTypes.string,
  category: PropTypes.string,
  setQuery: PropTypes.func,
  setSortBy: PropTypes.func,
  setCategory: PropTypes.func,
};
function MenuBar({
  query,
  setQuery,
  sortBy,
  setSortBy,
  category,
  setCategory,
}) {
  return (
    <div className="flex w-[95%] flex-col justify-around gap-4 rounded-xl border-2 border-blue-500 p-4 shadow-xl md:w-4/5 md:flex-row">
      <input
        className="rounded-3xl border border-blue-500 px-2 py-1 focus:outline-none md:w-3/5"
        value={query}
        placeholder="Search your expense"
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="flex w-full justify-between">
        <select
          className="rounded-3xl border border-blue-500 px-4 py-1 focus:outline-none"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="recent">Sort By Most Recent</option>
          <option value="oldest">Sort By Oldest First</option>
          <option value="lowest">Sort By Highest First</option>
          <option value="highest">Sort By Lowest First</option>
        </select>
        <select
          className="rounded-3xl border border-blue-500 px-4 py-1 focus:outline-none"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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
      </div>
    </div>
  );
}

export default MenuBar;
