import PropTypes from 'prop-types';
import { createContext, useReducer } from 'react';
import {
  initialWranglerReducerState,
  wranglerReducer,
} from '../../state/WranglerReducer';
import WranglerNodeInput from '../WranglerNodeInput';
import WranglerNodeOutput from '../WranglerNodeOutput';
import WranglerOperation from '../WranglerOperationNode';
import WranglerScalarNode from '../WranglerScalarNode';
import styles from './Wrangler.module.scss';
import { useEffect } from 'react';
import { useRef } from 'react';

export const WranglerContext = createContext(null);
export const WranglerOperationContext = createContext(null);

/**
 *
 * @typedef {{ nodes: [{ type: 'operation' | 'scalar', label: string, inputs: string[], outputs: string[], operation: (sockets) => void }] }} WranglerProps
 *
 * @param {WranglerProps} props
 * @returns
 */
const Wrangler = ({ nodes }) => {
  const nodeCount = useRef(0);
  const [state, dispatch] = useReducer(
    wranglerReducer,
    initialWranglerReducerState
  );

  useEffect(() => {
    if (nodes == null) return;

    nodes.forEach((n) => {
      if (n.type == 'scalar') {
        n.outputs = n.operation();
      }

      dispatch({
        type: 'ADD_NODE',
        id: nodeCount.current++,
        label: n.label,
        inputs: n.inputs,
        outputs: n.outputs,
        operation: n.operation,
        nodeType: n.type,
      });
    });
  }, [nodes]);

  return (
    <WranglerContext.Provider value={[state, dispatch]}>
      <div className={styles.workBook}>
        {Object.keys(state).map((k) => (
          <WranglerOperationContext.Provider
            key={k}
            value={{ label: state[k].label, id: k }}
          >
            <WranglerOperation
              label={state[k].label}
              inputSockets={Object.keys(state[k].inputs).map((ik) => (
                <WranglerNodeInput
                  key={ik}
                  label={ik}
                  value={state[k].outputs[ik]}
                ></WranglerNodeInput>
              ))}
              outputSockets={Object.keys(state[k].outputs).map((ok) => (
                <WranglerNodeOutput
                  key={ok}
                  label={ok}
                  value={state[k].outputs[ok]}
                ></WranglerNodeOutput>
              ))}
            ></WranglerOperation>
          </WranglerOperationContext.Provider>
        ))}
      </div>
    </WranglerContext.Provider>
  );
};

Wrangler.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.object),
};

Wrangler.Operation = WranglerOperation;
Wrangler.Scalar = WranglerScalarNode;
Wrangler.NodeOutput = WranglerNodeOutput;
Wrangler.NodeInput = WranglerNodeInput;

export default Wrangler;
