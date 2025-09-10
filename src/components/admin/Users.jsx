import React from "react";
import UserTable from "./UserTable";

const Users = () => {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Manage Users</h1>
      <UserTable />
    </div>
  );
};

export default Users;
