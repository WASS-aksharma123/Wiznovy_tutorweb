import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { uploadIdDocuments, uploadPassbookDocuments, fetchBankDetail } from '../../store/bankSlice.js';
import '../../assets/Styles/Wallet/UpdateDoc.scss';

const UpdateDoc = ({ accountId, docType, onClose }) => {
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpdate = async () => {
        if (!file) {
            alert('Please select a file to upload');
            return;
        }

        setUploading(true);
        try {
            if (docType === 'identity') {
                await dispatch(uploadIdDocuments({ accountId, file })).unwrap();
            } else if (docType === 'passbook') {
                await dispatch(uploadPassbookDocuments({ accountId, file })).unwrap();
            }
            
            await dispatch(fetchBankDetail());
            alert('Document updated successfully');
            onClose();
        } catch (error) {
            console.error('Error updating document:', error);
            alert('Failed to update document. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="add_bank_modal update_doc_modal">
            <div className="modal_content">
                <div className="step_content">
                    <h2>Update {docType === 'identity' ? 'Identity' : 'Passbook'} Document</h2>
                    <div className="form_group">
                        <label htmlFor="doc_input" className="vhh">
                            Upload your {docType === 'identity' ? 'ID' : 'passbook'} document
                        </label>
                        <input
                            id="doc_input"
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            onChange={handleFileChange}
                        />
                    </div>
                    <button 
                        className="add_bank_btn" 
                        onClick={handleUpdate}
                        disabled={!file || uploading}
                    >
                        {uploading ? 'Updating...' : 'Save Changes'}
                    </button>
                </div>
                <button className="close_btn" onClick={onClose}>X</button>
            </div>
        </div>
    );
};

UpdateDoc.propTypes = {
    accountId: PropTypes.string.isRequired,
    docType: PropTypes.oneOf(['identity', 'passbook']).isRequired,
    onClose: PropTypes.func.isRequired
};

export default UpdateDoc;
