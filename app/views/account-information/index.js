import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import {common} from '../../styles';
import Icon from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-root-toast';
import constance from '../../plugin/constance';
import ImagePicker from 'react-native-image-picker';
import {CANMERO_OPERATES} from '../../plugin/enume';
import ActionSheet from '../../widget/ActionSheet';
import {loadUserInfo, updateAvatar} from '../../store/actions/user';
import {connect} from 'react-redux';
import styles from './style';
import {asyncSave} from '../../plugin/asyncStorage';

class AccountInformation extends Component {
  static navigationOptions = {
    title: '账号信息',
  };

  constructor(props) {
    super(props);
    this.state = {
      //用户上传的图片，以base64码形式显示
      avatar_url: null,
    };
  }

  handlerPhoto = async (response) => {
    this.ActionSheet.setVisible(false);
    if (response.error) {
      Toast.show('图片选择错误', {position: 0});
      // console.log('ImagePicker Error: ', response.error);
      return false;
    }
    if (!response.data) {
      // console.log("图片为空");
      return;
    }
    //avatar_url保存可转化为图片的base64码（注意开头需要加上"data:image/png;base64,"的格式声明）
    this.setState({avatar_url: `data:image/png;base64,${response.data}`});
    await updateAvatar({
      userId: this.props.userRelated.info.id,
      base64: this.state.avatar_url,
    })
      .then((res) => {
        if (res.code === 20000) {
          Toast.show(`更换成功`, {position: 0});
        }
      })
      .catch(() => Toast.show(`头像更换失败`, {position: 0}));
    //更新Redux中user及storage信息
    // const access_token = this.props.userRelated.info.access_token;
    this.props.loadUserInfo();
  };

  async componentWillReceiveProps(nextProps) {
    //更新storage信息
    if (nextProps.userRelated.info.id) {
      await asyncSave(constance.USER_INFO, nextProps.userRelated.info);
    }
  }

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

  _renderInfo = () => {
    const userInfo = this.props.userRelated.info;
    if (userInfo) {
      return (
        <ScrollView>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              this.ActionSheet.setVisible();
            }}>
            <Text style={styles.left}>头像</Text>
            <View style={styles.right}>
              <Image
                style={styles.img}
                source={
                  this.state.avatar_url
                    ? {uri: this.state.avatar_url}
                    : userInfo.avatarUrl
                    ? {uri: userInfo.avatarUrl}
                    : require('./images/default_head.png')
                }
              />
              <Icon name="right" style={styles.icon} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              this.props.navigation.navigate('ResetNickname', {});
            }}>
            <Text style={styles.left}>昵称</Text>
            <View style={styles.right}>
              <Text style={[styles.right_text, {color: '#000'}]}>
                {userInfo.nickName}
              </Text>
              <Icon name="right" style={styles.icon} />
            </View>
          </TouchableOpacity>

          <View style={styles.item}>
            <Text style={[styles.left, {color: '#BEC2C8'}]}>手机号</Text>
            <View style={styles.right}>
              <Text style={[styles.right_text, {color: '#BEC2C8'}]}>
                {userInfo.phone}
              </Text>
              {/*<Icon name='right' style={styles.icon} />*/}
            </View>
          </View>

          <ActionSheet
            list={CANMERO_OPERATES}
            ref={(_ref) => (this.ActionSheet = _ref)}
            onPress={this.onActionSheet}
          />
        </ScrollView>
      );
    }
  };

  render() {
    return (
      <View style={[common.flex(), common.bgc()]}>{this._renderInfo()}</View>
    );
  }
}

const mapStateToProps = (state) => ({
  userRelated: state.userRelated,
});

const mapDispatchToProps = (dispatch) => ({
  loadUserInfo: () => dispatch(loadUserInfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountInformation);
