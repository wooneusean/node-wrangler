import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import WranglerBaseNode from '../WranglerBaseNode';
import styles from './WranglerOperationNode.module.scss';

/**
 * context:
 *  - contains inputs
 *  - contains function
 *    - function is able to take parameters by name from inputs
 *    - function is able to set output by name in outputs
 *  - contains outputs
 */

export const WranglerOperationNodeContext = createContext({
  /** @type {Map<string, any>} */
  inputs: new Map(),

  /** @type {React.Dispatch<React.SetStateAction<Map<string, any>>>} */
  setInputs: null,

  /**
   * Function that takes in inputs and produces outputs
   * @param {Map<string, any>} inputs Inputs for this node
   * @param {Map<string, any>} outputs Outputs for this node
   */
  operation: (inputs, outputs) => {},

  /** @type {Map<string, any>} */
  outputs: new Map(),

  /** @type {React.Dispatch<React.SetStateAction<Map<string, any>>>} */
  setOutputs: null,
});

/**
 * @typedef {Object} WranglerOperationProps
 * @property {{x: number, y: number}} initialPosition
 * @property {string} label
 * @property {React.ReactNode[]} inputSockets
 * @property {React.ReactNode[]} outputSockets
 * @property {(inputs: Map<string, any>, outputs: Map<string, any>) => void} operation
 */

/**
 *
 * @param {WranglerOperationProps} props
 * @returns
 */
const WranglerOperation = ({
  initialPosition,
  label,
  inputSockets,
  outputSockets,
  operation,
}) => {
  /** @type {[HTMLElement, React.Dispatch<React.SetStateAction<HTMLElement>>]} */

  /** @type {[Map<string, any>, React.Dispatch<React.SetStateAction<Map<string, any>>>]} */
  const [inputs, setInputs] = useState(new Map());

  /** @type {[Map<string, any>, React.Dispatch<React.SetStateAction<Map<string, any>>>]} */
  const [outputs, setOutputs] = useState(new Map());

  useEffect(() => {
    if (
      inputs == null ||
      outputs == null ||
      inputs.size == 0 ||
      outputs.size == 0
    )
      return;

    operation(inputs, outputs);
  }, [inputs, outputs]);

  return (
    <WranglerOperationNodeContext.Provider
      value={{
        inputs,
        outputs,
        setInputs,
        setOutputs,
        operation,
      }}
    >
      <WranglerBaseNode initialPosition={initialPosition} label={label}>
        <div className={styles.nodeInputs}>{inputSockets}</div>
        <div className={styles.nodeOutputs}>{outputSockets}</div>
      </WranglerBaseNode>
    </WranglerOperationNodeContext.Provider>
  );
};

WranglerOperation.propTypes = {
  initialPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  label: PropTypes.string,
  inputSockets: PropTypes.arrayOf(PropTypes.node),
  outputSockets: PropTypes.arrayOf(PropTypes.node),
  operation: PropTypes.func,
};

WranglerOperation.defaultProps = {
  initialPosition: { x: 40, y: 40 },
  label: 'Node',
  operation: (i, o) => {},
};

export default WranglerOperation;
