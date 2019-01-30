import React from "react";
import Home from "../../App";
import NotFound from "../../pages/notFound";
import One from "../../pages/one";

export function router(props) {
  const { path } = props;
  console.log(path);
  switch (path) {
    case '/':
      return <Home />;
    case '/one':
      return <One />
    default:
      return <NotFound path={props.path}/>;
  }
}
