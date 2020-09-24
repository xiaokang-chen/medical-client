import React, {PureComponent} from 'react';
import {Text, View} from 'react-native';

// styles
import styles from './style';

export default class Header extends PureComponent {
  static defaultProps = {
    headerStyle: {},
    left: (
      <View>
        <Text>left</Text>
      </View>
    ),
    center: (
      <View>
        <Text>center</Text>
      </View>
    ),
    right: (
      <View>
        <Text>right</Text>
      </View>
    ),
  };

  render() {
    const {left, center, right, headerStyle} = this.props;

    return (
      <View style={[styles.header, headerStyle]}>
        <View style={styles.left}>{left}</View>
        <View style={styles.center}>{center}</View>
        <View style={styles.right}>{right}</View>
      </View>
    );
  }
}
