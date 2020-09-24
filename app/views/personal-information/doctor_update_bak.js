import React from 'react';
import {
  Button,
  Text,
  TextInput,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      sex: '',
      type: '',
      education: '',
      height: '',
      major: '',
    };
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>姓名</Text>
        <TextInput
          returnKeyType="next"
          enablesReturnKeyAutomatically
          style={
            Platform.OS === 'ios'
              ? pickerSelectStyles.inputIOS
              : pickerSelectStyles.inputAndroid
          }
          onChangeText={(text) => {
            this.setState({
              name: text,
            });
          }}
          blurOnSubmit={false}
        />
        <View paddingVertical={5} />

        <Text>性别</Text>
        <RNPickerSelect
          placeholder={{
            label: '请选择性别',
            value: null,
            color: '#9EA0A4',
          }}
          items={[
            {
              label: '男',
              value: 'man',
            },
            {
              label: '女',
              value: 'women',
            },
          ]}
          onValueChange={(value) => {
            this.setState({
              sex: value,
            });
          }}
          style={pickerSelectStyles}
          value={this.state.sex}
          useNativeAndroidPickerStyle={false}
        />
        <View paddingVertical={5} />

        <Text>最高学历</Text>
        <RNPickerSelect
          placeholder={{
            label: '请选择学历',
            value: null,
            color: '#9EA0A4',
          }}
          items={[
            {
              label: '专科',
              value: 'women',
            },
            {
              label: '本科',
              value: 'women',
            },
            {
              label: '硕士',
              value: 'women',
            },
            {
              label: '博士',
              value: 'women',
            },
            {
              label: '博士后',
              value: 'women',
            },
          ]}
          onValueChange={(value) => {
            this.setState({
              education: value,
            });
          }}
          style={pickerSelectStyles}
          value={this.state.education}
          useNativeAndroidPickerStyle={false}
        />
        <View paddingVertical={5} />

        <Text>职称</Text>
        <RNPickerSelect
          placeholder={{
            label: '请选择职业',
            value: null,
            color: '#9EA0A4',
          }}
          items={[
            {
              label: '住院医师',
              value: 'man',
            },
            {
              label: '主治医师',
              value: 'women',
            },
            {
              label: '副主任医师',
              value: 'women',
            },
            {
              label: '主任医师',
              value: 'women',
            },
          ]}
          onValueChange={(value) => {
            this.setState({
              type: value,
            });
          }}
          style={pickerSelectStyles}
          value={this.state.type}
          useNativeAndroidPickerStyle={false}
        />
        <View paddingVertical={5} />

        <Text>专业方向</Text>
        <RNPickerSelect
          placeholder={{
            label: '请选择职业',
            value: null,
            color: '#9EA0A4',
          }}
          items={[
            {
              label: '骨与软组织疼痛',
              value: 'man',
            },
            {
              label: '神经病理性疼痛',
              value: 'women',
            },
            {
              label: '癌痛',
              value: 'women',
            },
            {
              label: '内脏痛',
              value: 'women',
            },
          ]}
          onValueChange={(value) => {
            this.setState({
              major: value,
            });
          }}
          style={pickerSelectStyles}
          value={this.state.major}
          useNativeAndroidPickerStyle={false}
        />
        <View paddingVertical={5} />

        <View paddingVertical={5} />
        <Button
          title="提交修改"
          onPress={() => {
            console.log(this.state);
          }}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 10,
    flex: 1,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    // borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    // borderColor: 'eggplant',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
