import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCategories, setProduct, updateCart } from "../redux/actions/action";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { category } = useParams();
  const dispatch = useDispatch();
  const productFromStore = useSelector((state) => state.allReducers.products);
  const getProducts = () => {
    setProducts([]);
    axios
      .get(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) => {
        setProducts(res.data);
        dispatch(setProduct(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProducts();
  }, [category]);

  const navigate = useNavigate();
  return (
    <>
      {products.length > 0 ? (
        <div className="flex flex-wrap w-full p-5">
          {products.map((product) => {
            return (
              <div
                key={product.id}
              
                className="w-64 h-96 p-2 m-2 flex flex-col justify-between
                  rounded-lg overflow-hidden shadow-lg hover:bg-slate-100 hover:cursor-pointer"
              >
                <img 
                  onClick={() => navigate(`/productDetail/${product.id}`)}
                className="h-1/2" src={product.image} alt="" />
                <div className="px-6 py-4">
                  <p className="text-gray-700 text-base">{product.title}</p>
                </div>
                <div className="px-2 pt-4 pb-2 flex">
                  <span className="hover:bg-slate-500 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    Price {product.price}
                  </span>
                  <span 
                  onClick={() => dispatch(updateCart())}
                  className="hover:bg-slate-500 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    Add to cart
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <h6>loading..</h6>
      )}
    </>
  );
};

export default Products;
