import React, {Component} from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {common} from '../../styles';
import connect from 'react-redux/es/connect/connect';

import styles from './style';
import HeadButton from '../../components/ui/head-button';

class PersonalInformation extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      title: '个人资料',
      headerRight: (
        <TouchableOpacity onPress={() => params._onPress()}>
          <HeadButton name={'修改'} />
        </TouchableOpacity>
      ),
    };
  };

  componentWillMount() {
    //把函数调用设置在navigation中
    this.props.navigation.setParams({
      _onPress: this._onPress,
    });
  }

  _onPress = () => {
    const {navigation} = this.props;
    if (this.props.userRelated.info.identification === 1) {
      navigation.push('DoctorInformationUpdate');
    }
    if (this.props.userRelated.info.identification === 0) {
      navigation.push('PatientInformationUpdate');
    } else {
      return false;
    }
  };

  _Doctor = (personalInfo) => {
    return (
      <View>
        <View style={styles.article}>
          <Text style={styles.left}>姓名</Text>
          <View style={styles.right}>
            <Text style={styles.right_text}>
              {personalInfo ? personalInfo.name : null}
            </Text>
          </View>
        </View>

        <View style={styles.article}>
          <Text style={styles.left}>性别</Text>
          <View style={styles.right}>
            <Text style={styles.right_text}>
              {personalInfo ? personalInfo.sex : null}
            </Text>
          </View>
        </View>

        <View style={styles.article}>
          <Text style={styles.left}>最高学历</Text>
          <View style={styles.right}>
            <Text style={styles.right_text}>
              {personalInfo ? personalInfo.education : null}
            </Text>
          </View>
        </View>

        <View style={styles.article}>
          <Text style={styles.left}>职称</Text>
          <View style={styles.right}>
            <Text style={styles.right_text}>
              {personalInfo ? personalInfo.type : null}
            </Text>
          </View>
        </View>

        <View style={styles.article}>
          <Text style={styles.left}>专业方向</Text>
          <View style={styles.right}>
            <Text style={styles.right_text}>
              {personalInfo ? personalInfo.major : null}
            </Text>
          </View>
        </View>
      </View>
    );
  };

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

  _Patient = (personalInfo) => {
    return (
      <ScrollView>
        <View style={styles.article}>
          <Text style={styles.left}>姓名</Text>
          <View style={styles.right}>
            <Text style={styles.right_text}>
              {personalInfo ? personalInfo.name : null}
            </Text>
          </View>
        </View>

        <View style={styles.article}>
          <Text style={styles.left}>性别</Text>
          <View style={styles.right}>
            <Text style={styles.right_text}>
              {personalInfo ? personalInfo.sex : null}
            </Text>
          </View>
        </View>

        <View style={styles.article}>
          <Text style={styles.left}>出生日期</Text>
          <View style={styles.right}>
            <Text style={styles.right_text}>
              {personalInfo ? this.getMyDate(personalInfo.birth) : null}
            </Text>
          </View>
        </View>

        <View style={styles.article}>
          <Text style={styles.left}>学历</Text>
          <View style={styles.right}>
            <Text style={styles.right_text}>
              {personalInfo ? personalInfo.education : null}
            </Text>
          </View>
        </View>

        <View style={styles.article}>
          <Text style={styles.left}>身高</Text>
          <View style={styles.right}>
            <Text style={styles.right_text}>
              {!personalInfo
                ? ''
                : personalInfo.height
                ? personalInfo.height + 'cm'
                : ''}
            </Text>
          </View>
        </View>

        <View style={styles.article}>
          <Text style={styles.left}>体重</Text>
          <View style={styles.right}>
            <Text style={styles.right_text}>
              {!personalInfo
                ? ''
                : personalInfo.weight
                ? personalInfo.weight + 'kg'
                : ''}
            </Text>
          </View>
        </View>

        <View style={[styles.article]}>
          <Text style={styles.left}>婚姻情况</Text>
          <View style={styles.right}>
            <Text style={styles.right_text}>
              {personalInfo ? personalInfo.marriage : null}
            </Text>
          </View>
        </View>

        {/*<View style={[styles.article]}>*/}
        {/*    <Text style={styles.left}>主诊断</Text>*/}
        {/*    <View style={styles.right}>*/}
        {/*        <Text style={styles.right_text}>*/}
        {/*            {personalInfo ? personalInfo.diagnose:null}*/}
        {/*        </Text>*/}
        {/*    </View>*/}
        {/*</View>*/}

        {/*<View style={[styles.article]}>*/}
        {/*    <Text style={styles.left}>其他诊断</Text>*/}
        {/*    <View style={styles.right}>*/}
        {/*        <Text style={styles.right_text}>*/}
        {/*            {personalInfo ? personalInfo.otherDiagnose:null}*/}
        {/*        </Text>*/}
        {/*    </View>*/}
        {/*</View>*/}
      </ScrollView>
    );
  };

  _renderInfo = () => {
    const personalInfo = this.props.userRelated.info.userInfo;
    return (
      <View>
        {this.props.userRelated.info.identification === 1
          ? this._Doctor(personalInfo)
          : this._Patient(personalInfo)}
      </View>
    );
  };

  render() {
    return (
      <View style={[common.flex(), common.bgc()]}>{this._renderInfo()}</View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userRelated: state.userRelated,
  };
};

export default connect(mapStateToProps)(PersonalInformation);
