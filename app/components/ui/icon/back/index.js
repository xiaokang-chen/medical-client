import React, {PureComponent} from 'react';
import {Image} from 'react-native';

export default class BackIcon extends PureComponent {
  static defaultProps = {
    style: {
      width: 20,
      height: 20,
    },
  };

  render() {
    return (
      <Image source={require('./images/back.png')} style={this.props.style} />
    );
  }
}
