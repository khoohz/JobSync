import React from "react";
import { useTheme } from "@emotion/react";

const Logo = () => {
  const theme = useTheme();
  
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.9717 0C9.16656 0 7.43544 0.71707 6.15905 1.99346L0 8.15247V10.9717C0 12.9634 0.855552 14.7554 2.21921 16C0.855552 17.2446 0 19.0366 0 21.0283V23.8475L6.15905 30.0066C7.43544 31.283 9.16656 32 10.9717 32C12.9634 32 14.7554 31.1445 16 29.7808C17.2446 31.1445 19.0366 32 21.0283 32C22.8334 32 24.5646 31.283 25.841 30.0066L32 23.8475V21.0283C32 19.0366 31.1445 17.2446 29.7808 16C31.1445 14.7554 32 12.9634 32 10.9717V8.15247L25.841 1.99346C24.5646 0.71707 22.8334 0 21.0283 0C19.0366 0 17.2446 0.85555 16 2.21921C14.7554 0.85555 12.9634 0 10.9717 0ZM20.607 16C20.5303 15.93 20.455 15.8581 20.3813 15.7843L16 11.403L11.6187 15.7843C11.545 15.8581 11.4697 15.93 11.393 16C11.4697 16.07 11.545 16.1419 11.6187 16.2157L16 20.597L20.3813 16.2157C20.455 16.1419 20.5303 16.07 20.607 16ZM17.7778 23.8475V25.1939C17.7778 26.9891 19.2331 28.4445 21.0283 28.4445C21.8904 28.4445 22.7172 28.102 23.3268 27.4924L28.4445 22.3747V21.0283C28.4445 19.2331 26.9891 17.7778 25.1939 17.7778C24.3318 17.7778 23.505 18.1202 22.8954 18.7298L17.7778 23.8475ZM14.2222 23.8475L9.10456 18.7298C8.49496 18.1202 7.66819 17.7778 6.8061 17.7778C5.01087 17.7778 3.55555 19.2331 3.55555 21.0283V22.3747L8.6732 27.4924C9.2828 28.102 10.1096 28.4445 10.9717 28.4445C12.7669 28.4445 14.2222 26.9891 14.2222 25.1939V23.8475ZM14.2222 6.8061V8.15247L9.10456 13.2702C8.49496 13.8798 7.66819 14.2222 6.8061 14.2222C5.01087 14.2222 3.55555 12.7669 3.55555 10.9717V9.62527L8.6732 4.50762C9.2828 3.89802 10.1096 3.55556 10.9717 3.55556C12.7669 3.55556 14.2222 5.01087 14.2222 6.8061ZM22.8954 13.2702L17.7778 8.15247V6.8061C17.7778 5.01087 19.2331 3.55556 21.0283 3.55556C21.8904 3.55556 22.7172 3.89802 23.3268 4.50762L28.4445 9.62527V10.9717C28.4445 12.7669 26.9891 14.2222 25.1939 14.2222C24.3318 14.2222 23.505 13.8798 22.8954 13.2702Z"
        fill={theme.palette.neutral[1000]}
        fillOpacity="0.866667"
      />
    </svg>
  );
};

export default Logo;