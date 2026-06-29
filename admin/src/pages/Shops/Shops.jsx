import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import "./Shops.css";

const categoryOptions = [
  "Salad",
  "Rolls",
  "Deserts",
  "Sandwich",
  "Cake",
  "Pure Veg",
  "Pasta",
  "Noodles",
];

const Shops = () => {
  const navigate = useNavigate();
  const { token, admin, apiUrl } = useContext(StoreContext);
  const [shops, setShops] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    rating: "4.2",
    eta: "25-35 min",
    categories: [],
  });

  const fetchShops = async () => {
    const response = await axios.get(`${apiUrl}/api/shop/list`);
    if (response.data.success) {
      setShops(response.data.data);
    }
  };

  const handleCategoryToggle = (category) => {
    setFormData((prev) => {
      const exists = prev.categories.includes(category);
      return {
        ...prev,
        categories: exists
          ? prev.categories.filter((item) => item !== category)
          : [...prev.categories, category],
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      `${apiUrl}/api/shop/add`,
      {
        name: formData.name,
        image: formData.image,
        rating: Number(formData.rating),
        eta: formData.eta,
        categories: formData.categories,
      },
      { headers: { token } }
    );

    if (response.data.success) {
      toast.success("Shop added");
      setFormData({
        name: "",
        image: "",
        rating: "4.2",
        eta: "25-35 min",
        categories: [],
      });
      fetchShops();
    } else {
      toast.error(response.data.message);
    }
  };

  const removeShop = async (shopId) => {
    const response = await axios.post(
      `${apiUrl}/api/shop/remove`,
      { id: shopId },
      { headers: { token } }
    );
    if (response.data.success) {
      toast.success("Shop removed");
      fetchShops();
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    if (!admin || !token) {
      toast.error("Please Login First");
      navigate("/");
      return;
    }

    fetchShops();
  }, [admin, token, navigate, apiUrl]);

  return (
    <div className="shops-page">
      <form className="shops-form" onSubmit={handleSubmit}>
        <h3>Add Shop</h3>
        <input
          type="text"
          placeholder="Shop name"
          value={formData.name}
          onChange={(event) =>
            setFormData((prev) => ({ ...prev, name: event.target.value }))
          }
          required
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={formData.image}
          onChange={(event) =>
            setFormData((prev) => ({ ...prev, image: event.target.value }))
          }
        />
        <div className="shops-row">
          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            placeholder="Rating"
            value={formData.rating}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, rating: event.target.value }))
            }
            required
          />
          <input
            type="text"
            placeholder="ETA (e.g. 25-35 min)"
            value={formData.eta}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, eta: event.target.value }))
            }
            required
          />
        </div>
        <div className="category-grid">
          {categoryOptions.map((category) => (
            <label key={category} className="category-chip">
              <input
                type="checkbox"
                checked={formData.categories.includes(category)}
                onChange={() => handleCategoryToggle(category)}
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
        <button type="submit">Save Shop</button>
      </form>

      <div className="shops-list">
        <h3>All Shops</h3>
        {shops.map((shop) => (
          <div className="shop-card" key={shop._id}>
            <div>
              <p className="shop-name">{shop.name}</p>
              <p className="shop-meta">
                Rating: {shop.rating} | ETA: {shop.eta}
              </p>
              <p className="shop-categories">{shop.categories.join(", ")}</p>
            </div>
            <button type="button" onClick={() => removeShop(shop._id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shops;
