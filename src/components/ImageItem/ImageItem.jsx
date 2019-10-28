import React from 'react';
import './ImageItem.scss';
import { Image, Icon } from "semantic-ui-react";
import PropTypes from 'prop-types';

const ImageItem = ({ iconName, imgUrl, iconCallback, imageCallback }) => {
    return (
        <div className='image-item__wrap'>
            <Image className='image-item__img' src={imgUrl} size='medium' onClick={imageCallback}/>
            <Icon className='image-item__icon' name={iconName} color='grey' onClick={iconCallback}/>
        </div>
    );
};

ImageItem.propTypes = {
    imageCallback: PropTypes.func.isRequired,
    iconCallback: PropTypes.func.isRequired,
    iconName: PropTypes.string.isRequired,
    imgUrl: PropTypes.string.isRequired,
};

export default ImageItem;
