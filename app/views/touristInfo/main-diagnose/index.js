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
import {getMajor} from '../../../store/actions/major';
import BackIcon from '../../../components/ui/icon/back';
import Header from '../../../components/header';

class MainDiagnose extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      header: null,
    };
  };

  constructor(props) {
    super(props);
    props.getMajor();
    this.state = {
      diagnose: props.navigation.getParam('diagnose'),
    };
  }

  _onSubmit = async () => {
    let {diagnose} = this.state;
    this.props.navigation.state.params.refreshState(diagnose);
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
        <Header
          left={
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.pop();
              }}>
              <View style={styles.back}>
                <BackIcon />
              </View>
            </TouchableOpacity>
          }
          center={
            <View
              style={{
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>主诊断</Text>
            </View>
          }
          right={
            <TouchableOpacity
              style={{
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 15,
                paddingRight: 15,
              }}
              onPress={() => {
                this._onSubmit();
              }}>
              <Text style={{fontSize: 16}}>确定</Text>
            </TouchableOpacity>
          }
        />
        <FlatList {...params} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    majorList: state.majorList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getMajor: () => dispatch(getMajor()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainDiagnose);
