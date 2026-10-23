import { FaListUl } from "react-icons/fa";
import { createQueryObject } from "../helper/helper";
import styles from "./Sidebar.module.css";
import { categories } from "../constants/list";

function Sidebar({ query, setQuery }) {
  const categoryHandler = (event) => {
    if (event.target.tagName !== "LI") return;

    const category = event.target.innerText.toLowerCase();
    setQuery((currentQuery) =>
      createQueryObject(currentQuery, { category })
    );
  };

  return (
    <div className={styles.sidebar}>
      <div>
        <FaListUl />
        <p>Categories</p>
      </div>
      <ul onClick={categoryHandler}>
        {categories.map((item) => (
          <li
            key={item.id}
            className={
              item.type.toLowerCase() === (query.category || "all").toLowerCase()
                ? styles.selected
                : undefined
            }
          >
            {item.type}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
