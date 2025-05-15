import React from "react";
import Image from "next/image";
import { RolInfo } from "../../types/simulacro";

interface RoleCardProps {
  rol: RolInfo;
  onSelect: () => void;
}

const RoleCard: React.FC<RoleCardProps> = ({ rol, onSelect }) => (
  <button className="card card-min" onClick={onSelect} tabIndex={0}>
    {rol.icon && (
      <Image
        src={rol.icon}
        alt={rol.displayName}
        width={56}
        height={56}
        className="role-icon"
      />
    )}
    <h2 className="role-title">{rol.displayName}</h2>
    <p className="role-desc">{rol.description}</p>
  </button>
);

export default RoleCard;
