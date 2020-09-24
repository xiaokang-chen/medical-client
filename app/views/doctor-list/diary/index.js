import React from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import WebView from 'react-native-webview';
import styles from './style';
import connect from 'react-redux/es/connect/connect';
import {ip} from '../../../plugin/constance';

class Diary extends React.Component {
  static navigationOptions = {
    title: '疼痛日记',
    headerTitleStyle: {
      flex: 1,
    },
  };

  render() {
    //id为患者id
    const id = this.props.userRelated.info.userInfo
      ? this.props.userRelated.info.userInfo.id
      : null;

    return (
      <SafeAreaView style={styles.container}>
        {id ? (
          <WebView source={{uri: `http://${ip}/#/diary3D/${id}`}} />
        ) : (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text>请先完善个人信息！</Text>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userRelated: state.userRelated,
  };
};

export default connect(mapStateToProps)(Diary);
