import React from "react";
import Home from "../../App";
import NotFound from "../../pages/notFound";
import Aboutme from "../../pages/aboutme";

export function router(props) {
  const { path } = props;
  console.log(path);
  switch (path) {
    case '/':
      return <Home />;
    case '/one':
      return <Aboutme />
    default:
      return <NotFound path={props.path}/>;
  }
}
