import './ImagePreview.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Image } from "semantic-ui-react";
import Tooltip from "components/Tooltip";

const ImagePreview = ({ imageUrl, tooltipData, tooltipCallback }) => {

    const handleDragOver = e => {
        e.preventDefault();
    };

    const handleDrop = e => {
        const toolTipX = e.dataTransfer.getData('toolTipX');
        const toolTipY = e.dataTransfer.getData('toolTipY');
        const parElm = document.querySelector('.image-preview__wrap');
        const left = e.clientX - parElm.getBoundingClientRect().left - toolTipX;
        const top = e.clientY - parElm.getBoundingClientRect().top - toolTipY;
        e.preventDefault();
        if ((left < 500 && left > 0) && (top < 400 && top > 0)) {
            tooltipCallback({...tooltipData, position: {left: left, top: top}});
        }
    };

    return (
        <div className='image-preview__wrap' onDrop={handleDrop} onDragOver={handleDragOver}>
            <Image className='image-preview__image' src={imageUrl} size='huge' draggable="false"/>
            <Tooltip data={tooltipData} saveCallback={tooltipCallback}/>
        </div>
    )
};

ImagePreview.propTypes = {
    tooltipCallback: PropTypes.func.isRequired,
    tooltipData: PropTypes.object.isRequired,
    imageUrl: PropTypes.string.isRequired,
};

export default ImagePreview;
