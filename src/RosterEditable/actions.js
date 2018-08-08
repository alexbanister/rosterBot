export const saveRoster = (roster) => {
  return {
    type: 'SAVE_ROSTER',
    roster
  };
};

export const updateRosterID = () => {
  return {
    type: 'UPDATE_ROSTER_ID'
  };
};
