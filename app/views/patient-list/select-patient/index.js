import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  PixelRatio,
  TextInput,
  SectionList,
  ScrollView,
} from 'react-native';
import styles from './style';
import BackIcon from '../../../components/ui/icon/back';
import connect from 'react-redux/es/connect/connect';

// 定义水平滚动视图变量
let scrollViewHorizontal = ScrollView;

class SelectPatient extends React.Component {
  constructor(props) {
    super(props);
    let edit_checked = props.navigation.getParam('checked');
    this.state = {
      messages: [],
      _press: false,
      //传递过来的患者列表
      edit_checked: edit_checked ? edit_checked : new Set([]),
      //选择的患者列表
      checked: new Set([]),
    };
  }

  static navigationOptions = {
    header: null,
  };

  _renderHeader = (info) => {
    let header = info.section.key;
    return <Text style={styles.itemHeaderText}>{header}</Text>;
  };

  _onPress = async (item) => {
    let checked_tmp = this.state.checked;
    //如果是编辑页面带过来的，则置灰，无法进行点击操作
    if (this.state.edit_checked.has(item)) {
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
    scrollViewHorizontal.scrollToEnd({animated: true});
  };

  _renderItem = ({item}) => {
    let info = item.userInfo;
    return (
      <TouchableOpacity style={styles.item} onPress={() => this._onPress(item)}>
        <View style={styles.itemLeft}>
          <View>
            <Image
              source={
                info.avatarUrl
                  ? {uri: info.avatarUrl}
                  : require('../images/default_head.png')
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

        <View style={styles.itemRight}>
          {this.state.edit_checked.has(item) ? (
            <Image
              source={require('../images/checked.png')}
              style={{height: 24, width: 24}}
            />
          ) : this.state.checked.has(item) ? (
            <Image
              source={require('../images/check.png')}
              style={{height: 24, width: 24}}
            />
          ) : (
            <Image
              source={require('../images/uncheck.png')}
              style={{height: 24, width: 24}}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  _renderList = () => {
    let checked = Array.from(this.state.checked);
    console.log('列表头像', checked);
    return (
      <ScrollView
        // style={{flex:3}}
        contentContainerStyle={{paddingLeft: 10}}
        ref={(scrollView) => {
          scrollViewHorizontal = scrollView;
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {checked.map((item) => {
          // console.log("Item",item);
          let info = item.userInfo;
          return (
            <TouchableOpacity
              style={styles.labelItem}
              key={info.id}
              onPress={() => this._onPress(item)}>
              <Image
                source={
                  info.avatarUrl
                    ? {uri: info.avatarUrl}
                    : require('../images/default_head.png')
                }
                style={styles.avatar}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  render() {
    const {info} = this.props.patientList;
    const {checked} = this.state;

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
    };

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.titleView}>
          <View style={styles.titleLeftView}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <BackIcon />
            </TouchableOpacity>

            <View style={styles.title}>
              <Text style={styles.titleText}>选择患者</Text>
            </View>
          </View>

          <View style={styles.titleRightView}>
            {checked.size ? (
              <TouchableOpacity
                onPress={() => {
                  //传成员
                  if (this.state.edit_checked.size === 0) {
                    this.props.navigation.navigate('SaveLabel', {
                      checked: checked,
                    });
                  } else {
                    this.props.navigation.state.params.onGoBack(checked);
                    this.props.navigation.navigate('EditLabel');
                  }
                }}
                style={[styles.titleRightBtn, {backgroundColor: '#04BE02'}]}>
                <Text style={[styles.titleRightText, {color: '#fff'}]}>
                  {'确定(' + `${checked.size})`}
                </Text>
              </TouchableOpacity>
            ) : (
              <View
                style={[styles.titleRightBtn, {backgroundColor: '#dddddd'}]}>
                <Text style={[styles.titleRightText, {color: '#aaaaaa'}]}>
                  确定
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.searchView}>
          {checked.size ? (
            this._renderList()
          ) : (
            <Image
              source={require('../images/search.png')}
              style={styles.searchImage}
            />
          )}
          <TextInput
            style={styles.textInput}
            onChangeText={(captcha) => this.setState({captcha})}
            placeholder="搜索"
          />
        </View>

        <SectionList {...params} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  patientList: state.patientList,
});

export default connect(mapStateToProps)(SelectPatient);
