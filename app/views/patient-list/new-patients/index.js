import React from 'react';
import {FlatList, Text, View, SafeAreaView} from 'react-native';
import styles from './style';
import connect from 'react-redux/es/connect/connect';
import {ListItem} from 'react-native-elements';
import {addPatient, connectPatient} from '../../../store/actions/patient';
import Swipeout from 'react-native-swipeout';
import {agree, refuse, deleteItem} from '../../../store/actions/friends';
import Toast from 'react-native-root-toast';
import network from '../../../plugin/network';
import {parseList} from '../../entrance/parseList';
import {update_session} from '../../../store/actions/session';
import {addLocalSessionList} from '../../../store/actions/session_list';

class NewPatients extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: '新的患者',
      headerTitleStyle: {
        flex: 1,
      },
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      applyList: [],
    };
  }

  agreeOnpress = (userInfo, shellId) => {
    connectPatient({
      id: userInfo.id,
    })
      .then((res) => {
        if (res.code === 20000) {
          Toast.show('同意成功', {position: 0});
          // 更新其他数据
          network('user/getInfoListByUserToken', 'post')
            .then(async (res) => {
              if (res.data) {
                // 获取医生或者患者的列表
                const tagDoctor = 1;
                const patientsList = tagDoctor
                  ? res.data.patients
                  : res.data.doctor;
                const {
                  sectionList,
                  SessionList,
                  sessions_new,
                } = await parseList(patientsList, tagDoctor);
                console.log('检测数据', sectionList, SessionList, sessions_new);
                this.props.addPatient(sectionList);
                this.props.addLocalSessionList(SessionList);
                this.props.update_session(sessions_new);
              }
            })
            .catch((e) => {
              console.log('信息更新失败', e);
            });
          // 通知患者
          this.props.ws.send(
            JSON.stringify({
              version: 1,
              commandId: 13,
              shellId: this.props.userRelated.info.id,
              body: {
                to_shell_id: shellId,
                Type: '2',
                content: JSON.stringify(this.props.userRelated.info),
              },
            }),
          );
          this.props.agree(shellId);
        } else {
          Toast.show('同意失败', {position: 0});
        }
      })
      .catch((err) => {
        console.log('请求失败：', err);
      });
  };

  _renderItem = ({item, index}) => {
    // todo 新写的接口，得测
    const {content, shellId, status} = item;
    const data = JSON.parse(content || '{}');
    const {avatarUrl, messages, nickName, userInfo} = data;
    const {name} = data.userInfo;
    let BtnsRight = [
      {
        text: '删除',
        type: 'delete',
        onPress: () => this.props.deleteId(shellId),
      },
    ];
    return (
      <Swipeout
        right={BtnsRight}
        backgroundColor="white"
        // disabled = { status!== "apply" }
        // onOpen = {()=>{
        //     this.selectShellId = shellId;
        // }}
      >
        <ListItem
          key={index}
          leftAvatar={{
            source: avatarUrl
              ? {uri: avatarUrl}
              : require('./default_head.png'),
            rounded: false,
            overlayContainerStyle: {borderRadius: 5, overflow: 'hidden'},
          }}
          title={`${nickName}(${name})`}
          titleStyle={{color: '#000', fontWeight: 'bold'}}
          // containerStyle={{backgroundColor: status==="apply" ? '#ffffff' : '#e2e2e2'}}
          subtitle={messages ? messages : ''}
          subtitleProps={{numberOfLines: 1, ellipsizeMode: 'tail', width: 20}}
          rightElement={
            status === 'apply' ? (
              <View style={styles.diagnose}>
                <Text
                  style={styles.left}
                  onPress={() => this.agreeOnpress(userInfo, shellId)}>
                  {'同意'}
                </Text>
              </View>
            ) : (
              <Text>{'已同意'}</Text>
            )
          }
        />
      </Swipeout>
    );
  };

  _renderContent = () => {
    return (
      <FlatList
        renderItem={this._renderItem}
        data={this.props.apply_list}
        // data={ [1,2,3] }
        keyExtractor={(item) => item.shellId.toString()}
      />
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this._renderContent()}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  apply_list: state.friends.apply_list,
  ws: state.sessionList.ws.ws,
  userRelated: state.userRelated,
});

const mapDispatchToProps = (dispatch) => ({
  //接口---获取所有标签
  agree: (id) => dispatch(agree(id)),
  refuse: (id) => dispatch(refuse(id)),
  deleteId: (deleteId) => dispatch(deleteItem(deleteId)),
  update_session: (sessions) => dispatch(update_session(sessions)),
  addLocalSessionList: (SessionList) =>
    dispatch(addLocalSessionList(SessionList)),
  addPatient: (sectionList) => dispatch(addPatient(sectionList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPatients);
