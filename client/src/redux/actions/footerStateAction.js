export const footerStateUpdate = (data) => async (dispatch) => {
  dispatch({
    type: 'FOOTER_STATE_UPDATE',
    payload: data,
  });
};
