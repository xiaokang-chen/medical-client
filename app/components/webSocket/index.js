// import {store} from '../../../App'
import {
  add_messages,
  add_old_messages,
  update_session,
} from '../../store/actions/session';
import {
  addLocalSessionList,
  top_session,
} from '../../store/actions/session_list';
// import {
//   contentAssert,
//   contentAsserts,
// } from '../../views/message-chat/chatPlus/send';
import {apply} from '../../store/actions/friends';
import {addPatient} from '../../store/actions/patient';
import network from '../../plugin/network';
import {parseList} from '../../views/entrance/parseList';

let store;
export default class WS {
  constructor(ws_url, user_id, user_token = '') {
    this.ws = new WebSocket(ws_url);
    this.user_id = user_id;
    this.user_token = user_token;
    this.handleWebSocketSetup();
    this.auth = false;
  }

  handleWebSocketSetup = () => {
    this.ws.onopen = () => {
      this.onOpen && this.onOpen();
    };
    this.ws.onmessage = (event) => {
      this.onMessage && this.onMessage(event);
    };
    this.ws.onerror = (error) => {
      this.onError && this.onError(error);
    };
    this.ws.onclose = () =>
      this.reconnect
        ? this.handleWebSocketSetup()
        : this.onClose && this.onClose();
  };

  onError = (err) => {
    console.log('websoket发生错误', err);
  };

  onOpen = () => {
    // console.log("进来onOpen,接收离线消息", this.user_id);
    const self = this;
    // 验证身份
    this.ws.send(
      JSON.stringify({
        version: 1,
        commandId: 1,
        shellId: self.user_id,
        body: {
          shell_id: self.user_id,
          token: self.user_token,
        },
      }),
    );

    this.ws.send(
      JSON.stringify({
        commandId: 9,
        shellId: self.user_id,
        body: {},
      }),
    );
  };

  onMessage = (evt) => {
    // console.log("进来onMessage-----------------------------------------------");
    let data = JSON.parse(evt.data);
    const self = this;

    if (data.commandId === 2) {
      // console.log("验明身份+++++++++++++++++++++++++++++++++++", data);
      this.auth = true;
      // heartbeat();
      this.heartbeatInterval = setInterval(heartbeat, 4 * 60 * 1000);
    }

    if (!this.auth) {
      this.ws.send(
        JSON.stringify({
          version: 1,
          commandId: 1,
          shellId: self.user_id,
          body: {
            shell_id: self.user_id,
            token: '',
          },
        }),
      );
    }

    function heartbeat() {
      // console.log("心跳++++++++++++++++++++++++++++++++++++++++++++++++++++", data);
      self.ws.send(
        JSON.stringify({
          version: 1,
          commandId: 7,
          shellId: self.user_id,
          body: {
            content: 'I am ' + self.user_id,
          },
        }),
      );
    }

    // 接收发送消息
    if (this.auth && data.commandId === 3) {
      // console.log("接收到消息+++++++++++++++++++++");
      // console.log(data);
      let content = JSON.parse(data.body.content);

      //   contentAssert(content).then((content) => {
      //     // console.log("查看最值数据测试", content);
      //     const chat_id = data.body.from_shell_id.toString();
      //     store.dispatch(add_messages([content], chat_id));
      //     store.dispatch(top_session(chat_id));
      //   });
    }

    // 接收历史消息
    if (this.auth && data.commandId === 12) {
      // console.log("检测历史消息+++++++++++++++++++++");
      // console.log(data);

      let messages = [];
      for (let item of data.body) {
        messages.push(JSON.parse(item.content));
      }

      const user1 = data.body[0].fromShellId;
      const user2 = data.body[0].toShellId;
      const user = this.user_id === user1 ? user2 : user1;
      // console.log("历史消息啊messages",messages,user1,user2,this.user_id);

      //   contentAsserts(messages).then((messages) => {
      //     // console.log("检测输出", messages)
      //     store.dispatch(add_old_messages(messages, user.toString()));
      //   });

      // store.dispatch(add_old_messages(messages, user.toString()));
    }

    // 接收离线消息
    if (this.auth && data.commandId === 10) {
      let messagesDict = {};
      for (let item of data.body) {
        const chat_id = item.fromShellId.toString();
        if (!messagesDict.hasOwnProperty(chat_id)) messagesDict[chat_id] = [];
        messagesDict[chat_id].push(JSON.parse(item.content));
      }

      // console.log("检测离线+++++++++++++++++++++");
      // console.log("data",data);
      // console.log("messagesDict",messagesDict);
      for (let item in messagesDict) {
        // console.log(item);
        if (item) {
          //   contentAsserts(messagesDict[item]).then((messages) => {
          //     store.dispatch(add_old_messages(messages, item));
          //     store.dispatch(top_session(item));
          //   });
          // store.dispatch(add_messages(messagesDict[item], item));
          // store.dispatch(top_session(item))
        }
      }
    }

    // 接收患者申请信息----其他
    if (this.auth && data.commandId === 13) {
      // console.log("接收患者申请信息+++++++++++++++++++++");
      const {shellId} = data;
      const {content, Type} = data.body;
      // Type 为 1：申请  Type为2：同意

      console.log('data', shellId, content, Type);
      if (Type === '1') {
        // 医生 处理 患者 申请
        store.dispatch(apply({shellId, content}));
      }
      if (Type === '2') {
        // 患者 处理 医生 同意 sessionList
        // console.log("接收患者申请信息+++++++++++++++++++++", {shellId, content});
        // todo 新写的接口
        // 更新其他数据
        network('user/getInfoListByUserToken', 'post')
          .then(async (res) => {
            if (res.data) {
              // 获取医生或者患者的列表
              const tagDoctor = 0;
              const patientsList = tagDoctor
                ? res.data.patients
                : res.data.doctor;
              const {sectionList, SessionList, sessions_new} = await parseList(
                patientsList,
                tagDoctor,
              );
              store.dispatch(addPatient(sectionList));
              store.dispatch(addLocalSessionList(SessionList));
              store.dispatch(update_session(sessions_new));
            }
          })
          .catch((e) => {
            console.log('信息更新失败', e);
          });
      }

      if (Type === '3') {
        //患者实时更新redux中的主诊断数据
        store.dispatch({type: 'CHANGE_DIAGNOSE', diagnose: content});
      }
      // if(Type === "4"){
      //
      // }
    }
  };

  onClose = () => {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }
    this.handleWebSocketSetup();
  };
}

export function getStore(store1) {
  store = store1;
}
