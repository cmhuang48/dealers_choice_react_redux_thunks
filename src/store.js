import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const LOAD_AGENTS = 'LOAD_AGENTS';
const LOAD_PROPERTIES = 'LOAD_PROPERTIES';
const LOADED = 'LOADED';
const CREATE_PROPERTY = 'CREATE_PROPERTY';
const DESTROY_PROPERTY = 'DESTROY_PROPERTY';
const SET_VIEW = 'SET_VIEW';

const initialState = {
  agents: [],
  properties: [],
  loading: true,
  view: ''
};

const agentsReducer = (state = [], action) => {
  if (action.type === LOAD_AGENTS) {
    state = action.agents;
  }
  return state;
}

const propertiesReducer = (state = [], action) => {
  if (action.type === LOAD_PROPERTIES) {
    state = action.properties;
  }
  if (action.type === CREATE_PROPERTY) {
    state = [...state, action.property];
  }
  if (action.type === DESTROY_PROPERTY) {
    state = state.filter(property => property.id !== action.property.id);
  }
  return state;
}

const loadingReducer = (state = true, action) => {
  if (action.type === LOADED) {
    state = false;
  }
  return state;
}

const viewReducer = (state = '', action) => {
  if (action.type === SET_VIEW) {
    state = action.view;
  }
  return state;
}

const reducer = combineReducers({
  agents: agentsReducer, 
  properties: propertiesReducer, 
  loading: loadingReducer,
  view: viewReducer
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

const _loadAgents = (agents) => {
  return {
    type: LOAD_AGENTS,
    agents
  };
};

const loadAgents = () => {
  return async (dispatch) => {
    const agents = (await axios.get('/api/agents')).data;
    dispatch(_loadAgents(agents));
  };
};

const _loadProperties = (properties) => {
  return {
    type: LOAD_PROPERTIES,
    properties
  };
};

const loadProperties = () => {
  return async (dispatch) => {
    const properties = (await axios.get('/api/properties')).data;
    dispatch(_loadProperties(properties));
  };
};

const loaded = () => {
  return {
    type: LOADED
  };
};

const _createProperty = (property) => {
  return {
    type: CREATE_PROPERTY,
    property
  };
};

const createProperty = () => {
  return async (dispatch) => {
    const property = (await axios.post('/api/properties')).data;
    dispatch(_createProperty(property));
  };
};

const _destroyProperty = (property) => {
  return {
    type: DESTROY_PROPERTY,
    property
  };
};

const destroyProperty = (property) => {
  return async (dispatch) => {
    await axios.delete(`/api/properties/${property.id}`);
    dispatch(_destroyProperty(property));
  };
}

const setView = (view) => {
  return {
    type: SET_VIEW,
    view
  };
};

export { loadAgents, loadProperties, loaded, createProperty, destroyProperty, setView };
export default store;