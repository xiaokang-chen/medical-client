import React from 'react';
import {
  Dimensions,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Toast from 'react-native-root-toast';
import {patientInfoUpdate} from '../../../store/actions/patient';
import connect from 'react-redux/es/connect/connect';
import DatePicker from 'react-native-datepicker';
import {loadUserInfo} from '../../../store/actions/user';
import {asyncSave} from '../../../plugin/asyncStorage';
import constance from '../../../plugin/constance';
import Header from '../../../components/header';
import BackIcon from '../../../components/ui/icon/back';
import Icon from 'react-native-vector-icons/AntDesign';
import {styles, pickerSelectStyles} from './style';

const screenWidth = Dimensions.get('window').width;

class TouristInformationUpdate extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      header: null,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,

      personalInfo: {
        name: '',
        sex: '',
        is_date_show: false,
        birth: '',
        education: '',
        height: '',
        weight: '',
        marriage: '',
        diagnose: '',
        doctor: '',
      },
    };
  }

  componentWillMount() {
    const personalInfo = this.props.userRelated.info.userInfo;
    this.setState({
      personalInfo: {
        ...this.state.personalInfo,
        name: personalInfo ? personalInfo.name : null,
        sex: personalInfo ? personalInfo.sex : null,
        birth: personalInfo ? this.getMyDate(personalInfo.birth) : null,
        education: personalInfo ? personalInfo.education : null,
        height: !personalInfo
          ? ''
          : personalInfo.height
          ? personalInfo.height.toString()
          : '',
        weight: !personalInfo
          ? ''
          : personalInfo.weight
          ? personalInfo.weight.toString()
          : '',
        marriage: personalInfo ? personalInfo.marriage : null,
        diagnose: personalInfo ? personalInfo.diagnose : null,
        doctor: personalInfo ? personalInfo.doctor : null,
        otherDiagnose: personalInfo ? personalInfo.otherDiagnose : null,
      },
    });
  }

  //str是毫秒值字符串
  //把毫秒值解析成时间格式
  getMyDate = (str) => {
    let oDate = new Date(str),
      oYear = oDate.getFullYear(),
      oMonth = oDate.getMonth() + 1,
      oDay = oDate.getDate();
    return oYear + '-' + this.addZero(oMonth) + '-' + this.addZero(oDay);
  };

  //补零操作
  addZero = (num) => {
    if (parseInt(num, 10) < 10) {
      num = '0' + num;
    }
    return num;
  };

  _onSubmit = async () => {
    const {personalInfo} = this.state;
    const patinetId = this.props.userRelated.info.userInfo
      ? this.props.userRelated.info.userInfo.id
      : null;
    const userId = this.props.userRelated.info.id;

    const {name} = personalInfo;
    const {sex} = personalInfo;
    const {birth} = personalInfo;
    const {education} = personalInfo;
    const {height} = personalInfo;
    const {weight} = personalInfo;
    const {marriage} = personalInfo;
    const {diagnose} = personalInfo;
    const {doctor} = personalInfo;
    const {otherDiagnose} = personalInfo;
    console.log('查看', otherDiagnose, diagnose, marriage, name);

    await patientInfoUpdate({
      id: patinetId,
      userId: userId,
      // todo 后台加 otherDiagnose
      name,
      sex,
      birth,
      education,
      height,
      weight,
      marriage,
      diagnose,
      doctor,
      otherDiagnose,
    })
      .then((res) => {
        if (res.code === 20000) {
          Toast.show('更新成功', {position: 0});
          this.props.navigation.goBack();
        } else {
          Toast.show('更新失败', {position: 0});
        }
      })
      .catch((err) => {
        console.log('请求失败：', err);
      });
    this.props.loadUserInfo();
  };

  async componentWillReceiveProps(nextProps) {
    //更新storage信息
    if (nextProps.userRelated.info.id) {
      await asyncSave(constance.USER_INFO, nextProps.userRelated.info);
    }
  }

  render() {
    // const userInfo = this.props.userInfo;
    // console.log("接收到？",this.state.userInfo);
    const param = this.state.personalInfo;
    const now = this.getMyDate(new Date().valueOf());

    return (
      <View>
        <Header
          left={
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.pop();
              }}>
              <View style={styles.back}>
                <BackIcon />
              </View>
            </TouchableOpacity>
          }
          center={
            <View
              style={{
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>修改资料</Text>
            </View>
          }
          right={
            <TouchableOpacity
              style={{
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 15,
                paddingRight: 15,
              }}
              onPress={() => {
                this._onSubmit();
              }}>
              <Text style={{fontSize: 16}}>提交</Text>
            </TouchableOpacity>
          }
        />
        <ScrollView showsVerticalScrollIndicator={true}>
          <View style={styles.container}>
            <Text>姓名</Text>
            <TextInput
              returnKeyType="next"
              enablesReturnKeyAutomatically
              style={
                Platform.OS === 'ios'
                  ? pickerSelectStyles.inputIOS
                  : pickerSelectStyles.inputAndroid
              }
              onChangeText={(text) => {
                this.setState((prestate) => ({
                  personalInfo: Object.assign({}, prestate.personalInfo, {
                    name: text,
                  }),
                }));
              }}
              blurOnSubmit={false}
              value={param.name}
            />
            <View paddingVertical={5} />

            <Text>性别</Text>
            <RNPickerSelect
              placeholder={{
                label: '请选择',
                value: '',
                color: '#f2f2f2',
              }}
              items={[
                {
                  label: '男',
                  value: '男',
                },
                {
                  label: '女',
                  value: '女',
                },
              ]}
              onValueChange={(text) => {
                this.setState((prestate) => ({
                  personalInfo: Object.assign({}, prestate.personalInfo, {
                    sex: text,
                  }),
                }));
              }}
              style={pickerSelectStyles}
              value={param.sex}
              useNativeAndroidPickerStyle={false}
            />
            <View paddingVertical={5} />

            <Text>出生日期</Text>
            <DatePicker
              style={{width: screenWidth * 0.95}}
              date={param.birth}
              mode="date"
              placeholder="选择日期"
              format="YYYY-MM-DD"
              minDate="1900-01-01"
              maxDate={now}
              confirmBtnText="确定"
              cancelBtnText="取消"
              onDateChange={(date) => {
                this.setState((prestate) => ({
                  personalInfo: Object.assign({}, prestate.personalInfo, {
                    birth: date,
                  }),
                }));
              }}
            />

            <View paddingVertical={5} />

            <Text>学历</Text>
            <RNPickerSelect
              placeholder={{
                label: '请选择',
                value: '',
                color: '#f2f2f2',
              }}
              items={[
                {
                  label: '本科及以上',
                  value: '本科及以上',
                },
                {
                  label: '专科',
                  value: '专科',
                },
                {
                  label: '中学',
                  value: '中学',
                },
                {
                  label: '小学及以下',
                  value: '小学及以下',
                },
              ]}
              onValueChange={(text) => {
                this.setState((prestate) => ({
                  personalInfo: Object.assign({}, prestate.personalInfo, {
                    education: text,
                  }),
                }));
              }}
              style={pickerSelectStyles}
              value={param.education}
              useNativeAndroidPickerStyle={false}
            />
            <View paddingVertical={5} />

            <Text>身高(cm)</Text>
            <TextInput
              returnKeyType="next"
              enablesReturnKeyAutomatically
              style={
                Platform.OS === 'ios'
                  ? pickerSelectStyles.inputIOS
                  : pickerSelectStyles.inputAndroid
              }
              blurOnSubmit={false}
              onChangeText={(text) => {
                this.setState((prestate) => ({
                  personalInfo: Object.assign({}, prestate.personalInfo, {
                    height: text,
                  }),
                }));
              }}
              value={param.height}
            />
            <View paddingVertical={5} />

            <Text>体重(kg)</Text>
            <TextInput
              returnKeyType="next"
              enablesReturnKeyAutomatically
              style={
                Platform.OS === 'ios'
                  ? pickerSelectStyles.inputIOS
                  : pickerSelectStyles.inputAndroid
              }
              blurOnSubmit={false}
              onChangeText={(text) => {
                this.setState((prestate) => ({
                  personalInfo: Object.assign({}, prestate.personalInfo, {
                    weight: text,
                  }),
                }));
              }}
              value={param.weight}
            />
            <View paddingVertical={5} />

            <Text>婚姻情况</Text>
            <RNPickerSelect
              placeholder={{
                label: '请选择',
                value: '',
                color: '#f2f2f2',
              }}
              items={[
                {
                  label: '已婚',
                  value: '已婚',
                },
                {
                  label: '未婚',
                  value: '未婚',
                },
                {
                  label: '离异',
                  value: '离异',
                },
                {
                  label: '丧偶',
                  value: '丧偶',
                },
              ]}
              onValueChange={(text) => {
                this.setState((prestate) => ({
                  personalInfo: Object.assign({}, prestate.personalInfo, {
                    marriage: text,
                  }),
                }));
              }}
              style={pickerSelectStyles}
              value={param.marriage}
              useNativeAndroidPickerStyle={false}
            />
            <View paddingVertical={5} />

            <Text>主诊断</Text>
            <TouchableOpacity
              style={styles.diagnose}
              onPress={() => {
                this.props.navigation.navigate('MainDiagnose', {
                  diagnose: param.diagnose,
                  refreshState: (state) => {
                    this.setState((prestate) => ({
                      personalInfo: Object.assign({}, prestate.personalInfo, {
                        diagnose: state,
                      }),
                    }));
                  },
                });
              }}>
              <Text style={styles.left}>{param.diagnose}</Text>
              <View style={styles.right}>
                <Icon name="right" style={styles.icon} />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userRelated: state.userRelated,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadUserInfo: () => dispatch(loadUserInfo()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TouristInformationUpdate);
