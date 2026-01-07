import React, { useState } from "react";
import "../../assets/Styles/Wallet/Wallet.scss";
import {
  FaUniversity,
  FaWallet,
  FaCogs,
  FaBan,
  FaPercentage,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import AddBankAc from "./AddBankAc";

const Wallet = () => {
  const [showAddBankAc, setShowAddBankAc] = useState(false);

  const handleWithdrawClick = () => {
    setShowAddBankAc(true);
  };

  const handleCloseAddBankAc = () => {
    setShowAddBankAc(false);
  };
  return (
    <div className="wallet_container">
      {/* Top Balance Card */}
      <div className="balance_card">
        <div className="balance_left">
          <FaUniversity className="bank_icon" />
          <div>
            <p className="balance_title">Account Earning Balance</p>
            <h2 className="balance_amount">$ 6,983.99</h2>
          </div>
        </div>
        <span className="mail_icon">✉</span>
      </div>

      {/* Withdraw Button */}
      <button className="withdraw_btn" onClick={handleWithdrawClick}>Withdrawal amount</button>

      {/* Cards Section */}
      <div className="card_grid">
        <div className="info_card">
          <FaUniversity className="card_icon" />
          <h4>Bank account</h4>
          <p>Lorem ipsum is simply dummy text.</p>
          <span className="arrow">↗</span>
        </div>

        <div className="info_card">
          <FaWallet className="card_icon" />
          <h4>withdrawal</h4>
          <p>Lorem ipsum is simply dummy text.</p>
          <span className="arrow">↗</span>
        </div>

        <div className="info_card">
          <FaCogs className="card_icon" />
          <h4>process time</h4>
          <p>Lorem ipsum is simply dummy text.</p>
          <span className="arrow">↗</span>
        </div>

        <div className="info_card">
          <FaBan className="card_icon" />
          <h4>all rejection</h4>
          <p>Lorem ipsum is simply dummy text.</p>
          <span className="arrow">↗</span>
        </div>

        <div className="info_card">
          <FaPercentage className="card_icon" />
          <h4>platform fee</h4>
          <p>Lorem ipsum is simply dummy text.</p>
          <span className="arrow">↗</span>
        </div>

        <div className="info_card">
          <FaFileInvoiceDollar className="card_icon" />
          <h4>charges & Tax</h4>
          <p>Lorem ipsum is simply dummy text.</p>
          <span className="arrow">↗</span>
        </div>
      </div>

      {/* AddBankAc Modal */}
      {showAddBankAc && (
        <AddBankAc onClose={handleCloseAddBankAc} />
      )}
    </div>
  );
};

export default Wallet;
