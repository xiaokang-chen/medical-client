import React, {Component} from 'react';
import {View, Text, ScrollView, Image, Dimensions} from 'react-native';
import {fetchArticleDetail} from '../../store/actions/articles';

import styles, {baseFontStyle, tagsStyle} from './style';
import HTML from 'react-native-render-html';

export default class ArticleDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      html: '',
    };
  }
  static navigationOptions = {
    title: '文章详情',
  };

  async componentDidMount() {
    const articleId = this.props.navigation.getParam('articleId', '');
    let data = '';
    await fetchArticleDetail({id: articleId}).then((res) => {
      data = res.data;
    });
    this.setState({
      html: data,
    });
  }

  render() {
    const {
      articleTitle,
      author,
      time,
      avatar,
    } = this.props.navigation.state.params;
    const {html} = this.state;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.titleText}>{articleTitle}</Text>
        </View>
        <View style={styles.itemHead}>
          <View>
            <Image style={styles.avatar} source={{uri: avatar}} />
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.authorName}>{author}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{marginRight: 10, fontSize: 11, color: '#9a9a9a'}}>
                {time}
              </Text>
            </View>
          </View>
        </View>
        <View style={{marginHorizontal: 10, marginBottom: 20, paddingTop: 10}}>
          <HTML
            html={html}
            imagesMaxWidth={Dimensions.get('window').width - 40}
            tagsStyles={tagsStyle}
            baseFontStyle={baseFontStyle}
          />
        </View>
      </ScrollView>
    );
  }
}
