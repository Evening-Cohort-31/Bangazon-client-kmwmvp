// Custom 404 Page for Data Leaks and Bad URLs
import { Button, Layout, Navbar } from '../components'

export default function NotFound() {
  return (
    <section className="has-text-centered py-6">
      <h1 className="title">Page not found</h1>
      <p className="subtitle">The page you requested does not exist.</p>
      <Button to="/products" color="primary">
        Browse Products
      </Button>
    </section>
  )
}

NotFound.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}
