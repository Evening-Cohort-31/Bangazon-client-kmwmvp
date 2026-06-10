import { useEffect, useRef, useState } from "react"
import { FormField, Modal } from "../"

const normalizeAccountNumber = (accountNumber) => accountNumber.replace(/[\s-]/g, "")

const validateAccountNumber = (accountNumber) => {
  const normalizedAccountNumber = normalizeAccountNumber(accountNumber)

  if (!/^\d{13,19}$/.test(normalizedAccountNumber)) {
    return "Account number must contain 13 to 19 digits. Spaces and hyphens are allowed."
  }

  return ""
}

const validateExpirationDate = (expirationDate) => {
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expirationDate.trim())) {
    return "Expiration date must use MM/YY format."
  }

  return ""
}

export default function AddPaymentModal({
  isOpen,
  onClose,
  onConfirm,
}) {
  const merchantNameInput = useRef()
  const acctNumInput = useRef()
  const expirationDateInput = useRef()
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (!isOpen) {
      setErrors({})
    }
  }, [isOpen])

  const validateField = (field, value) => {
    const error = field === "acctNumber"
      ? validateAccountNumber(value)
      : validateExpirationDate(value)

    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: error,
    }))
  }

  const handleConfirm = () => {
    const accountNumber = acctNumInput.current.value
    const expirationDate = expirationDateInput.current.value.trim()
    const nextErrors = {
      acctNumber: validateAccountNumber(accountNumber),
      expirationDate: validateExpirationDate(expirationDate),
    }

    setErrors(nextErrors)

    if (nextErrors.acctNumber || nextErrors.expirationDate) {
      return
    }

    onConfirm({
      merchant_name: merchantNameInput.current.value.trim(),
      account_number: normalizeAccountNumber(accountNumber),
      expiration_date: expirationDate,
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
      <FormField
        name="merchantName"
        type="text"
        label="Merchant Name"
        inputRef={merchantNameInput}
      />
      <FormField
        name="acctNumber"
        type="text"
        label="Account Number"
        placeholder="1234 5678 9012 3456"
        inputRef={acctNumInput}
        inputMode="numeric"
        error={errors.acctNumber}
        onChange={(event) => validateField("acctNumber", event.target.value)}
      />
      <FormField
        name="expirationDate"
        type="text"
        label="Expiration Date"
        placeholder="MM/YY"
        inputRef={expirationDateInput}
        error={errors.expirationDate}
        onChange={(event) => validateField("expirationDate", event.target.value)}
      />
    </Modal>
  )
}
