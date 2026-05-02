import jsPDF from 'jspdf'
import logo from '../assets/Images/Logo.png'

export const exportInvoiceToPDF = (payout) => {
  try {
    const doc = new jsPDF()

    const pageWidth = doc.internal.pageSize.getWidth()

    /* ================= HEADER ================= */
    doc.setFillColor(17, 61, 56) // Blue header
    doc.rect(0, 0, pageWidth, 30, 'F')

    // Add logo in center
    doc.addImage(logo, 'PNG', (pageWidth - 70) / 2, 6, 70, 18)

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(12)
    doc.text('INVOICE', pageWidth - 20, 20, 'right')

    /* ================= BASIC INFO ================= */
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(11)

    doc.text(`Invoice Date`, 20, 45)
    doc.text(
      new Date(payout.createdAt || Date.now()).toLocaleDateString(),
      pageWidth - 20,
      45,
      'right'
    )

    doc.text(`Transaction ID`, 20, 55)
    doc.text(
      payout.transactionId || payout.id || 'N/A',
      pageWidth - 20,
      55,
      'right'
    )

    /* ================= STATUS BADGE ================= */
    const status = (payout.status || 'PENDING').toUpperCase()

    const statusColors = {
      APPROVED: [46, 204, 113],
      REJECTED: [231, 76, 60],
      PENDING: [241, 196, 15],
    }

    const badgeColor = statusColors[status] || statusColors.PENDING

    doc.setFillColor(...badgeColor)
    doc.roundedRect(pageWidth - 60, 62, 40, 10, 3, 3, 'F')

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(10)
    doc.text(status, pageWidth - 40, 69, 'center')

    doc.setTextColor(0, 0, 0)

    /* ================= SECTION: PAYMENT DETAILS ================= */
    doc.setFillColor(245, 247, 250)
    doc.roundedRect(15, 80, pageWidth - 30, 55, 4, 4, 'F')

    doc.setFontSize(14)
    doc.text('Payment Details', 20, 95)

    doc.setFontSize(11)
    doc.text(
      'Payment Method:',
      20,
      108
    )
    doc.text(
      (payout.paymentMethod || 'Bank Transfer').replace('_', ' '),
      pageWidth - 20,
      108,
      'right'
    )

    doc.text('Amount:', 20, 118)
    doc.text(
      `$${payout.amount || '0.00'}`,
      pageWidth - 20,
      118,
      'right'
    )

    if (payout.notes) {
      doc.text('Notes:', 20, 128)
      doc.text(payout.notes, pageWidth - 20, 128, 'right')
    }

    /* ================= TOTAL ================= */
    doc.setDrawColor(220)
    doc.line(20, 150, pageWidth - 20, 150)

    doc.setFontSize(16)
    doc.text('Total Amount', 20, 165)
    doc.text(
      `$${payout.amount || '0.00'}`,
      pageWidth - 20,
      165,
      'right'
    )

    /* ================= FOOTER ================= */
    doc.setFontSize(9)
    doc.setTextColor(120)
    doc.text(
      'Thank you for your business!',
      pageWidth / 2,
      280,
      'center'
    )

    /* ================= SAVE ================= */
    const fileName = `invoice-${payout.transactionId || payout.id || Date.now()}-${new Date()
      .toISOString()
      .split('T')[0]}.pdf`

    doc.save(fileName)

    return true
  } catch (error) {
    console.error('PDF generation error:', error)
    throw new Error('Failed to generate PDF: ' + error.message)
  }
}
