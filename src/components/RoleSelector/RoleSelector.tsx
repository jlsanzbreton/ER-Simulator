// Componente principal para selección de roles
import React, { useState } from "react";
import { RoleSelectorProps, RolSimulacro } from "../../types/simulacro";
import Image from "next/image";

const RoleSelector: React.FC<RoleSelectorProps> = ({ roles, onSelect }) => {
  const [selectedRole, setSelectedRole] = useState<RolSimulacro | null>(null);

  const handleSelect = (roleCode: RolSimulacro) => {
    setSelectedRole(roleCode);
    // Pequeña animación antes de proceder
    setTimeout(() => onSelect(roleCode), 300);
  };

  return (
    <div className="fade-in">
      <h1 className="text-center">Selecciona tu Rol</h1>
      <p className="text-center mb-2">
        Elige el papel que desempeñarás durante este simulacro de emergencia
      </p>
      <div className="role-selector-row">
        {roles.map((rol) => (
          <button
            key={rol.code}
            type="button"
            className={`card card-min ${
              selectedRole === rol.code ? "selected animate-pulse" : ""
            }`}
            onClick={() => handleSelect(rol.code)}
          >
            {rol.icon && (
              <div className="text-center mb-1">
                <Image
                  src={rol.icon}
                  alt={rol.displayName}
                  width={72}
                  height={72}
                  className="role-icon"
                />
              </div>
            )}
            <h2 className="role-title text-center">{rol.displayName}</h2>
            <p className="role-desc">{rol.description}</p>
          </button>
        ))}
      </div>
      <div className="text-center mt-3">
        <div className="card card-max py-2">
          <h3>Importancia de la Selección de Rol</h3>
          <p>
            Cada rol tiene responsabilidades específicas y una perspectiva única
            sobre la gestión de emergencias. Tu elección determinará qué tipo de
            decisiones deberás tomar y cómo afectarán estas al desarrollo del
            incidente.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;
// Componente para cada tarjeta de rol
