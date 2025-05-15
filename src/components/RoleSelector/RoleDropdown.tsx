// src/components/RoleSelector/RoleDropdown.tsx
import React from "react";
import { RolInfo } from "../../types/simulacro";

interface RoleDropdownProps {
  roles: RolInfo[];
  selectedRole: RolInfo | null;
  onChange: (role: RolInfo) => void;
}

const RoleDropdown: React.FC<RoleDropdownProps> = ({
  roles,
  selectedRole,
  onChange,
}) => {
  return (
    <div className="card card-min card-centered">
      <label htmlFor="role-dropdown" className="role-title">
        Selecciona tu rol:
      </label>
      <select
        id="role-dropdown"
        className="mb-2 select-lg"
        value={selectedRole ? selectedRole.id.toString() : ""}
        onChange={(e) => {
          const selectedId = e.target.value;
          const rol = roles.find((r) => r.id.toString() === selectedId);
          if (rol) onChange(rol);
        }}
      >
        <option value="">Elige un rol...</option>
        {roles.map((rol) => (
          <option value={rol.id.toString()} key={rol.id}>
            {rol.displayName}
          </option>
        ))}
      </select>
      {selectedRole && (
        <div>
          <div className="role-title">{selectedRole.displayName}</div>
          <div className="role-desc">{selectedRole.description}</div>
        </div>
      )}
    </div>
  );
};

export default RoleDropdown;
