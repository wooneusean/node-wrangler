import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useNodeControls } from './WranglerNode.hooks.js';
import styles from './WranglerNode.module.scss';

/**
 *
 * @param {{x: number, y: number}} initialPosition
 * @returns WrangerNode component
 */
const WranglerNode = ({ initialPosition }) => {
  /** @type {[HTMLElement, React.Dispatch<React.SetStateAction<HTMLElement>>]} */
  const [handle, setHandle] = useState();
  const [position, isClicking] = useNodeControls({ handle, initialPosition });

  const handleRef = useCallback((node) => {
    if (node != null) {
      setHandle(node);
    }
  }, []);

  return (
    <div style={{ left: position.x, top: position.y }} className={styles.node}>
      <h1 ref={handleRef} className={styles.nodeTitle}>
        Node Name
      </h1>
      <hr className={styles.nodeSeparator} />
      <div className={styles.nodeInputs}>
        <div className={styles.nodeInput}>Input 1</div>
        <div className={styles.nodeInput}>input 2</div>
        <div className={styles.nodeInput}>input 3</div>
        <div className={styles.nodeInput}>input 4</div>
      </div>
      <div className={styles.nodeOutputs}>
        <div className={styles.nodeOutput}>output 1</div>
      </div>
    </div>
  );
};

WranglerNode.propTypes = {
  initialPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
};

WranglerNode.defaultProps = {
  initialPosition: { x: 0, y: 0 },
};

export default WranglerNode;
