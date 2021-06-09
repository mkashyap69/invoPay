export const footerStateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FOOTER_STATE_UPDATE':
      return { ...state, data: action.payload };

    default:
      return state;
  }
};
