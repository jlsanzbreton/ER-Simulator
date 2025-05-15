// Componente principal para selección de roles
import React from "react";
import { RoleSelectorProps } from "../../types/simulacro";
import RoleCard from "./RoleCard";

const RoleSelector: React.FC<RoleSelectorProps> = ({ roles, onSelect }) => {
  return (
    <div>
      <h1>Selecciona tu Rol</h1>
      <div className="flex-center role-selector-row">
        {roles.map((rol) => (
          <RoleCard
            key={rol.code}
            rol={rol}
            onSelect={() => onSelect(rol.code)}
          />
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;
// Componente para cada tarjeta de rol
