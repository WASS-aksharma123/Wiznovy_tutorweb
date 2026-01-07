import React, { useState } from "react";
import "../../assets/Styles/Wallet/AddBankAc.scss";
import illu from '../../assets/Images/Illustration.png'
const AddBankAc = ({ onClose }) => {
    const [bankAccounts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
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

    const handleAddBankAccount = () => {
        setShowForm(true);
        setCurrentStep(1);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files[0]
        }));
    };

    const handleContinue = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleSubmit = () => {
        console.log('Form submitted:', formData);
        setShowForm(false);
        setCurrentStep(1);
        // Reset form or handle submission
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
                disabled={!formData.termsAccepted}
            >
                Continue
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
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                />
            </div>
            <div className="form_group">
                <label htmlFor="pass_input" className="vhh">Upload your valid passbook document</label>
                <input
                id="pass_input"
                    type="file"
                    name="passbookDocument"
                    accept=".pdf,.jpg,.jpeg,.png"
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

    return (
        <div className="add_bank_modal">
            <div className="modal_content">
                {bankAccounts.length > 0 ? (
                    <div className="bank_details">
                        <h2>Bank Account Details</h2>
                        {bankAccounts.map((account, index) => (
                            <div key={index} className="bank_account">
                                <p><strong>Account Number:</strong> {account.accountNumber}</p>
                                <p><strong>Bank Name:</strong> {account.bankName}</p>
                                <p><strong>Account Holder:</strong> {account.accountHolder}</p>
                            </div>
                        ))}
                    </div>
                ) : showForm ? (
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
                ) : (
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
                )}
                <button className="close_btn" onClick={onClose}>X</button>
            </div>
        </div>
    );
};

export default AddBankAc;