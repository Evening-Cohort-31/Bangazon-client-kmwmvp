import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'
import { useAppContext } from '../context/state'
import { Button } from '../design'

export default function Navbar() {
  const { token, profile, setToken } = useAppContext()
  const router = useRouter()
  const hamburger = useRef()
  const navbar = useRef()


  const showMobileNavbar = () => {
    hamburger.current.classList.toggle('is-active')
    navbar.current.classList.toggle('is-active')
  }

  const getLoggedInButtons = () => {
    return (
      <div className="navbar-item has-dropdown is-hoverable">
        <a className="navbar-link">
          <span className="icon">
            <i className="fas fa-user-circle is-medium"></i>
          </span>
        </a>
        <div className="navbar-dropdown is-right">
          <Link href="/cart" className="navbar-item">Cart</Link>
          <Link href="/my-orders" className="navbar-item">My Orders</Link>
          <Link href="/payments" className="navbar-item">Payment Methods</Link>
          <Link href="/profile" className="navbar-item">Profile</Link>
          {
            profile.store ?
              <>
                <Link href={`/stores/${profile.store.id}`} className="navbar-item">View Your Store</Link>
                <Link href="/products/new" className="navbar-item">Add a new Product</Link>
              </>
              :
              <Link href="/stores/new" className="navbar-item">Interested in selling?</Link>
          }
          <hr className="navbar-divider"></hr>
          <a className="navbar-item" onClick={
            () => {
              localStorage.removeItem('token')
              setToken(null)
              router.push('/login')
            }}
          >
            Log out
          </a>
        </div>
      </div>
    )
  }

  const getLoggedOutButtons = () => {
    return (
      <div className="navbar-item">
        <div className="buttons">
          <Button to="/register" className="button is-primary">
            <strong>Sign up</strong>
          </Button>
          <Button to="/login" className="button is-light">
            Log in
          </Button>
        </div>
      </div>
    )
  }

  return (

    <nav className="navbar mb-3 is-warning px-5 is-fixed-top is-top" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">

        <Link href="/">
          <img src="/images/logo.png" alt="Logo" style={{ width: "4rem", height: "4rem" }} className="relative" />
        </Link>


        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" ref={hamburger} onClick={showMobileNavbar}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className="navbar-menu" ref={navbar}>
        <div className="navbar-start">
          <Link href="/products" className="navbar-item">Products</Link>
          <Link href="/stores" className="navbar-item">Stores</Link>
        </div>
        <div className="navbar-end">
          {
            token ? getLoggedInButtons() : getLoggedOutButtons()
          }
        </div>
      </div>
    </nav>
  )
}
