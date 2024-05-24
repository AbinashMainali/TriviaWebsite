import { FunctionComponent } from "react";

interface UserInputProps {
  type?: undefined | string;
  placeHolder: string;
  handleChange: (e: any) => void;
  inputValue: any;
}

const Input: FunctionComponent<UserInputProps> = ({
  type = "text",
  handleChange,
  placeHolder = "",
  inputValue,
}) => {
  return (
    <div>
      <input
        type={type}
        value={inputValue}
        placeholder={placeHolder}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
