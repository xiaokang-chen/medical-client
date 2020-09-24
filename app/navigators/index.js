/**
 * 路由映射表
 */
import {PixelRatio, Platform} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Entrance from '../views/entrance';

import SignIn from '../views/sign-in';
import SignUp from '../views/sign-up';
import Forgot from '../views/forgot';

import Home from '../views/home';

import Diary from '../views/doctor-list/diary';
import Me from '../views/me';
import Message from '../views/message';

import Questionnaire from '../views/questionnaire';
import QuestionnairePush from '../views/questionnaire-push';
import PatientList from '../views/patient-list';
import PushList from '../views/push-list';
import Diagnose from '../views/diagnose';
import AddDiagnose from '../views/diagnose/AddDiagnose';
import ChangeDiagnose from '../views/diagnose/ChangeDiagnose';

import Patient from '../views/patient';
// import MessageChat from '../views/message-chat';
// import Camera from '../views/message-chat/chatPlus/Camera';
import PersonalInformation from '../views/personal-information';
import PatientInformationUpdate from '../views/personal-information/patientinfo-update';
import DoctorInformationUpdate from '../views/personal-information/doctorinfo-update';
import AccountInformation from '../views/account-information';
import ResetNickname from '../views/account-information/nickname';
import Setting from '../views/setting';
import About from '../views/about';
import ArticleDetail from '../views/article-detail';
import QuestionnaireDetail from '../views/questions';

import DoctorDetail from '../views/doctor-detail';
import PatientDetail from '../views/patient-detail';

import MoreInfo from '../views/patient-detail/more-info';
import DiaryInfo from '../views/patient-detail/diary-info';
import AddDoctor from '../views/doctor-list/add-doctor';

import SearchDoctorByName from '../views/doctor-list/add-doctor/search/SearchDoctorByName';
import SearchDoctorByMajor from '../views/doctor-list/add-doctor/search/SearchDoctorByMajor';
import DoctorListByMajor from '../views/doctor-list/add-doctor/search/DoctorListByMajor';
import DoctorListSearch from '../views/doctor-list/add-doctor/search/DoctorListSearch';

import SearchPatientByNameOrPhone from '../views/patient/search/SearchPatientByNameOrPhone';
import PatientListSearch from '../views/patient/search/PatientListSearch';

import AllLabel from '../views/patient-list/all-label';
import SelectPatient from '../views/patient-list/select-patient';
import EditLabel from '../views/patient-list/edit-label';
import SaveLabel from '../views/patient-list/save-label';
import NewPatients from '../views/patient-list/new-patients';
import DoctorList from '../views/doctor-list';
import Agreement from '../views/sign-up/agreement';
import TouristInfo from '../views/touristInfo';
import TouristInformationUpdate from '../views/touristInfo/touristinfo-update';
import MainDiagnose from '../views/touristInfo/main-diagnose';

//统一显示页面样式
const createScreen = (screen) => {
  return {
    screen,
    navigationOptions: () => ({
      headerTintColor: '#484848',
      headerBackTitle: null,
      headerStyle: {
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: 'rgb(233,237,240)',
      },
    }),
  };
};

// app 进入后的下部tab-------患者
const IndexPatient = createBottomTabNavigator(
  {
    Home,
    DoctorList,
    Message,
    Me,
  },
  {
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
    navigationOptions: {
      // 去掉头部标题栏
      header: null,
    },
    tabBarOptions: Platform.select({
      ios: {
        style: {
          borderTopWidth: 1 / PixelRatio.get(),
          borderTopColor: '#e9edf0',
          backgroundColor: '#fff',
        },
        showLabel: true,
        activeTintColor: '#1177fa',
        inactiveTintColor: '#5e6472',
        labelStyle: {fontWeight: 'bold', fontSize: 10, paddingBottom: 0},
      },
      android: {
        style: {
          height: 50,
          backgroundColor: '#fff',
          borderTopWidth: 0,
          padding: 0,
          margin: 0,
        },
        tabStyle: {
          borderTopWidth: 1 / PixelRatio.get(),
          borderColor: '#e2e2e2',
        },
        activeTintColor: '#1177fa',
        inactiveTintColor: '#5e6472',

        showIcon: true,
        showLabel: true,
        labelStyle: {fontSize: 10, marginTop: -7, paddingBottom: 3},
      },
    }),
  },
);

