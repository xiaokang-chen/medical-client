import React from 'react';
import {View, Text, KeyboardAvoidingView, TextInput} from 'react-native';
import styles from './style';

export default class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  componentDidMount() {
    if (this.props.answer) {
      this.setState({
        text: this.props.answer[0],
      });
    }
  }

  //单选选项
  renderOption = (item) => {
    return (
      <View>
        <View style={{paddingVertical: 15}}>
          <KeyboardAvoidingView
            behavior="padding"
            style={{borderWidth: 1, borderColor: '#D9D9D9'}}>
            <TextInput
              numberOfLines={10}
              placeholder={'请输入'}
              value={this.state.text}
              onChangeText={(text) => {
                this.setState({
                  text: text,
                });
                this.props.getAns({
                  id: this.props.id,
                  questionType: 3,
                  answerContent: [text],
                });
              }}
              style={{textAlignVertical: 'top'}}
            />
          </KeyboardAvoidingView>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.upper}>
        <View style={{flex: 1, paddingHorizontal: 15}}>
          <Text style={styles.title}>{this.props.questionTitle}</Text>
          <View>{this.renderOption(this.props.questionOption)}</View>
        </View>
      </View>
    );
  }
}
