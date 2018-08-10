export const saveRoster = (roster) => {
  return {
    type: 'SAVE_ROSTER',
    roster
  };
};

export const updateRoster = (roster) => {
  return {
    type: 'UPDATE_ROSTER',
    roster
  };
};

export const removeRoster = (id) => {
  return {
    type: 'REMOVE_ROSTER',
    id
  };
};

export const updateRosterID = () => {
  return {
    type: 'UPDATE_ROSTER_ID'
  };
};
