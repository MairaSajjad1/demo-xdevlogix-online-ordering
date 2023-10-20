import React, { FunctionComponent } from "react";

const PurchaseIcon: FunctionComponent = () => {
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
        d="M10 14l2-2 2 2m0 0l-2 2-2-2m2 2V8"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8m2 0h14m0 0a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2h14a2 2 0 012 2z"
      />
    </svg>
  );
};

export default PurchaseIcon;
