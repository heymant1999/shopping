import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
  return (
    <div>
        <button onClick={()=>navigate("/navbar")}>Navigate</button>
    </div>
  );
};

export default Dashboard;
