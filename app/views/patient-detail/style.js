import {PixelRatio, StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E4E4',
  },
  head: {
    paddingBottom: 40,
    paddingHorizontal: 20,
    paddingTop: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  middle: {
    paddingVertical: 10,
  },
  send_message: {
    backgroundColor: '#fff',
    borderColor: '#d4d4d4',
    borderBottomWidth: 1 / PixelRatio.get(),
    flexDirection: 'row',
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  font_style: {
    fontSize: 20,
    color: '#483D8B',
    textAlign: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 20,
    marginLeft: 10,
  },
  detail: {
    // justifyContent:'space-between'
  },
  nickname: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  other: {
    // marginBottom: 10
  },
});
