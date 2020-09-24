import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 70,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  itemLeft: {
    flex: 1,
    paddingLeft: 65,
    justifyContent: 'center',
  },
  unreadCount: {
    position: 'absolute',
    backgroundColor: 'red',
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: -28,
    marginTop: -5,
    borderRadius: 20,
    height: 17,
  },
  unreadCountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  unreadCountTextMore: {
    fontSize: 12,
    marginTop: -3,
    fontWeight: 'bold',
    color: '#fff',
  },
  avatar: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: -65,
    marginTop: -8,
  },
  nickname: {
    fontWeight: 'bold',
  },
  lastMessage: {
    marginTop: 5,
  },
  lastMessageText: {
    color: '#666',
  },
  createAt: {
    fontSize: 13,
    color: '#999',
  },

  //bottom tab style
  tabBarIcon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {width: 21, height: 21},
  subscript: {
    position: 'absolute',
    zIndex: 99,
    marginLeft: 13,
    marginTop: 5,
    backgroundColor: 'red',
    borderRadius: 15,
    paddingLeft: 5,
    paddingRight: 5,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor:'#fff',
    // borderWidth:4
  },
  subscriptText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  subscriptTextMore: {
    fontSize: 15,
    marginTop: -8,
    fontWeight: 'bold',
    color: '#fff',
  },
});
