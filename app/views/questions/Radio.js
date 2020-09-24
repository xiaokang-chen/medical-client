import React from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from './style';
import {CheckBox} from 'react-native-elements';

export default class Radio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: '',
    };
  }

  componentDidMount() {
    if (this.props.answer) {
      this.setState({
        checked: this.props.answer[0],
      });
    }
  }

  render() {
    return (
      <View style={styles.upper}>
        <View style={{flex: 1, paddingHorizontal: 15}}>
          <Text style={styles.title}>{this.props.questionTitle}</Text>
          <View style={styles.contentSummary}>
            <FlatList
              data={this.props.questionOption}
              renderItem={({item, index}) => (
                <CheckBox
                  title={<Text style={{fontSize: 20}}>{item}</Text>}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={item === this.state.checked}
                  onPress={() => {
                    this.setState({
                      checked: item,
                    });
                    this.props.getAns({
                      id: this.props.id,
                      questionType: 1,
                      answerContent: [item],
                    });
                  }}
                />
              )}
              keyExtractor={(index) => index}
              extraData={this.state}
            />
          </View>
        </View>
      </View>
    );
  }
}
