import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  PixelRatio,
} from 'react-native';
import styles from './style';
import {connect} from 'react-redux';
import Toast from 'react-native-root-toast';

class PatientListSearch extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      header: null,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      q: '',
      patientSearch: '',
    };
  }

  _onPress = async (item) => {
    let message = `确定添加医生：${item.name}？`;
    Alert.alert('提示', message, [
      {text: '取消', style: 'cancel'},
      {
        text: '确定',
        onPress: async () => {
          const content = JSON.stringify({
            ...this.props.userRelated.info,
            messages: '我是' + item.name + '，请求添加您为好友。',
          });
          this.props.ws.send(
            JSON.stringify({
              version: 1,
              commandId: 13,
              shellId: this.props.userRelated.info.id,
              body: {
                to_shell_id: item.userId,
                Type: '1',
                content,
              },
            }),
          );
          Toast.show('发送请求成功', {position: 0});
        },
      },
    ]);
  };

  _renderItem = () => {
    const {res} = this.props.navigation.state.params;
    const {info} = this.props.patientList;
    let data = [];
    for (let item of info) {
      for (let i of item.data) {
        data.push(i);
      }
    }
    console.log('DATA RES', res);
    let params = {
      keyExtractor: (item) => item.id.toString(),
      renderItem: ({item}) => {
        return (
          <View
            style={styles.item}
            // onPress={this._search(item.name)}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: 60,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 15,
                }}>
                <Image
                  style={styles.avatar}
                  source={
                    item.avatarUrl
                      ? {uri: item.avatarUrl}
                      : require('../../images/default_head.png')
                  }
                  cache="force-cache"
                />
                <View>
                  <Text
                    style={{fontSize: 18, fontWeight: 'bold', color: '#000'}}>
                    {item.name}
                  </Text>
                  <Text style={{fontSize: 15, color: '#000'}}>
                    {item.major}
                  </Text>
                  <Text style={{fontSize: 12}}>
                    {item.type}
                    {item.sex ? '-' + item.sex : null}
                  </Text>
                </View>
              </View>

              {data.find((arr) => {
                if (arr.id === item.id) {
                  return true;
                }
              }) ? (
                <View style={{alignItems: 'center', paddingRight: 15}}>
                  <Text style={{fontSize: 15, color: '#f2f2f2'}}>已添加</Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={{alignItems: 'center', paddingRight: 15}}
                  onPress={() => this._onPress(item)}>
                  <Text style={{fontSize: 15, color: '#000'}}>添加</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        );
      },
      data: res,
      ItemSeparatorComponent: () => (
        <View
          style={{
            height: 1 / PixelRatio.get(),
            backgroundColor: '#cdced2',
            marginLeft: 10,
          }}
        />
      ),
    };
    return <FlatList {...params} />;
  };

  render() {
    const {navigation, search} = this.props;
    const {q} = this.state;
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headButton}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={require('../../images/return.png')}
              resizeMode="contain"
              style={{width: 24, height: 24}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.searchInput}
            // onPress={()=>{ navigation.goBack() }}
          >
            <Text style={{fontSize: 15}}>{navigation.state.params.q}</Text>
          </TouchableOpacity>

          <View style={styles.headText} />
        </View>

        <View style={{flex: 1}}>{this._renderItem()}</View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    search: state.search,
    patientList: state.patientList,
    ws: state.sessionList.ws.ws,
    userRelated: state.userRelated,
  };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PatientListSearch);
