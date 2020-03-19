// utility function to make a mapDispatchToProps function for some given actions

export const makeMapDispatchToProps = (actions) => (dispatch) => {
  // for each of the provided actions
  for (const [actionName, action] of Object.entries(actions)) {
    // dispatch actions with a slight delay to avoid overwhelming browser
    actions[actionName] = (...args) =>
      window.setTimeout(() => dispatch(action(...args)), 100);
  }

  return actions;
};
