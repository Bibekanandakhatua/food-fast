import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";
import CategoryShops from "../../components/CategoryShops/CategoryShops";
import MapSection from "../../components/MapSection/MapSection";
import { StoreContext } from "../../context/StoreContext";

const Home = () => {
  const { url } = useContext(StoreContext);
  const [category, setCategory] = useState("All");
  const [selectedShopId, setSelectedShopId] = useState("all");
  const [shops, setShops] = useState([]);
  const [displayFoods, setDisplayFoods] = useState([]);
  const [loadingFoods, setLoadingFoods] = useState(false);
  const [loadingShops, setLoadingShops] = useState(false);

  useEffect(() => {
    const fetchShops = async () => {
      if (category === "All") {
        setShops([]);
        setSelectedShopId("all");
        return;
      }

      setLoadingShops(true);
      const response = await axios.get(`${url}/api/shop/list`, {
        params: { category },
      });
      if (response.data.success) {
        setShops(response.data.data);
        setSelectedShopId("all");
      } else {
        setShops([]);
      }
      setLoadingShops(false);
    };

    fetchShops();
  }, [category, url]);

  useEffect(() => {
    const fetchFoods = async () => {
      setLoadingFoods(true);
      const params = {};
      if (category !== "All") {
        params.category = category;
      }
      if (category !== "All" && selectedShopId !== "all") {
        params.shopId = selectedShopId;
      }

      const response = await axios.get(`${url}/api/food/list`, { params });
      if (response.data.success) {
        setDisplayFoods(response.data.data);
      } else {
        setDisplayFoods([]);
      }
      setLoadingFoods(false);
    };

    fetchFoods();
  }, [category, selectedShopId, url]);

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <CategoryShops
        category={category}
        shops={shops}
        selectedShopId={selectedShopId}
        setSelectedShopId={setSelectedShopId}
        loading={loadingShops}
      />
      <FoodDisplay
        category={category}
        foodList={displayFoods}
        loading={loadingFoods}
      />
      <MapSection />
      <AppDownload />
    </div>
  );
};

export default Home;
