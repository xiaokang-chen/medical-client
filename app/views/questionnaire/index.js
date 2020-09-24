import React from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableHighlight,
  RefreshControl,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import styles from './style';
import {connect} from 'react-redux';
import {
  deletePaper,
  fetchQuestionnaire,
} from '../../store/actions/questionnaire';
import {asyncRead} from '../../plugin/asyncStorage';
import constance from '../../plugin/constance';
import ListFooter from '../../components/ui/list-footer';
import Swipeout from 'react-native-swipeout';

class Questionnaire extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: '问卷调查',
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
      loading: false,
      more: true,
    };
    this.userId = null;
    this.pageSize = 10;
    this.pageNum = 1;
    this._onRefresh = this._onRefresh.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  async componentDidMount() {
    const userInfoStr = await asyncRead(constance.USER_INFO);
    const userId = JSON.parse(userInfoStr || '{}').id;
    this.userId = userId;
    let restart = true;
    this.props.fetchQuestionnaire(userId, this.pageSize, this.pageNum, restart);
  }

  renderQuestionnaireItem = ({item}) => {
    let restart = true;
    let BtnsRight = [
      {
        text: '删除',
        type: 'delete',
        onPress: () => this.props.deletePaper(item.id),
      },
    ];
    return (
      <Swipeout right={BtnsRight} backgroundColor="white">
        <TouchableHighlight
          style={styles.item}
          onPress={() =>
            this.props.navigation.navigate('QuestionnaireDetail', {
              questionnaireId: item.id,
              questionnaireName: item.title,
              isEdit: true,
              refresh: () =>
                this.props.fetchQuestionnaire(
                  this.userId,
                  this.pageSize,
                  this.pageNum,
                  restart,
                ),
            })
          }
          underlayColor="#eaedf0">
          <View style={styles.upper}>
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.contentSummary}>
                {item.total === item.answered ? (
                  <Text style={styles.finished}>O 已完成</Text>
                ) : (
                  <Text style={styles.processing}>O 进行中</Text>
                )}
              </View>
            </View>

            {item.total === item.answered ? (
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: '#E1E1E1'}}>
                  {item.answered}/{item.total}
                </Text>
              </View>
            ) : (
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: '#43F02C'}}>{item.answered}</Text>
                <Text>/{item.total}</Text>
              </View>
            )}
          </View>
        </TouchableHighlight>
      </Swipeout>
    );
  };

  async _onRefresh() {
    if (this.state.isRefreshing) return;
    this.pageSize = 10;
    this.pageNum = 1;
    let restart = true;

    this.setState({isRefreshing: true}, () => {
      setTimeout(async () => {
        await this.props.fetchQuestionnaire(
          this.userId,
          this.pageSize,
          this.pageNum,
          restart,
        );
        this.setState({
          isRefreshing: false,
        });
      }, 500);
    });
  }

  async onScroll() {
    //看是否还有数据
    const more =
      this.props.questionnaire.questionnaire.length ===
      this.pageSize * this.pageNum;
    this.setState({more: more});

    if (!this.state.loading && more) {
      this.pageNum += 1;
      this.state.loading = true;
      await this.props.fetchQuestionnaire(
        this.userId,
        this.pageSize,
        this.pageNum,
      );
      this.state.loading = false;
    }
  }

  _renderContent = () => {
    if (
      this.props.questionnaire.errMess ||
      this.props.questionnaire.questionnaire.length === 0
    ) {
      return (
        <ScrollView
          refreshControl={
            <RefreshControl
              ref="refreshing"
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh}
              tintColor="#484848"
              title="加载中..."
              titleColor="#484848"
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor="#ffffff"
            />
          }>
          <Text style={{padding: 20, textAlign: 'center'}}>没有数据</Text>
        </ScrollView>
      );
    } else {
      const {questionnaire} = this.props.questionnaire;
      questionnaire.sort((a, b) => {
        const a_total = a.total,
          a_answered = a.answered;
        const b_total = b.total,
          b_answered = b.answered;
        let a_weight = 1,
          b_weight = 1;
        if (a_answered / a_total === 1) a_weight = 0;
        if (b_answered / b_total === 1) b_weight = 0;
        return b_weight - a_weight;
      });
      return (
        <FlatList
          data={questionnaire}
          renderItem={this.renderQuestionnaireItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => (
            <View style={{height: 10, backgroundColor: '#F0F0F0'}} />
          )}
          refreshControl={
            <RefreshControl
              ref="refreshing"
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh}
              tintColor="#484848"
              title="加载中..."
              titleColor="#484848"
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor="#ffffff"
            />
          }
          showsVerticalScrollIndicator={true}
          onEndReached={this.onScroll}
          onEndReachedThreshold={0.1}
          initialNumToRender={5}
          ListFooterComponent={() => (
            <ListFooter loading={this.state.loading} more={this.state.more} />
          )}
        />
      );
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#F0F0F0',
            paddingTop: 7,
            paddingHorizontal: 10,
          }}>
          {this._renderContent()}
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    questionnaire: state.questionnaire,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchQuestionnaire: (userId, pageSize, pageNum, restart) =>
    dispatch(fetchQuestionnaire(userId, pageSize, pageNum, restart)),
  deletePaper: (id) => dispatch(deletePaper(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questionnaire);
