import React from "react";
import icon from "../img/icon.jpg";
import cart from "../img/cart.png";
import profile from "../img/profile.png";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Navbar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

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
      <div className="mx-auto px-1 h-12 w-full flex  border-2 justify-between">
        <button>
          <img src={icon} className="h-8" />
        </button>
        <div className={`w-2/5  flex flex-col z-10`}>
          <input
            type="text"
            className="w-full px-1 h-11"
            placeholder="search"
            value={searchText}
            onBlur={() => setSearchText("")}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />

          <div className="w-full flex flex-col border-2  bg-white shadow-md z-10 rounded-b-lg">
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
          </div>
        </div>
        <div>
          <button>
            <img src={cart} className="h-8" alt="cart" />
          </button>
          <button onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <img src={profile} className="h-8 ml-2" alt="profile" />
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
  const [showCategories, setShowCategories] = useState(false);
  const [categories, setCategories] = useState([]);
  const getCategories = () => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((res) => {
        setCategories(res ? res.data : "");
        setShowCategories(true);
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
                className="hover:cursor-pointer text-slate-500"
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
        <li className="h-30 w-20 bg-slate-100 z-10" >
         <button onClick={()=> navigate("/")} className="z-100">Home</button>
        </li>
        <li className="h-30 w-20 bg-slate-100 z-10" >
          <button className="z-100" onClick={()=> navigate("/profile")}>Profile</button>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
