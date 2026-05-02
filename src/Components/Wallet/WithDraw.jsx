import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { createPayout, fetchBalance } from '../../store/walletSlice';
import Modal from '../Modals/Modal';
import '../../assets/Styles/Wallet/Withdraw.scss';

const Withdraw = ({ account, onClose }) => {
    const dispatch = useDispatch();
    const { payoutLoading, balance } = useSelector(state => state.wallet);
    const [amount, setAmount] = useState('');
    const [withdrawAll, setWithdrawAll] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        dispatch(fetchBalance());
    }, [dispatch]);

    const handleAmountChange = (e) => {
        const value = e.target.value.replaceAll(/\D/g, '');
        setAmount(value);
        if (value) setWithdrawAll(false);
    };

    const handleWithdrawAllChange = (e) => {
        const checked = e.target.checked;
        setWithdrawAll(checked);
        if (checked) {
            if (balance <= 0) {
                alert('Insufficient balance to withdraw');
                setWithdrawAll(false);
                return;
            }
            setAmount(balance.toString());
        } else {
            setAmount('');
        }
    };

    const handleWithdraw = async () => {
        const withdrawAmount = Number.parseInt(amount, 10);

        if (!amount || withdrawAmount <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        if (withdrawAmount > balance) {
            setErrorMessage(`Available: $${balance}`);
            setShowErrorModal(true);
            return;
        }

        const payoutData = {
            amount: withdrawAmount,
            bankDetailId: account.id || 'bank-detail-id-here'
        };

        try {
            const result = await dispatch(createPayout(payoutData)).unwrap();
            setTransactionId(result.payout.id);
            setShowSuccessModal(true);
        } catch (error) {
            const errorMsg = error?.message || error;

            if (errorMsg.includes('API Error:')) {
                const jsonMatch = errorMsg.match(/\{.*\}/);
                if (jsonMatch) {
                    try {
                        const errorData = JSON.parse(jsonMatch[0]);
                        setErrorMessage(errorData.message || errorMsg);
                    } catch {
                        setErrorMessage(errorMsg);
                    }
                } else {
                    setErrorMessage(errorMsg);
                }
                setShowErrorModal(true);
            } else {
                setErrorMessage(errorMsg);
                setShowErrorModal(true);
            }
        }
    };

    return (
        <>
            <div className="withdraw_modal">
                <div className="modal_content">
                    <button className="close_btn" onClick={onClose}>X</button>
                    <div className="withdraw_form">
                        <h2>Withdraw Amount</h2>

                        <div className="bank_details_section">
                            <h3>Bank Account Details</h3>
                            <div className="detail_item">
                                <span className="label">Account Number:</span>
                                <span className="value">{account.accountNo}</span>
                            </div>
                            <div className="detail_item">
                                <span className="label">Bank Name:</span>
                                <span className="value">{account.bankName}</span>
                            </div>
                            <div className="detail_item">
                                <span className="label">Account Holder:</span>
                                <span className="value">{account.accountHolderName}</span>
                            </div>
                            <div className="detail_item">
                                <span className="label">IFSC Code:</span>
                                <span className="value">{account.ifscCode}</span>
                            </div>
                            <div className="detail_item">
                                <span className="label">SWIFT Code:</span>
                                <span className="value">{account.swiftCode}</span>
                            </div>
                        </div>

                        <div className="form_group">
                            <label htmlFor="withdrawAmount">Enter Amount</label>
                            <input
                                id="withdrawAmount"
                                type="text"
                                placeholder="Enter amount to withdraw"
                                value={amount}
                                onChange={handleAmountChange}
                                disabled={withdrawAll}
                                maxLength={5}
                            />
                        </div>

                        <div className="checkbox_group">
                            <input
                                id="withdrawAll"
                                type="checkbox"
                                checked={withdrawAll}
                                onChange={handleWithdrawAllChange}
                            />
                            <label htmlFor="withdrawAll">Withdraw All</label>
                        </div>

                        <button
                            className="continueWithdraw"
                            onClick={handleWithdraw}
                            disabled={payoutLoading}
                        >
                            {payoutLoading ? 'Processing...' : 'Withdraw Amount'}
                        </button>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={showSuccessModal}
                onClose={() => {
                    setShowSuccessModal(false);
                    onClose();
                }}
                heading="Payout Request Created"
                subheading={`Transaction ID: ${transactionId}`}
                buttonText="OK"
            />

            <Modal
                isOpen={showErrorModal}
                onClose={() => setShowErrorModal(false)}
                heading="Payout Request Failed"
                subheading={errorMessage}
                buttonText="OK"
            />

            <Modal
                isOpen={showErrorModal}
                onClose={() => setShowErrorModal(false)}
                heading="Insufficient wallet balance"
                subheading={errorMessage}
                buttonText="OK"
            />

            <Modal
                isOpen={showErrorModal}
                onClose={() => setShowErrorModal(false)}
                heading=""
                subheading={errorMessage}
                buttonText="OK"
            />
        </>
    );
};

Withdraw.propTypes = {
    account: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
};

export default Withdraw;
