import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CardLayout, Navbar, Layout, Button } from "../components";
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

  // Check if the cart has items
  const hasItems = (cart.lineitems?.length ?? 0) > 0;

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
    // Only allow emptying the cart if there are items in it
    if (!hasItems) return;

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

  const openCompleteForm = () => {
    // Only allow opening the complete form if there are items in the cart
    if (hasItems) {
      setShowCompleteForm(true);
    }
  };

  return (
    <>
      <CompleteFormModal
        isOpen={showCompleteForm}
        onClose={() => setShowCompleteForm(false)}
        paymentTypes={paymentTypes}
        onConfirm={completeOrder}
      />
      <CardLayout title="Your Cart">
        <CartDetail cart={cart} removeProduct={removeProduct} />
        <>
          <Button
            className="card-footer-item"
            onClick={openCompleteForm}
            disabled={!hasItems}
          >
            Complete Purchase
          </Button>
          <Button
            className="card-footer-item"
            onClick={emptyCart}
            disabled={!hasItems}
          >
            Delete Cart
          </Button>
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
