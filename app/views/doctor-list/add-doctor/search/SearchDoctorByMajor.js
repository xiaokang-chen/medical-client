import React, {Component} from 'react';
import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';

// styles
import styles from './style';
import {connect} from 'react-redux';
import {getMajor} from '../../../../store/actions/major';

class SearchDoctorByMajor extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: '科室',
    };
  };

  constructor(props) {
    super(props);
    props.getMajor();
  }

  render() {
    let params = {
      keyExtractor: (item) => item.id,
      data: this.props.majorList.info,
      renderItem: ({item}) => {
        return (
          <TouchableOpacity
            style={styles.renderItem}
            onPress={() => {
              this.props.navigation.navigate('DoctorListByMajor', {
                major: item.data,
              });
            }}>
            <Text style={styles.itemText}>{item.data}</Text>
            <Image
              source={require('../../images/right_arrow.png')}
              style={{width: 25, height: 25}}
            />
          </TouchableOpacity>
        );
      },
    };
    return (
      <SafeAreaView style={{flex: 1}}>
        <FlatList {...params} />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    majorList: state.majorList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getMajor: () => dispatch(getMajor()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchDoctorByMajor);
