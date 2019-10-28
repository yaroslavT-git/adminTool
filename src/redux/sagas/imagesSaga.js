import { put, call, takeEvery } from 'redux-saga/effects';
import * as imagesActions from 'redux/actions/imagesActions';
import * as imagesRequests from "api/imagesRequests";

export default function* actionWatcher() {
    yield takeEvery(imagesActions.GET_IMAGES_LIST_REQUEST, getImagesList);
    yield takeEvery(imagesActions.REMOVE_IMAGE_REQUEST, removeImage);
    yield takeEvery(imagesActions.UPDATE_IMAGE_REQUEST, updateImage);
    yield takeEvery(imagesActions.SAVE_IMAGE_REQUEST, saveImage);
}

export function* updateImage({
    payload, resolve, reject,
}) {
    try {
        yield call(imagesRequests.updateImageRequest, payload);
        yield call(resolve);
        yield put(imagesActions.updateImageSuccess(payload));
    } catch (error) {
        yield put(imagesActions.updateImageError());
        yield call(reject, error);
    }
}

export function* saveImage({
    payload, resolve, reject,
}) {
    try {
        yield call(imagesRequests.saveImageRequest, payload);
        yield call(resolve);
        yield put(imagesActions.saveImageSuccess(payload));
    } catch (error) {
        yield put(imagesActions.saveImageError());
        yield call(reject, error);
    }
}

export function* removeImage({
    payload, resolve, reject,
}) {
    try {
        yield call(imagesRequests.removeImageRequest, payload);
        yield call(resolve);
        yield put(imagesActions.removeImageSuccess(payload));
    } catch (error) {
        yield put(imagesActions.removeImageError());
        yield call(reject, error);
    }
}

export function* getImagesList({
    resolve, reject,
}) {
    try {
        const { data } = yield call(imagesRequests.getImagesListRequest);
        yield call(resolve, data);
        yield put(imagesActions.getImagesListSuccess(data.images));
    } catch (error) {
        yield put(imagesActions.getImagesListError());
        yield call(reject, error);
    }
}
