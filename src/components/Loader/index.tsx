import React, { CSSProperties } from "react";
import spinner from "../../assets/spinner.svg";
import "./index.scss";

const Loader: React.FC<{ style?: CSSProperties; className?: string }> = ({
  style,
  className,
}) => {
  return (
    <div className={`loader ${className ?? ""}`} style={style}>
      <img src={spinner} alt="loading icon" />
    </div>
  );
};

export default Loader;
