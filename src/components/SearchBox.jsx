import { ImSearch } from "react-icons/im";
import { createQueryObject } from "../helper/helper";
import styles from "./SearchBox.module.css";

function SearchBox({ search, setSearch, setQuery }) {
  const searchHandler = () => {
    setQuery((query) => createQueryObject(query, { search }));
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(event) => setSearch(event.target.value.toLowerCase())}
        onKeyDown={(event) => {
          if (event.key === "Enter") searchHandler();
        }}
      />
      <button onClick={searchHandler} aria-label="Search">
        <ImSearch />
      </button>
    </div>
  );
}

export default SearchBox;
