export const GET_IMAGES_LIST_REQUEST = "GET_IMAGES_LIST_REQUEST";
export const GET_IMAGES_LIST_SUCCESS = "GET_IMAGES_LIST_SUCCESS";
export const GET_IMAGES_LIST_ERROR = "GET_IMAGES_LIST_ERROR";

export const REMOVE_IMAGE_REQUEST = "REMOVE_IMAGE_REQUEST";
export const REMOVE_IMAGE_SUCCESS = "REMOVE_IMAGE_SUCCESS";
export const REMOVE_IMAGE_ERROR = "REMOVE_IMAGE_ERROR";

export const SAVE_IMAGE_REQUEST = "SAVE_IMAGE_REQUEST";
export const SAVE_IMAGE_SUCCESS = "SAVE_IMAGE_SUCCESS";
export const SAVE_IMAGE_ERROR = "SAVE_IMAGE_ERROR";

export const UPDATE_IMAGE_REQUEST = "UPDATE_IMAGE_REQUEST";
export const UPDATE_IMAGE_SUCCESS = "UPDATE_IMAGE_SUCCESS";
export const UPDATE_IMAGE_ERROR = "UPDATE_IMAGE_ERROR";

export const updateImage = payload => ({
    type: UPDATE_IMAGE_REQUEST,
    ...payload,
});

export const updateImageSuccess = payload => ({
    type: UPDATE_IMAGE_SUCCESS,
    payload,
});

export const updateImageError = payload => ({
    type: UPDATE_IMAGE_ERROR,
    payload,
});

export const saveImage = payload => ({
    type: SAVE_IMAGE_REQUEST,
    ...payload,
});

export const saveImageSuccess = payload => ({
    type: SAVE_IMAGE_SUCCESS,
    payload,
});

export const saveImageError = payload => ({
    type: SAVE_IMAGE_ERROR,
    payload,
});

export const removeImage = payload => ({
    type: REMOVE_IMAGE_REQUEST,
    ...payload,
});

export const removeImageSuccess = payload => ({
    type: REMOVE_IMAGE_SUCCESS,
    payload,
});

export const removeImageError = payload => ({
    type: REMOVE_IMAGE_ERROR,
    payload,
});

export const getImagesList = payload => ({
    type: GET_IMAGES_LIST_REQUEST,
    ...payload,
});

export const getImagesListSuccess = payload => ({
    type: GET_IMAGES_LIST_SUCCESS,
    payload,
});

export const getImagesListError = payload => ({
    type: GET_IMAGES_LIST_ERROR,
    payload,
});
