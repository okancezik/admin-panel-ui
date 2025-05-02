import { ReactNode } from "react";
import { Card, CardProps } from "antd";

interface APCardProps extends CardProps {
  children: ReactNode;
}

const APCard = (props: APCardProps) => {
  return (
    <Card
      style={{
        height: 150,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {props.children}
    </Card>
  );
};

export default APCard;
