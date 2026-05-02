import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaSearch, FaFilter, FaDownload, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { fetchPayouts } from '../../store/walletSlice'
import { exportPayoutsToPDF } from '../../utils/pdfExport'
import { exportInvoiceToPDF } from '../../utils/invoiceExport'
import Modal from '../Modals/Modal'
import '../../assets/Styles/Wallet/Transactions.scss'
import pendingimg from '../../assets/Images/Pending_img.png'
import approvedimg from '../../assets/Images/Approved_img.png'
import rejectedimg from '../../assets/Images/Rejected_img.png'
import { SlExclamation } from "react-icons/sl";


const Transactions = () => {
  const dispatch = useDispatch()
  const { payouts, loading, error } = useSelector(state => state.wallet)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [modalConfig, setModalConfig] = useState({ isOpen: false, heading: '', subheading: '' })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 15

  useEffect(() => {
    dispatch(fetchPayouts())
  }, [dispatch])

  const handleDownloadInvoice = (payout) => {
    console.log('Downloading invoice for payout:', payout)
    try {
      const success = exportInvoiceToPDF(payout)
      if (success) {
        console.log('Invoice PDF generated successfully')
      }
    } catch (error) {
      console.error('Invoice generation failed:', error)
      setModalConfig({
        isOpen: true,
        heading: 'Invoice Generation Failed',
        subheading: `Failed to generate invoice PDF: ${error.message}`
      })
    }
  }

  const handleExportPDF = () => {
    console.log('Exporting payouts:', payouts)
    if (!payouts || payouts.length === 0) {
      setModalConfig({
        isOpen: true,
        heading: 'No Data Available',
        subheading: 'No payout data available to export'
      })
      return
    }

    try {
      const latest20Payouts = [...payouts]
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
        .slice(0, 20)
      const success = exportPayoutsToPDF(latest20Payouts)
      if (success) {
        console.log('Payouts PDF exported successfully')
      }
    } catch (error) {
      console.error('Export failed:', error)
      setModalConfig({
        isOpen: true,
        heading: 'Export Failed',
        subheading: `Failed to export PDF: ${error.message}`
      })
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PENDING': return <img src={pendingimg} alt="Pending" />
      case 'APPROVED': return <img src={approvedimg} alt="Approved" />
      case 'REJECTED': return <img src={rejectedimg} alt="Rejected" />
      default: return <img src={pendingimg} alt="Pending" />
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const filteredPayouts = (payouts || []).filter(payout => {
    const matchesSearch = (payout.paymentMethod || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (payout.amount || '').toString().includes(searchTerm) ||
      (payout.status || '').toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || (payout.status || '').toLowerCase() === filterType.toLowerCase()

    const payoutDate = new Date(payout.createdAt)
    const matchesDateRange = (!startDate || payoutDate >= new Date(startDate)) &&
      (!endDate || payoutDate <= new Date(endDate))

    return matchesSearch && matchesFilter && matchesDateRange
  })

  // Pagination calculations
  const totalPages = Math.ceil(filteredPayouts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPayouts = filteredPayouts.slice(startIndex, endIndex)

  // Calculate total approved earnings
  const totalApprovedEarnings = filterType === 'approved' 
    ? filteredPayouts.reduce((total, payout) => {
        const amount = Number.parseFloat(payout.amount) || 0
        return total + amount
      }, 0)
    : 0

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, filterType, startDate, endDate])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const renderPagination = () => {
    if (totalPages <= 1) return null

    const pages = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    return (
      <div className="pagination_container">
        <div className="pagination_info">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredPayouts.length)} of {filteredPayouts.length} transactions
        </div>
        
        <div className="pagination_controls">
          <button 
            className="pagination_btn prev" 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>

          {startPage > 1 && (
            <>
              <button 
                className="pagination_btn" 
                onClick={() => handlePageChange(1)}
              >
                1
              </button>
              {startPage > 2 && <span className="pagination_ellipsis">...</span>}
            </>
          )}

          {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
            const page = startPage + i
            return (
              <button
                key={page}
                className={`pagination_btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            )
          })}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="pagination_ellipsis">...</span>}
              <button 
                className="pagination_btn" 
                onClick={() => handlePageChange(totalPages)}
              >
                {totalPages}
              </button>
            </>
          )}

          <button 
            className="pagination_btn next" 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    )
  }

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
      <>
        <div className="transactions_list">
          {currentPayouts.map(payout => (
            <div key={payout.id} className="transaction_item">
              <div className="transaction_icon">
                {getStatusIcon(payout.status)}
              </div>

              <div className="transaction_details">
                <h4><strong>{(payout.paymentMethod || 'Bank Transfer').replace('_', ' ')}</strong></h4>
                <p className="transaction_date">{formatDate(payout.createdAt)}</p>
                {payout.notes && <p className="transaction_notes">{payout.notes}</p>}
                {payout.transactionId && <p className="transaction_id">ID: {payout.transactionId}</p>}
              </div>

              <div className="transaction_amount">
                <span className="amount">
                  ${payout.amount || '0.00'}
                </span>
                <span className={`status ${(payout.status || 'pending').toLowerCase()}`}>
                  {payout.status || 'PENDING'}
                </span>
                <button
                  className="download_invoice_btn"
                  onClick={() => handleDownloadInvoice(payout)}
                  title="Download Invoice"
                >
                  <FaDownload />
                </button>
              </div>

            </div>
          ))}
        </div>
        {renderPagination()}
      </>
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

        <div className="date_range_box">
          <input
            type="date"
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <span>to</span>
          <input
            type="date"
            placeholder="End Date"
            value={endDate}
            min={startDate || new Date().toISOString().split('T')[0]}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {renderContent()}

      {filterType === 'approved' && !loading && !error && filteredPayouts.length > 0 && (
        <div className="total_earnings_section">
          <div className="total_earnings_card">
            <div className="earnings_icon">
              <img src={approvedimg} alt="Total Earnings" />
            </div>
            <div className="earnings_details">
              <h3>Total Approved Earnings</h3>
              <p className="earnings_count">{filteredPayouts.length} approved transaction{filteredPayouts.length !== 1 ? 's' : ''}</p>
            </div>
            <div className="earnings_amount">
              <span className="total_amount">${totalApprovedEarnings.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && filteredPayouts.length === 0 && (
        <div className="no-sessions">
          <SlExclamation size={50} style={{marginTop:'2rem'}} />
          No payouts found
        </div>
      )}

      <Modal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig({ isOpen: false, heading: '', subheading: '' })}
        heading={modalConfig.heading}
        subheading={modalConfig.subheading}
        buttonText="OK"
      />
    </div>
  )
}

export default Transactions
