import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  icon: {width: 28, height: 28},
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  itemLeft: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemRight: {
    flex: 1,
    paddingRight: 15,
    justifyContent: 'center',
    alignItems: 'flex-end',
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
  operate_item: {
    height: 56,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  sectionHeader: {},
  items: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  itemText: {
    fontSize: 18,
    color: '#000',
  },
});
