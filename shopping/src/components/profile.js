/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
const Profile = () => {
  const [status, setStatus] = useState('Select-Status');
  const [showName, setShowName] = useState(false);
  const categories = useSelector((state) => state.allReducers.products);
  // const dataFromApi = axios.get("https://randomuser.me/api").then(res);
  return (
    <div>
      <div className="flex flex-col space-y-2">
        {categories.map((category) => {
          return <div className="bg-slate-500 w-36 rounded-lg p-2">{category}</div>;
        })}
      </div>
    </div>
  );
};

export default Profile;
