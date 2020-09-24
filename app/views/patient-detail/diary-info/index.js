import React from 'react';
import {SafeAreaView} from 'react-native';
import WebView from 'react-native-webview';
import styles from './style';
import {ip} from '../../../plugin/constance';

export default class DiaryInfo extends React.Component {
  static navigationOptions = () => {
    return {
      title: '疼痛日记',
    };
  };

  render() {
    const {patientId} = this.props.navigation.state.params;

    return (
      <SafeAreaView style={styles.container}>
        <WebView source={{uri: `http://${ip}/#/doctorView/${patientId}`}} />
      </SafeAreaView>
    );
  }
}
