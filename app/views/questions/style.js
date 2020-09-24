import {StyleSheet, Platform, Dimensions} from 'react-native';

const {height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    flexDirection: 'row',
    paddingTop: Platform.OS == 'ios' ? 20 : 0,
    backgroundColor: '#fff',
  },

  questionnaireName: {
    height: height * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  questionnaireNameText: {
    fontSize: 20,
    color: '#5BBBFF',
    fontWeight: 'bold',
  },

  searchInput: {
    flex: 1,
    margin: 10,
    marginBottom: 5,
    paddingLeft: 10,
    backgroundColor: 'rgb(236, 236, 236)',
    height: 35,
    borderRadius: 5,
    justifyContent: 'center',
    paddingVertical: 0,
  },

  titleText: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#000',
    lineHeight: 22,
    paddingTop: 8,
  },

  icon: {width: 21, height: 21},

  item: {
    backgroundColor: '#fff',
    paddingBottom: 15,
  },

  upper: {
    padding: 15,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#000',
    lineHeight: 22,
    paddingTop: 8,
  },
  contentSummary: {
    marginTop: 2,
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 8,
  },
  processing: {
    lineHeight: 20,
    fontSize: 14,
    color: '#43F02C',
  },
  finished: {
    lineHeight: 20,
    fontSize: 14,
    color: '#E1E1E1',
  },
});
