import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import RoleDropdown from "./RoleDropdown";
import useUsers from "../../hooks/useUsers.js";

const UserTable = () => {
  const { users, loading, error, deleteUser, updateUserRole } = useUsers();

  if (loading) return <p className="p-4">Loading users...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <Card>
      <CardContent className="p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">
                    <RoleDropdown
                      currentRole={user.role}
                      onRoleChange={(newRole) =>
                        updateUserRole(user._id, newRole)
                      }
                    />
                  </td>
                  <td className="p-2 flex gap-2">
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteUser(user._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default UserTable;
