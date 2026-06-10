import { useEffect, useState } from 'react'
import { CardLayout, Navbar, Layout, Table } from '../components'
import { getOrders } from '../data/orders'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const headers = ['Order Date', 'Total', 'Payment Method']

  useEffect(() => {
    getOrders().then(ordersData => {
      if (ordersData) {
        setOrders(ordersData)
      }
    })
  }, [])

  return (
    <>
      <CardLayout title="Your Orders">
        <Table headers={headers}>
          {
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order.created_date}</td>
                <td>${order.total}</td>
                <td>{order.payment_type?.merchant_name ?? "Payment type not selected"}</td>
              </tr>
            ))
          }
        </Table>
        <></>
      </CardLayout>
    </>
  )
}

Orders.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      <section className="container">{page}</section>
    </Layout>
  )
}
