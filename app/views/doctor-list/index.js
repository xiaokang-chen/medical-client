import React from 'react';
import {
  Text,
  View,
  Image,
  SectionList,
  PixelRatio,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

// styles
import styles from './style';
import Header from '../../components/header';
import {SafeAreaView} from 'react-navigation';
import connect from 'react-redux/es/connect/connect';

class DoctorList extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      tabBarLabel: '医生列表',

      // header在公共属性中已经设为Null
      tabBarIcon: ({tintColor, focused}) => (
        <View>
          <Image
            source={
              focused
                ? require('./images/list-active.png')
                : require('./images/list.png')
            }
            style={[styles.icon, {tintColor: tintColor}]}
          />
        </View>
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
    };
  }

  _renderHeader = (info) => {
    let header = info.section.key;
    return (
      <Text
        style={{
          height: 25,
          textAlign: 'center',
          lineHeight: 25,
          backgroundColor: '#f6f6f6',
          color: 'black',
          fontSize: 15,
        }}>
        {header}
      </Text>
    );
  };

  _renderItem = (info) => {
    let patientInfo = info.item; //取到数据源中的显示数据
    let list = patientInfo.userInfo;
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          this.props.navigation.navigate('DoctorDetail', {
            patientInfo: patientInfo,
          })
        }>
        <View style={styles.itemLeft}>
          <View>
            <Image
              source={
                list.avatarUrl
                  ? {uri: list.avatarUrl}
                  : require('./images/default_head.png')
              }
              style={styles.avatar}
            />
          </View>

          <View style={{paddingLeft: 15}}>
            <Text style={styles.nickname} numberOfLines={1}>
              {list.nickName}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {info} = this.props.patientList;
    // const { apply_list } = this.props.friends;

    let params = {
      keyExtractor: (item, index) => index,
      renderSectionHeader: this._renderHeader, //区头
      renderItem: this._renderItem,
      sections: info,
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
    };

    let amount = 0;
    for (let item1 of info) {
      amount += item1.data.length;
    }

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
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>医生列表</Text>
            </View>
          }
          right={<Text />}
        />

        <ScrollView style={{flex: 1}}>
          <SectionList {...params} />
          <View
            style={{height: 1 / PixelRatio.get(), backgroundColor: '#cdced2'}}
          />
          <View style={{alignItems: 'center', paddingVertical: 10}}>
            <Text style={{fontSize: 16}}>{amount}位医生</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  patientList: state.patientList,
  // friends :state.friends
});

export default connect(mapStateToProps)(DoctorList);
