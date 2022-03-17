import { createStore } from 'redux';

const LOAD_AGENTS = 'LOAD_AGENTS';
const LOAD_PROPERTIES = 'LOAD_PROPERTIES';
const LOADED = 'LOADED';
const CREATE_PROPERTY = 'CREATE_PROPERTY';

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

export const loadAgents = (agents) => {
  return {
    type: LOAD_AGENTS,
    agents
  };
};

export const loadProperties = (properties) => {
  return {
    type: LOAD_PROPERTIES,
    properties
  };
};

export const loaded = () => {
  return {
    type: LOADED
  };
};

export const createProperty = (property) => {
  return {
    type: CREATE_PROPERTY,
    property
  };
};

export default store;