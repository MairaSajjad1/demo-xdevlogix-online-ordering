import React, { FunctionComponent } from "react";

const RiderIcon: FunctionComponent = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 14c4.418 0 8-3.582 8-8H4c0 4.418 3.582 8 8 8zM4 8c0-3.313 2.687-6 6-6s6 2.687 6 6m0 0c0 2.21-1.791 4-4 4s-4-1.79-4-4m8 6l1.625 3.25M11.375 20h1.25"
      />
    </svg>
  );
};

export default RiderIcon;
