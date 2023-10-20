import React, { FunctionComponent } from "react";

const SettingIcon: FunctionComponent = () => {
    return (<svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
    >
        <path
            stroke="currentColor"
            strokeWidth={1.5}
            d="M9 3.758C9 2.788 9.788 2 10.76 2h2.483C14.213 2 15 2.787 15 3.758c0 1.354 1.466 2.2 2.638 1.523a1.758 1.758 0 012.402.644l1.241 2.15a1.758 1.758 0 01-.643 2.402c-1.172.677-1.172 2.369 0 3.046.84.485 1.129 1.56.643 2.402l-1.241 2.15a1.758 1.758 0 01-2.402.644c-1.172-.677-2.638.17-2.638 1.523 0 .97-.787 1.758-1.758 1.758h-2.483A1.758 1.758 0 019 20.242c0-1.354-1.465-2.2-2.637-1.523a1.758 1.758 0 01-2.402-.644l-1.242-2.15a1.758 1.758 0 01.644-2.402c1.172-.677 1.172-2.369 0-3.046a1.758 1.758 0 01-.644-2.402l1.242-2.15a1.758 1.758 0 012.402-.644C7.535 5.958 9 5.111 9 3.758z"
        ></path>
        <path
            stroke="currentColor"
            strokeWidth={1.5}
            d="M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        ></path>
    </svg>
    );
};

export default SettingIcon;
