import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { category } = useParams();
  const getProducts = () => {
    setProducts([]);
    axios
      .get(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) => {
        setProducts(res.data);
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
        <div className="flex flex-wrap">
          {products.map((product) => {
            return (
              <div
                key={product.id}
                onClick={() => navigate(`/productDetail/${product.id}`)}
                className="w-96 h-96 flex flex-col justify-between
        rounded overflow-hidden shadow-lg hover:cursor-pointer"
              >
                <img className="h-1/2" src={product.image} alt="" />
                <div className="px-6 py-4">
                  <p className="text-gray-700 text-base">{product.title}</p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    Price {product.price}
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
