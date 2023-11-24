import PropTypes from 'prop-types';
import { useCallback, useContext, useEffect, useState } from 'react';
import styles from '../WranglerOperationNode/WranglerOperationNode.module.scss';
import { WranglerOperationNodeContext } from '../WranglerOperationNode';

const WranglerNodeOutput = ({ label }) => {
  /** @type {[HTMLElement, React.Dispatch<React.SetStateAction<HTMLElement>>]} */
  const [socket, setSocket] = useState();

  const { outputs, setOutputs } = useContext(WranglerOperationNodeContext);

  const socketRef = useCallback((node) => {
    if (node != null) {
      setSocket(node);
    }
  }, []);

  useEffect(() => {
    if (socket != null) {
      const dragstartHandler = (e) => {
        console.log(e);
        e.dataTransfer.effectAllowed = 'link';

        e.dataTransfer.setData('application/node-context', 'test');
      };

      socket.addEventListener('dragstart', dragstartHandler);

      setOutputs((o) => {
        o.set(label, null);
        return o;
      });

      return () => {
        socket.removeEventListener('dragstart', dragstartHandler);

        setOutputs((o) => {
          o.delete(label);
          return o;
        });
      };
    }
  }, [socket, outputs]);

  return (
    <div className={styles.nodeOutput}>
      {label}
      <div ref={socketRef} className={styles.socket} draggable></div>
    </div>
  );
};

WranglerNodeOutput.propTypes = {
  label: PropTypes.string,
};

export default WranglerNodeOutput;
