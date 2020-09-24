import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Image, Dimensions} from 'react-native';
import {common} from '../../../styles';
import styles from './style';
import {connect} from 'react-redux';

class AddDoctor extends Component {
  static navigationOptions = {
    title: '添加医生',
    headerTitleStyle: {
      flex: 1,
    },
  };

  addDoctor = () => {
    return (
      <View>
        <Text style={{fontSize: 22, fontWeight: 'bold', color: '#000'}}>
          按科室添加医生
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            this.props.navigation.navigate('SearchDoctorByMajor');
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 20,
            borderWidth: 1,
            borderColor: '#f0f0f0',
            borderRadius: 10,
            height: 80,
            zIndex: 99,
            // backgroundColor: '#f1f1f1'
          }}>
          <View style={{zIndex: 1, paddingHorizontal: 10}}>
            <Image
              source={require('../images/doctor1.jpg')}
              style={{height: 75, width: 60}}
            />
          </View>
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: '#000'}}>
              专业疼痛医生
            </Text>
            <Text style={{fontSize: 14, color: '#000'}}>
              院内自聘医生 专业认证
            </Text>
          </View>
          <Image
            source={require('../images/add.png')}
            style={{height: 40, width: 40, marginRight: 20}}
          />
        </TouchableOpacity>
      </View>
    );
  };
  prompt = () => {
    return (
      <View
        style={{
          paddingTop: 0.3 * Dimensions.get('window').height,
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000'}}>
          请先完善个人信息！
        </Text>
      </View>
    );
  };

  render() {
    const {userRelated} = this.props;

    return (
      <View style={[common.flex(), common.bgc(), {paddingHorizontal: 15}]}>
        <TouchableOpacity
          style={styles.header}
          activeOpacity={0.8}
          onPress={() => {
            this.props.navigation.navigate('SearchDoctorByName');
          }}>
          <Image
            source={require('../images/search.png')}
            style={{width: 30, height: 30, tintColor: '#e2e2e2'}}
          />
          <View style={{paddingLeft: 10}}>
            <Text style={{lineHeight: 17, fontSize: 15}}>搜索医生名添加</Text>
          </View>
        </TouchableOpacity>
        {userRelated.info.userInfo ? this.addDoctor() : this.prompt()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userRelated: state.userRelated,
  };
};

export default connect(mapStateToProps)(AddDoctor);
