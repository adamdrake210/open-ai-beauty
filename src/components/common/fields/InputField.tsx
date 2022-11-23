import { FieldError, UseFormRegister } from "react-hook-form";

type InputFieldProps = {
  name: string;
  label: string;
  formType: HTMLInputElement["type"];
  register: UseFormRegister<any>;
  error: FieldError | undefined;
  required?: boolean;
  placeholder?: string;
  helperText?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
};

export const InputField = ({
  name,
  register,
  error,
  label,
  formType,
  required,
  placeholder,
  helperText,
  icon,
  disabled,
}: InputFieldProps) => {
  return (
    <>
      <label
        className="block capitalize tracking-wide text-white text-md font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <div className="relative flex w-full flex-wrap items-stretch">
        {icon || null}
        <input
          id={name}
          className={`appearance-none block w-full bg-gray-200 text-gray-500 border border-gray-300 rounded py-3 px-4 mb-1 leading-tight font-thin focus:outline-none focus:bg-white ${
            icon ? "pl-10" : ""
          }`}
          type={formType}
          disabled={disabled}
          placeholder={placeholder || label}
          {...register(name, {
            required: {
              value: required || false,
              message: `Please complete this required field`,
            },
          })}
        />
      </div>
      {helperText && <p className="text-white text-xs">{helperText}</p>}
      {error && <p className="text-red-300 text-xs italic">{error.message}</p>}
    </>
  );
};
