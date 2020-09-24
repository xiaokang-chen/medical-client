import React, {Component} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  View,
  PixelRatio,
  FlatList,
  Text,
  Image,
} from 'react-native';

import {connect} from 'react-redux';
import styles from './style';
import Icon from 'react-native-vector-icons/AntDesign';
import Swipeout from 'react-native-swipeout';
import {deleteOtherDiagnose} from '../../store/actions/user';

class Diagnose extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: '我的诊断',
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      otherDiagnose: new Set([]),
    };
  }

  async componentDidMount() {
    // this.props.getDiagnose();
  }

  _renderHeaderComponent = (diagnose) => {
    return (
      <View>
        <View style={{backgroundColor: '#eeeeee', paddingVertical: 10}}>
          <Text style={{fontSize: 15, color: '#000', textAlign: 'center'}}>
            主诊断
          </Text>
        </View>
        <TouchableOpacity
          style={styles.diagnose}
          onPress={() => {
            console.log('IIIIIIDDDDDD', this.props.userRelated.info.userInfo);
            this.props.navigation.navigate('ChangeDiagnose', {
              diagnose: diagnose,
            });
          }}>
          <Text style={styles.left}>{diagnose}</Text>
          <View style={styles.right}>
            <Icon name="right" style={styles.icon} />
          </View>
        </TouchableOpacity>

        <View style={{backgroundColor: '#eeeeee', paddingVertical: 10}}>
          <Text style={{fontSize: 15, color: '#000', textAlign: 'center'}}>
            其他诊断
          </Text>
        </View>
      </View>
    );
  };

  __renderFooterComponent = (otherDiagnose) => {
    let len = otherDiagnose ? otherDiagnose.length : 0;
    return (
      <View>
        {len < 9 ? (
          <TouchableOpacity
            style={{
              alignItems: 'center',
              paddingVertical: 10,
              backgroundColor: '#fff',
            }}
            onPress={() => this.props.navigation.navigate('AddDiagnose')}>
            <Image
              source={require('./images/add.png')}
              style={{height: 30, width: 30}}
            />
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
    );
  };

  _deleteOtherDiagnose = (item) => {
    let patientId = this.props.userRelated.info.userInfo.id;
    let {otherDiagnose} = this.props.userRelated.info.userInfo;
    if (!otherDiagnose) {
      otherDiagnose = [];
    }
    for (let i in otherDiagnose) {
      if (otherDiagnose[i] === item) {
        otherDiagnose.splice(i, 1);
        break;
      }
    }
    this.props.deleteOtherDiagnose(patientId, otherDiagnose);
  };

  _renderItem = ({item}) => {
    let BtnsRight = [
      {
        text: '删除',
        type: 'delete',
        onPress: () => this._deleteOtherDiagnose(item),
      },
    ];
    return (
      <Swipeout right={BtnsRight} backgroundColor="white">
        <View style={styles.diagnose}>
          <Text style={styles.left}>{item}</Text>
        </View>
      </Swipeout>
    );
  };

  render() {
    const {userInfo} = this.props.userRelated.info;
    console.log(userInfo.otherDiagnose);
    let params = {
      keyExtractor: (item, index) => index,
      renderItem: this._renderItem,
      data: userInfo.otherDiagnose,
      ItemSeparatorComponent: () => (
        <View
          style={{
            height: 1 / PixelRatio.get(),
            backgroundColor: '#cdced2',
            marginLeft: 80,
          }}
        />
      ),
      removeClippedSubviews: false,
      ListHeaderComponent: this._renderHeaderComponent(userInfo.diagnose), //列表头部
      ListFooterComponent: this.__renderFooterComponent(userInfo.otherDiagnose),
    };
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#eeeeee'}}>
        <FlatList {...params} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userRelated: state.userRelated,
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteOtherDiagnose: (patientId, otherDiagnose) =>
    dispatch(deleteOtherDiagnose(patientId, otherDiagnose)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Diagnose);
