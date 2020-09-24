import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  PixelRatio,
  TextInput,
  ScrollView,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import styles from './style';
import BackIcon from '../../../components/ui/icon/back';
import Button from '../../../widget/Button';
import connect from 'react-redux/es/connect/connect';
import {
  deleteLabel,
  fetchLabel,
  updateLabel,
} from '../../../store/actions/label';
import Toast from 'react-native-root-toast';

class EditLabel extends React.Component {
  constructor(props) {
    super(props);
    let label = props.navigation.getParam('label');
    this.state = {
      labelName: label.labelName,
      checked: new Set([]),
      decrease: false,
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    const label = this.props.navigation.getParam('label');
    let dataList = this.getItemList(label.patients);
    this.setState({checked: new Set(dataList)});
  }

  onClear = () => {
    if (this.Input) {
      this.Input.clear();
      this.setState({labelName: ''});
    }
  };

  getItemList = (patientIdArray) => {
    let res = [];
    // console.log("IDDDD",patientIdArray);
    for (let item of this.props.patientList.info) {
      for (let dataList of item.data) {
        // console.log("dataList",dataList,dataList.id);
        if (patientIdArray.includes(dataList.id)) {
          // console.log("dataList.id",dataList.id);
          res.push(dataList);
        }
      }
    }
    return res;
  };

  _clickAvatar = async (item) => {
    const {decrease} = this.state;
    let checked_tmp = this.state.checked;
    if (decrease === true) {
      if (this.state.checked.has(item)) {
        checked_tmp.delete(item);
      }
      await this.setState({
        checked: checked_tmp,
      });
    }
  };

  _renderContent = () => {
    let checked = Array.from(this.state.checked);
    return (
      <View
        style={{
          padding: 15,
          flexDirection: 'row',
          backgroundColor: '#fff',
          flexWrap: 'wrap',
          display: 'flex',
        }}>
        {checked.map((item) => {
          let info = item.userInfo;
          return (
            <TouchableOpacity
              key={info.id}
              onPress={() => this._clickAvatar(item)}
              style={{paddingBottom: 15}}>
              {this.state.decrease ? (
                <ImageBackground
                  source={
                    info.avatarUrl
                      ? {uri: info.avatarUrl}
                      : require('../images/default_head.png')
                  }
                  style={[styles.editItem, {paddingBottom: 3}]}>
                  <Image
                    source={require('../images/decrease1.png')}
                    style={styles.decrease1}
                  />
                </ImageBackground>
              ) : (
                <Image
                  source={
                    info.avatarUrl
                      ? {uri: info.avatarUrl}
                      : require('../images/default_head.png')
                  }
                  style={[styles.editItem, {paddingBottom: 3}]}
                />
              )}
              <Text style={{textAlign: 'center', fontSize: 12}}>
                {info.nickName}
              </Text>
            </TouchableOpacity>
          );
        })}

        {this.state.decrease ? (
          <TouchableOpacity
            onPress={() => {
              this.setState({decrease: false});
            }}
            style={[
              styles.editItem,
              {justifyContent: 'center', alignItems: 'center'},
            ]}>
            <Image
              source={require('../images/cancel.png')}
              resizeMode="contain"
              style={{width: 36, height: 36}}
            />
          </TouchableOpacity>
        ) : (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={[
                styles.editItem,
                {justifyContent: 'center', alignItems: 'center'},
              ]}
              onPress={() => {
                this.props.navigation.navigate('SelectPatient', {
                  checked: this.state.checked,
                  onGoBack: (checked) => {
                    let checked_temp = this.state.checked;
                    for (let item of checked) {
                      checked_temp.add(item);
                    }
                    this.setState({checked: checked_temp});
                    // console.log("进来了",this.state.checked);
                  },
                });
              }}>
              <Image
                source={require('../images/increase.png')}
                resizeMode="contain"
                style={{width: 36, height: 36}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.editItem,
                {justifyContent: 'center', alignItems: 'center'},
              ]}
              onPress={() => {
                this.setState({decrease: true});
              }}>
              <Image
                source={require('../images/decrease.png')}
                resizeMode="contain"
                style={{width: 36, height: 36}}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  render() {
    const {labelName, checked} = this.state;
    const {labelId} = this.props.navigation.getParam('label');

    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 15,
            paddingVertical: 5,
            flexDirection: 'row',
            borderBottomWidth: 1 / PixelRatio.get(),
            borderColor: '#dddddd',
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
                编辑标签
              </Text>
            </View>
          </View>

          <View style={styles.titleRightView}>
            <TouchableOpacity
              onPress={async () => {
                if (!labelName.trim()) {
                  return Toast.show('标签名不能为空', {position: 0});
                }
                let patients = [];
                for (let item of checked) {
                  patients.push(item.id);
                }
                await this.props.updateLabel(labelId, labelName, patients);
                this.props.fetchLabel();
                this.props.navigation.navigate('AllLabel');
              }}
              style={styles.titleRightBtn}>
              <Text style={styles.titleRightText}>保存</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{paddingTop: 20}}>
          <View style={{paddingLeft: 15, paddingBottom: 5}}>
            <Text>标签名字</Text>
          </View>

          <View style={{backgroundColor: '#fff', paddingVertical: 10}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderColor: '#0ae713',
                borderBottomWidth: 2 / PixelRatio.get(),
                borderBottomLeftRadius: 15,
                paddingHorizontal: 15,
              }}>
              <TextInput
                ref={(_ref) => (this.Input = _ref)}
                value={labelName}
                placeholder={'例如内脏痛群、头痛群'}
                style={{
                  width: 270,
                  fontSize: 15,
                }}
                onChangeText={(labelName) => this.setState({labelName})}
              />
              {labelName ? (
                <TouchableOpacity style={styles.clear} onPress={this.onClear}>
                  <Text style={styles.clear_text}>x</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>

        <View style={{paddingTop: 20}}>
          <View style={{paddingLeft: 15, paddingBottom: 5}}>
            <Text>成员</Text>
          </View>
          <ScrollView style={{backgroundColor: '#fff', paddingVertical: 10}}>
            {this._renderContent()}
          </ScrollView>
        </View>

        <View style={{paddingBottom: 30}}>
          <Button
            title={'删除标签'}
            onPress={async () => {
              Alert.alert('', '标签中的患者不会被删除，是否删除标签？', [
                {text: '取消', onPress: () => {}},
                {
                  text: '删除',
                  onPress: async () => {
                    //删除标签
                    // console.log("LABEL ID",labelId);
                    await this.props.deleteLabel(labelId);
                    this.props.fetchLabel();
                    this.props.navigation.navigate('AllLabel');
                  },
                },
              ]);
            }}
            style={{
              touch: {
                height: 36,
                marginTop: 20,
                backgroundColor: '#f71913',
              },
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  label: state.label,
  patientList: state.patientList,
});

const mapDispatchToProps = (dispatch) => ({
  //接口---删除标签
  deleteLabel: (labelId) => dispatch(deleteLabel(labelId)),
  fetchLabel: () => dispatch(fetchLabel()),
  updateLabel: (labelId, labelName, patients) =>
    dispatch(updateLabel(labelId, labelName, patients)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditLabel);
