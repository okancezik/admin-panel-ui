import React from "react";
import {EditFilled } from "@ant-design/icons";

interface UpdateButtonProps{
    onClick:()=>void;
}

const UpdateButton = (props:UpdateButtonProps) => {
  return (
    <EditFilled
      style={{ cursor: "pointer",}}
      onClick={props.onClick}
    />
  );
};

export default UpdateButton;
