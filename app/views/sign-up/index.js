import React, {Component} from 'react';
import {
  Image,
  View,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Text,
  ScrollView,
  Dimensions,
  TextInput,
} from 'react-native';
import {common} from '../../styles';
import {CANMERO_OPERATES} from '../../plugin/enume';
import ActionSheet from '../../widget/ActionSheet';
import Header from '../../components/header';
import Button from '../../widget/Button';
import Icon from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-root-toast';
import {register} from '../../store/actions/user';

import styles from './style';
import BackIcon from '../../components/ui/icon/back';
import CaptchaButton from '../../components/captcha-button';

const PHONE_REG = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
const PASSWORD_REG = /.{6}/;
const screenWidth = Dimensions.get('window').width;

export default class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar_url: null,
      // user_name:'',
      nickname: '',
      phone: '',
      captcha: '',
      password: '',
      secondary_password: '',
      loading: false,

      agree: false,
    };
  }

  _validate = () => {
    const {phone, password, secondary_password, captcha} = this.state;
    if (!PHONE_REG.test(phone)) {
      Toast.show('请输入正确的手机号码', {position: 0});
      return false;
    }
    if (!captcha) {
      Toast.show('请输入验证码', {position: 0});
      return false;
    }
    if (!PASSWORD_REG.test(password)) {
      Toast.show('密码至少为 6 位 ', {position: 0});
      return false;
    }
    if (secondary_password !== password) {
      Toast.show('两次密码不一致', {position: 0});
      return false;
    }
    return true;
  };

  sendCaptcha = (callback) => {
    const {phone} = this.state;

    // if (!phone) return Alert.alert('', '请输入手机号');
    if (!PHONE_REG.test(phone))
      return Toast.show('请输入正确的手机号码', {position: 0});

    //手机发送获取验证码请求---回调，相当于send(phone)
    callback(phone);
  };

  onRegister = async () => {
    if (this._validate()) {
      //两个选填
      let avatarUrl = this.state.avatar_url ? this.state.avatar_url : null;
      let nickName = this.state.nickname
        ? this.state.nickname
        : `用户${this.state.phone}`;
      try {
        this.setState({loading: true});
        await register({
          avatarUrl: avatarUrl,
          nickName: nickName,
          phone: this.state.phone,
          password: this.state.password,
          code: this.state.captcha,
        }).then((res) => {
          if (res.code === 20000) {
            Toast.show(`用户${this.state.nickname}注册成功`, {position: 0});
            this.props.navigation.navigate('SignIn');
          } else if (res.code === 400) {
            Toast.show(`验证码错误`, {position: 0});
          } else if (res.code === 500) {
            Toast.show(`手机号${this.state.phone}已被注册`, {position: 0});
          } else {
            Toast.show(`未知错误`, {position: 0});
          }
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({loading: false});
      }
    }
  };

  handlerPhoto = async (response) => {
    try {
      this.ActionSheet.setVisible(false);
      if (response.error) {
        Toast.show('图片选择错误', {position: 0});
        // console.log('ImagePicker Error: ', response.error);
        return false;
      }
      //avatar_url保存可转化为图片的base64码（注意开头需要加上"data:image/png;base64,"的格式声明）
      this.setState({avatar_url: `data:image/png;base64,${response.data}`});
    } catch (error) {
      Toast.show('图片上传错误', {position: 0});
    }
  };

  onActionSheet = (item) => {
    if (item.value === 'photo_album') {
      return ImagePicker.launchImageLibrary(
        {
          maxWidth: 200,
          maxHeight: 200,
        },
        this.handlerPhoto,
      );
    }
    return ImagePicker.launchCamera(
      {
        maxWidth: 200,
        maxHeight: 200,
      },
      this.handlerPhoto,
    );
  };

  _renderForm = () => {
    return (
      <View style={styles.form}>
        <TextInput
          style={styles.textInput}
          onChangeText={(nickname) => this.setState({nickname})}
          placeholder="昵称(选填)"
          ref="nickname"
          maxLength={40}
          underlineColorAndroid="transparent"
        />
        <TextInput
          style={[
            styles.textInput,
            {borderTopLeftRadius: 0, borderBottomLeftRadius: 0},
          ]}
          autoCapitalize="none"
          onChangeText={(phone) => this.setState({phone})}
          placeholder="手机号"
          ref="phone"
          maxLength={60}
          underlineColorAndroid="transparent"
        />
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
        <TextInput
          style={styles.textInput}
          onChangeText={(password) => this.setState({password})}
          secureTextEntry={true}
          placeholder="密码(至少6位以上)"
          ref="password"
          maxLength={20}
          underlineColorAndroid="transparent"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(secondary_password) =>
            this.setState({secondary_password})
          }
          secureTextEntry={true}
          placeholder="确认密码"
          ref="password"
          maxLength={20}
          underlineColorAndroid="transparent"
        />

        <View style={{flexDirection: 'row', paddingTop: 15}}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              this.setState({agree: !this.state.agree});
            }}>
            <Image
              source={
                this.state.agree
                  ? require('./images/agree.png')
                  : require('./images/disagree.png')
              }
              style={styles.agreeImg}
            />
          </TouchableOpacity>
          <View style={{paddingLeft: 10}}>
            <Text style={{fontSize: 16}}>我已阅读并知晓知情同意书</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              this.props.navigation.navigate('Agreement');
            }}>
            <Text style={{fontSize: 16, color: '#0e72ef'}}>(点击查看)</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
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
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>注册</Text>
            </View>
          }
          right={<Text />}
        />
        <ScrollView>
          <KeyboardAvoidingView
            style={styles.content}
            // behavior='position'
            enabled>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                this.ActionSheet.setVisible();
              }}
              style={styles.avatar}>
              <Image
                style={styles.avatar_img}
                source={
                  this.state.avatar_url
                    ? {uri: this.state.avatar_url}
                    : require('./images/default_head.png')
                }
              />
              <View style={styles.avatar_camero}>
                <Icon name="camerao" style={common.fontColorSize('#fff', 18)} />
              </View>
            </TouchableOpacity>
            {this._renderForm()}
            <Button
              loading={this.state.loading}
              onPress={this.onRegister}
              disabled={!this.state.agree}
            />
          </KeyboardAvoidingView>
          <ActionSheet
            list={CANMERO_OPERATES}
            ref={(_ref) => (this.ActionSheet = _ref)}
            onPress={this.onActionSheet}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
