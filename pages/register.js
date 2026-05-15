import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useAppContext } from '../context/state'
import { register } from '../data/auth'
import { validateEmail, validatePhoneNumber } from '../data/validators'
import { Button, FormField, Title } from '../design'

export default function Register() {
  const { setToken } = useAppContext()

  const firstName = useRef('')
  const lastName = useRef('')
  const email = useRef('')
  const username = useRef('')
  const password = useRef('')
  const address = useRef('')
  const phone_number = useRef('')
  const router = useRouter()

  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState(null)

  const submit = (e) => {
    e.preventDefault()

    const emailError = validateEmail(email.current.value)
    const phoneError = validatePhoneNumber(phone_number.current.value)

    if (emailError || phoneError) {
      setErrors({ email: emailError, phone_number: phoneError })
      return
    }

    setErrors({})
    setSubmitError(null)

    const user = {
      username: username.current.value,
      password: password.current.value,
      first_name: firstName.current.value,
      last_name: lastName.current.value,
      email: email.current.value,
      address: address.current.value,
      phone_number: phone_number.current.value,
    }

    register(user)
      .then((res) => {
        if (res?.token) {
          setToken(res.token)
          router.push('/products')
        }
      })
      .catch((err) => {
        if (err.status === 409) {
          setSubmitError('That username is already taken. Please choose a different one.')
        } else if (err.status === 400) {
          setSubmitError('Please fill in all required fields.')
        } else {
          setSubmitError('Something went wrong. Please try again.')
        }
      })
  }

  return (
    <div className="columns is-centered">
      <div className="column is-half">
        <form className="box" onSubmit={submit}>
          <Title>Welcome!</Title>
          {submitError && <p className="notification is-danger is-light">{submitError}</p>}
          <FormField label="First Name" name="firstName" inputRef={firstName} />
          <FormField label="Last Name" name="lastName" inputRef={lastName} />
          <FormField label="Email" type="email" name="email" inputRef={email} error={errors.email} />
          <FormField label="Username" name="username" inputRef={username} />
          <FormField label="Password" type="password" name="password" inputRef={password} />
          <FormField label="Address" name="address" inputRef={address} />
          <FormField label="Phone Number" type="tel" name="phone_number" inputRef={phone_number} error={errors.phone_number} />
          <div className="field is-grouped">
            <div className="control">
              <Button color="link" type="submit">Submit</Button>
            </div>
            <div className="control">
              <Button color="link" to="/products" variant="light">Cancel</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

Register.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}
