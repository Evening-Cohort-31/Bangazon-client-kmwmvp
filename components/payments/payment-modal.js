import { useRef } from "react"
import { Input } from "../form-elements"
import { Modal } from "../"

export default function AddPaymentModal({
  isOpen,
  onClose,
  onConfirm,
}) {
  const merchantNameInput = useRef()
  const acctNumInput = useRef()

  const handleConfirm = () => {
    onConfirm({
      acctNumber: acctNumInput.current.value,
      merchant: merchantNameInput.current.value,
    })
  }

  return (
    <Modal
      isOpen={isOpen}
      title="Add New Payment Method"
      onClose={onClose}
      onConfirm={handleConfirm}
      confirmColor="success"
      confirmText="Add Payment Method"
    >
      <Input
        id="merchantName"
        type="text"
        label="Merchant Name"
        refEl={merchantNameInput}
      />
      <Input
        id="accNum"
        type="text"
        label="Account Number"
        refEl={acctNumInput}
      />
    </Modal>
  )
}
