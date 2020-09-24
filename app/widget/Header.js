import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StatusBar} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/AntDesign';
import {common, variable} from '../styles/index';

const HeaderPropsType = {
  title: PropTypes.string,
  left: PropTypes.children,
  right: PropTypes.children,
  onLeftPress: PropTypes.function,
  onRightPress: PropTypes.function,
  navigation: PropTypes.object,
  style: PropTypes.object,
};

const HeaderDefaultProps = {
  title: '',
  left: <Icon name="arrowleft" style={common.fontColorSize()} />,
  right: null,
  onLeftPress: null,
  onRightPress: () =>
    console.log('Please attach a method called onRightPress to this component'),
  style: {},
};

const HEADER_STYLE = Object.assign(
  {},
  common.screenWidth(),
  common.screenHeight(0.1),
  common.layout_flex('space-between', 'flex-end'),
  //修改颜色
  common.bgc(),
  common.pVerticalHorizontal(0, 16),
  common.iosHeaderMarginTop(),
);

export default class Header extends Component {
  _onLeftPress = () => {
    if (this.props.onLeftPress) {
      return this.props.onLeftPress();
    }
    this.props.navigation.goBack();
  };

  _renderLeft = () => {
    if (!this.props.left) {
      return <View />;
    }
    return (
      <TouchableOpacity
        onPress={this._onLeftPress}
        activeOpacity={0.8}
        style={{padding: 10, flex: 1}}>
        {this.props.left}
      </TouchableOpacity>
    );
  };

  _renderRight = () => {
    if (this.props.right) {
      return (
        <TouchableOpacity
          onPress={this.props.onRightPress}
          activeOpacity={0.8}
          style={{padding: 10, flex: 1}}>
          {this.props.right}
        </TouchableOpacity>
      );
    }
    return <View />;
  };

  render() {
    return (
      <View style={{zIndex: variable.$zIndex_header}}>
        <StatusBar
          hidden={false}
          backgroundColor={variable.$main_color_white}
          barStyle={'dark-content'}
        />
        <View style={[HEADER_STYLE, this.props.style]}>
          {this._renderLeft()}
          <Text
            style={[common.h(), {maxWidth: 200, flex: 1}]}
            numberOfLines={1}>
            {this.props.title}
          </Text>
          {this._renderRight()}
        </View>
      </View>
    );
  }
}

PropTypes.Header = HeaderPropsType;

Header.defaultProps = HeaderDefaultProps;
