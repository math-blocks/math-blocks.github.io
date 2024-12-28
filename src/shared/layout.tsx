import * as React from "react";

type Props = {
  readonly style?: React.CSSProperties;
  readonly children: React.ReactNode;
};

export const HStack = (props: Props) => {
  const style: React.CSSProperties = {
    ...props.style,
    display: "flex",
    flexDirection: "row",
  };

  return <div style={style}>{props.children}</div>;
};

export const VStack = (props: Props) => {
  const style: React.CSSProperties = {
    ...props.style,
    display: "flex",
    flexDirection: "column",
  };

  return <div style={style}>{props.children}</div>;
};
