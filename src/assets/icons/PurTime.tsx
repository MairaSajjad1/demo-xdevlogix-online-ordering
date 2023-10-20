import React, { FunctionComponent } from "react";

const PurchaseTimeIcon: FunctionComponent = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      {/* Timer Body */}
      <circle cx="12" cy="12" r="10" fill="none" stroke="grey" />

      {/* Timer Arrow */}
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2v4M12 16.5l3.5-3.5M12 22V8"
      />

      {/* Timer Base */}
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 22v-2"
      />
    </svg>
  );
};

export default PurchaseTimeIcon;
