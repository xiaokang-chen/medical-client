import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import Header from '../../components/header';
import Input from '../../widget/Input';
import Label from '../../widget/Label';
import Button from '../../widget/Button';
import Toast from 'react-native-root-toast';
import {common} from '../../styles';
import {connect} from 'react-redux';
import {
  getUserInfoByCaptcha,
  getUserInfoByPassword,
} from '../../store/actions/user';
import {asyncSave} from '../../plugin/asyncStorage';
import constance from '../../plugin/constance';
import BackIcon from '../../components/ui/icon/back';

//CSS
import styles from './style';
import CaptchaButton from '../../components/captcha-button';
const screenWidth = Dimensions.get('window').width;
const PHONE_REG = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;

class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
      captcha: '',
      loginWithcaptcha: false,
      open: false,
    };
  }

  onLogin = async () => {
    const {phone, password, captcha, loginWithcaptcha} = this.state;
    //验证码登录
    if (loginWithcaptcha) {
      this.props.getUserInfoByCaptcha(phone, captcha);
    } else {
      if (!phone || !password) {
        return Toast.show('手机号或密码不得为空', {
          position: 0,
        });
      }
      this.props.getUserInfoByPassword(phone, password);
    }
  };

  async componentWillReceiveProps(nextProps) {
    if (!nextProps.userRelated.loading) {
      if (nextProps.userRelated.info.id) {
        Toast.show('登录成功', {position: 0});
        await asyncSave(constance.USER_INFO, nextProps.userRelated.info);
        setTimeout(() => {
          this.props.navigation.navigate('Entrance');
        }, 400);
      } else {
        Toast.show('登录失败', {position: 0});
      }
    }
  }

  _renderForm = () => {
    return (
      <View style={styles.form}>
        <Label title="手机号" mode="column">
          <Input
            value={this.state.phone}
            placeholder={'请输入手机号'}
            onChangeText={(phone) => this.setState({phone})}
            style={{width: 270}}
            maxLength={12}
            editable={!this.props.userRelated.loading}
          />
        </Label>
        <Label title="密码" mode="column">
          <Input
            value={this.state.password}
            placeholder={'请输入密码'}
            secureTextEntry={true}
            style={{width: 270}}
            onChangeText={(password) => this.setState({password})}
            editable={!this.props.userRelated.loading}
          />
        </Label>

        <View style={styles.upper}>
          <TouchableOpacity activeOpacity={0.8} onPress={this._changePage}>
            <Text style={styles.text_type}>手机验证码登录</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.props.navigation.navigate('Forgot')}>
            <Text style={styles.text_type}>忘记密码</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  sendCaptcha = (callback) => {
    const {phone} = this.state;

    if (!PHONE_REG.test(phone)) {
      return Toast.show('请输入正确的手机号码', {position: 0});
    }

    //手机发送获取验证码请求---回调，相当于send(phone)
    callback(phone);
  };

  _renderFormWithCaptcha = () => {
    return (
      <View style={styles.form}>
        <Label title="手机号" mode="column">
          <Input
            value={this.state.phone}
            placeholder={'请输入手机号'}
            onChangeText={(phone) => this.setState({phone})}
            style={{width: 270}}
            maxLength={12}
            editable={!this.props.userRelated.loading}
          />
        </Label>
        <View>
          <TextInput
            ref="captcha"
            style={styles.textInput}
            onChangeText={(captcha) => this.setState({captcha})}
            placeholder="验证码"
            maxLength={6}
            keyboardType={'numeric'}
            underlineColorAndroid="transparent"
          />
          <View
            style={{
              position: 'absolute',
              marginTop: 0,
              height: 50,
              justifyContent: 'center',
              marginLeft: screenWidth - 160,
            }}>
            <CaptchaButton onClick={this.sendCaptcha} />
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this._changePage}
          style={{paddingTop: 25}}>
          <Text style={styles.text_type}>手机密码登录</Text>
        </TouchableOpacity>
      </View>
    );
  };

  _changePage = () => {
    this.setState({loginWithcaptcha: !this.state.loginWithcaptcha});
  };

  render() {
    const {loginWithcaptcha} = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <Header
          left={
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
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
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>登录</Text>
            </View>
          }
          right={null}
        />

        <ScrollView>
          <View style={styles.title}>
            <Text style={common.fontColorSize('#333333', 24)}>
              欢迎使用疼痛诊所
            </Text>
          </View>
          {loginWithcaptcha === true
            ? this._renderFormWithCaptcha()
            : this._renderForm()}
          <Button
            loading={this.props.userRelated.loading}
            title="登 录"
            onPress={this.onLogin}
          />
          <View style={{paddingVertical: 10}} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  userRelated: state.userRelated,
});

const mapDispatchToProps = (dispatch) => ({
  getUserInfoByPassword: (phone, password) => {
    dispatch(getUserInfoByPassword(phone, password));
  },
  getUserInfoByCaptcha: (phone, captcha) => {
    dispatch(getUserInfoByCaptcha(phone, captcha));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
