import {baseUrl} from './constance';

const address = 'medical/storage/fetch/';
export const backgroundColorMap = [
  {
    label: '羊皮卷',
    value: 'tan',
  },
  {
    label: '杏仁黄',
    value: '#F4E5BE',
  },
  {
    label: '青草绿',
    value: '#C0EDB9',
  },
  {
    label: '银河白',
    value: '#FFFFFF',
  },
  {
    label: '极光灰',
    value: '#F0F0F0',
  },
  {
    label: '海天蓝',
    value: '#D5E1F9',
  },
  {
    label: '夜',
    value: '#666666',
  },
];

export const PATIENT_OPERATE_BAR = [
  {
    label: '账号信息',
    value: 'AccountInfo',
    iconName: 'user',
    iconColor: '#FEDE69',
  },
  {
    label: '个人资料',
    value: 'PersonalInfo',
    iconName: 'infocirlce',
    iconColor: '#3D98F7',
  },
  // {
  //   label: '我的医生',
  //   value: 'Diagnose',
  //   iconName: 'solution1',
  //   iconColor: '#11f7df'
  // },
  {
    label: '我的诊断',
    value: 'Diagnose',
    iconName: 'form',
    iconColor: '#f71913',
  },
  {
    label: '添加医生',
    value: 'AddDoctor',
    iconName: 'plus',
    iconColor: '#0ae713',
  },
  // {
  //   label: '设置',
  //   value: 'Setting',
  //   iconName: 'setting'
  //   // iconColor: '#38DAFF'
  // }
];

export const PATIENT_CUSTOM_BAR = [
  {
    label: '问卷调查',
    value: 'Questionnaire',
    iconName: 'solution1',
    iconColor: '#11f7df',
  },
  {
    label: '疼痛日记',
    value: 'Diary',
    iconName: 'filetext1',
    iconColor: '#565656',
  },
];

export const DOCTOR_OPERATE_BAR = [
  {
    label: '账号信息',
    value: 'AccountInfo',
    iconName: 'user',
    iconColor: '#FEDE69',
  },
  {
    label: '个人资料',
    value: 'PersonalInfo',
    iconName: 'filetext1',
    iconColor: '#3D98F7',
  },
  // {
  //   label: '我的患者',
  //   value: 'Patient',
  //   iconName: 'solution1',
  //   iconColor: '#11f7df'
  // },
  {
    label: '问卷推送',
    value: 'QuestionnairePush',
    iconName: 'form',
    iconColor: '#11f74c',
  },
  // {
  //   label: '设置',
  //   value: 'Setting',
  //   iconName: 'setting'
  //   // iconColor: '#38DAFF'
  // }
];

export const THIRD_AUTH_LOGIN = [
  {
    label: '微信',
    value: 'wechat',
  },
  {
    label: '新浪微博',
    value: 'weibo',
  },
  {
    label: 'QQ',
    value: 'QQ',
  },
];

export const CANMERO_OPERATES = [
  {
    label: '拍摄照片',
    value: 'camera',
  },
  {
    label: '从相册选取',
    value: 'photo_album',
  },
];

export const PERSONAL_OPERATES = [
  {
    label: '设置备注',
    value: 'remark',
  },
  // {
  //   label: '其他',
  //   value: 'other'
  // }
];

export const PERMISSION_CODE = [
  {code: -1, tip: '授权被拒绝且不想再被询问'},
  {code: 0, tip: '授权被拒绝'},
  {code: 1, tip: '授权成功'},
];

export const SWIPER_LIST = [
  {
    url: baseUrl + address + '1.jpg',
    addr: '../views/home/images/1.jpg',
    id: 1,
  },
  {
    url: baseUrl + address + '2.jpg',
    addr: '../views/home/images/2.jpg',
    id: 2,
  },
  {
    url: baseUrl + address + '3.jpg',
    addr: '../views/home/images/3.jpg',
    id: 3,
  },
];
