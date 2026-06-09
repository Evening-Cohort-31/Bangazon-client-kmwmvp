import { useState } from "react"
import { Modal } from "../"

export default function CompleteFormModal({
  isOpen,
  onClose,
  paymentTypes,
  onConfirm,
}) {
  const [selectedPayment, setSelectedPayment] = useState(0)

  const handleConfirm = () => {
    onConfirm(selectedPayment)
  }

  return (
    <Modal
      isOpen={isOpen}
      title="Complete Order"
      onClose={onClose}
      onConfirm={handleConfirm}
      confirmColor="success"
      confirmText="Complete Order"
    >
      <div className="select">
        <select value={selectedPayment} onChange={(event) => setSelectedPayment(event.target.value)}>
          <option value={0}>Select a payment type to complete your order</option>
          {
            paymentTypes.map(pt => <option key={pt.id} value={pt.id}>{pt.merchant_name} {pt.obscured_num}</option>)
          }
        </select>
      </div>
    </Modal>
  )
}
