import '../global.css'
import '../components/design-system/design.css'

export default function Bangazon({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(

    <Component {...pageProps} />
  )
}
