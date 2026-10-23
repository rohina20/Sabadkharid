import { Link } from "react-router-dom";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { useCart } from "../context/CartContext";
import styles from "./layout.module.css";

function Layout({ children }) {
  const [state] = useCart();

  return (
    <>
      <header className={styles.header}>
        <Link to="/products">Bestshop</Link>
        <Link to="/checkout" aria-label="Shopping cart">
          <div>
            <PiShoppingCartSimpleBold />
            {!!state.itemsCounter && <span>{state.itemsCounter}</span>}
          </div>
        </Link>
      </header>
      {children}
      <footer className={styles.footer}>
        <p>Developed by Rohina</p>
      </footer>
    </>
  );
}

export default Layout;
