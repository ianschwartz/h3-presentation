import React from 'react';

export class AutoTyper extends React.Component {
  state = {
    position: 5,
  };
  render() {
    return <span>{this.props.children}</span>
  }
}
