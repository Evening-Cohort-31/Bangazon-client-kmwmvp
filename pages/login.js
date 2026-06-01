import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useAppContext } from '../context/state'
import { login } from '../data/auth'
import { Button, Title, Form, FormField } from '../design'

export default function Login() {
  const { setToken } = useAppContext()
  const username = useRef('')
  const password = useRef('')
  const router = useRouter()

  const [loginError, setLoginError] = useState(null)

  const submit = (e) => {
    e.preventDefault()
    setLoginError(null)

    const user = {
      username: username.current.value,
      password: password.current.value,
    }

    login(user)
      .then((res) => {
        if (res?.valid && res?.token) {
          localStorage.setItem('token', res.token)
          setToken(res.token)
          router.push('/')
        } else {
          setLoginError('Invalid username or password.')
        }
      })
      .catch(() => {
        setLoginError('Invalid username or password.')
      })
  }

  return (
    <div className="columns is-centered">
      <div className="column is-half">
        <Form className="box" onSubmit={submit}>
          <Title>Welcome Back!</Title>
          {loginError && <p className="notification is-danger is-light">{loginError}</p>}
          <FormField
            name="username"
            inputRef={username}
            type="text"
            label="Username"
          />
          <FormField
            name="password"
            inputRef={password}
            type="password"
            label="Password"
          />
          <div className="field is-grouped">
            <div className="control">
              <Button type="submit" color="link">Login</Button>
            </div>
            <div className="control">
              <Button to="/register" color="link" variant="light">Register</Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}

Login.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}
