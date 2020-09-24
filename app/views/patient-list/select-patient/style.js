import {PixelRatio, StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleView: {
    backgroundColor: '#e6e6e6',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingVertical: 5,
    flexDirection: 'row',
  },
  titleLeftView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    paddingHorizontal: 15,
  },
  titleText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  titleRightView: {
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  titleRightBtn: {
    height: 35,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  titleRightText: {
    fontSize: 16,
  },
  textInput: {
    fontSize: 18,
    color: '#000',
    paddingRight: 20,
  },
  searchView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#e2e2e2',
    borderBottomWidth: 2 / PixelRatio.get(),
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
  },
  searchContainer: {
    marginVertical: 10,
  },
  searchImage: {
    width: 35,
    height: 35,
    tintColor: '#cccccc',
    marginLeft: 10,
  },

  //患者列表style
  itemHeaderText: {
    height: 25,
    textAlign: 'center',
    lineHeight: 25,
    backgroundColor: '#f6f6f6',
    color: '#000',
    fontSize: 15,
  },
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  itemLeft: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  nickname: {
    fontSize: 18,
    color: '#000',
    lineHeight: 22,
  },
  itemRight: {},
  labelItem: {
    paddingRight: 5,
  },
});
