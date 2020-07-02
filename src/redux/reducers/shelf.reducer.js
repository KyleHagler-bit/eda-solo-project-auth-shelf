//need an empty array
const shelfReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SHELF':
      return action.payload;
    case 'UNSET_SHELF':
      return [];
    default:
      return state;
  }
};

// shelf will be on the redux state at:
// state.shelf
export default shelfReducer;