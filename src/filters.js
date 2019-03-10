// Set up filters default object

const filters = {
  searchText: '',
  hideCompleted: false,
};

// getFilters
// args: none
// return value: filters object
const getFilters = () => filters;

// setFilters
// arguments: update object with optional searchText or hideCompleted
// return value none
const setFilters = (update) => {
  if (typeof update.searchText === 'string') {
    filters.searchText = update.searchText;
  }
  if (typeof update.hideCompleted === 'boolean') {
    filters.hideCompleted = update.hideCompleted;
  }
};

export { getFilters, setFilters };
