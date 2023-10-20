import React, { FunctionComponent } from "react";

const ServiceIcon: FunctionComponent = () => {
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
        d="M12 22c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm-2-8v4m0 0H7m5-9a3 3 0 100-6 3 3 0 000 6zm0 0v4m0 4h4m0 0a5 5 0 100-10 5 5 0 000 10z"
      />
    </svg>
  );
};

export default ServiceIcon;
