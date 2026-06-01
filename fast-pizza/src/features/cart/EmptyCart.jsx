import BackButton from '../../ui/BackButton';

function EmptyCart() {
  return (
    <div>
      <BackButton to="/menu">&larr; Back to menu</BackButton>

      <p>Your cart is still empty. Start adding some pizzas :)</p>
    </div>
  );
}

export default EmptyCart;
