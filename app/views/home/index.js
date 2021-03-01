import React from 'react';
import {
  Text,
  FlatList,
  View,
  Image,
  TouchableHighlight,
  RefreshControl,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {fetchArticle} from '../../store/actions/articles';
import {isEmpty} from 'lodash';

//CSS
import styles from './style';
import Header from '../../components/header';
import {SafeAreaView} from 'react-navigation';
import SwiperImage from '../../widget/SwiperImage';
import ListFooter from '../../components/ui/list-footer';
import {DateDiff} from '../../components/date';
import {isCompleteInformation} from '../../plugin/utils';
import network from '../../plugin/network';

class Home extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      tabBarLabel: '首页',

      // header在公共属性中已经设为Null
      tabBarIcon: ({tintColor, focused}) => (
        <View>
          <Image
            source={
              focused
                ? require('./images/home-active.png')
                : require('./images/home.png')
            }
            style={[styles.icon, {tintColor: tintColor}]}
          />
        </View>
      ),
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
      loading: false,
      more: true,
      imgArr: [
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdpic.tiankong.com%2Fk3%2Ftt%2FQJ8459640081.jpg&refer=http%3A%2F%2Fdpic.tiankong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617073514&t=76400e78d0052214a2e596016429c242',
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F05%2F83%2F69%2F215c6390e867411.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617073514&t=1921f4cdf3751cb6a2209ed5c6936fd8',
      'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F04%2F55%2F21%2F945863da61548f9.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617073514&t=75fb5f2d0ff316dc4ca757819b3b66a9'
      ],
    };
    this.pageSize = 10;
    this.pageNum = 1;
    this._onRefresh = this._onRefresh.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  async componentDidMount() {
    this._onRefresh();
    let res = await network('swiper/imageList', 'get');
    // console.log("首页图片", res);
    let img_arr = [];
    // 轮播图最多3张
    // let len = Math.min(res.data.length, 3);
    // for (let i = 0; i < len; i++) {
    //   img_arr.push(res.data[i].url);
    // }
    // img_arr = [
    //   'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdpic.tiankong.com%2Fk3%2Ftt%2FQJ8459640081.jpg&refer=http%3A%2F%2Fdpic.tiankong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617073514&t=76400e78d0052214a2e596016429c242',
    //   'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F05%2F83%2F69%2F215c6390e867411.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617073514&t=1921f4cdf3751cb6a2209ed5c6936fd8',
    //   'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F04%2F55%2F21%2F945863da61548f9.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617073514&t=75fb5f2d0ff316dc4ca757819b3b66a9'];
    // this.setState({imgArr: img_arr});
  }

  async _onRefresh() {
    if (this.state.isRefreshing) return;

    this.pageSize = 10;
    this.pageNum = 1;
    let restart = true;
    this.setState({isRefreshing: true}, () => {
      setTimeout(async () => {
        await this.props.fetchArticle(this.pageSize, this.pageNum, restart);
        this.setState({
          isRefreshing: false,
        });
      }, 500);
    });
  }

  async onScroll() {
    //看是否还有数据
    const more =
      this.props.articles.articles.length === this.pageSize * this.pageNum;
    this.setState({more: more});

    if (!this.state.loading && more) {
      this.pageNum += 1;
      this.state.loading = true;
      await this.props.fetchArticle(this.pageSize, this.pageNum);
      this.state.loading = false;
    }
  }

  renderArticleItem = ({item, index}) => {
    let time = DateDiff(item.publishTime);
    return (
      <TouchableHighlight
        style={styles.item}
        onPress={() =>
          this.props.navigation.navigate('ArticleDetail', {
            articleId: item.id,
            articleTitle: item.title,
            author: item.author,
            time: time,
            avatar: item.authorUrl,
          })
        }
        underlayColor="#eaedf0">
        <View>
          <View style={styles.headbar}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={styles.avatar}
                source={{uri: item.authorUrl}}
                cache="force-cache"
              />
              <View>
                <Text style={styles.nickname}>{item.author}</Text>
                <Text style={styles.create_at}>{time}</Text>
              </View>
            </View>
          </View>

          <View style={styles.body}>
            <View style={{flex: 1}}>
              <Text style={styles.title}>{item.title}</Text>
              {item.subtitle ? (
                <View style={styles.subtitle}>
                  <Text numberOfLines={2} style={styles.contentText}>
                    {item.subtitle}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  _renderContent = () => {
    if (this.props.articles.errMess) {
      return (
        <ScrollView
        // refreshControl={<RefreshControl
        //     ref="refreshing"
        //     refreshing={this.state.isRefreshing}
        //     onRefresh={this._onRefresh}
        //     tintColor="#484848"
        //     title="加载中..."
        //     titleColor="#484848"
        //     colors={['#ff0000', '#00ff00', '#0000ff']}
        //     progressBackgroundColor="#ffffff"
        // />}
        // style={{flex:1}}
        >
          <View
            style={{
              alignItems: 'center',
              paddingTop: 0.25 * Dimensions.get('window').height,
            }}>
            <Image
              source={require('./images/1home.png')}
              style={{height: 50, width: 50}}
            />
            <View style={{paddingVertical: 20}}>
              <Text>网络不给力 下拉刷新一下</Text>
            </View>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <FlatList
          data={this.props.articles.articles}
          ListHeaderComponent={this.header}
          renderItem={this.renderArticleItem}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => (
            <View style={{height: 7, backgroundColor: '#f8f8f8'}} />
          )}
          // refreshControl={<RefreshControl
          //     ref="refreshing"
          //     refreshing={this.state.isRefreshing}
          //     onRefresh={this._onRefresh}
          //     tintColor="#484848"
          //     title="加载中..."
          //     titleColor="#484848"
          //     colors={['#ff0000', '#00ff00', '#0000ff']}
          //     progressBackgroundColor="#ffffff"
          // />}
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

  _renderHeader = () => {
    const {navigation, userRelated} = this.props;
    // console.log("测试",userRelated.info, isEmpty(userRelated.info), userRelated.info.userType)
    if (isEmpty(userRelated.info))
      return (
        <Header
          left={
            <TouchableOpacity
              style={{
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 15,
                paddingRight: 15,
              }}
              onPress={() => {
                navigation.navigate('SignIn');
              }}>
              <Text style={{fontSize: 16}}>登录</Text>
            </TouchableOpacity>
          }
          center={
            <View
              style={{
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>首页文章</Text>
            </View>
          }
          right={
            <TouchableOpacity
              style={{
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 15,
                paddingRight: 15,
              }}
              onPress={() => {
                navigation.navigate('SignUp');
              }}>
              <Text style={{fontSize: 16}}>注册</Text>
            </TouchableOpacity>
          }
        />
      );
    else {
      if (
        !this.props.friends.userType &&
        userRelated.info.identification === 0 &&
        isCompleteInformation(userRelated.info.userInfo || {})
      ) {
        return (
          <Header
            left={
              <TouchableOpacity
                style={{
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingLeft: 15,
                  paddingRight: 15,
                }}
                onPress={() => {
                  Alert.alert('', '您确认退出吗？', [
                    {text: '取消', onPress: () => {}},
                    {
                      text: '确定',
                      onPress: async () => {
                        //删除APP中相关数据
                        global
                          .signOut()
                          .then(this.props.navigation.navigate('Entrance'));
                      },
                    },
                  ]);
                }}>
                <Text style={{fontSize: 16}}>退出登录</Text>
              </TouchableOpacity>
            }
            center={
              <View
                style={{
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>首页文章</Text>
              </View>
            }
            right={
              <TouchableOpacity
                style={{
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingLeft: 15,
                  paddingRight: 15,
                }}
                onPress={() => {
                  navigation.navigate('TouristInfo');
                }}>
                <Text style={{fontSize: 16}}>完善信息</Text>
              </TouchableOpacity>
            }
          />
        );
      } else {
        return (
          <Header
            left={<Text />}
            center={
              <View
                style={{
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>首页文章</Text>
              </View>
            }
            right={<Text />}
          />
        );
      }
    }
  };

  render() {
    const {imgArr} = this.state;
    // console.log('111111111', this.props.articles.articles);
    console.log("首页图片", imgArr);
    let params = {
      data: this.props.articles.articles,
      renderItem: this.renderArticleItem,
      keyExtractor: (item) => item.id.toString(),
      ItemSeparatorComponent: () => (
        <View style={{height: 7, backgroundColor: '#f8f8f8'}} />
      ),
      refreshControl: (
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
      ),
      showsVerticalScrollIndicator: true,
      onEndReached: this.onScroll,
      onEndReachedThreshold: 0.1,
      initialNumToRender: 5,
      ListFooterComponent: () => (
        <ListFooter loading={this.state.loading} more={this.state.more} />
      ),
      ListHeaderComponent: () => <SwiperImage list={imgArr} />,
      // ListHeaderComponent: () => <SwiperImage />,
    };

    return (
      <SafeAreaView style={styles.container}>
        {this._renderHeader()}
        {this.props.articles.errMess ? (
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
            }
            style={{flex: 1}}>
            <SwiperImage list={imgArr} />
            <View
              style={{
                alignItems: 'center',
                paddingTop: 0.25 * Dimensions.get('window').height,
              }}>
              <Image
                source={require('./images/1home.png')}
                style={{height: 50, width: 50}}
              />
              <View style={{paddingVertical: 20}}>
                <Text>网络不给力 下拉刷新一下</Text>
              </View>
            </View>
          </ScrollView>
        ) : (
          <FlatList {...params} />
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    articles: state.articles,
    userRelated: state.userRelated,
    friends: state.friends,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchArticle: (pageSize, pageNum, restart) =>
    dispatch(fetchArticle(pageSize, pageNum, restart)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
