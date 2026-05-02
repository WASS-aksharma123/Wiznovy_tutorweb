import React from 'react'
import { Smile } from 'lucide-react'
import '../assets/Styles/PendingStatusPage.scss'


const PendingStatusPage = () => {


  return (
    <div className="pending-container">
      <div className="pending-content">
        <div className="pending-icon">
          <Smile className="clock-icon"/>
        </div>
        
        <h1 className="pending-title">Welcome to Wiznovy!</h1>
        
       
        
        
      </div>
    </div>
  )
}

export default PendingStatusPage