import React from 'react';

export const CodeLink = (props) => {
  return (<div style={{
    position: 'fixed',
    bottom: 10,
    left: 10,
    background: 'white'
  }}>
    <a href={props.url}>{props.url}</a>
  </div>)
}
