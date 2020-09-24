import React from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  PixelRatio,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import styles from './style';
import {connect} from 'react-redux';
import {ListItem} from 'react-native-elements';
import Header from '../../components/header';
import ModalSelector from 'react-native-modal-selector';
import {
  delete_session,
  add_topsession,
  delete_topsession,
  addLocalSessionList,
} from '../../store/actions/session_list';
import {clean_badge, update_session} from '../../store/actions/session';
import {addPatient} from '../../store/actions/patient';

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      select_item_id_str: '',
    };
  }

  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    const {redPoint = 0, tabBarOnPress = () => {}} = params;

    return {
      tabBarLabel: '消息',
      // tabBarOnPress: tabBarOnPress(),

      // header在公共属性中已经设为Null
      tabBarIcon: ({tintColor, focused}) => (
        <View>
          <View style={styles.tabBarIcon}>
            <Image
              source={
                focused
                  ? require('./images/message-active.png')
                  : require('./images/message.png')
              }
              style={[styles.icon, {tintColor: tintColor}]}
            />
          </View>
          {redPoint > 0 ? (
            <View style={styles.subscript}>
              {redPoint > 99 ? (
                <Text style={styles.subscriptTextMore}>…</Text>
              ) : (
                <Text style={styles.subscriptText}>{redPoint}</Text>
              )}
            </View>
          ) : null}
        </View>
      ),
    };
  };

  // async componentDidMount() {
  //     console.log("测试对话列表");
  //     console.log(this.props.sessionList);
  // }

  parseMessageType = (message) => {
    if (message.text) return message.text;
    if (message.audio) return '[语音]';
    if (message.image) return '[图片]';
    if (message.video) return '[视频]';
  };

  render() {
    // console.log("this.props.sessionList",this.props.sessionList);
    const {byId, allIds, topIds} = this.props.sessionList;
    const {select_item_id_str} = this.state;
    if (Object.keys(this.props.sessionList).length) {
      let params = {
        keyExtractor: (item_id) => item_id,
        data: topIds.concat(allIds),
        renderItem: ({item}) => {
          const item_session = byId[item];

          let nickName = '',
            name = '',
            major = '',
            avatarUrl = '',
            id = '';
          // console.log("检查数据", item_session, byId, item);
          if (item_session) {
            nickName = item_session.nickName ? item_session.nickName : '';
            name = item_session.name ? item_session.name : '';
            major = item_session.major ? item_session.major : '';
            avatarUrl = item_session.avatarUrl ? item_session.avatarUrl : '';
            id = item_session.id ? item_session.id : '';
          }

          let last_message = '',
            badge = 0;
          if (this.props.session[item]) {
            last_message =
              this.props.session[item].messages.length === 0
                ? ''
                : this.parseMessageType(this.props.session[item].messages[0]);
            badge = this.props.session[item].badge;
          }

          const isTop = topIds.indexOf(item);
          return (
            <ListItem
              key={id}
              leftAvatar={{
                source: avatarUrl
                  ? {uri: avatarUrl}
                  : require('./images/default_head.png'),
                rounded: false,
                overlayContainerStyle: {borderRadius: 5, overflow: 'hidden'},
                // containerStyle: {borderRadius: 5}
              }}
              // (${name})----name为真实姓名
              title={`${nickName}`}
              titleStyle={{color: '#000', fontWeight: 'bold'}}
              containerStyle={{
                backgroundColor: isTop === -1 ? '#ffffff' : '#e2e2e2',
              }}
              subtitle={last_message ? last_message : ''}
              subtitleProps={{
                numberOfLines: 1,
                ellipsizeMode: 'tail',
                width: 20,
              }}
              // rightTitle={name}
              // rightSubTitle={major}
              badge={
                badge === 0 || badge === -1
                  ? {value: '', opacity: 0}
                  : {
                      value: badge,
                      textStyle: {color: '#ffffff'},
                      badgeStyle: {backgroundColor: '#ff0400'},
                      containerStyle: {marginTop: -20},
                    }
              }
              onLongPress={() => {
                // console.log(item_session);
                this.setState({
                  select_item_id_str: item_session.id.toString(),
                });
                this.selector.open();
              }}
              onPress={() => {
                this.props.navigation.push('MessageChat', {
                  id: item_session.id,
                  nickname: nickName,
                  avatar_url: avatarUrl,
                });
              }}
            />
          );
        },
        ItemSeparatorComponent: () => (
          <View
            style={{
              height: 1 / PixelRatio.get(),
              backgroundColor: '#cdced2',
              marginLeft: 50,
            }}
          />
        ),
        removeClippedSubviews: false,
        initialNumToRender: 5,
      };
      let selector_data = [
        {
          key: 1,
          label: 'delete_session',
          component: (
            <View>
              <Text>刪除聊天框</Text>
            </View>
          ),
        },
        {
          key: 999,
          label: 'start_chat',
          component: (
            <View>
              <Text>开始聊天</Text>
            </View>
          ),
        },
      ];
      if (topIds.indexOf(select_item_id_str) !== -1)
        selector_data.push({
          key: 2,
          label: 'delete_topsession',
          component: (
            <View>
              <Text>取消置頂</Text>
            </View>
          ),
        });
      else {
        selector_data.push({
          key: 2,
          label: 'add_topsession',
          component: (
            <View>
              <Text>置顶</Text>
            </View>
          ),
        });
      }
      let badge = this.props.session[select_item_id_str]
        ? this.props.session[select_item_id_str].badge
        : 0;
      if (select_item_id_str && badge !== 0) {
        selector_data.push({
          key: 3,
          label: 'clean_badge',
          component: (
            <View>
              <Text>已读</Text>
            </View>
          ),
        });
      }

      return (
        <SafeAreaView style={{flex: 1}}>
          <Header
            left={<Text />}
            center={
              <View
                style={{
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>消息列表</Text>
              </View>
            }
            right={<Text />}
          />
          <FlatList {...params} />
          <ModalSelector
            data={selector_data}
            ref={(selector) => {
              this.selector = selector;
            }}
            style={{bottom: 10}}
            customSelector={<View />}
            cancelText={'取消'}
            onChange={(changedItem) => {
              console.log(changedItem.label);
              if (changedItem.label === 'delete_session') {
                // console.log("刪除聊天框");
                // console.log('IIIIIIIIDDDDDDDD',select_item_id_str);
                this.props.delete_session(select_item_id_str);
              } else if (changedItem.label === 'add_topsession') {
                // console.log("置頂");
                this.props.add_topsession(select_item_id_str);
              } else if (changedItem.label === 'delete_topsession') {
                // console.log("取消置頂");
                this.props.delete_topsession(select_item_id_str);
              } else if (changedItem.label === 'clean_badge') {
                // console.log("已读");
                this.props.clean_badge(select_item_id_str, 0);
              } else if (changedItem.label === 'start_chat') {
                // console.log("开始聊天");
                const item_session = byId[select_item_id_str];

                let nickName = '',
                  name = '',
                  major = '',
                  avatarUrl = '',
                  id = '';
                // console.log("检查数据", item_session, byId);
                if (item_session) {
                  nickName = item_session.nickName ? item_session.nickName : '';
                  name = item_session.name ? item_session.name : '';
                  major = item_session.major ? item_session.major : '';
                  avatarUrl = item_session.avatarUrl
                    ? item_session.avatarUrl
                    : '';
                  id = item_session.id ? item_session.id : '';
                  this.props.navigation.push('MessageChat', {
                    id: item_session.id,
                    nickname: nickName,
                    avatar_url: avatarUrl,
                  });
                }
              }
            }}
          />
        </SafeAreaView>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <Header
            left={<Text />}
            center={
              <View
                style={{
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>消息列表</Text>
              </View>
            }
            right={<Text />}
          />
          <View
            style={{
              alignItems: 'center',
              paddingTop: 0.4 * Dimensions.get('window').height,
            }}>
            {/*<Image source={require('./images/1home.png')} style={{height:50,width:50}} />*/}
            <View style={{paddingVertical: 20}}>
              <Text>没有数据</Text>
            </View>
          </View>
        </View>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    sessionList: state.sessionList,
    session: state.session,
  };
};

const mapDispatchToProps = (dispatch) => ({
  delete_session: (chat_id) => dispatch(delete_session(chat_id)),
  add_topsession: (chat_id) => dispatch(add_topsession(chat_id)),
  delete_topsession: (chat_id) => dispatch(delete_topsession(chat_id)),
  clean_badge: (session_id, num) => dispatch(clean_badge(session_id, num)),

  update_session: (sessions) => dispatch(update_session(sessions)),
  addLocalSessionList: (SessionList) =>
    dispatch(addLocalSessionList(SessionList)),
  addPatient: (sectionList) => dispatch(addPatient(sectionList)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Message);
