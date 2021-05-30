import React from "react";

interface NotFoundProps {
  className?: string;
}

export const NotFound: React.FC<NotFoundProps> = ({ className }) => {
  return (
    <h1 className={className} style={{ color: "#dbd8e3" }}>
      Page not found:(
    </h1>
  );
};