// app 进入后的下部tab-------医生
const IndexDoctor = createBottomTabNavigator(
  {
    Home,
    PatientList,
    Message,
    Me,
  },
  {
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
    navigationOptions: {
      // 去掉头部标题栏
      header: null,
    },
    tabBarOptions: Platform.select({
      ios: {
        style: {
          borderTopWidth: 1 / PixelRatio.get(),
          borderTopColor: '#e9edf0',
          backgroundColor: '#fff',
        },
        showLabel: true,
        activeTintColor: '#1177fa',
        inactiveTintColor: '#5e6472',
        labelStyle: {fontWeight: 'bold', fontSize: 10, paddingBottom: 0},
      },
      android: {
        style: {
          height: 50,
          backgroundColor: '#fff',
          borderTopWidth: 0,
          padding: 0,
          margin: 0,
        },
        tabStyle: {
          borderTopWidth: 1 / PixelRatio.get(),
          borderColor: '#e2e2e2',
        },
        activeTintColor: '#1177fa',
        inactiveTintColor: '#5e6472',

        showIcon: true,
        showLabel: true,
        labelStyle: {fontSize: 10, marginTop: -7, paddingBottom: 3},
      },
    }),
  },
);

//APP内容----患者
const AppPatient = createStackNavigator({
  //由BottomTap组成的四个母页
  IndexPatient: createScreen(IndexPatient),
  // 堆栈子页
  // MessageChat: createScreen(MessageChat),
  // Camera: createScreen(Camera),
  MoreInfo: createScreen(MoreInfo),
  DoctorDetail: createScreen(DoctorDetail),
  PersonalInformation: createScreen(PersonalInformation),
  PatientInformationUpdate: createScreen(PatientInformationUpdate),
  AccountInformation: createScreen(AccountInformation),
  ResetNickname: createScreen(ResetNickname),
  Setting: createScreen(Setting),
  Diagnose: createScreen(Diagnose),
  AddDiagnose: createScreen(AddDiagnose),
  ChangeDiagnose: createScreen(ChangeDiagnose),
  AddDoctor: createScreen(AddDoctor),
  SearchDoctorByName: createScreen(SearchDoctorByName),
  SearchDoctorByMajor: createScreen(SearchDoctorByMajor),
  DoctorListByMajor: createScreen(DoctorListByMajor),
  DoctorListSearch: createScreen(DoctorListSearch),
  About: createScreen(About),
  ArticleDetail: createScreen(ArticleDetail),
  QuestionnaireDetail: createScreen(QuestionnaireDetail),
  Questionnaire: createScreen(Questionnaire),
  Diary: createScreen(Diary),
});

//APP内容----医生
const AppDoctor = createStackNavigator({
  //由BottomTap组成的四个母页
  IndexDoctor: createScreen(IndexDoctor),
  //堆栈子页
  PatientDetail: createScreen(PatientDetail),
  MoreInfo: createScreen(MoreInfo),
  // MessageChat: createScreen(MessageChat),
  // Camera: createScreen(Camera),
  DiaryInfo: createScreen(DiaryInfo),
  PersonalInformation: createScreen(PersonalInformation),
  DoctorInformationUpdate: createScreen(DoctorInformationUpdate),
  AccountInformation: createScreen(AccountInformation),
  ResetNickname: createScreen(ResetNickname),
  PushList: createScreen(PushList),
  Setting: createScreen(Setting),
  Patient: createScreen(Patient),
  PatientListSearch: createScreen(PatientListSearch),
  SearchPatientByNameOrPhone: createScreen(SearchPatientByNameOrPhone),
  About: createScreen(About),
  ArticleDetail: createScreen(ArticleDetail),
  QuestionnairePush: createScreen(QuestionnairePush),
  QuestionnaireDetail: createScreen(QuestionnaireDetail),
  AllLabel: createScreen(AllLabel),
  SelectPatient: createScreen(SelectPatient),
  EditLabel: createScreen(EditLabel),
  SaveLabel: createScreen(SaveLabel),
  NewPatients: createScreen(NewPatients),
});

//APP内容----游客
//注册登录
const AppTourist = createStackNavigator(
  {
    SignIn: createScreen(SignIn),
    SignUp: createScreen(SignUp),
    Forgot: createScreen(Forgot),
    Home,
    TouristInfo,
    TouristInformationUpdate: createScreen(TouristInformationUpdate),
    MainDiagnose: createScreen(MainDiagnose),
    Agreement: createScreen(Agreement),
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

const AppNavigator = createSwitchNavigator(
  {
    //授权登录等初始化操作
    Entrance,
    //APP内容--患者
    AppPatient,
    //APP内容--医生
    AppDoctor,
    //APP内容——游客
    AppTourist,
  },
  {
    initialRouteName: 'Entrance',
  },
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
