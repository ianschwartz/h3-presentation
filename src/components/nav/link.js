import React from 'react';
export default function Link(props) {

  const onClick = (event)=> {
    event.preventDefault();
    window.history.pushState(null, null, props.to);
    window.dispatchEvent(new window.PopStateEvent('popstate'));
  };

  return <a className={props.className} href={props.to} onClick={onClick}>{props.children}</a>
}
