import axios from 'axios';
import MockAdapter from "axios-mock-adapter";
import { imagesUrls } from "api/urls";

const mock = new MockAdapter(axios, { delayResponse: 500 });

const deleteUri = new RegExp(`${imagesUrls.removeImage}/*`);

mock.onGet(imagesUrls.getImagesList).reply(200, {
    images: [
        { id: 0, imgUrl: 'https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/beveragedaily.com/news/regulation-safety/what-is-a-natural-wine/8451730-1-eng-GB/What-is-a-natural-wine_wrbm_large.jpg', tooltip: { text: '', color: '#000000', bgColor: '#fff', position: { left: '10px', top: '355px' } } },
        { id: 1, imgUrl: 'https://www.cantifix.co.uk/globalassets/natural-light-1.jpeg', tooltip: { text: '', color: '#000000', bgColor: '#fff', position: { left: '10px', top: '355px' } } },
        { id: 2, imgUrl: 'https://cdn2.outdoorphotographer.com/2019/07/brian_matiash_frames_01-824x1235.jpg', tooltip: { text: '', color: '#000000', bgColor: '#fff', position: { left: '10px', top: '355px' } } },
        { id: 3, imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv560StOPtWE2QT40Z2EcCyeOz__NwG3Tgq-1ozl3msrhEfegc&s', tooltip: { text: '', color: '#000000', bgColor: '#fff', position: { left: '10px', top: '355px' } } },
        { id: 4, imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4YvvtdEFXwDuMwaUe7EBMlrIQ84xnwZIVieAN_YOUUDWfIgGd&s', tooltip: { text: '', color: '#000000', bgColor: '#fff', position: { left: '10px', top: '355px' } } },
        { id: 5, imgUrl: 'https://assets.forwardcdn.com/images/cropped/axe-1531828722.jpg', tooltip: { text: '', color: '#000000', bgColor: '#fff', position: { left: '10px', top: '355px' } } },
    ]
});

mock.onDelete(deleteUri).reply(200, {});
mock.onPost(imagesUrls.saveImage).reply(200, {});
mock.onPut(imagesUrls.updateImage).reply(200, {});

export const getImagesListRequest = () => {
    return axios.get(imagesUrls.getImagesList);
};

export const removeImageRequest = (id) => {
    return axios.delete(`${imagesUrls.removeImage}/${id}`);
};

export const saveImageRequest = (data) => {
    return axios.post(imagesUrls.saveImage, data);
};

export const updateImageRequest = (data) => {
    return axios.put(imagesUrls.updateImage, data);
};
