import React from "react";
import { useAuth } from "../../context/AuthContext.utils";

function Logout() {
  const { handleLogout } = useAuth();
  const handleSubmit = async () => {
    await handleLogout();
  };
  return (
    <div>
      <button onClick={handleSubmit}>Logout</button>
    </div>
  );
}

export default Logout;
