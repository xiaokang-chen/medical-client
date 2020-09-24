import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  icon: {width: 27, height: 27},

  item: {
    backgroundColor: '#fff',
    paddingBottom: 15,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#000',
    lineHeight: 22,
  },
  subtitle: {
    marginTop: 2,
  },
  contentText: {
    lineHeight: 20,
    fontSize: 14,
    color: '#000',
  },

  body: {
    padding: 15,
    paddingTop: 0,
    paddingBottom: 0,
    flexDirection: 'row',
  },
  headbar: {
    padding: 15,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  create_at: {
    fontSize: 11,
    color: '#5e6472',
  },
  nickname: {
    lineHeight: 16,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 3,
    color: '#000',
  },

  //底部
  footer: {
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
  },

  footerText: {
    fontSize: 13,
    color: '#5c6064',
    lineHeight: 14,
  },

  point: {
    marginTop: 6,
    marginLeft: 7,
    marginRight: 7,
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#c1c3ce',
  },
});
