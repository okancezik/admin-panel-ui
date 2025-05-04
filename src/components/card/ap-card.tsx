import { ReactNode } from "react";
import { Card, CardProps } from "antd";
import styles from "./ap-card.module.scss";

interface APCardProps extends CardProps {
  children: ReactNode;
}

const APCard = (props: APCardProps) => {
  return (
    <Card className={styles.container} {...props}>
      {props.children}
    </Card>
  );
};

export default APCard;
