import { createContext, useContext, useReducer } from "react";
import { sumProducts } from "../helper/helper";

const initialState = {
  selectedItems: [],
  itemsCounter: 0,
  total: "0.00",
  checkout: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD-ITEM": {
      const exists = state.selectedItems.some(
        (item) => item.id === action.payload.id
      );
      const selectedItems = exists
        ? state.selectedItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.selectedItems, { ...action.payload, quantity: 1 }];

      return {
        ...state,
        selectedItems,
        ...sumProducts(selectedItems),
        checkout: false,
      };
    }
    case "REMOVE_ITEM": {
      const selectedItems = state.selectedItems.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        selectedItems,
        ...sumProducts(selectedItems),
      };
    }
    case "INCREASE": {
      const selectedItems = state.selectedItems.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return { ...state, selectedItems, ...sumProducts(selectedItems) };
    }
    case "DECREASE": {
      const selectedItems = state.selectedItems
        .map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
      return { ...state, selectedItems, ...sumProducts(selectedItems) };
    }
    case "CHECKOUT":
      return {
        selectedItems: [],
        itemsCounter: 0,
        total: "0.00",
        checkout: true,
      };
    default:
      return state;
  }
};

const CartContext = createContext(null);

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return [context.state, context.dispatch];
};

export default CartProvider;
export { useCart };
