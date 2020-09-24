import React from 'react';
import {
  StyleSheet,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

// components
import HeadButton from '../../../components/ui/head-button';
import {loadUserInfo, updateUserInfo} from '../../../store/actions/user';
import Toast from 'react-native-root-toast';

class ResetNickname extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      title: '名字',
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
      nickname: '',
    };
  }

  componentDidMount() {
    const {userRelated} = this.props;
    this.state.nickname = userRelated.nickName;
    this.props.navigation.setParams({
      submit: this._onSubmit,
    });
  }

  _onSubmit = async () => {
    const {userRelated, navigation, loadUserInfo} = this.props;
    const {nickname} = this.state;

    if (!nickname) {
      return Alert.alert('', '请输入您的名字');
    }

    await updateUserInfo({
      id: userRelated.info.id,
      nickName: nickname,
    }).then((res) => {
      if (res.code === 20000) {
        Toast.show('昵称更换成功', {position: 0});
      } else {
        Toast.show('昵称更换失败', {position: 0});
      }
    });

    await loadUserInfo();

    navigation.goBack();
  };

  render() {
    const {userRelated} = this.props;

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          onChangeText={(nickname) => this.setState({nickname})}
          placeholder="你的名字"
          defaultValue={userRelated.info.nickName}
          autoFocus={true}
          underlineColorAndroid="transparent"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  input: {
    padding: 10,
    backgroundColor: '#fff',
  },
});

const mapStateToProps = (state) => ({
  userRelated: state.userRelated,
});

const mapDispatchToProps = (dispatch) => ({
  loadUserInfo: () => dispatch(loadUserInfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetNickname);
