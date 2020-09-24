import React, {Component} from 'react';
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  PixelRatio,
} from 'react-native';

// styles
import styles from './style';
import {connect} from 'react-redux';
import {
  addSearch,
  cleanSearch,
  searchPatient,
} from '../../../store/actions/search';

class SearchPatientByNameOrPhone extends Component {
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

  _historyDelete = async () => {
    const message = '确定删除历史记录？';
    Alert.alert('提示', message, [
      {text: '取消', style: 'cancel'},
      {
        text: '确定',
        onPress: () => {
          this.props.cleanSearch();
        },
      },
    ]);
  };

  handleSearch = async (e) => {
    await this.setState({q: e});
    console.log('QQQQ', this.state.q);
    //每输入一个字调用一次接口
    if (this.state.q) {
      searchPatient({key: this.state.q}).then((res) => {
        this.setState({patientSearch: res.data});
      });
    }
  };

  _search = (q) => {
    if (q) {
      this.props.addSearch(q);
    }
    this.props.navigation.navigate('PatientListSearch', {
      q: q,
      res: this.state.patientSearch,
    });
  };

  _renderHistory = (search) => {
    const {q} = this.state;
    let history = Array.from(search.search);
    //数组逆序，以保证最新查询的在最前面
    history.reverse();
    while (history.length > 16) {
      history.pop();
    }
    return (
      <View
        style={{
          paddingHorizontal: 15,
          flexDirection: 'row',
          backgroundColor: '#fff',
          flexWrap: 'wrap',
          display: 'flex',
        }}>
        {history.map((item) => {
          return (
            <TouchableOpacity
              style={styles.historyItem}
              onPress={async () => {
                await searchPatient({key: item}).then((res) => {
                  this.setState({patientSearch: res.data});
                });
                console.log('patientSearch', this.state.patientSearch);
                this._search(item);
              }}>
              <Text style={{textAlign: 'center', fontSize: 12}}>{item}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  _renderItem = () => {
    const {patientSearch} = this.state;
    let params = {
      keyExtractor: (item) => item.id.toString(),
      renderItem: ({item}) => {
        return (
          <TouchableOpacity style={styles.item}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{paddingLeft: 15}}>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: '#000'}}>
                  {item.name}
                </Text>
              </View>
              <View style={{paddingRight: 15}}>
                <Text style={{fontSize: 15, color: '#000'}}>{item.phone}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      },
      data: patientSearch,
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
    // const { type, q, historySearch } = this.state;
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
              source={require('../images/return.png')}
              resizeMode="contain"
              style={{width: 24, height: 24}}
            />
          </TouchableOpacity>

          <TextInput
            style={styles.searchInput}
            placeholder={'搜索...'}
            onChangeText={this.handleSearch}
            clearButtonMode="while-editing"
            autoFocus={true}
            returnKeyType="search"
            value={q}
          />

          <TouchableOpacity
            style={styles.headText}
            onPress={() => {
              this._search(q);
            }}>
            <Text style={styles.headButtonText}>搜索</Text>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1}}>
          {q ? (
            this._renderItem()
          ) : (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 15,
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold'}}>
                  历史搜索
                </Text>
                <TouchableOpacity
                  style={{justifyContent: 'flex-end'}}
                  onPress={this._historyDelete}>
                  <Image
                    style={{height: 15, width: 15}}
                    source={require('../images/delete.png')}
                  />
                </TouchableOpacity>
              </View>
              <View>{this._renderHistory(search)}</View>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    search: state.search,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addSearch: (search) => dispatch(addSearch(search)),
  cleanSearch: () => dispatch(cleanSearch()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchPatientByNameOrPhone);
