import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {articles} from './reducers/articles';
import {questionnaire} from './reducers/questionnaire';
import {userRelated} from './reducers/user';
import {questions} from './reducers/questions';
import {patientList} from './reducers/patient';
import {session} from './reducers/session';
import {sessionList} from './reducers/session_list';
import {doctorList} from './reducers/doctor';
import {majorList} from './reducers/major';
import {search} from './reducers/search';
import {label} from './reducers/label';
import {friends} from './reducers/friends';

export const configureStore = () => {
  return createStore(
    combineReducers({
      articles,
      questionnaire,
      questions,
      userRelated,
      patientList,
      session,
      sessionList,
      doctorList,
      majorList,
      search,
      label,
      friends,
    }),
    applyMiddleware(thunk, logger),
  );
};
