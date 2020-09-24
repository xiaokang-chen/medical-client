import React from 'react';
import {Image, Text, TouchableOpacity, View, SafeAreaView} from 'react-native';
import styles from './style';
import BackIcon from '../../components/ui/icon/back';

export default class DoctorDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  static navigationOptions = {
    header: null,
  };

  // onActionSheet = item => {
  //     if (item.value === 'remark') {
  //         //跳转到设置备注页面
  //     }
  //    //留出添加别的
  // };

  render() {
    const {patientInfo} = this.props.navigation.state.params;
    const {userInfo} = patientInfo;
    console.log('patientInfo', patientInfo);
    console.log('userInfo', userInfo);

    let color = patientInfo.sex === '女' ? '#FFC0CB' : '#87CEFA';

    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            backgroundColor: color,
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 12,
            paddingVertical: 12,
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}>
            <BackIcon />
          </TouchableOpacity>
        </View>
        <View style={[styles.head, {backgroundColor: color}]}>
          <View>
            <Image
              source={
                userInfo.avatarUrl
                  ? {uri: userInfo.avatarUrl}
                  : require('./images/default_head.png')
              }
              style={styles.avatar}
            />
          </View>

          <View>
            <View>
              <View>
                {userInfo.nickName ? (
                  <Text style={styles.nickname}>{userInfo.nickName}</Text>
                ) : null}
              </View>
            </View>

            <View>
              <Text style={{fontSize: 13}}>
                姓名： {patientInfo.name ? patientInfo.name : null}
              </Text>
              <Text style={{fontSize: 13}}>
                手机号： {userInfo.phone ? userInfo.phone : null}
              </Text>
              <Text style={{fontSize: 13}}>
                职称： {patientInfo.type ? patientInfo.type : null}
              </Text>
              <Text style={{fontSize: 13}}>
                专业： {patientInfo.major ? patientInfo.major : null}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.send_message}
          onPress={() => {
            // this.props.navigation.dispatch(resetAction);
            // console.log("baseUrl + userInfo.avatarUrl",baseUrl + userInfo.avatarUrl);
            this.props.navigation.popToTop();
            this.props.navigation.push('Message');
            this.props.navigation.navigate('MessageChat', {
              id: userInfo.id,
              nickname: userInfo.nickName,
              avatar_url: userInfo.avatarUrl,
            });
            // this.props.top_session(userInfo.id.toString());
          }}>
          <Text style={styles.font_style}>发消息</Text>
        </TouchableOpacity>
        {/*<ActionSheet*/}
        {/*    list={PERSONAL_OPERATES}*/}
        {/*    ref={_ref => (this.ActionSheet = _ref)}*/}
        {/*    onPress={this.onActionSheet}*/}
        {/*/>*/}
      </SafeAreaView>
    );
  }
}
