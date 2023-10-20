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
        d="M12 2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm0 2a8 8 0 00-8 8 8 8 0 0012.773 6.689l-5.049-5.049m0-5.657l5.049 5.049M12 4a8 8 0 018 8 8 8 0 01-12.773 6.689l5.049-5.049m0-5.657L6.177 12.69"
      />
    </svg>
  );
};

export default ServiceIcon;
