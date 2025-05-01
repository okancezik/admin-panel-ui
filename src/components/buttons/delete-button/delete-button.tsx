import React from "react";
import { DeleteFilled } from "@ant-design/icons";

interface DeleteButtonProps{
    onClick:()=>void;
}

const DeleteButton = (props:DeleteButtonProps) => {
  return (
    <DeleteFilled
      style={{ cursor: "pointer", color:"red" }}
      onClick={props.onClick}
    />
  );
};

export default DeleteButton;
