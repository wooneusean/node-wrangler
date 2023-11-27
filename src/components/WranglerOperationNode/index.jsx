import PropTypes from 'prop-types';
import WranglerBaseNode from '../WranglerBaseNode';
import styles from './WranglerOperationNode.module.scss';

/**
 * @typedef {Object} WranglerOperationProps
 * @property {{x: number, y: number}} initialPosition
 * @property {string} label
 * @property {React.ReactNode[]} inputSockets
 * @property {React.ReactNode[]} outputSockets
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
}) => {
  return (
    <WranglerBaseNode initialPosition={initialPosition} label={label}>
      <div className={styles.nodeInputs}>{inputSockets}</div>
      <div className={styles.nodeOutputs}>{outputSockets}</div>
    </WranglerBaseNode>
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
};

WranglerOperation.defaultProps = {
  initialPosition: { x: 40, y: 40 },
  label: 'Node',
};

export default WranglerOperation;
