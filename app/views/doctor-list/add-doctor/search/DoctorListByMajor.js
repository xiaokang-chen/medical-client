import React, {Component} from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  PixelRatio,
  Alert,
} from 'react-native';

// styles
import styles from './style';
import {connect} from 'react-redux';
import {
  getDoctorByMajor,
  getDoctorList,
  starDoctor,
  unstarDoctor,
} from '../../../../store/actions/doctor';
import {update_session} from '../../../../store/actions/session';
import {addLocalSessionList} from '../../../../store/actions/session_list';
import {addPatient} from '../../../../store/actions/patient';
import Toast from 'react-native-root-toast';

class SearchDoctorByMajor extends Component {
  static navigationOptions = ({navigation}) => {
    const {major} = navigation.state.params;

    return {
      headerTitle: major,
      headerTitleStyle: {
        flex: 1,
      },
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      star: false,
      doctor: '',
    };
  }

  async componentDidMount() {
    const {major} = this.props.navigation.state.params;
    let res = await getDoctorByMajor({major});
    //加载关注信息
    // let result = await getDoctorList();
    // let temp = new Set([]);
    // temp.add(result.data);
    this.setState({doctor: res.data});
  }

  async _onRefresh() {
    const {major} = this.props.navigation.state.params;
    if (this.state.isRefreshing) return;

    this.setState({isRefreshing: true}, () => {
      setTimeout(async () => {
        await getDoctorByMajor({major});
        this.setState({
          isRefreshing: false,
        });
      }, 500);
    });
  }

  _onPress = async (item) => {
    let message = `确定添加医生：${item.name}？`;
    Alert.alert('提示', message, [
      {text: '取消', style: 'cancel'},
      {
        text: '确定',
        onPress: async () => {
          console.log('测试', this.props.ws);
          const content = JSON.stringify({
            ...this.props.userRelated.info,
            messages: '我是 ' + item.name + '，请求添加您为好友。',
          });
          this.props.ws.send(
            JSON.stringify({
              version: 1,
              commandId: 13,
              shellId: this.props.userRelated.info.id,
              body: {
                to_shell_id: item.userId,
                Type: '1',
                content,
              },
            }),
          );
          Toast.show('发送请求成功', {position: 0});
        },
      },
    ]);
  };

  render() {
    const {doctorList} = this.props;
    const {star, doctor} = this.state;
    // console.log("STAR",doctorList.info);
    let params = {
      keyExtractor: (item) => item.id.toString(),
      data: doctor,
      renderItem: ({item}) => {
        return (
          <View
            style={styles.item}
            // onPress={this._search(item.name)}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: 60,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 15,
                }}>
                <Image
                  style={styles.avatar}
                  source={
                    item.avatarUrl
                      ? {uri: item.avatarUrl}
                      : require('../../images/default_head.png')
                  }
                  cache="force-cache"
                />
                <View>
                  <Text
                    style={{fontSize: 18, fontWeight: 'bold', color: '#000'}}>
                    {item.name}
                  </Text>
                  <Text style={{fontSize: 15, color: '#000'}}>
                    {item.major}
                  </Text>
                  <Text style={{fontSize: 12}}>
                    {item.type}
                    {item.sex ? '-' + item.sex : null}
                  </Text>
                </View>
              </View>

              {doctorList.info.find((arr) => {
                if (arr.id === item.id) {
                  return true;
                }
              }) ? (
                <View style={{alignItems: 'center', paddingRight: 15}}>
                  <Text style={{fontSize: 15, color: '#f2f2f2'}}>已添加</Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={{alignItems: 'center', paddingRight: 15}}
                  onPress={() => this._onPress(item)}>
                  <Text style={{fontSize: 15, color: '#000'}}>添加</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        );
      },
      ItemSeparatorComponent: () => (
        <View
          style={{height: 1 / PixelRatio.get(), backgroundColor: '#eeeeee'}}
        />
      ),
    };
    return (
      <SafeAreaView style={{flex: 1}}>
        <FlatList {...params} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    doctorList: state.doctorList,
    userRelated: state.userRelated,
    ws: state.sessionList.ws.ws,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getDoctorList: (id) => dispatch(getDoctorList({id})),
  starDoctor: (id) => dispatch(starDoctor({id})),
  unstarDoctor: (id) => dispatch(unstarDoctor({id})),

  update_session: (sessions) => dispatch(update_session(sessions)),
  addLocalSessionList: (SessionList) =>
    dispatch(addLocalSessionList(SessionList)),
  addPatient: (sectionList) => dispatch(addPatient(sectionList)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchDoctorByMajor);
