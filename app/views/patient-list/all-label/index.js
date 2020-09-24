import React from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  PixelRatio,
  ScrollView,
} from 'react-native';
import styles from './style';
import BackIcon from '../../../components/ui/icon/back';
import connect from 'react-redux/es/connect/connect';
import {fetchLabel} from '../../../store/actions/label';

class AllLabel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.props.fetchLabel();
  }

  _renderLabelItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          this.props.navigation.navigate('EditLabel', {label: item});
        }}>
        <Text style={styles.itemText}>
          {item.labelName}({item.patients.length})
        </Text>
      </TouchableOpacity>
    );
  };

  _renderContent = () => {
    if (this.props.label.errMess || this.props.label.label.length === 0) {
      return (
        <ScrollView>
          <Text style={{padding: 20, textAlign: 'center'}}>没有数据</Text>
        </ScrollView>
      );
    } else {
      return (
        <FlatList
          data={this.props.label.label}
          renderItem={this._renderLabelItem}
          ListFooterComponent={() => (
            <View
              style={{height: 1 / PixelRatio.get(), backgroundColor: '#cdced2'}}
            />
          )}
          keyExtractor={(item) => item.labelId.toString()}
          ItemSeparatorComponent={() => (
            <View
              style={{height: 1 / PixelRatio.get(), backgroundColor: '#cdced2'}}
            />
          )}
          showsVerticalScrollIndicator={true}
        />
      );
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            backgroundColor: '#e6e6e6',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 15,
            paddingVertical: 5,
            flexDirection: 'row',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <BackIcon />
            </TouchableOpacity>

            <View style={styles.title}>
              <Text style={{fontSize: 18, color: '#000', fontWeight: 'bold'}}>
                所有标签
              </Text>
            </View>
          </View>

          <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('SelectPatient');
              }}
              style={{
                height: 45,
                paddingRight: 15,
                paddingLeft: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 17, color: '#000'}}>新建</Text>
            </TouchableOpacity>
          </View>
        </View>

        {this._renderContent()}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  label: state.label,
});

const mapDispatchToProps = (dispatch) => ({
  //接口---获取所有标签
  fetchLabel: () => dispatch(fetchLabel()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllLabel);
