import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const roles = ["admin", "agent", "user"];
const RoleDropdown = ({ currentRole, onChange }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {currentRole}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {roles.map((role) => (
          <DropdownMenuItem
            key={role}
            onClick={() => onChange(role)}
            className={role === currentRole ? "bg-gray-200" : ""}
          >
            {role}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RoleDropdown;
