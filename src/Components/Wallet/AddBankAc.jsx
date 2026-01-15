import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchBankDetail,
    createBankAccounts,
    uploadIdDocuments,
    uploadPassbookDocuments,
    deleteBankDetails,
    clearError
} from '../../store/bankSlice.js';
import "../../assets/Styles/Wallet/AddBankAc.scss";
import illu from '../../assets/Images/Illustration.png'
import EditBank from './EditBank.jsx';
import UpdateDoc from './UpdateDoc.jsx';
import Withdraw from './WithDraw.jsx';

const AddBankAc = ({ onClose }) => {
    const dispatch = useDispatch();
    const { bankAccounts, loading, currentAccountId, error } = useSelector(state => state.bank);
    const [showForm, setShowForm] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [showEditBank, setShowEditBank] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [showUpdateDoc, setShowUpdateDoc] = useState(false);
    const [updateDocData, setUpdateDocData] = useState({ accountId: null, docType: null });
    const [showWithdraw, setShowWithdraw] = useState(false);
    const [selectedWithdrawAccount, setSelectedWithdrawAccount] = useState(null);
    const [formData, setFormData] = useState({
        bankName: '',
        accountNumber: '',
        ifscCode: '',
        swiftCode: '',
        accountHolderName: '',
        termsAccepted: false,
        idDocument: null,
        passbookDocument: null,
        finalTermsAccepted: false
    });

    useEffect(() => {
        dispatch(fetchBankDetail());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            console.error('Bank operation error:', error);
            dispatch(clearError());
        }
    }, [error, dispatch]);

    const handleAddBankAccount = () => {
        setShowForm(true);
        setCurrentStep(1);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        // For accountHolderName, allow only alphabets and spaces
        if (name === 'accountHolderName') {
            const alphabetOnly = value.replaceAll(/[^a-zA-Z\s]/g, '');
            setFormData(prev => ({
                ...prev,
                [name]: alphabetOnly
            }));
            return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];

        setFormData(prev => ({
            ...prev,
            [name]: file
        }));
    };

    const handleContinue = async () => {
        if (currentStep === 1) {
            const bankData = {
                tutorId: '3996222e-c363-4ff8-bb32-2a4f406eb16a',
                accountNo: formData.accountNumber,
                accountHolderName: formData.accountHolderName,
                ifscCode: formData.ifscCode,
                swiftCode: formData.swiftCode,
                bankName: formData.bankName
            };

            try {
                const result = await dispatch(createBankAccounts(bankData));
                if (createBankAccounts.fulfilled.match(result)) {
                    console.log('Bank account created successfully:', result.payload);
                    // Wait a moment for state to update
                    setTimeout(() => {
                        console.log('Current account ID from state:', currentAccountId);
                        setCurrentStep(currentStep + 1);
                    }, 100);
                } else {
                    console.error('Failed to create bank account:', result.error);
                    alert('Failed to create bank account. Please try again.');
                }
            } catch (error) {
                console.error('Error creating bank account:', error);
                alert('Error creating bank account. Please try again.');
            }
        } else if (currentStep === 2) {
            if (!currentAccountId) {
                console.error('No account ID available for document upload');
                alert('Account ID not found. Please go back and create the account again.');
                return;
            }

            try {
                console.log('Using account ID for uploads:', currentAccountId);

                if (formData.idDocument) {
                    console.log('Uploading ID document...');
                    const idResult = dispatch(uploadIdDocuments({
                        accountId: currentAccountId,
                        file: formData.idDocument
                    }));
                    console.log('ID upload result:', idResult);
                }

                if (formData.passbookDocument) {
                    console.log('Uploading passbook document...');
                    const passbookResult = dispatch(uploadPassbookDocuments({
                        accountId: currentAccountId,
                        file: formData.passbookDocument
                    }));
                    console.log('Passbook upload result:', passbookResult);
                }

                setCurrentStep(currentStep + 1);
            } catch (error) {
                console.error('Error uploading documents:', error);
                alert('Error uploading documents. Please try again.');
            }
        }
    };

    const handleSubmit = () => {
        console.log('Bank account setup completed');

        dispatch(fetchBankDetail());

        setShowForm(false);
        setCurrentStep(1);

        setFormData({
            bankName: '',
            accountNumber: '',
            ifscCode: '',
            swiftCode: '',
            accountHolderName: '',
            termsAccepted: false,
            idDocument: null,
            passbookDocument: null,
            finalTermsAccepted: false
        });
    };

    const handleDelete = async (bankDetailId) => {
        if (globalThis.confirm('Are you sure you want to delete this bank account?')) {
            try {
                const result = await dispatch(deleteBankDetails(bankDetailId));
                if (deleteBankDetails.fulfilled.match(result)) {
                    dispatch(fetchBankDetail());
                }
            } catch (error) {
                console.error('Error deleting bank account:', error);
            }
        }
    };

    const handleEdit = (account) => {
        setSelectedAccount(account);
        setShowEditBank(true);
    };

    const handleCloseEdit = () => {
        setShowEditBank(false);
        setSelectedAccount(null);
        dispatch(fetchBankDetail());
    };

    const handleUpdateDoc = (accountId, docType) => {
        setUpdateDocData({ accountId, docType });
        setShowUpdateDoc(true);
    };

    const handleCloseUpdateDoc = () => {
        setShowUpdateDoc(false);
        setUpdateDocData({ accountId: null, docType: null });
    };

    const handleWithdrawClick = () => {
        if (bankAccounts.length > 0) {
            setSelectedWithdrawAccount(bankAccounts[0]);
            setShowWithdraw(true);
        }
    };

    const handleCloseWithdraw = () => {
        setShowWithdraw(false);
        setSelectedWithdrawAccount(null);
    };

    const renderStep1 = () => (
        <div className="step_content">
            <h2>Bank Account Details</h2>
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
            <div className="checkbox_group">
                <input
                    id="check"
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                />
                <label htmlFor="check">I accept the terms and conditions of an app</label>
            </div>
            <button
                className="continue_btn"
                onClick={handleContinue}
                disabled={!formData.termsAccepted || loading}
            >
                {loading ? 'Creating Account...' : 'Continue'}
            </button>
        </div>
    );

    const renderStep2 = () => (
        <div className="step_content">
            <h2>Upload Documents</h2>
            <div className="form_group">
                <label htmlFor="id_input" className="vhh">Upload your valid ID document</label>
                <input
                    id="id_input"
                    type="file"
                    name="idDocument"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileChange}
                />
            </div>
            <div className="form_group">
                <label htmlFor="pass_input" className="vhh">Upload your valid passbook document</label>
                <input
                    id="pass_input"
                    type="file"
                    name="passbookDocument"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileChange}
                />
            </div>
            <button
                className="add_bank_btn"
                onClick={handleContinue}
                disabled={!formData.idDocument || !formData.passbookDocument}
            >
                Add Bank Account
            </button>
        </div>
    );

    const renderStep3 = () => (
        <div className="step_content">
            <div className="image_section">
                <img src={illu} alt="Verification" />
            </div>
            <h2><strong>Your account under verification</strong></h2>
            <p>Please read the terms carefully before accepting. Review the permissions requested by the app (e.g., data access) and proceed only if you are comfortable with them.</p>
            <div className="checkbox_group">
                <input
                    id="ckeck"
                    type="checkbox"
                    name="finalTermsAccepted"
                    checked={formData.finalTermsAccepted}
                    onChange={handleInputChange}
                />
                <label htmlFor="check">I accept the terms and conditions</label>
            </div>
            <button
                className="submit_btn"
                onClick={handleSubmit}
                disabled={!formData.finalTermsAccepted}
            >
                Submit
            </button>
        </div>
    );

    const renderMainContent = () => {
        if (bankAccounts.length > 0) {
            return (
                <div className="bank_details">
                    <h2>Bank Account Details</h2>
                    {bankAccounts.map((account) => {
                        const { id, accountNo, bankName, accountHolderName, ifscCode, swiftCode, documentFile, passbookFile } = account;

                        return (
                            <div key={id} className="bank_account">
                                <p><strong>Account Number:</strong> {accountNo}</p>
                                <p><strong>Bank Name:</strong> {bankName}</p>
                                <p><strong>Account Holder:</strong> {accountHolderName}</p>
                                <p><strong>IFSC Code:</strong> {ifscCode}</p>
                                <p><strong>SWIFT Code:</strong> {swiftCode}</p>
                                <div className="actionbtns">
                                    <button className="deletebtn pp" onClick={() => handleDelete(id)}><AiOutlineDelete size={27} /></button>
                                    <button className="editbttn pp" onClick={() => handleEdit(account)}><BsPencilSquare size={22} /></button>
                                </div>
                                <div className="uploaded_documents">
                                    <h3>Uploaded Documents</h3>
                                    <div className="docx">
                                        <div className="document_item">
                                            <p><strong>Identity</strong></p>
                                            {documentFile ? (
                                                <a href={documentFile} target="_blank" rel="noopener noreferrer">
                                                    <img src={documentFile} alt="Identity Document" className="document_preview" />
                                                </a>
                                            ) : <p>Not uploaded</p>}
                                            <button className="updatedoc updateee" onClick={() => handleUpdateDoc(id, 'identity')}><BsPencilSquare size={20} /></button>
                                        </div>
                                        <div className="document_item">
                                            <p><strong>Passbook</strong></p>
                                            {passbookFile ? (
                                                <a href={passbookFile} target="_blank" rel="noopener noreferrer">
                                                    <img src={passbookFile} alt="Passbook Document" className="document_preview" />
                                                </a>
                                            ) : <p>Not uploaded</p>}
                                            <button className="updatepass updateee" onClick={() => handleUpdateDoc(id, 'passbook')}><BsPencilSquare size={20} /></button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <button className="continueWithdraw" onClick={handleWithdrawClick}>Withdraw Amount</button>
                </div>
            );
        }

        if (showForm) {
            return (
                <div className="bank_form">
                    <div className="step_indicator">
                        <span className={currentStep >= 1 ? 'active' : ''}>1</span>
                        <span className={currentStep >= 2 ? 'active' : ''}>2</span>
                        <span className={currentStep >= 3 ? 'active' : ''}>3</span>
                    </div>
                    {currentStep === 1 && renderStep1()}
                    {currentStep === 2 && renderStep2()}
                    {currentStep === 3 && renderStep3()}
                </div>
            );
        }

        return (
            <div className="no_bank_account">
                <div className="image_sectio">
                    <img src={illu} alt="" />
                </div>
                <h2>No Bank account found</h2>
                <p>Sorry, the page you are looking for doesn't exist or has been removed. Keep exploring out site:</p>
                <button className="add_bank_btn" onClick={handleAddBankAccount}>
                    Add Bank account
                </button>
            </div>
        );
    };

    const renderContent = () => {
        if (showEditBank) {
            return <EditBank account={selectedAccount} onClose={handleCloseEdit} />;
        }
        
        if (showUpdateDoc) {
            return (
                <UpdateDoc 
                    accountId={updateDocData.accountId} 
                    docType={updateDocData.docType} 
                    onClose={handleCloseUpdateDoc} 
                />
            );
        }

        if (showWithdraw) {
            return <Withdraw account={selectedWithdrawAccount} onClose={handleCloseWithdraw} availableBalance={5000} />;
        }
        
        return (
            <div className="add_bank_modal">
                <div className="modal_content">
                    {renderMainContent()}
                    <button className="close_btn" onClick={onClose}>X</button>
                </div>
            </div>
        );
    };

    return (
        <>
            {renderContent()}
        </>
    );
};

AddBankAc.propTypes = {
    onClose: PropTypes.func.isRequired
};

export default AddBankAc;