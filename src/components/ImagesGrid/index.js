import { connect } from 'react-redux';
import { dispatchRequest } from "helpers/asyncActions";
import { getImagesList } from "redux/actions/imagesActions";
import { getImagesListState } from "redux/selectors/imagesSelector";
import ImagesGrid from './ImagesGrid';

const mapStateToProps = state => ({
    imagesList: getImagesListState(state),
});

const mapDispatchToProps = dispatch => ({
    getImagesList: dispatchRequest(dispatch, getImagesList),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImagesGrid);
