import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import styles from '../WranglerOperationNode/WranglerOperationNode.module.scss';
import { useContext } from 'react';
import { WranglerOperationContext } from '../Wrangler';

const WranglerNodeOutput = ({ label, value }) => {
  /** @type {[HTMLElement, React.Dispatch<React.SetStateAction<HTMLElement>>]} */
  const [socket, setSocket] = useState();

  const { id } = useContext(WranglerOperationContext);

  const socketRef = useCallback((node) => {
    if (node != null) {
      setSocket(node);
    }
  }, []);

  useEffect(() => {
    if (socket != null) {
      const dragstartHandler = (e) => {
        e.dataTransfer.effectAllowed = 'link';

        e.dataTransfer.setData('application/node-context', `${id}.${label}`);
      };

      socket.addEventListener('dragstart', dragstartHandler);

      // Link output here

      return () => {
        socket.removeEventListener('dragstart', dragstartHandler);

        // Unlink output here
      };
    }
  }, [socket]);

  return (
    <div className={styles.nodeOutput} title={value}>
      {label}
      <div ref={socketRef} className={styles.socket} draggable></div>
    </div>
  );
};

WranglerNodeOutput.propTypes = {
  label: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default WranglerNodeOutput;
