import {Dimensions, PixelRatio, StyleSheet} from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6e6',
  },
  title: {
    paddingHorizontal: 15,
  },
  clear: {
    width: 20,
    height: 20,
    borderRadius: 20,
    opacity: 0.8,
    backgroundColor: '#9c9c9c',
    marginLeft: 6,
  },
  clear_text: {
    color: '#fff',
    fontSize: 17,
    lineHeight: 18,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  editItem: {
    borderWidth: 3 / PixelRatio.get(),
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
    height: screenWidth * 0.145,
    width: screenWidth * 0.145,
    marginHorizontal: screenWidth * 0.02,
    borderRadius: 5,
  },
  decrease1: {
    height: screenWidth * 0.05,
    width: screenWidth * 0.05,
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
    backgroundColor: '#04BE02',
    borderRadius: 5,
  },
  titleRightText: {
    fontSize: 16,
    color: '#fff',
  },
});
