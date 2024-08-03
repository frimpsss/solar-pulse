import { useState } from "react";
import {
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/20/solid";
interface TextInputProps {
  values: any;
  errors: any;
  id: string;
  handleChange: any;
  handleBlur: any;
  type: "text" | "password" | "number" | "date";
  placeholder: string;
  label: string;
  touched: any;
  strongPassword?: boolean;
  err?: string;
  boldenText?: boolean;
}
const TextInput = ({
  values,
  errors,
  id,
  handleBlur,
  handleChange,
  type,
  placeholder,
  label,
  err,
  touched,
  boldenText = false,
}: TextInputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [visible, setVisibile] = useState(false);
  const [t, setT] = useState(false);
  return (
    <div className="">
      <label
        htmlFor={id}
        className={`text-white text-[1.15rem] ${
          boldenText ? "font-medium" : "font-normal"
        }`}
      >
        {label}
      </label>
      <div className="relative mt-2">
        <input
          name={id}
          id={id}
          type={type !== "password" ? type : showPassword ? "text" : type}
          value={values[id]}
          onChange={(e) => {
            setVisibile(true);
            touched[id] = true;
            handleChange(e);
          }}
          onBlur={(e) => {
            setT(true);
            handleBlur(e);
          }}
          placeholder={placeholder}
          onFocus={(e) => {
            setVisibile(true);
          }}
          className="shadow-sm ring-inset focus:ring-1 focus:ring-offset-2 focus:ring-mantis-200 focus:outline-mantis-950  focus:border-mantis-200 block w-full sm:text-sm  rounded-md p-2"
        />
        {errors[id] && touched[id] && type !== "password" ? (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        ) : null}

        {type == "password" && (
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {!showPassword ? (
              <EyeIcon className="h-5 w-5 text-primary" aria-hidden="true" />
            ) : (
              <EyeSlashIcon
                className="h-5 w-5 text-primary"
                aria-hidden="true"
              />
            )}
          </div>
        )}
      </div>

      {errors[id] && touched[id] ? (
        <p
          className={`  ${
            !boldenText ? "text-[0.7rem] mt-2" : "text-sm mt-1"
          } text-[200] text-red-600 `}
          id={`${id}-error`}
        >
          {errors?.[id]}
        </p>
      ) : null}
      {err && t && (
        <p
          className="mt-2 text-[0.7rem] text-[200] text-red-600"
          id={`${id}-error`}
        >
          {err}
        </p>
      )}
    </div>
  );
};

export default TextInput;