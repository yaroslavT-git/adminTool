import * as imagesActions from 'redux/actions/imagesActions';
import _ from 'lodash';

const initialState = {
    isLoading: false,
    list: [],
};

export function imagesReducer(state = initialState, { type, payload }) {
    switch (type) {
        case imagesActions.GET_IMAGES_LIST_SUCCESS:
            return { ...state, list: payload, isLoading: false };
        case imagesActions.SAVE_IMAGE_SUCCESS:
            return { ...state, list: [...state.list, payload] };
        case imagesActions.UPDATE_IMAGE_SUCCESS:
            return { ...state, list: _.map(state.list, l => l.id === payload.id ? payload : l) };
        case imagesActions.REMOVE_IMAGE_SUCCESS:
            return { ...state, list: _.filter(state.list, l => l.id !== payload) };
        default:
            return state;
    }
}
