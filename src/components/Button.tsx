import { FC } from "react";

interface Props {
  title: string;
  type: string;
  onClickHandler: () => void;
}

const Button: FC<Props> = ({ title, type, onClickHandler }) => {
  return (
    <button
      className={`btn-action ${
        type === "primary" ? "btn-action--primary" : "btn-action--secondary"
      }`}
      onClick={onClickHandler}
    >
      {title}
    </button>
  );
};

export default Button;
