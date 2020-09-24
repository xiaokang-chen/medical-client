import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';

class HeadButton extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {name = ' ', color = '#0e72ef'} = this.props;
    return (
      <View style={styles.button}>
        <Text style={[styles.buttonText, {color: color}]}>{name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: 45,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
});

export default HeadButton;
