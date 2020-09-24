import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, ActivityIndicator, StatusBar} from 'react-native';
import {asyncRead} from '../../plugin/asyncStorage';
import constance, {chatUrl} from '../../plugin/constance';
import {update_session} from '../../store/actions/session';
import {addUser} from '../../store/actions/user';
import {update} from '../../store/actions/friends';
import {
  addLocalSessionList,
  session_webSocket,
} from '../../store/actions/session_list';
import {addPatient} from '../../store/actions/patient';
import network from '../../plugin/network';
import WS from '../../components/webSocket';
import {parseList} from './parseList';
import {isCompleteInformation} from '../../plugin/utils';

class Entrance extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const userInfoStr = await asyncRead(constance.USER_INFO);
    const friendsStr = await asyncRead(constance.FRIENDS);
    const userInfo = JSON.parse(userInfoStr || '{}');
    let friends;
    if (friendsStr) {
      friends = JSON.parse(friendsStr);
    } else {
      friends = {
        apply_list: [],
        agree_list: [],
      };
    }
    // 区分用户类型 0是游客。1是其他
    friends.userType = 1;
    // 添加用户数据
    this.props.addUser(userInfo);
    // 添加 好友
    this.props.update(friends);

    // 如果是医生，直接进
    if (userInfoStr && userInfo.identification === 1) {
      // console.log("在这里+++++++++++", 1)
      this.props.navigation.navigate('AppDoctor');
      network('user/getInfoListByUserToken', 'post').then(async (res) => {
        // console.log("进来了！！！！！！",res);
        if (res.data) {
          // 获取医生或者患者的列表
          const tagDoctor = userInfo.identification === 1;
          const patientsList = tagDoctor ? res.data.patients : res.data.doctor;
          const {sectionList, SessionList, sessions_new} = await parseList(
            patientsList,
            tagDoctor,
          );
          // console.log("检测数据",sectionList,SessionList, sessions_new);
          this.props.addPatient(sectionList);
          this.props.update_session(sessions_new);
          this.props.addLocalSessionList(SessionList);
          this.props.session_webSocket(new WS(chatUrl, userInfo.id));
        }
      });
    }
    // 患者做判断。这里偷懒了。没有删除 医生相关逻辑
    else if (userInfoStr && !isCompleteInformation(userInfo.userInfo)) {
      // console.log("在这里+++++++++++", 2)
      const identification = userInfo.identification;

      if (identification === 1) {
        // 这是医生
        this.props.navigation.navigate('AppDoctor');
      } else {
        // 这是患者
        this.props.navigation.navigate('AppPatient');
      }
      network('user/getInfoListByUserToken', 'post').then(async (res) => {
        // console.log("进来了！！！！！！",res);
        if (res.data) {
          // 获取医生或者患者的列表
          const tagDoctor = identification === 1;
          const patientsList = tagDoctor ? res.data.patients : res.data.doctor;
          const {sectionList, SessionList, sessions_new} = await parseList(
            patientsList,
            tagDoctor,
          );
          // console.log("检测数据",sectionList,SessionList, sessions_new);
          this.props.addPatient(sectionList);
          this.props.update_session(sessions_new);
          this.props.addLocalSessionList(SessionList);
          this.props.session_webSocket(new WS(chatUrl, userInfo.id));
        }
      });
    } else {
      // console.log("在这里+++++++++++", 3)
      // 区分用户类型 0是游客。1是其他
      friends.userType = 0;
      // 添加用户数据
      this.props.update(friends);

      this.props.navigation.navigate('AppTourist');
    }
  }

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  userRelated: state.userRelated,
  sessions: state.session,
  patientList: state.patientList,
});

const mapDispatchToProps = (dispatch) => ({
  update_session: (sessions) => dispatch(update_session(sessions)),
  addUser: (info) => dispatch(addUser(info)),
  addLocalSessionList: (SessionList) =>
    dispatch(addLocalSessionList(SessionList)),
  addPatient: (sectionList) => dispatch(addPatient(sectionList)),
  session_webSocket: (ws) => dispatch(session_webSocket(ws)),
  update: (content) => dispatch(update(content)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Entrance);
