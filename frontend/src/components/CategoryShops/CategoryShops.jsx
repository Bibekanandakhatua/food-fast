import "./CategoryShops.css";

const CategoryShops = ({
  category,
  shops,
  selectedShopId,
  setSelectedShopId,
  loading,
}) => {
  if (category === "All") {
    return null;
  }

  return (
    <div className="category-shops">
      <div className="category-shops-head">
        <h3>{category} Restaurants</h3>
      </div>

      {loading ? (
        <p className="category-shops-loading">Loading shops...</p>
      ) : shops.length === 0 ? (
        <p className="category-shops-empty">No shops available for this category.</p>
      ) : (
        <div className="category-shops-list">
          <button
            className={`shop-chip ${selectedShopId === "all" ? "active" : ""}`}
            onClick={() => setSelectedShopId("all")}
          >
            <strong>All Restaurants</strong>
            <span>View all dishes in {category}</span>
          </button>
          {shops.map((shop) => (
            <button
              key={shop._id}
              className={`shop-chip ${selectedShopId === shop._id ? "active" : ""}`}
              onClick={() => setSelectedShopId(shop._id)}
            >
              <strong>{shop.name}</strong>
              <span>
                {shop.rating}? | {shop.eta}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryShops;
