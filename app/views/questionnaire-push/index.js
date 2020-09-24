import React from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import HeadButton from '../../components/ui/head-button';
import {fetchQuestionnaire} from '../../store/actions/questionnaire';
import {connect} from 'react-redux';
import styles from './style';
import ListFooter from '../../components/ui/list-footer';
import {asyncRead} from '../../plugin/asyncStorage';
import constance from '../../plugin/constance';

class QuestionnairePush extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;

    return {
      title: '问卷推送',
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
      isRefreshing: false,
      loading: false,
      more: true,
      check: false,
      //选择的问卷列表
      checked: new Set([]),
    };
    let size = this.state.checked.size;
    this.props.navigation.setParams({
      _name: '选择',
      _size: size,
    });

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

  componentWillMount() {
    //把函数调用设置在navigation中
    this.props.navigation.setParams({
      _onPress: this._onPress,
    });
  }

  clearToDefault = () => {
    this.props.navigation.setParams({
      _name: '',
      _size: 0,
    });
    this.setState({
      _press: false,
      check: false,
      checked: new Set([]),
    });
  };

  _onPress = async () => {
    let size = this.state.checked.size;
    console.log('Size', size);
    if (size) {
      // this.clearToDefault();
      return this.props.navigation.navigate('PushList', {
        pidArray: this.state.checked,
        clear: this.clearToDefault(),
      });
    }
    // console.log("状态1", this.state._press);
    //这里需要加上异步等待
    await this.setState({_press: !this.state._press});
    // console.log("状态2", this.state._press);
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
    let size = this.state.checked.size;
    //更改完Set之后再设置size
    this.props.navigation.setParams({
      _size: size,
    });
  };

  renderQuestionnaireItem = ({item}) => {
    // console.log("RRRRRRRRRRRRR",item)
    return (
      <TouchableHighlight
        style={styles.item}
        onPress={
          !this.state._press
            ? () =>
                this.props.navigation.navigate('QuestionnaireDetail', {
                  questionnaireId: item.id,
                  questionnaireName: item.title,
                  isEdit: false,
                })
            : () => this.checkItem(item.id)
        }
        underlayColor="#eaedf0">
        <View>
          <View style={styles.upper}>
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.contentSummary}>
                <Text style={styles.questionCount}>题量：{item.total}</Text>
              </View>
            </View>

            {!this.state._press ? (
              <View />
            ) : (
              <View>
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
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  async _onRefresh() {
    if (this.state.isRefreshing) {
      return;
    }
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
      return (
        <FlatList
          data={this.props.questionnaire.questionnaire}
          renderItem={this.renderQuestionnaireItem}
          keyExtractor={(item) => item.id.toString()}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnairePush);
