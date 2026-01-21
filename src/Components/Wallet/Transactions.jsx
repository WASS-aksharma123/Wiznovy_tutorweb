import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaSearch, FaFilter, FaDownload, FaClock, FaCheck, FaTimes } from 'react-icons/fa'
import { fetchPayouts } from '../../store/walletSlice'
import { exportPayoutsToPDF } from '../../utils/pdfExport'
import '../../assets/Styles/Wallet/Transactions.scss'

const Transactions = () => {
  const dispatch = useDispatch()
  const { payouts, loading, error } = useSelector(state => state.wallet)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  
  useEffect(() => {
    dispatch(fetchPayouts())
  }, [])

  const handleExportPDF = () => {
    const latest20Payouts = [...payouts]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 20)
    
    if (latest20Payouts.length === 0) {
      alert('No payout data available to export')
      return
    }
    
    exportPayoutsToPDF(latest20Payouts)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PENDING': return <FaClock className="pending_icon" />
      case 'APPROVED': return <FaCheck className="approved_icon" />
      case 'REJECTED': return <FaTimes className="rejected_icon" />
      default: return <FaClock className="pending_icon" />
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const filteredPayouts = payouts.filter(payout => {
    const matchesSearch = payout.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payout.amount.toString().includes(searchTerm) ||
                         payout.status.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || payout.status.toLowerCase() === filterType.toLowerCase()
    return matchesSearch && matchesFilter
  })

  const renderContent = () => {
    if (loading) {
      return (
        <div className="loading_state">
          <p>Loading payouts...</p>
        </div>
      )
    }
    
    if (error) {
      return (
        <div className="error_state">
          <p>Error: {error}</p>
        </div>
      )
    }
    
    return (
      <div className="transactions_list">
        {filteredPayouts.map(payout => (
          <div key={payout.id} className="transaction_item">
            <div className="transaction_icon">
              {getStatusIcon(payout.status)}
            </div>
            
            <div className="transaction_details">
              <h4>{payout.paymentMethod.replace('_', ' ')}</h4>
              <p className="transaction_date">{formatDate(payout.createdAt)}</p>
              {payout.notes && <p className="transaction_notes">{payout.notes}</p>}
              {payout.transactionId && <p className="transaction_id">ID: {payout.transactionId}</p>}
            </div>
            
            <div className="transaction_amount">
              <span className="amount">
                ${payout.amount}
              </span>
              <span className={`status ${payout.status.toLowerCase()}`}>
                {payout.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="transactions_container">
      <div className="transactions_header">
        <h2>Payout History</h2>
        <button className="export_btn" onClick={handleExportPDF}>
          <FaDownload /> Export
        </button>
      </div>

      <div className="transactions_controls">
        <div className="search_box">
          <FaSearch className="search_icon" />
          <input
            type="text"
            placeholder="Search payouts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter_box">
          <FaFilter className="filter_icon" />
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Payouts</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {renderContent()}

      {!loading && !error && filteredPayouts.length === 0 && (
        <div className="no_transactions">
          <p>No payouts found</p>
        </div>
      )}
    </div>
  )
}

export default Transactions
