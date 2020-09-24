import React from 'react';
import {
  View,
  FlatList,
  PixelRatio,
  Image,
  TouchableOpacity,
  Text,
  SectionList,
  SafeAreaView,
} from 'react-native';

import HeadButton from '../../components/ui/head-button';
import connect from 'react-redux/es/connect/connect';
import {pushQuestionnaire} from '../../store/actions/questionnaire';
import styles from './styles';
import {fetchLabel} from '../../store/actions/label';

class PushList extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;

    return {
      title: '选择',
      headerRight: (
        <TouchableOpacity onPress={() => params._onPress()}>
          <HeadButton
            name={
              params._name
                ? params._name === '选择'
                  ? '选择'
                  : !params._size
                  ? //需要在正则末尾加上空格！
                    '取消'
                  : '推送(' + `${params._size}) `
                : '选择'
            }
          />
        </TouchableOpacity>
      ),
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      _press: false,
      more: true,
      check: false,
      //选择的患者Id列表
      checked: new Set([]),
      checkedLabel: new Set([]),
    };
    let size = this.state.checked.size;
    this.props.navigation.setParams({
      _name: '选择',
      _size: size,
    });

    this.userId = null;
  }

  componentWillMount() {
    //把函数调用设置在navigation中
    this.props.navigation.setParams({
      _onPress: this._onPress,
    });
  }

  componentDidMount() {
    this.props.fetchLabel();
  }

  _onPress = async () => {
    let size = this.state.checked.size + this.state.checkedLabel.size;
    if (size) {
      //pidArray是推送问卷的id列表
      let {pidArray} = this.props.navigation.state.params;
      const {checked, checkedLabel} = this.state;
      let patientIdArray = new Set([]);
      let paperIdArray = [];
      for (let item of pidArray) {
        paperIdArray.push(item);
      }
      //患者列表中选择的每个id
      for (let item of checked) {
        patientIdArray.add(item);
      }
      //患者标签中选择的每个id标签组
      for (let item of checkedLabel) {
        for (let id of item.patients) {
          patientIdArray.add(id);
        }
      }
      // console.log("patientIdArray",patientIdArray);
      //调用推送接口
      await this.props.pushQuestionnaire(
        Array.from(patientIdArray),
        paperIdArray,
      );
      await this.props.navigation.state.params.clear;
      setTimeout(() => {
        this.props.navigation.goBack();
      }, 700);
      // this.props.navigation.navigate('QuestionnairePush')
    }
    await this.setState({_press: !this.state._press});
    if (!this.state._press) {
      this.props.navigation.setParams({
        _name: '选择',
      });
    } else {
      this.props.navigation.setParams({
        _name: '取消',
      });
    }
  };

  labelToPatientId = async (item) => {
    // let {labelId, patients} = item;
    let checked_tmp = this.state.checkedLabel;
    if (this.state.checkedLabel.has(item)) {
      checked_tmp.delete(item);
    } else {
      checked_tmp = checked_tmp.add(item);
    }
    await this.setState({
      checkedLabel: checked_tmp,
    });
    let size = this.state.checked.size + this.state.checkedLabel.size;
    //更改完Set之后再设置size
    this.props.navigation.setParams({
      _size: size,
    });
  };

  checkItem = async (id) => {
    let checked_tmp = this.state.checked;
    if (this.state.checked.has(id)) {
      checked_tmp.delete(id);
    } else {
      checked_tmp = checked_tmp.add(id);
    }
    await this.setState({
      checked: checked_tmp,
    });
    //需要获取的是操作后的checked的size
    let size = this.state.checked.size + this.state.checkedLabel.size;
    //更改完Set之后再设置size
    this.props.navigation.setParams({
      _size: size,
    });
  };

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

  _renderItem = ({item}) => {
    let info = item.userInfo;
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={!this.state._press ? () => {} : () => this.checkItem(item.id)}>
        <View style={styles.itemLeft}>
          <View>
            <Image
              source={
                info.avatarUrl
                  ? {uri: info.avatarUrl}
                  : require('./images/default_head.png')
              }
              style={styles.avatar}
            />
          </View>

          <View style={{paddingLeft: 15}}>
            <Text style={styles.nickname} numberOfLines={1}>
              {info.nickName}
            </Text>
          </View>
        </View>

        {!this.state._press ? (
          <View />
        ) : (
          <View style={styles.itemRight}>
            {this.state.checked.has(item.id) ? (
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
        )}
      </TouchableOpacity>
    );
  };

  _renderLabelItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.items}
        onPress={
          !this.state._press ? () => {} : () => this.labelToPatientId(item)
        }>
        <Text style={styles.itemText}>
          {item.labelName}({item.patients.length})
        </Text>
        {!this.state._press ? (
          <View />
        ) : (
          <View style={styles.itemRight}>
            {this.state.checkedLabel.has(item) ? (
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
        )}
      </TouchableOpacity>
    );
  };

  _renderHeaderComponent = () => {
    const {label} = this.props.label;
    let labelParams = {
      data: label,
      renderItem: this._renderLabelItem,
      keyExtractor: (item) => item.labelId.toString(),
      ItemSeparatorComponent: () => (
        <View
          style={{height: 1 / PixelRatio.get(), backgroundColor: '#cdced2'}}
        />
      ),
    };
    return (
      <View>
        <View style={{backgroundColor: '#eeeeee', paddingVertical: 10}}>
          <Text style={{fontSize: 15, color: '#000', textAlign: 'center'}}>
            患者标签
          </Text>
        </View>
        <FlatList {...labelParams} />
        <View style={{backgroundColor: '#eeeeee', paddingVertical: 10}}>
          <Text style={{fontSize: 15, color: '#000', textAlign: 'center'}}>
            患者列表
          </Text>
        </View>
      </View>
    );
  };

  render() {
    const {info} = this.props.patientList;

    let params = {
      keyExtractor: (item, index) => index,
      renderSectionHeader: this._renderHeader, //区头
      renderItem: this._renderItem,
      // ListEmptyComponent: <View style={{alignItems:'center'}}><Text>没有患者</Text></View>,
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
      ListHeaderComponent: this._renderHeaderComponent, //列表头部
    };

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View>
          <SectionList {...params} />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  patientList: state.patientList,
  label: state.label,
});

const mapDispatchToProps = (dispatch) => ({
  pushQuestionnaire: (patientIdArray, paperIdArray) =>
    dispatch(pushQuestionnaire(patientIdArray, paperIdArray)),
  fetchLabel: () => dispatch(fetchLabel()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PushList);
