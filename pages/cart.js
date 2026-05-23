import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CardLayout from "../components/card-layout";
import Layout from "../components/layout";
import Navbar from "../components/navbar";
import CartDetail from "../components/order/detail";
import CompleteFormModal from "../components/order/form-modal";
import { completeCurrentOrder, getCart } from "../data/orders";
import { getPaymentTypes } from "../data/payment-types";
import { deleteCart, removeProductFromCart } from "../data/products";

export default function Cart() {
  const [cart, setCart] = useState({});
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [showCompleteForm, setShowCompleteForm] = useState(false);
  const router = useRouter();

  const refresh = () => {
    getCart().then((cartData) => {
      if (cartData) {
        setCart(cartData);
      }
    });
  };

  useEffect(() => {
    refresh();
    getPaymentTypes().then((paymentData) => {
      if (paymentData) {
        setPaymentTypes(paymentData);
      }
    });
  }, []);

  const completeOrder = (paymentTypeId) => {
    completeCurrentOrder(parseInt(paymentTypeId)).then(() =>
      router.push("/my-orders"),
    );
  };

  const emptyCart = () => {
    if (
      window.confirm(
        "Are you sure you want to delete all the items in your cart?",
      )
    ) {
      deleteCart().then(() => {
        setCart({});
      });
    }
  };

  const removeProduct = (lineItemId) => {
    removeProductFromCart(lineItemId).then(refresh);
  };

  return (
    <>
      <CompleteFormModal
        showModal={showCompleteForm}
        setShowModal={setShowCompleteForm}
        paymentTypes={paymentTypes}
        completeOrder={completeOrder}
      />
      <CardLayout title="Your Cart">
        <CartDetail cart={cart} removeProduct={removeProduct} />
        <>
          <a
            className="card-footer-item"
            onClick={() => setShowCompleteForm(true)}
          >
            Complete Purchase
          </a>
          <a className="card-footer-item" onClick={emptyCart}>
            Delete Cart
          </a>
        </>
      </CardLayout>
    </>
  );
}

Cart.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      <section className="container">{page}</section>
    </Layout>
  );
};
