import {StyleSheet, Platform, PixelRatio} from 'react-native';
import {ifIphoneX} from 'react-native-iphone-x-helper';

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: '#fff',
    borderBottomWidth: 1 / PixelRatio.get(),
    paddingBottom: 10,
    borderColor: '#e1e1e1',
  },
  searchInput: {
    flex: 1,
    marginBottom: 5,
    paddingLeft: 10,
    margin: 15,
    backgroundColor: 'rgb(236, 236, 236)',
    height: 40,
    borderRadius: 15,
    justifyContent: 'center',
    paddingVertical: 0,
    ...ifIphoneX({
      marginTop: 25,
    }),
    fontSize: 15,
  },
  headButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    // paddingRight:10,
    height: 40,
    ...ifIphoneX(
      {
        marginTop: 25,
      },
      {
        marginTop: 15,
      },
    ),
  },
  headText: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
    height: 40,
    ...ifIphoneX(
      {
        marginTop: 25,
      },
      {
        marginTop: 15,
      },
    ),
  },
  headButtonText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'rgb(67, 98, 230)',
  },

  typeBar: {
    padding: 10,
    paddingBottom: 0,
    paddingTop: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  typeButton: {
    height: 35,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#fff',
  },
  activeTypeButton: {
    borderBottomWidth: 2,
    borderColor: '#333',
  },
  renderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderBottomStartRadius: 15,
    borderColor: '#f0f0f0',
    height: 50,
    alignItems: 'center',
  },
  itemText: {
    fontSize: 17,
    color: '#000',
    lineHeight: 20,
  },

  historyItem: {
    backgroundColor: '#f2f2f2',
    borderRadius: 7,
    justifyContent: 'center',
    margin: 7,
    padding: 8,
  },

  //患者列表
  item: {
    backgroundColor: '#fff',
    paddingVertical: 15,
  },
  head: {
    padding: 15,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  body: {
    padding: 15,
    paddingLeft: 65,
    paddingTop: 0,
    paddingBottom: 0,
    flexDirection: 'row',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 10,
  },
  type: {
    fontSize: 15,
    color: '#5e6472',
  },
  name: {
    lineHeight: 16,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 3,
    color: '#000',
  },
});
