type ButtonProps = {
  children: string | React.ReactNode;
  color: "primary" | "secondary";
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  id?: string;
};

export const Button = ({
  children,
  onClick,
  color,
  type = "button",
  disabled = false,
  className,
  id,
}: ButtonProps) => {
  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex w-[100%] max-w-[240px] uppercase items-center rounded-md justify-center py-3 px-2 text-white transition delay-75 disabled:bg-gray-400 disabled:text-gray-200 ${
        color === "primary"
          ? "bg-purple-500 hover:bg-purple-700"
          : "bg-transparent border-blue-300 border-2 text-blue-300 hover:bg-blue-400 hover:text-white"
      } ${className || ""} `}
    >
      {children}
    </button>
  );
};
