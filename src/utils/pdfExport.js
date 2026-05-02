import jsPDF from 'jspdf'

export const exportPayoutsToPDF = (payouts) => {
  try {
    const doc = new jsPDF()
    
    // Header
    doc.setFontSize(20)
    doc.text('Payout History Report', 20, 20)
    
    doc.setFontSize(12)
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35)
    doc.text(`Total Records: ${payouts.length}`, 20, 45)
    
    // Table headers
    const startY = 60
    doc.setFontSize(10)
    doc.text('Date', 20, startY)
    doc.text('Payment Method', 60, startY)
    doc.text('Amount', 120, startY)
    doc.text('Status', 160, startY)
    
    // Draw header line
    doc.line(20, startY + 2, 190, startY + 2)
    
    // Table rows
    let yPosition = startY + 10
    
    payouts.forEach((payout) => {
      if (yPosition > 270) { // New page if needed
        doc.addPage()
        yPosition = 20
      }
      
      const date = new Date(payout.createdAt || Date.now()).toLocaleDateString()
      const paymentMethod = (payout.paymentMethod || 'Bank Transfer').replace('_', ' ')
      const amount = `$${payout.amount || '0.00'}`
      const status = payout.status || 'PENDING'
      
      doc.text(date, 20, yPosition)
      doc.text(paymentMethod, 60, yPosition)
      doc.text(amount, 120, yPosition)
      doc.text(status, 160, yPosition)
      
      yPosition += 8
    })
    
    // Save the PDF
    const fileName = `payout-history-${new Date().toISOString().split('T')[0]}.pdf`
    doc.save(fileName)
    
    return true
  } catch (error) {
    console.error('PDF export error:', error)
    throw new Error('Failed to export PDF: ' + error.message)
  }
}