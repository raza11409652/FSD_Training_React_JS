import { Typography } from "antd";
import React from "react";

interface Props {
  title: string;
  children?: React.JSX.Element;
}
const ActionHeader: React.FC<Props> = ({ ...props }) => {
  return (
    <div className="app-action-header">
      <Typography.Title>{props.title}</Typography.Title>
      <div className="action-wrapper">{props.children}</div>
    </div>
  );
};
export default ActionHeader;
