import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  PixelRatio,
  FlatList,
  Alert,
} from 'react-native';
import {common} from '../../styles';
import styles from './style';
import {connect} from 'react-redux';
import network from '../../plugin/network';
import {parseListForDelete} from '../entrance/parseList';
import Toast from 'react-native-root-toast';
import HeadButton from '../../components/ui/head-button';
import {addPatient, disconnectPatient} from '../../store/actions/patient';
import {update_session} from '../../store/actions/session';
import {addLocalSessionList} from '../../store/actions/session_list';

class Patient extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      title: '我的患者',
      headerTitleStyle: {
        flex: 1,
      },
      headerRight: (
        <TouchableOpacity onPress={() => params._onPress()}>
          <HeadButton name={params.choose ? '取消' : '删除'} />
        </TouchableOpacity>
      ),
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      choose: false,
    };
    this.props.navigation.setParams({
      choose: false,
    });
  }

  componentWillMount() {
    //把函数调用设置在navigation中
    this.props.navigation.setParams({
      _onPress: this._onPress,
    });
  }

  _onPress = () => {
    this.props.navigation.setParams({
      choose: !this.props.navigation.state.params.choose,
    });
    this.setState({choose: !this.props.navigation.state.params.choose});
  };

  _onDelete = (item) => {
    const message = `确定删除患者：${item.name}？`;
    Alert.alert('提示', message, [
      {text: '取消', style: 'cancel'},
      {
        text: '确定',
        onPress: async () => {
          // 根据ID删除患者
          await this.props.disconnectPatient(item.id);
          // 拉取删除后的列表
          await network('user/getInfoListByUserToken', 'post').then(
            async (res) => {
              if (res.data) {
                // console.log("检查数据", this, res.data)
                // 获取医生或者患者的列表
                const tagDoctor = 1;
                const patientsList = tagDoctor
                  ? res.data.patients
                  : res.data.doctor;
                const {
                  sectionList,
                  SessionList,
                  sessions_new,
                } = await parseListForDelete(patientsList, item.id);
                console.log('检测数据', sectionList, SessionList, sessions_new);
                this.props.addPatient(sectionList);
                this.props.addLocalSessionList(SessionList);
                this.props.update_session(sessions_new);
              }
            },
          );
          Toast.show('删除成功', {position: 0});
        },
      },
    ]);
  };

  _renderPatientList = () => {
    const {info} = this.props.patientList;
    let data = [];
    for (let item of info) {
      for (let i of item.data) {
        data.push(i);
      }
    }
    let params = {
      keyExtractor: (item) => item.id.toString(),
      renderItem: ({item}) => {
        return (
          <View style={styles.item}>
            <View
              style={{flexDirection: 'row', alignItems: 'center', height: 60}}>
              <Image
                style={styles.avatar}
                source={
                  item.userInfo.avatarUrl
                    ? {uri: item.userInfo.avatarUrl}
                    : require('./images/default_head.png')
                }
                cache="force-cache"
              />
              <View>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: '#000'}}>
                  {item.userInfo.name}
                </Text>
                <Text style={{fontSize: 15, color: '#000'}}>{item.phone}</Text>
                <Text style={{fontSize: 12}}>
                  {item.userInfo.nickName}
                  {item.sex ? '-' + item.sex : null}
                </Text>
              </View>
            </View>
            {this.state.choose ? (
              <TouchableOpacity
                style={{marginRight: 15}}
                onPress={() => this._onDelete(item)}>
                <Image
                  source={require('./images/delete1.png')}
                  style={{height: 22, width: 22}}
                />
              </TouchableOpacity>
            ) : (
              <View />
            )}
          </View>
        );
      },
      data: data,
      ItemSeparatorComponent: () => (
        <View
          style={{
            height: 1 / PixelRatio.get(),
            backgroundColor: '#cdced2',
            marginLeft: 10,
          }}
        />
      ),
      showsVerticalScrollIndicator: false,
    };
    return <FlatList {...params} />;
  };

  addPatient = () => {
    return (
      <View>
        <View
          style={{
            borderBottomWidth: 1 / PixelRatio.get(),
            paddingBottom: 5,
            borderColor: '#e1e1e1',
            paddingHorizontal: 15,
          }}>
          <TouchableOpacity
            style={styles.header}
            activeOpacity={0.8}
            onPress={() => {
              this.props.navigation.navigate('SearchPatientByNameOrPhone');
            }}>
            <Image
              source={require('./images/search.png')}
              style={{width: 30, height: 30, tintColor: '#e2e2e2'}}
            />
            <View style={{paddingLeft: 10}}>
              <Text style={{lineHeight: 17, fontSize: 15}}>
                搜索患者名或手机号添加
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        {this._renderPatientList()}
      </View>
    );
  };

  prompt = () => {
    return (
      <View
        style={{
          paddingTop: 0.3 * Dimensions.get('window').height,
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000'}}>
          请先完善个人信息！
        </Text>
      </View>
    );
  };

  render() {
    const {userRelated} = this.props;

    return (
      <View style={[common.flex(), common.bgc()]}>
        {userRelated.info.userInfo ? this.addPatient() : this.prompt()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userRelated: state.userRelated,
    patientList: state.patientList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  disconnectPatient: (id) => dispatch(disconnectPatient({id})),
  update_session: (sessions) => dispatch(update_session(sessions)),
  addLocalSessionList: (SessionList) =>
    dispatch(addLocalSessionList(SessionList)),
  addPatient: (sectionList) => dispatch(addPatient(sectionList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Patient);
