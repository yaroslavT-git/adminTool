import { connect } from 'react-redux';
import { dispatchRequest } from "helpers/asyncActions";
import { saveImage } from "redux/actions/imagesActions";
import UploadModal from './UploadModal';

const mapDispatchToProps = dispatch => ({
    saveImage: dispatchRequest(dispatch, saveImage),
});

export default connect(null, mapDispatchToProps)(UploadModal);
