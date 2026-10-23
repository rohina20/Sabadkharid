const shortenText = (text = "") => {
  const words = text.split(" ");
  return words.length > 3 ? `${words.slice(0, 3).join(" ")}...` : text;
};

const searchProducts = (products, search) => {
  if (!search) return products;
  return products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );
};

const filterProducts = (products, category) => {
  if (!category || category.toLowerCase() === "all") return products;
  return products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );
};

const createQueryObject = (currentQuery, newQuery) => {
  const nextQuery = { ...currentQuery, ...newQuery };

  if (!nextQuery.category || nextQuery.category.toLowerCase() === "all") {
    delete nextQuery.category;
  }
  if (!nextQuery.search) {
    delete nextQuery.search;
  }
  return nextQuery;
};

const getInitialQuery = (searchParams) => {
  const query = {};
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  if (category) query.category = category;
  if (search) query.search = search;
  return query;
};

const sumProducts = (products) => {
  const itemsCounter = products.reduce(
    (counter, product) => counter + product.quantity,
    0
  );
  const total = products
    .reduce((sum, product) => sum + product.price * product.quantity, 0)
    .toFixed(2);

  return { itemsCounter, total };
};

const productQuantity = (state, id) => {
  const item = state.selectedItems.find((product) => product.id === id);
  return item ? item.quantity : 0;
};

export {
  shortenText,
  searchProducts,
  filterProducts,
  createQueryObject,
  getInitialQuery,
  sumProducts,
  productQuantity,
};
