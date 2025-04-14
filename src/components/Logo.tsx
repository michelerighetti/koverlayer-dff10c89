
import React from "react";

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 32, className = "" }) => {
  return (
    <div 
      className={`bg-primary rounded-md flex items-center justify-center text-primary-foreground font-bold ${className}`}
      style={{ 
        width: size, 
        height: size,
        fontSize: size * 0.5 
      }}
    >
      K
    </div>
  );
};

export default Logo;
