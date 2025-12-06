import React from 'react'
import updatekyc from "../assets/Images/updateKYC.png"
import { FaAngleRight } from "react-icons/fa6";
import '../assets/Styles/Wallet.scss'
import { GrTransaction } from "react-icons/gr";
import { AiOutlineDollarCircle } from "react-icons/ai";

const Wallet = () => {
  return (
    <div>
      <div className="wallet">
        <div className="updatekyc">
          <div className="upIcon">
            <img src={updatekyc} alt="Wiznovy" />
          </div>
          <div className="upText">
            <h3>Upgrade to full kYC wallet</h3>
            <p>topup with the credit card</p>
          </div>
          <FaAngleRight size={20} />

        </div>

        <div className="walletTopUp">
          <p>Balance of Wallet</p>
          <h2>$ 8493.00</h2>
          <p className='topup'>TOP UP WALLET</p>
          <div className="amounttt">
            <AiOutlineDollarCircle className='dollar'/>
            <input type="num" placeholder='Enter Amount'
            required
            className='amount' />
          </div>
          <div className="reco">
            <p>Recommended</p>
          </div>
          <div className="amountBtn">
            <button className='btnn'>$100</button>
            <button className='btnn'>$200</button>
            <button className='btnn'>$500</button>
            <button className='btnn'>$1000</button>
          </div>
          <div className="Proceed">
            <button className='probtn'>PROCEED TO TOPUP</button>
          </div>
          
        </div>
        <div className="transactions">
            <GrTransaction />
            <p>Wallet Transaction History</p>
            <FaAngleRight />

          </div>
      </div>
    </div>
  )
}

export default Wallet