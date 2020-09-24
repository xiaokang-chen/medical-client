import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Toast from 'react-native-root-toast';
import HeadButton from '../../../components/ui/head-button';
import connect from 'react-redux/es/connect/connect';
import {loadUserInfo} from '../../../store/actions/user';
import {asyncSave} from '../../../plugin/asyncStorage';
import constance from '../../../plugin/constance';
import {doctorInfoUpdate} from '../../../store/actions/doctor';

class PersonalInformationUpdate extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      title: '修改资料',
      headerRight: (
        <TouchableOpacity onPress={() => params.submit()}>
          <HeadButton name="提交" />
        </TouchableOpacity>
      ),
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,

      personalInfo: {
        name: '',
        sex: '',
        education: '',
        type: '',
        major: '',
      },
    };
  }

  componentDidMount() {
    const personalInfo = this.props.userRelated.info.userInfo;
    this.setState({
      personalInfo: {
        ...this.state.personalInfo,
        name: personalInfo ? personalInfo.name : null,
        sex: personalInfo ? personalInfo.sex : null,
        education: personalInfo ? personalInfo.education : null,
        type: personalInfo ? personalInfo.type : null,
        major: personalInfo ? personalInfo.major : null,
      },
    });
  }

  componentWillMount() {
    //把函数调用设置在navigation中
    this.props.navigation.setParams({
      submit: this._onSubmit,
    });
  }

  _onSubmit = async () => {
    const {personalInfo} = this.state;
    const doctorId = this.props.userRelated.info.userInfo
      ? this.props.userRelated.info.userInfo.id
      : null;
    const userId = this.props.userRelated.info.id;

    const {name} = personalInfo;
    const {sex} = personalInfo;
    const {education} = personalInfo;
    const {type} = personalInfo;
    const {major} = personalInfo;
    await doctorInfoUpdate({
      id: doctorId,
      userId: userId,
      name,
      sex,
      education,
      type,
      major,
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
    const param = this.state.personalInfo;

    return (
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

          <Text>最高学历</Text>
          <RNPickerSelect
            placeholder={{
              label: '请选择',
              value: '',
              color: '#f2f2f2',
            }}
            items={[
              {
                label: '博士后',
                value: '博士后',
              },
              {
                label: '博士',
                value: '博士',
              },
              {
                label: '硕士',
                value: '硕士',
              },
              {
                label: '本科',
                value: '本科',
              },
              {
                label: '专科',
                value: '专科',
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

          <Text>职称</Text>
          <RNPickerSelect
            placeholder={{
              label: '请选择',
              value: '',
              color: '#f2f2f2',
            }}
            items={[
              {
                label: '主任医师',
                value: '主任医师',
              },
              {
                label: '副主任医师',
                value: '副主任医师',
              },
              {
                label: '主治医师',
                value: '主治医师',
              },
              {
                label: '住院医师',
                value: '住院医师',
              },
            ]}
            onValueChange={(text) => {
              this.setState((prestate) => ({
                personalInfo: Object.assign({}, prestate.personalInfo, {
                  type: text,
                }),
              }));
            }}
            style={pickerSelectStyles}
            value={param.type}
            useNativeAndroidPickerStyle={false}
          />
          <View paddingVertical={5} />

          <Text>专业方向</Text>
          <RNPickerSelect
            placeholder={{
              label: '请选择',
              value: '',
              color: '#f2f2f2',
            }}
            items={[
              {
                label: '内脏痛',
                value: '内脏痛',
              },
              {
                label: '癌痛',
                value: '癌痛',
              },
              {
                label: '神经病理性疼痛',
                value: '神经病理性疼痛',
              },
              {
                label: '骨与软组织疼痛',
                value: '骨与软组织疼痛',
              },
            ]}
            onValueChange={(text) => {
              this.setState((prestate) => ({
                personalInfo: Object.assign({}, prestate.personalInfo, {
                  major: text,
                }),
              }));
            }}
            style={pickerSelectStyles}
            value={param.major}
            useNativeAndroidPickerStyle={false}
          />
        </View>
      </ScrollView>
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
)(PersonalInformationUpdate);

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 15,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
