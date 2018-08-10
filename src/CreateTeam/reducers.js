export const teamName = (store = '', action) => {
  switch (action.type) {
  case 'SAVE_TEAM_NAME':
    return action.teamName;
  default:
    return store;
  }
};
