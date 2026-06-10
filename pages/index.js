import { Navbar, Layout } from '../components'
import Products from './products'

export default function Index() {
  return (
    <Products />
  )
}

Index.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  )
}
