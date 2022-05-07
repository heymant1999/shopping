import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import shoppingCart from "../img/cart.png";
import user from "../img/user.png";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getData, setCategories } from "../redux/actions/action";

const Navbar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const cartValue = useSelector((state) => state.allReducers.cartValue);
  
  const getAllProducts = () => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setData(
          res.data.map((item) => {
            return item.title.toLowerCase();
          })
        );
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const updateSuggestions = (value) => {
    setSuggestions(
      value
        ? data
            .filter((word) => word.includes(value))
            .slice(0, 5)
            .map((w, i) =>
              i === 0
                ? { word: w, isSelected: true }
                : { word: w, isSelected: false }
            )
        : []
    );
  };
  useEffect(() => {
    updateSuggestions(searchText);
  }, [searchText]);

  return (
    <>
      <div className="mx-auto px-1 h-16 w-full flex  border-2 items-center justify-between  bg-black  ">
        <div className="flex text-slate-300 ml-2 text-3xl">eShop</div>
        <div className={`w-2/5  flex flex-col z-10`}>
          <input
            type="text"
            className="w-full px-1 h-8 bg-black text-slate-100"
            placeholder="  search..."
            value={searchText}
            onBlur={() => setSearchText("")}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />

          {/* <div className="w-full flex flex-col border-2  bg-white z-10 rounded-b-lg">
            {suggestions.map((suggestion) => {
              return (
                <div className="mt p-1 ">
                  <ul>
                    <li>
                      <button className="text-left px-2 ">
                        {suggestion.word}
                      </button>
                    </li>
                  </ul>
                </div>
              );
            })}
          </div> */}
        </div>
        <div className="flex mr-4 bg-slate-700 w-35 rounded-lg h-12">
          <button>
            <img src={shoppingCart} className="h-8 m-2" alt="cart" />
          </button>
          <div className="text-white text-lg font-medium">{cartValue}</div>
          <button onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <img src={user} className="h-8 m-2" alt="profile" />
          </button>
          {showProfileMenu && <ProfileMenu />}
        </div>
      </div>
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

function Sidebar() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.allReducers.categories);
  const getCategories = () => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((res) => {
        dispatch(setCategories(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const navigate = useNavigate();

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="min-h-screen  px-2 min-w-fit border-0 border-r-2 border-gray-200 ">
      <h1 className="text-xl">Categories</h1>
      {categories?.map((category) => {
        return (
          <div>
            <ul>
              <li
                className="hover:cursor-pointer hover:bg-slate-200 p-1 rounded-md text-slate-500"
                onClick={() => navigate(`/products/${category}`)}
              >
                <h6 className="mt-2">{category}</h6>
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function ProfileMenu() {
  const navigate = useNavigate();
  return (
    <div className="relative">
      <ul className="z-10">
        <li className="h-30 w-20 bg-slate-100 z-10">
          <button onClick={() => navigate("/")} className="z-100">
            Home
          </button>
        </li>
        <li className="h-30 w-20 bg-slate-100 z-10">
          <button className="z-100" onClick={() => navigate("/profile")}>
            Profile
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
