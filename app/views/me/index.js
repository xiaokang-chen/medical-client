import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  PixelRatio,
  SafeAreaView,
} from 'react-native';
import {common} from '../../styles';
import {
  PATIENT_OPERATE_BAR,
  DOCTOR_OPERATE_BAR,
  PATIENT_CUSTOM_BAR,
} from '../../plugin/enume';
import Icon from 'react-native-vector-icons/AntDesign';

//CSS
import styles from './style';

import Header from '../../components/header';
import {connect} from 'react-redux';

class Me extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      tabBarLabel: '我',

      // header在公共属性中已经设为Null
      tabBarIcon: ({tintColor, focused}) => (
        <View>
          <Image
            source={
              focused
                ? require('./images/me-active.png')
                : require('./images/me.png')
            }
            style={[styles.icon, {tintColor: tintColor}]}
          />
        </View>
      ),
    };
  };

  //跳转到账号信息、个人资料、设置、问卷调查（患）、问卷推送（医）
  jumperToBar = (value) => {
    if (value === 'AccountInfo') {
      return this.props.navigation.navigate('AccountInformation');
    }
    if (value === 'PersonalInfo') {
      this.props.navigation.navigate('PersonalInformation');
    }
    if (value === 'Setting') {
      return this.props.navigation.navigate('Setting');
    }
    if (value === 'Diagnose') {
      return this.props.navigation.navigate('Diagnose');
    }
    if (value === 'Patient') {
      return this.props.navigation.navigate('Patient');
    }
    if (value === 'Questionnaire') {
      return this.props.navigation.navigate('Questionnaire');
    }
    if (value === 'QuestionnairePush') {
      return this.props.navigation.navigate('QuestionnairePush');
    }
    if (value === 'AddDoctor') {
      return this.props.navigation.navigate('AddDoctor');
    }
    if (value === 'Diary') {
      return this.props.navigation.navigate('Diary');
    }
  };

  //渲染个人中心的其他的模块
  _renderOperateBar = (operate) => {
    if (operate) {
      return (
        <View key={operate.value}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              this.jumperToBar(operate.value);
            }}
            // key={operate.value}
            style={[
              styles.operate_item,
              {
                borderBottomWidth: 2 / PixelRatio.get(),
                borderColor: '#f2f2f2',
                borderBottomLeftRadius: 50,
              },
            ]}>
            <Icon
              name={operate.iconName}
              style={common.fontColorSize(operate.iconColor)}
            />
            <Text style={styles.operate_title}>{operate.label}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  _renderCustomPatientBar = () => {
    return (
      <View style={{padding: 10}}>
        <Text style={styles.bar_title}>资料</Text>
        <View style={{flexDirection: 'row', marginTop: 10, paddingBottom: 10}}>
          {PATIENT_CUSTOM_BAR.map((operate) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  this.jumperToBar(operate.value);
                }}
                key={operate.value}
                style={styles.operator_custom_item}>
                <Icon
                  name={operate.iconName}
                  style={common.fontColorSize(operate.iconColor)}
                />
                <Text style={styles.operate_custom_title}>{operate.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  _renderAvatar = () => {
    return (
      <View style={styles.avatar}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            this.props.navigation.navigate('AccountInformation');
          }}>
          <Image
            source={
              this.props.userRelated.info.avatarUrl
                ? {uri: this.props.userRelated.info.avatarUrl}
                : require('./images/default_head.png')
            }
            style={styles.avatar_img}
          />
        </TouchableOpacity>
        <View style={{paddingHorizontal: 20}}>
          <Text style={styles.nick_name} numberOfLines={1}>
            {this.props.userRelated.info.nickName}
          </Text>
          <Text style={styles.phone} numberOfLines={1}>
            手机号：{this.props.userRelated.info.phone}
          </Text>
        </View>
      </View>
    );
  };

  render() {
    const {identification} = this.props.userRelated.info;

    return (
      <SafeAreaView style={styles.container}>
        <Header
          left={<Text />}
          center={
            <View
              style={{
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>个人中心</Text>
            </View>
          }
          right={<Text />}
        />

        <ScrollView style={{flex: 1}}>
          {this._renderAvatar()}
          <View style={{height: 12, backgroundColor: '#f8f8f8'}} />
          <View style={styles.operate}>
            {identification === 0
              ? PATIENT_OPERATE_BAR.map((operate) => {
                  return this._renderOperateBar(operate);
                })
              : identification === 1
              ? DOCTOR_OPERATE_BAR.map((operate) => {
                  return this._renderOperateBar(operate);
                })
              : null}

            <View style={{height: 12, backgroundColor: '#f8f8f8'}} />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                this.jumperToBar('Setting');
              }}
              // key={operate.value}
              style={[
                styles.operate_item,
                {
                  borderBottomWidth: 2 / PixelRatio.get(),
                  borderColor: '#f2f2f2',
                  borderBottomLeftRadius: 50,
                },
              ]}>
              <Icon name={'setting'} style={common.fontColorSize()} />
              <Text style={styles.operate_title}>{'设置'}</Text>
            </TouchableOpacity>

            <View style={{height: 12, backgroundColor: '#f8f8f8'}} />

            {identification === 0 ? this._renderCustomPatientBar() : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userRelated: state.userRelated,
  };
};

export default connect(mapStateToProps)(Me);
