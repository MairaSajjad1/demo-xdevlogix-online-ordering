import React, { FunctionComponent } from "react";

const BarcodeIcon: FunctionComponent = () => {
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
        d="M4 8V4m0 0H2m0 0V2m0 0H2m18 0V2m0 0H6v20h12v-4m-1.5-8h-9m-1.5 0H7m3-8v14m0 0H7m0 0V6m0 0h3m3 0h3m0 0V4m0 0h-3m0 0V2m0 0h-3m3 0v2m0 0H7"
      />
    </svg>
  );
};

export default BarcodeIcon;
