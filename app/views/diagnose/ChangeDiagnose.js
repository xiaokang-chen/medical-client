import React, {Component} from 'react';
import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  PixelRatio,
} from 'react-native';

// styles
import styles from './style';
import {connect} from 'react-redux';
import {getMajor} from '../../store/actions/major';
import {changeMainDiagnose} from '../../store/actions/user';
import HeadButton from '../../components/ui/head-button';

class ChangeDiagnose extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      title: '更换主诊断',
      headerRight: (
        <TouchableOpacity onPress={() => params._onPress()}>
          <HeadButton name={'确定'} />
        </TouchableOpacity>
      ),
    };
  };

  constructor(props) {
    super(props);
    props.getMajor();
    this.state = {
      diagnose: props.navigation.getParam('diagnose'),
    };
  }

  componentWillMount() {
    //把函数调用设置在navigation中
    this.props.navigation.setParams({
      _onPress: this._onPress,
    });
  }

  _onPress = async () => {
    let patientId = this.props.userRelated.info.userInfo.id;
    let {diagnose} = this.state;
    let {otherDiagnose} = this.props.userRelated.info.userInfo;
    if (otherDiagnose) {
      for (let i in otherDiagnose) {
        if (otherDiagnose[i] === diagnose) {
          otherDiagnose.splice(i, 1);
          break;
        }
      }
    }
    this.props.changeDiagnose(patientId, diagnose, otherDiagnose);
    this.props.navigation.goBack();
  };

  render() {
    let params = {
      keyExtractor: (item) => item.id.toString(),
      data: this.props.majorList.info,
      renderItem: ({item}) => {
        let color = item.data === this.state.diagnose ? '#dddddd' : '#fff';
        return (
          <TouchableOpacity
            style={[styles.renderItem, {backgroundColor: color}]}
            onPress={() => {
              this.setState({diagnose: item.data});
            }}>
            <Text style={styles.itemText}>{item.data}</Text>
          </TouchableOpacity>
        );
      },
      ItemSeparatorComponent: () => (
        <View
          style={{height: 1 / PixelRatio.get(), backgroundColor: '#cdced2'}}
        />
      ),
    };
    return (
      <SafeAreaView style={{flex: 1}}>
        <FlatList {...params} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    majorList: state.majorList,
    userRelated: state.userRelated,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getMajor: () => dispatch(getMajor()),
  changeDiagnose: (patientId, diagnose, otherDiagnose) =>
    dispatch(changeMainDiagnose(patientId, diagnose, otherDiagnose)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeDiagnose);
