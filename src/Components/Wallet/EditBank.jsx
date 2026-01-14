import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { updateBankDetails, fetchBankDetail } from '../../store/bankSlice.js';
import '../../assets/Styles/Wallet/EditBank.scss'

const EditBank = ({ account, onClose }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.bank);
    const [formData, setFormData] = useState({
        bankName: '',
        accountNumber: '',
        ifscCode: '',
        swiftCode: '',
        accountHolderName: ''
    });

    useEffect(() => {
        if (account) {
            setFormData({
                bankName: account.bankName || '',
                accountNumber: account.accountNo || '',
                ifscCode: account.ifscCode || '',
                swiftCode: account.swiftCode || '',
                accountHolderName: account.accountHolderName || ''
            });
        }
    }, [account]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'accountHolderName') {
            const alphabetOnly = value.replaceAll(/[^a-zA-Z\s]/g, '');
            setFormData(prev => ({ ...prev, [name]: alphabetOnly }));
            return;
        }
        
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        const bankData = {
            accountNo: formData.accountNumber,
            accountHolderName: formData.accountHolderName,
            ifscCode: formData.ifscCode,
            swiftCode: formData.swiftCode,
            bankName: formData.bankName
        };

        try {
            const result = await dispatch(updateBankDetails({ 
                bankDetailId: account.id, 
                bankData 
            }));
            if (updateBankDetails.fulfilled.match(result)) {
                dispatch(fetchBankDetail());
                onClose();
            }
        } catch (error) {
            console.error('Error updating bank account:', error);
        }
    };

    return (
        <div className="add_bank_modal">
            <div className="modal_conten">
                <div className="bank_form">
                    <h2>Edit Bank Account Details</h2>
                    <div className="form_group">
                        <label htmlFor="bankName" className="vhh">Bank Name</label>
                        <input
                            id="bankName"
                            type="text"
                            name="bankName"
                            placeholder="Bank Name"
                            value={formData.bankName}
                            onChange={handleInputChange}
                            maxLength={100}
                        />
                    </div>
                    <div className="form_group">
                        <label htmlFor="accountNumber" className="vhh">Bank Account No</label>
                        <input
                            id="accountNumber"
                            type="text"
                            name="accountNumber"
                            placeholder="Bank Account No"
                            value={formData.accountNumber}
                            onChange={handleInputChange}
                            maxLength={18}
                        />
                    </div>
                    <div className="form_group">
                        <label htmlFor="ifscCode" className="vhh">Bank Account IFSC Code</label>
                        <input
                            id="ifscCode"
                            type="text"
                            name="ifscCode"
                            placeholder="Bank Account IFSC Code"
                            value={formData.ifscCode}
                            onChange={handleInputChange}
                            maxLength={11}
                        />
                    </div>
                    <div className="form_group">
                        <label htmlFor="swiftCode" className="vhh">Bank Account Swift Code</label>
                        <input
                            id="swiftCode"
                            type="text"
                            name="swiftCode"
                            placeholder="Bank Account Swift Code"
                            value={formData.swiftCode}
                            onChange={handleInputChange}
                            maxLength={11}
                        />
                    </div>
                    <div className="form_group">
                        <label htmlFor="accountHolderName" className="vhh">Account Holder Name</label>
                        <input
                            id="accountHolderName"
                            type="text"
                            name="accountHolderName"
                            placeholder="Account Holder Name"
                            value={formData.accountHolderName}
                            onChange={handleInputChange}
                            maxLength={100}
                        />
                    </div>
                    <button 
                        className="continue_btn" 
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Save Changes'}
                    </button>
                </div>
                <button className="close_btn" onClick={onClose}>X</button>
            </div>
        </div>
    );
};

EditBank.propTypes = {
    account: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
};

export default EditBank;