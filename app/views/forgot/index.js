import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Dimensions,
} from 'react-native';
import Header from '../../components/header';
import Input from '../../widget/Input';
import Label from '../../widget/Label';
import Button from '../../widget/Button';
import {common} from '../../styles';
import {reset, getUserIdByCaptcha} from '../../store/actions/user';
import Toast from 'react-native-root-toast';
import BackIcon from '../../components/ui/icon/back';
import styles from './style';
import CaptchaButton from '../../components/captcha-button';

const screenWidth = Dimensions.get('window').width;
const PHONE_REG = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;

class ForgotPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      loading: false,
      captcha: '',
      phone: '',
      verification: false, // 是否验通过
      password: '',
      secondary_password: '',
    };
  }

  _resetPassword = async () => {
    try {
      this.setState({loading: true});
      const {id, password} = this.state;
      const result = await reset({id, password});
      if (result) {
        Toast.show('重置成功', {position: 0});
        setTimeout(() => {
          this.props.navigation.replace('SignIn');
        }, 1000);
      } else {
        this.setState({verification: false, user_name: '', phone: ''});
      }
    } catch (error) {
      console.log('重置异常：', error);
    } finally {
      this.setState({loading: false});
    }
  };

  onConfirm = async () => {
    try {
      this.setState({loading: true});
      await getUserIdByCaptcha({
        phone: this.state.phone,
        code: this.state.captcha,
      }).then((res) => {
        if (res.code === 20000) {
          this.setState({verification: true, id: res.data.id});
        } else {
          Toast.show('手机号或验证码错误', {position: 0});
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({loading: false});
    }
  };

  sendCaptcha = (callback) => {
    const {phone} = this.state;

    if (!PHONE_REG.test(phone))
      return Toast.show('请输入正确的手机号码', {position: 0});

    //手机发送获取验证码请求---回调，相当于send(phone)
    callback(phone);
  };

  _onPress = async () => {
    const {
      phone,
      captcha,
      verification,
      secondary_password,
      password,
    } = this.state;
    //设置密码
    if (verification) {
      if (!secondary_password || !password)
        return Toast.show('密码不得为空', {position: 0});
      if (secondary_password !== password)
        return Toast.show('两次密码不一致', {position: 0});
      return this._resetPassword();
    }
    //找回密码
    if (!PHONE_REG.test(phone))
      return Toast.show('请输入正确的手机号码', {position: 0});
    await this.onConfirm();
  };

  _renderFormVerify = () => {
    return (
      <View style={styles.form}>
        {/*<Label title='账号' mode='column'>*/}
        {/*    <Input*/}
        {/*        value={this.state.user_name}*/}
        {/*        placeholder={'请输入账号'}*/}
        {/*        onChangeText={user_name => this.setState({ user_name })}*/}
        {/*        style={{ width: 270 }}*/}
        {/*        maxLength={12}*/}
        {/*        editable={!this.state.loading}*/}
        {/*    />*/}
        {/*</Label>*/}
        <Label title="手机号" mode="column">
          <Input
            value={this.state.phone}
            placeholder={'请输入手机号'}
            maxLength={11}
            style={{width: 270}}
            onChangeText={(phone) => this.setState({phone})}
            editable={!this.state.loading}
          />
        </Label>

        <View>
          <TextInput
            style={styles.textInput}
            onChangeText={(captcha) => this.setState({captcha})}
            placeholder="验证码"
            ref="captcha"
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
      </View>
    );
  };

  _renderReset = () => {
    return (
      <View style={styles.form}>
        <Label title="新的密码" mode="row">
          <Input
            value={this.state.password}
            placeholder={'密码由6-12位数字和字母组成'}
            onChangeText={(password) => this.setState({password})}
            style={{width: 240}}
            maxLength={12}
            secureTextEntry={true}
            editable={!this.state.loading}
          />
        </Label>
        <Label title="确认密码" mode="row">
          <Input
            value={this.state.secondary_password}
            placeholder={'再次输入新的密码'}
            maxLength={12}
            secureTextEntry={true}
            style={{width: 240}}
            onChangeText={(secondary_password) =>
              this.setState({secondary_password})
            }
            editable={!this.state.loading}
          />
        </Label>
      </View>
    );
  };

  render() {
    const {verification, loading} = this.state;
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
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>忘记密码</Text>
            </View>
          }
          right={<Text />}
        />

        <View style={styles.title}>
          <Text style={common.fontColorSize('#333333', 24)}>
            {verification ? '设置密码' : '找回密码'}
          </Text>
        </View>
        {verification ? this._renderReset() : this._renderFormVerify()}
        <Button
          loading={loading}
          title={verification ? '确 认' : '下一步'}
          onPress={this._onPress}
        />
      </SafeAreaView>
    );
  }
}

export default ForgotPage;
