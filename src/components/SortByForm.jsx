const SortByForm = ({ setSort, setOrder, setSearchParams, query }) => {
  const changeHandler = event => {
    const sortingValues = event.target.value.split(',');

    if (query) {
      setSearchParams({
        topic: query,
        sort_by: sortingValues[0],
        order: sortingValues[1],
      });
    } else {
      setSearchParams({
        sort_by: sortingValues[0],
        order: sortingValues[1],
      });
    }
    setSort(sortingValues[0]);
    setOrder(sortingValues[1]);
  };

  return (
    <form>
      <label htmlFor="">Sort by</label>
      <select onChange={changeHandler}>
        <option value="votes,DESC">Most Popular </option>
        <option value="created_at,DESC">Most Recent Articles</option>
        <option value="created_at,ASC">Oldest Articles</option>
        <option value="author,ASC">Author (Ascending)</option>
        <option value="author,DESC">Author (Descending)</option>
        <option value="title,ASC">Title (Ascending)</option>
        <option value="title,DESC">Title (Descending)</option>
      </select>
    </form>
  );
};

export default SortByForm;
