import './UploadModal.scss';
import {
    Modal,
    Button,
} from 'semantic-ui-react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useState, useRef } from 'react';
import { getBase64String } from "helpers/imageLoader";
import ImagePreview from "components/ImagePreview";

const UploadModal = ({ saveImage }) => {
    const [toolTipData, setTooltipData] = useState({ text: '', color: '#000000', bgColor: '#fff', position: { left: '10px', top: '355px' } });
    const [isLoadingImage, setIsLoadingImage] = useState(false);
    const [isLoadingSave, setIsLoadingSave] = useState(false);
    const [uploadedImage, setUploadedImage] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const inputEl = useRef(null);

    const handleUploadFile = async (event) => {
        try {
            setIsLoadingImage(true);
            const file = event.target.files[0];
            inputEl.current.value = '';
            if (file.type.includes('image')) {
                const base64 = await getBase64String(file);
                setUploadedImage(base64);
                setIsOpen(true);
            } else {
                setIsOpen(false);
                alert('Wrong file format!');
            }
            setIsLoadingImage(false);
        } catch {
            setIsLoadingImage(true);
        }
    };

    const handleClickUpload = () => inputEl.current.click();

    const handleSaveImage = async () => {
        try {
            setIsLoadingSave(true);
            const imageKey = `key-${_.random(1000)}`;
            localStorage.setItem(imageKey, uploadedImage);
            await saveImage({ id: _.random(1000), storageKey: imageKey, tooltip: toolTipData });
            setIsLoadingSave(false);
            setIsOpen(false);
        } catch {
            setIsLoadingSave(false);
        }
    };

    return (
        <>
            <div className='upload-modal__trigger'>
                <input ref={inputEl} type='file' className='upload-modal__trigger-input' onChange={handleUploadFile}/>
                <Button loading={isLoadingImage} icon='download' onClick={handleClickUpload} content='Upload New Image' />
            </div>
            {isOpen && (
                <Modal
                    onClose={() => setIsOpen(false)}
                    closeOnDimmerClick={false}
                    className='upload-modal'
                    open={isOpen}
                    size="small"
                    closeIcon
                    centered
                >
                    <>
                        <ImagePreview imageUrl={uploadedImage} tooltipData={toolTipData} tooltipCallback={setTooltipData}/>
                        <div className='upload-modal__btns'>
                            <Button loading={isLoadingSave} color='blue' icon='save' onClick={handleSaveImage} content='Save Image'/>
                        </div>
                    </>
                </Modal>
            )}
        </>
    );
};

UploadModal.propTypes = {
    saveImage: PropTypes.func.isRequired,
};

export default UploadModal;
