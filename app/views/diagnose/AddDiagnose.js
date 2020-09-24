import React, {Component} from 'react';
import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  PixelRatio,
  Image,
} from 'react-native';

// styles
import styles from './style';
import {connect} from 'react-redux';
import {getMajor} from '../../store/actions/major';
import HeadButton from '../../components/ui/head-button';
import {changeOtherDiagnose} from '../../store/actions/user';

class AddDiagnose extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      title: '添加诊断',
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
      checked: new Set([]),
    };
    this.otherDiagnose = props.userRelated.info.userInfo.otherDiagnose;
  }

  componentWillMount() {
    //把函数调用设置在navigation中
    this.props.navigation.setParams({
      _onPress: this._onPress,
    });
  }

  _onPress = async () => {
    let patientId = this.props.userRelated.info.userInfo.id;
    let {otherDiagnose} = this.props.userRelated.info.userInfo;
    if (!otherDiagnose) {
      otherDiagnose = [];
    }
    let {checked} = this.state;
    for (let item of checked) {
      otherDiagnose.push(item);
    }
    console.log('otherDiagnose', otherDiagnose);
    this.props.changeDiagnose(patientId, otherDiagnose);
    this.props.navigation.goBack();
  };

  _onPressItem = async (item) => {
    let checked_tmp = this.state.checked;
    let {otherDiagnose} = this.props.userRelated.info.userInfo;
    if (!otherDiagnose) {
      otherDiagnose = [];
    }
    //如果该major已经是该患者的其他诊断，则置灰，无法进行点击操作
    if (otherDiagnose.includes(item)) {
      return;
    }
    if (this.state.checked.has(item)) {
      checked_tmp.delete(item);
    } else {
      checked_tmp = checked_tmp.add(item);
    }
    await this.setState({
      checked: checked_tmp,
    });
  };

  render() {
    let {otherDiagnose, diagnose} = this.props.userRelated.info.userInfo;
    if (!otherDiagnose) {
      otherDiagnose = [];
    }
    let params = {
      keyExtractor: (item) => item.id.toString(),
      data: this.props.majorList.info,
      renderItem: ({item}) => {
        return (
          <View>
            {item.data === diagnose ? (
              <View style={[styles.renderItem, {backgroundColor: '#dddddd'}]}>
                <Text style={styles.itemText}>{item.data}</Text>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => this._onPressItem(item.data)}
                style={styles.renderItem}>
                <View>
                  <Text style={styles.itemText}>{item.data}</Text>
                </View>
                <View>
                  {otherDiagnose.includes(item.data) ? (
                    <Image
                      source={require('./images/checked.png')}
                      style={{height: 24, width: 24}}
                    />
                  ) : this.state.checked.has(item.data) ? (
                    <Image
                      source={require('./images/check.png')}
                      style={{height: 24, width: 24}}
                    />
                  ) : (
                    <Image
                      source={require('./images/uncheck.png')}
                      style={{height: 24, width: 24}}
                    />
                  )}
                </View>
              </TouchableOpacity>
            )}
          </View>
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
  changeDiagnose: (patientId, diagnose) =>
    dispatch(changeOtherDiagnose(patientId, diagnose)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDiagnose);
