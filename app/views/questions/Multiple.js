import React from 'react';
import {View, Text, FlatList} from 'react-native';
import styles from './style';
import {CheckBox} from 'react-native-elements';

export default class Multiple extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: new Set([]),
    };
  }

  componentDidMount() {
    let checked_tmp = this.state.checked;
    if (this.props.answer) {
      for (let i in this.props.answer) {
        checked_tmp.add(this.props.answer[i]);
      }
      this.setState({
        checked: checked_tmp,
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
                  checked={this.state.checked.has(item)}
                  onPress={() => {
                    let checked_tmp = this.state.checked;
                    if (this.state.checked.has(item)) {
                      checked_tmp.delete(item);
                    } else {
                      checked_tmp = checked_tmp.add(item);
                    }
                    this.setState({
                      checked: checked_tmp,
                    });
                    this.props.getAns({
                      id: this.props.id,
                      questionType: 2,
                      answerContent: Array.from(checked_tmp),
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
