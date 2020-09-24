import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {common} from '../../../styles';
import styles from './style';

export default class MoreInfo extends React.Component {
  static navigationOptions = {
    title: '更多信息',
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
              {personalInfo ? personalInfo.height : null}
            </Text>
          </View>
        </View>

        <View style={styles.article}>
          <Text style={styles.left}>体重</Text>
          <View style={styles.right}>
            <Text style={styles.right_text}>
              {personalInfo ? personalInfo.weight : null}
            </Text>
          </View>
        </View>

        <View style={styles.article}>
          <Text style={styles.left}>婚姻情况</Text>
          <View style={styles.right}>
            <Text style={styles.right_text}>
              {personalInfo ? personalInfo.marriage : null}
            </Text>
          </View>
        </View>

        <View style={styles.article}>
          <Text style={styles.left}>诊断</Text>
          <View style={styles.right}>
            <Text style={styles.right_text}>
              {personalInfo ? personalInfo.diagnose : null}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  };

  _renderInfo = () => {
    const {patientInfo} = this.props.navigation.state.params;
    return <View>{this._Patient(patientInfo)}</View>;
  };

  render() {
    return (
      <View style={[common.flex(), common.bgc()]}>{this._renderInfo()}</View>
    );
  }
}
