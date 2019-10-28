import { connect } from 'react-redux';
import { dispatchRequest } from "helpers/asyncActions";
import { removeImage, updateImage } from "redux/actions/imagesActions";
import ViewModal from './ViewModal';

const mapDispatchToProps = dispatch => ({
    removeImage: dispatchRequest(dispatch, removeImage),
    updateImage: dispatchRequest(dispatch, updateImage),
});

export default connect(null, mapDispatchToProps)(ViewModal);
