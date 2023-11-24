import PropTypes from 'prop-types';
import { useCallback, useContext, useEffect, useState } from 'react';
import { WranglerOperationNodeContext } from '../WranglerOperationNode';
import styles from '../WranglerOperationNode/WranglerOperationNode.module.scss';

const WranglerNodeInput = ({ label }) => {
  /** @type {[HTMLElement, React.Dispatch<React.SetStateAction<HTMLElement>>]} */
  const [socket, setSocket] = useState();

  const { inputs, setInputs } = useContext(WranglerOperationNodeContext);

  const socketRef = useCallback((node) => {
    if (node != null) {
      setSocket(node);
    }
  }, []);

  useEffect(() => {
    if (socket != null) {
      const dragoverHandler = (e) => {
        e.preventDefault();
        console.log(e);
        e.dataTransfer.dropEffect = 'link';
      };

      socket.addEventListener('dragover', dragoverHandler);

      const dropHandler = (e) => {
        e.preventDefault();
        console.log(e);

        const data = e.dataTransfer.getData('application/node-context');
        console.log(data);
      };

      socket.addEventListener('drop', dropHandler);

      setInputs((i) => {
        i.set(label, null);
        return i;
      });

      return () => {
        socket.removeEventListener('drop', dropHandler);
        socket.removeEventListener('dragover', dragoverHandler);

        setInputs((i) => {
          i.delete(label);
          return i;
        });
      };
    }
  }, [socket, inputs]);

  return (
    <div className={styles.nodeInput}>
      {label}
      <div ref={socketRef} className={styles.socket}></div>
    </div>
  );
};

WranglerNodeInput.propTypes = {
  label: PropTypes.string,
};

export default WranglerNodeInput;
