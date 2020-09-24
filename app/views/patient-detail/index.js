import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  TextInput,
  PanResponder,
  PixelRatio,
} from 'react-native';
import styles from './style';
import ListItem from '../../components/ui/list-item';
import BackIcon from '../../components/ui/icon/back';
import ActionSheet from '../../widget/ActionSheet';
import {PERSONAL_OPERATES} from '../../plugin/enume';
import connect from 'react-redux/es/connect/connect';
import {getMajor} from '../../store/actions/major';
import {changeMainDiagnoseByDoctor} from '../../store/actions/patient';
import {getPinYinFirstCharacter} from '../../plugin/first-character';
import {merge} from 'lodash';

class PatientDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      isShowDiagnose: true,
    };
    this.createPanResponder();
    this.diagnoseInput = React.createRef();
  }

  static navigationOptions = {
    header: null,
  };

  onActionSheet = (item) => {
    if (item.value === 'remark') {
      //跳转到设置备注页面
    }
    //留出添加别的
  };

  createPanResponder() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => true,
      onStartShouldSetPanResponderCapture: (e, gestureState) => false,
      onMoveShouldSetPanResponder: (e, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (e, gestureState) => false,
      onPanResponderGrant: (e, gestureState) =>
        this.onPanResponderGrant(e, gestureState),
      onPanResponderRelease: (e, gestureState) =>
        this.onPanResponderRelease(e, gestureState),
      onPanResponderTerminate: (e, gestureState) => null,
      onShouldBlockNativeResponder: (e, gestureState) => true,
    });
  }

  onPanResponderGrant = (e, gestureState) => {
    if (!this.state.isShowDiagnose) {
      this.setState({
        isShowDiagnose: true,
      });
      let patientInfo = this.props.navigation.getParam('patientInfo');
      // console.log("patientInfopatientInfo",patientInfo);
      //通过websocket更新患者主诊断
      this.props.changeMainDiagnoseByDoctor(
        patientInfo,
        this.diagnose,
        this.props.ws,
      );
      // console.log("医生修改 主诊断 为", this.diagnose)
    }
  };

  onPanResponderRelease(e, gestureState) {}

  getPatientInfo(state, patientInfo) {
    // console.log("测试", state, patientInfo);
    for (const i in state.info) {
      // console.log("查看 i", state.info[i].key , getPinYinFirstCharacter(patientInfo.userInfo.nickName, "", true))
      if (
        state.info[i].key ===
        getPinYinFirstCharacter(patientInfo.userInfo.nickName, '', true)
      ) {
        const dataList = state.info[i].data;
        for (const j in dataList) {
          // console.log("查看 j", dataList[j].id, patientInfo.id)
          if (dataList[j].id === patientInfo.id) {
            return state.info[i].data[j];
          }
        }
        break;
      }
    }
    // console.log("测试2", state)
    return merge({}, state);
  }
  render() {
    const patientInfo = this.getPatientInfo(
      this.props.patientList,
      this.props.navigation.state.params.patientInfo,
    );
    const {userInfo} = patientInfo;
    // console.log("查看",userInfo);

    let color = patientInfo.sex === '女' ? '#FFC0CB' : '#87CEFA';

    return (
      <SafeAreaView
        style={styles.container}
        {...this._panResponder.panHandlers}>
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
                手机号： {patientInfo.phone ? patientInfo.phone : null}
              </Text>
              <View
                style={{
                  borderWidth: 2 / PixelRatio.get(),
                  borderColor: '#f71913',
                  marginTop: 2,
                }}>
                {this.state.isShowDiagnose ? (
                  <View style={{justifyContent: 'center'}}>
                    <Text
                      onPress={() => {
                        if (Date.now() - (this.lastTeleTime || 0) < 500) {
                          this.setState({
                            isShowDiagnose: false,
                          });
                        }
                        this.lastTeleTime = Date.now();
                      }}
                      style={{
                        fontWeight: 'bold',
                        fontSize: 13,
                        lineHeight: 40,
                        height: 40,
                      }}>
                      主诊断：{' '}
                      {patientInfo.diagnose ? patientInfo.diagnose : null}
                    </Text>
                  </View>
                ) : (
                  <TextInput
                    ref={this.diagnoseInput}
                    onChangeText={(diagnose) => {
                      this.diagnose = diagnose;
                    }}
                    placeholder="请修改主诊断"
                    autoFocus={true}
                    maxLength={15}
                    style={{
                      fontSize: 13,
                      height: 40,
                      // marginTop: 0
                    }}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
        <View style={styles.middle}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('DiaryInfo', {
                patientId: patientInfo.id,
              });
            }}>
            <ListItem name={'疼痛日记'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('MoreInfo', {
                patientInfo: patientInfo,
              });
            }}>
            <ListItem name={'更多信息'} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.send_message}
          onPress={() => {
            // this.props.navigation.dispatch(resetAction);
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
        <ActionSheet
          list={PERSONAL_OPERATES}
          ref={(_ref) => (this.ActionSheet = _ref)}
          onPress={this.onActionSheet}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    majorList: state.majorList,
    patientList: state.patientList,
    ws: state.sessionList.ws.ws,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getMajor: () => dispatch(getMajor()),
  changeMainDiagnoseByDoctor: (patientInfo, diagnose, ws) =>
    dispatch(changeMainDiagnoseByDoctor(patientInfo, diagnose, ws)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientDetail);
