import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [productDetail, setProductDetails] = useState();
  const idForUrl = id.slice(1);
  const getProductDetail = () => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        setProductDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProductDetail();
  }, []);
  return (
    <>
      {productDetail ? (
        <div>
          {productDetail.title}
          <div className="flex font-sans">
            <div className="flex-none w-72 h-72 relative">
              <img
                src={productDetail.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <form className="flex-auto p-6">
              <div className="flex flex-wrap">
                <h1 className="flex-auto text-lg font-semibold text-slate-900">
                  {productDetail.title}
                </h1>
                <div className="text-lg font-semibold text-slate-500">
                  Price {productDetail.price}
                </div>
              </div>
              <div className="flex space-x-4 mb-6 text-sm font-medium">
                <div className="flex-auto flex space-x-4">
                  <button
                    className="h-10 px-6 font-semibold rounded-md bg-black text-white"
                    type="submit"
                  >
                    Buy now
                  </button>
                  <button
                    className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
                    type="button"
                  >
                    Add to bag
                  </button>
                </div>
                <button
                  className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200"
                  type="button"
                  aria-label="Like"
                >
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-slate-700">
                {productDetail.description}
              </p>
            </form>
          </div>
        </div>
      ) : (
        <h6>loading..</h6>
      )}
    </>
  );
};

export default ProductDetail;
