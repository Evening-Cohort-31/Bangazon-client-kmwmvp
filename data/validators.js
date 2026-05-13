export function validateEmail(email) {
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  return valid ? null : 'Please enter a valid email address.'
}

export function validatePhoneNumber(phone) {
  // Accepts: 5551234567, 555-123-4567, (555) 123-4567, +1 555-123-4567
  const valid = /^(\+?1[\s\-.]?)?(\(?\d{3}\)?[\s\-.]?)\d{3}[\s\-.]?\d{4}$/.test(phone.trim())
  return valid ? null : 'Please enter a valid phone number (e.g. 555-123-4567).'
}
