import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { useNodeControls } from './WranglerBaseNode.hooks';
import styles from './WranglerBaseNode.module.scss';

const WranglerBaseNode = ({ initialPosition, label, children }) => {
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
        {label}
      </h1>
      <hr className={styles.nodeSeparator} />
      {children}
    </div>
  );
};

WranglerBaseNode.propTypes = {
  initialPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  label: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

WranglerBaseNode.defaultProps = {
  initialPosition: { x: 40, y: 40 },
  label: 'Node',
};

export default WranglerBaseNode;
