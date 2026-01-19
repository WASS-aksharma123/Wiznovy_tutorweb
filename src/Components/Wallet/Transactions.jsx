import React, { useState } from 'react'
import { FaSearch, FaFilter, FaDownload, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import '../../assets/Styles/Wallet/Transactions.scss'

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  
  const transactions = [
    { id: 1, type: 'credit', amount: 250, description: 'Course Payment Received', date: '2024-01-15', status: 'completed' },
    { id: 2, type: 'debit', amount: 50, description: 'Platform Fee', date: '2024-01-14', status: 'completed' },
    { id: 3, type: 'credit', amount: 180, description: 'Tutoring Session Payment', date: '2024-01-12', status: 'completed' },
    { id: 4, type: 'debit', amount: 25, description: 'Withdrawal Fee', date: '2024-01-10', status: 'completed' },
    { id: 5, type: 'credit', amount: 320, description: 'Book Sale Revenue', date: '2024-01-08', status: 'pending' }
  ]

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || transaction.type === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <div className="transactions_container">
      <div className="transactions_header">
        <h2>Transaction History</h2>
        <button className="export_btn">
          <FaDownload /> Export
        </button>
      </div>

      <div className="transactions_controls">
        <div className="search_box">
          <FaSearch className="search_icon" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter_box">
          <FaFilter className="filter_icon" />
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Transactions</option>
            <option value="credit">Credits</option>
            <option value="debit">Debits</option>
          </select>
        </div>
      </div>

      <div className="transactions_list">
        {filteredTransactions.map(transaction => (
          <div key={transaction.id} className="transaction_item">
            <div className="transaction_icon">
              {transaction.type === 'credit' ? 
                <FaArrowDown className="credit_icon" /> : 
                <FaArrowUp className="debit_icon" />
              }
            </div>
            
            <div className="transaction_details">
              <h4>{transaction.description}</h4>
              <p className="transaction_date">{transaction.date}</p>
            </div>
            
            <div className="transaction_amount">
              <span className={`amount ${transaction.type}`}>
                {transaction.type === 'credit' ? '+' : '-'}${transaction.amount}
              </span>
              <span className={`status ${transaction.status}`}>
                {transaction.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredTransactions.length === 0 && (
        <div className="no_transactions">
          <p>No transactions found</p>
        </div>
      )}
    </div>
  )
}

export default Transactions
