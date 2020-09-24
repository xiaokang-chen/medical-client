import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  iconContainer: {
    borderWidth: 1,
    borderColor: '#f2f2f2',
    backgroundColor: '#f2f2f2',
    borderRadius: 80,
    marginBottom: 20,
  },
  noDoctorIcon: {
    width: 100,
    height: 100,
    borderRadius: 80,
  },
  noDoctor: {
    alignItems: 'center',
    paddingTop: 80,
  },
  textType: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },

  buttonType: {
    backgroundColor: '#72CDFA',
    borderRadius: 20,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 180,
  },

  //AddDoctor
  header: {
    flexDirection: 'row',
    // paddingTop: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: '#f2f2f2',
    borderRadius: 15,
    height: 40,
    marginVertical: 20,
    // paddingVertical: 20,
    // marginBottom: 5,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    margin: 10,
    marginBottom: 5,
    backgroundColor: '#e6e6e6',
    height: 35,
    borderRadius: 10,
    justifyContent: 'center',
    paddingVertical: 10,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 15,
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
});
