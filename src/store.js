import { createStore } from 'redux';

export const LOAD_AGENTS = 'LOAD_AGENTS';
export const LOAD_PROPERTIES = 'LOAD_PROPERTIES';
export const LOADED = 'LOADED';
export const CREATE_PROPERTY = 'CREATE_PROPERTY';

const initialState = {
  agents: [],
  properties: [],
  loading: true
};

const store = createStore((state = initialState, action) => {
  if (action.type === LOAD_AGENTS) {
    state = {...state, agents: action.agents};
  }
  if (action.type === LOAD_PROPERTIES) {
    state = {...state, properties: action.properties};
  }
  if (action.type === LOADED) {
    state = {...state, loading: false};
  }
  if (action.type === CREATE_PROPERTY) {
    state = {...state, properties: [...state.properties, action.property]};
  }
  return state;
});

export default store;