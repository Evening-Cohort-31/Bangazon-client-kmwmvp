import Table from "../table"

export default function CartDetail({ cart, removeProduct }) {
  const headers = ['Product', 'Price', '']
  const footers = ['Total', cart.total, '']

  return (
    <Table headers={headers} footers={footers}>
      {
        cart.lineitems?.map(lineItem => {
          return (
            <tr key={lineItem.id}>
              <td>{lineItem.product.name}</td>
              <td>{lineItem.product.price}</td>
              <td>
                <span className="icon is-clickable" onClick={() => removeProduct(lineItem.id)}>
                  <i className="fas fa-trash"></i>
                </span>
              </td>
            </tr>
          )
        })
      }
    </Table>
  )
}
