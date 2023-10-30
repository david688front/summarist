import React from "react";

interface Props {
  width: string;
  height: string;
  borderRadius?: string;
}

const Skeleton = ({ width, height, borderRadius }: Props) => {
  return (
    <div
      className="skeleton-box"
      style={{
        width,
        height,
        borderRadius,
      }}
    ></div>
  );
};

export default Skeleton;
