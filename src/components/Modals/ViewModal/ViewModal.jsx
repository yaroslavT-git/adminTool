import './ViewModal.scss';
import {
    Button,
    Modal
} from 'semantic-ui-react';
import React, { useState, useRef } from 'react';
import PropTypes from "prop-types";
import _ from 'lodash';
import ImageItem from "components/ImageItem";
import ImagePreview from "components/ImagePreview";
import { getBase64String } from "helpers/imageLoader";

const ViewModal = ({ item, removeImage, updateImage }) => {
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [isLoadingImage, setIsLoadingImage] = useState(false);
    const [uploadedImage, setUploadedImage] = useState('');
    const [tooltipData, setTooltipData] = useState(item.tooltip);
    const [isOpen, setIsOpen] = useState(false);

    const inputEl = useRef(null);

    const imageUrl = _.has(item, 'storageKey') ?  localStorage.getItem(item.storageKey) : item.imgUrl;

    const handleRemoveImage = () => {
        if (_.has(item, 'storageKey')) {
            removeImage(item.id);
            localStorage.removeItem(item.storageKey);
        } else {
            removeImage(item.id)
        }
    };

    const handleUploadFile = async (event) => {
        try {
            setIsLoadingImage(true);
            const file = event.target.files[0];
            inputEl.current.value = '';
            if (file.type.includes('image')) {
                const base64 = await getBase64String(file);
                setUploadedImage(base64);
            } else {
                alert('Wrong file format!');
            }
            setIsLoadingImage(false);
        } catch {
            setIsLoadingImage(true);
        }
    };

    const handleClickUpload = () => inputEl.current.click();

    const handleUpdateImage = async () => {
        try {
            setIsLoadingUpdate(true);
            let data = item;
            if (!_.isEmpty(uploadedImage)) {
                const imageKey = _.has(item, 'storageKey') ? item.storageKey : `key-${_.random(1000)}`;
                localStorage.setItem(imageKey, uploadedImage);
                data = { ...data, storageKey: imageKey };
            }
            await updateImage(_.isEmpty(tooltipData) ? data : { ...data, tooltip: tooltipData });
            setIsLoadingUpdate(false);
            setIsOpen(false);
        } catch {
            setIsLoadingUpdate(false);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        setTooltipData(item.tooltip);
    };

    return (
        <>
            <div>
                <ImageItem
                    imageCallback={() => setIsOpen(true)}
                    iconCallback={handleRemoveImage}
                    imgUrl={imageUrl}
                    iconName='close'
                />
            </div>
            {isOpen && (
                <Modal
                    onClose={handleClose}
                    className='view-modal'
                    open={isOpen}
                    size="small"
                    closeIcon
                    centered
                >
                    <>
                        <ImagePreview imageUrl={uploadedImage || imageUrl} tooltipData={tooltipData} tooltipCallback={setTooltipData}/>
                        <div className='view-modal__btns'>
                            <input ref={inputEl} type='file' className='view-modal__input' onChange={handleUploadFile}/>
                            <Button loading={isLoadingImage} icon='download' onClick={handleClickUpload} content='Upload New Image' />
                            <Button
                                disabled={isLoadingUpdate || (_.isEmpty(uploadedImage) && _.isEqual(tooltipData, item.tooltip))}
                                onClick={handleUpdateImage}
                                loading={isLoadingUpdate}
                                content='Update Image'
                                color='blue'
                                icon='save'
                            />
                        </div>
                    </>
                </Modal>
            )}
        </>
    );
};

ViewModal.propTypes = {
    removeImage: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
};

export default ViewModal;
