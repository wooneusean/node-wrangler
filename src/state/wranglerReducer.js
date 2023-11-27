export const wranglerReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NODE': {
      return {
        ...state,
        [action.id]: {
          label: action.label,
          inputs: action.inputs,
          outputs: action.outputs,
          operation: action.operation,
          nodeType: action.nodeType,
        },
      };
    }
    case 'ADD_LISTENER': {
      const { node, socket } = action.listener;
      const { emitter } = action;

      const newState = {
        ...state,
        [node]: {
          ...state[node],
          inputs: {
            ...state[node].inputs,
            [socket]: `${emitter.node}.${emitter.socket}`,
          },
        },
      };

      return newState;
    }
    case 'UPDATE_OUTPUT': {
      const { output, id } = action;

      return {
        ...state,
        [id]: {
          ...state[id],
          outputs: output,
        },
      };
    }
    default:
      return state;
  }
};

export const initialWranglerReducerState = {};
