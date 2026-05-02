import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchBalance } from '../../store/walletSlice';
import "../../assets/Styles/Wallet/Wallet.scss";
import { Link } from "react-router";
import {
  FaUniversity,
  FaWallet,
  FaCogs,
  FaBan,
  FaPercentage,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import { Loader2 } from "lucide-react";
import AddBankAc from "./AddBankAc";

const Wallet = () => {
  const [showAddBankAc, setShowAddBankAc] = useState(false);
  const [isWithdrawLoading, setIsWithdrawLoading] = useState(false);
  const dispatch = useDispatch();
  const { balance, loading } = useSelector(state => state.wallet);

  useEffect(() => {
    dispatch(fetchBalance());
  }, [dispatch]);


  const handleWithdrawClick = () => {
    setIsWithdrawLoading(true);
    // Small delay to show loader before modal renders
    setTimeout(() => {
      setShowAddBankAc(true);
      setIsWithdrawLoading(false);
    }, 300);
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
            <h2 className="balance_amount">{loading ? 'Loading...' : `$ ${balance || '0.00'}`}</h2>
          </div>
        </div>
        
      </div>

      {/* Withdraw Button */}
      <button 
        className={`withdraw_btn ${isWithdrawLoading ? 'loading' : ''}`} 
        onClick={handleWithdrawClick}
        disabled={isWithdrawLoading}
      >
        {isWithdrawLoading ? (
          <>
            <Loader2 size={16} className="spinning" />
            Loading...
          </>
        ) : (
          'Withdrawal amount'
        )}
      </button>

      {/* Cards Section */}
      <div className="card_grid">
        <Link to='/transactions'>
          <div className="info_card" >
          <FaUniversity className="card_icon" />
          <h4>Transaction History</h4>
          <p>Lorem ipsum is simply dummy text.</p>
          <span className="arrow">↗</span>
        </div>
        </Link>

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
