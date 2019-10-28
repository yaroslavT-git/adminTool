export const dispatchRequest = (dispatch, action) => payload => {
    return new Promise((resolve, reject) => dispatch(action({
        payload, resolve, reject,
    })));
};
