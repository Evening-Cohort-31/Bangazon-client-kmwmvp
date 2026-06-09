import { useState, useEffect } from 'react'
import { CardLayout, Navbar, Layout, Table } from '../components'
import AddPaymentModal from '../components/payments/payment-modal'
import { addPaymentType, getPaymentTypes, deletePaymentType } from '../data/payment-types'

export default function Payments() {
  const headers = ['Merchant Name', 'Card Number', '']
  const [payments, setPayments] = useState([])
  const [showModal, setShowModal] = useState(false)
  const refresh = () => getPaymentTypes().then((data) => {
    if (data) {
      setPayments(data)
    }
  })

  useEffect(() => {
    refresh()
  }, [])

  const addNewPayment = (payment) => {
    addPaymentType(payment).then(() => {
      setShowModal(false)
      refresh()
    })
  }

  const removePayment = (paymentId) => {
    deletePaymentType(paymentId).then(() => {
      refresh()
    })
  }

  return (
    <>
      <AddPaymentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={addNewPayment}
      />
      <CardLayout title="Your Payment Methods">
        <Table headers={headers}>
          {
            payments.map(payment => (
              <tr key={payment.id}>
                <td>{payment.merchant_name}</td>
                <td>{payment.obscured_num}</td>
                <td>
                  <span className="icon is-clickable" onClick={() => removePayment(payment.id)}>
                    <i className="fas fa-trash"></i>
                  </span>
                </td>
              </tr>
            ))
          }
        </Table>
        <>
          <a className="card-footer-item" onClick={() => setShowModal(true)}>Add new Payment Method</a>
        </>
      </CardLayout>
    </>
  )
}

Payments.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}
