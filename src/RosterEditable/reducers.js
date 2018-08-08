export const rosters = (store = [], action) => {
  switch (action.type) {
  case 'SAVE_ROSTER':
    return [...store, action.roster];
  default:
    return store;
  }
};

export const rostersID = (store = { id: 1 }, action) => {
  switch (action.type) {
  case 'UPDATE_ROSTER_ID':
    return Object.assign({}, { id: store.id + 1 });
  default:
    return store;
  }
};
