import React from 'react';
import {View, Text, FlatList, ScrollView, Alert} from 'react-native';
import {connect} from 'react-redux';
import styles from './style';
import Radio from './Radio';
import Multiple from './Multiple';
import Answer from './Answer';
import {
  fetchQuestions,
  postQuestionDetail,
} from '../../store/actions/questions';
import Button from '../../widget/Button';
import {asyncRead} from '../../plugin/asyncStorage';
import constance from '../../plugin/constance';
import Toast from 'react-native-root-toast';

class QuestionnaireDetail extends React.Component {
  static navigationOptions = {
    title: '问卷详情',
  };

  constructor(props) {
    super(props);

    this.state = {
      userId: null,
      loading: false,
    };

    this.question_ans = {
      id: '',
      answers: [],
    };
  }

  async componentDidMount() {
    const {questionnaireId} = this.props.navigation.state.params;
    //获取userId
    const userInfoStr = await asyncRead(constance.USER_INFO);
    const userId = JSON.parse(userInfoStr || '{}').id;
    this.setState({userId: userId});

    this.props.fetchQuestions(userId, questionnaireId);
  }

  _onSubmit = () => {
    const {questionnaireId} = this.props.navigation.state.params;
    const userId = this.state.userId;

    Alert.alert('', '您确认提交吗？', [
      {text: '取消', onPress: () => {}},
      {
        text: '确定',
        onPress: () => {
          try {
            this.setState({loading: true});
            postQuestionDetail({
              id: questionnaireId,
              userId: userId,
              answers: this.question_ans.answers,
            }).then((res) => {
              if (res.code === 20000) {
                Toast.show('提交成功', {position: 0});
                this.props.navigation.state.params.refresh();
                this.props.navigation.goBack();
              } else {
                Toast.show('提交失败', {position: 0});
              }
            });
          } catch (error) {
            console.log(error);
          } finally {
            this.setState({loading: false});
          }
        },
      },
    ]);
  };

  getAns = (option) => {
    let ans_tmp = this.question_ans.answers;
    let is_exit = false;

    for (let i in ans_tmp) {
      if (ans_tmp[i].id === option.id) {
        ans_tmp.splice(i, 1, option);
        is_exit = true;
      }
    }
    if (!is_exit) {
      ans_tmp.push(option);
    }
  };

  _renderContent = () => {
    const {questions} = this.props.questions;
    const {questionnaireName, isEdit} = this.props.navigation.state.params;

    let question1 = [];
    let question2 = [];
    let question3 = [];
    for (let item of questions) {
      if (item.questionType === 1) {
        question1.push(item);
      }
      if (item.questionType === 2) {
        question2.push(item);
      }
      if (item.questionType === 3) {
        question3.push(item);
      }
    }
    console.log(question1);
    return (
      <ScrollView showsVerticalScrollIndicator={true}>
        <View style={styles.questionnaireName}>
          <Text style={styles.questionnaireNameText}>{questionnaireName}</Text>
        </View>

        <View style={{paddingLeft: 10, paddingBottom: 10}}>
          <Text style={{fontWeight: 'bold', fontSize: 20, color: '#000'}}>
            一.单选题
          </Text>
        </View>

        <FlatList
          data={question1}
          renderItem={({item, index}) => {
            return (
              <Radio
                questionTitle={
                  <Text style={styles.title}>
                    {index + 1}.{item.questionTitle}
                  </Text>
                }
                questionOption={item.questionOption}
                answer={item.answer}
                id={item.id}
                getAns={this.getAns.bind(this)}
              />
            );
          }}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => (
            <View style={{height: 10, backgroundColor: '#f8f8f8'}} />
          )}
        />

        {question2.length === 0 ? null : (
          <View style={{paddingLeft: 10, paddingBottom: 10}}>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: '#000'}}>
              二.多选题
            </Text>
          </View>
        )}

        <FlatList
          data={question2}
          renderItem={({item, index}) => {
            return (
              <Multiple
                questionTitle={
                  <Text style={styles.title}>
                    {index + 1}.{item.questionTitle}
                  </Text>
                }
                questionOption={item.questionOption}
                answer={item.answer}
                id={item.id}
                getAns={this.getAns}
              />
            );
          }}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => (
            <View style={{height: 10, backgroundColor: '#f8f8f8'}} />
          )}
        />

        {question3.length === 0 ? null : (
          <View style={{paddingLeft: 10, paddingBottom: 10}}>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: '#000'}}>
              三.简答题
            </Text>
          </View>
        )}

        <FlatList
          data={question3}
          renderItem={({item, index}) => {
            return (
              <Answer
                questionTitle={
                  <Text style={styles.title}>
                    {index + 1}.{item.questionTitle}
                  </Text>
                }
                questionOption={item.questionOption}
                answer={item.answer}
                id={item.id}
                getAns={this.getAns.bind(this)}
              />
            );
          }}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => (
            <View style={{height: 10, backgroundColor: '#f8f8f8'}} />
          )}
        />

        <View style={{paddingBottom: 30}}>
          {isEdit ? (
            <Button
              // loading={this.state.loading}
              title={'提交'}
              onPress={this._onSubmit}
              style={{
                touch: {
                  height: 36,
                  marginTop: 20,
                },
              }}
            />
          ) : (
            <View />
          )}
        </View>
      </ScrollView>
    );
  };

  render() {
    return <View style={{flex: 1}}>{this._renderContent()}</View>;
  }
}

const mapStateToProps = (state) => {
  return {
    questions: state.questions,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (userId, questionnaireId) =>
    dispatch(fetchQuestions({userId, questionnaireId})),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionnaireDetail);
