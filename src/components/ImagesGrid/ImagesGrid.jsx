import React, { useEffect, useState } from 'react';
import { Grid, Dimmer, Loader } from "semantic-ui-react";
import _ from 'lodash';
import './ImagesGrid.scss';
import ViewModal from "components/Modals/ViewModal";
import UploadModal from "components/Modals/UploadModal";
import PropTypes from 'prop-types';

const ImagesGrid = ({ imagesList, getImagesList }) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getImagesListData = async () => {
            setIsLoading(true);
            await getImagesList();
            setIsLoading(false);
        };
        getImagesListData();
    }, []);

    return (
        <div className='images-grid__wrap'>
            <Dimmer className="is-custom-loader" active={isLoading} inverted>
                <Loader>Loading</Loader>
            </Dimmer>
                <Grid columns={4}>
                    <Grid.Row>
                        {!_.isEmpty(imagesList) && _.map(imagesList, image => (
                            <Grid.Column mobile={16} tablet={8} computer={4} className='images-grid__column' key={image.id}>
                                <ViewModal item={image}/>
                            </Grid.Column>
                        ))}
                        <Grid.Column mobile={16} tablet={8} computer={4} className='images-grid__column'>
                            <UploadModal/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
        </div>
    );
};

ImagesGrid.propTypes = {
    getImagesList: PropTypes.func.isRequired,
    imagesList: PropTypes.array.isRequired,
};

export default ImagesGrid;
