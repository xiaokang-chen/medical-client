import React, {Component} from 'react';
import {Text, View, TouchableOpacity, ScrollView, Alert} from 'react-native';
import Button from '../../widget/Button';
import {asyncRead} from '../../plugin/asyncStorage';
import constance from '../../plugin/constance';
import Toast from 'react-native-root-toast';

// styles
import styles from './style';
// components
import ListItem from '../../components/ui/list-item';

export default class Setting extends Component {
  static navigationOptions = {
    title: '设置',
  };

  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
    };
  }

  async componentDidMount() {
    const userInfoStr = await asyncRead(constance.USER_INFO);
    const userInfo = JSON.parse(userInfoStr || '{}');
    this.setState({userInfo});
  }

  loginOut = async () => {
    //去登陆
    if (!this.state.userInfo.id) {
      return this.props.navigation.navigate('Entrance');
    }
    //
    Alert.alert('', '您确认退出吗？', [
      {text: '取消', onPress: () => {}},
      {
        text: '确定',
        onPress: async () => {
          //删除APP中相关数据
          global.signOut().then(this.props.navigation.navigate('Entrance'));
        },
      },
    ]);
  };

  // loginOut = async (title, message) => {
  //     //如果没有登录信息，则显示“去登录”，并且跳转到授权登录页
  //     const userInfo = this.props.userRelated;
  //     console.log(userInfo);
  //     if (!userInfo)
  //         return this.props.navigation.navigate('AuthLoading');
  //     //如果存在登录信息，则显示“退出登录”，并给与一个防误操作提示，用户点击确定后，把token以及用户信息均删除
  //     Alert.alert('', '您确认退出吗？', [
  //         {
  //             text: '取消', onPress: () => {
  //             }
  //         },
  //         {
  //             text: '确定', onPress: async () => {
  //                 console.log("setting");
  //                 console.log("进来了");
  //                 await asyncDelete(constance.USER_INFO);
  //                 this.props.removeUserInfo();
  //                 this.props.navigation.pop();
  //                 Toast.show('退出成功', {position: 0});
  //             }
  //         }
  //     ])
  //
  // };

  render() {
    const {navigate} = this.props.navigation;

    return (
      <ScrollView style={styles.container}>
        <View style={{paddingHorizontal: 20}}>
          <TouchableOpacity
            onPress={() => {
              navigate('AccountAndSecurity', {});
            }}>
            <ListItem name={<Text>账号与安全</Text>} />
          </TouchableOpacity>

          <View style={styles.gap} />

          <TouchableOpacity
            onPress={() => {
              Toast.show('很干净，无需清除', {position: 0});
            }}>
            <ListItem
              name={<Text>清除缓存</Text>}
              rightText="0.00M"
              rightIcon="No"
            />
          </TouchableOpacity>

          <View style={styles.gap} />

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('About');
            }}>
            <ListItem name={<Text>关于我们</Text>} />
          </TouchableOpacity>
        </View>

        <View style={{paddingBottom: 30}}>
          <Button
            title={this.state.userInfo.id ? '退出登录' : '去登录'}
            onPress={this.loginOut}
            style={{
              touch: {
                height: 36,
                marginTop: 20,
              },
            }}
          />
        </View>
      </ScrollView>
    );
  }
}
