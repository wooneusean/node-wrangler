import PropTypes from 'prop-types';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { WranglerContext, WranglerOperationContext } from '../Wrangler';
import styles from '../WranglerOperationNode/WranglerOperationNode.module.scss';

const WranglerNodeInput = ({ label, value }) => {
  /** @type {[HTMLElement, React.Dispatch<React.SetStateAction<HTMLElement>>]} */
  const [socketRef, setSocketRef] = useState();

  const [state, dispatch] = useContext(WranglerContext);
  const { id } = useContext(WranglerOperationContext);

  const prevValue = useRef();
  useEffect(() => {
    const { inputs, operation } = state[id];
    if (inputs == null) return;

    const i = {};

    for (const k of Object.keys(inputs)) {
      try {
        const [nodeId, nodeOutputLabel] = state[id].inputs[k].split('.');
        i[k] = state[nodeId].outputs[nodeOutputLabel];
      } catch (error) {
        /* empty */
      }
    }

    const output = operation(i);

    if (JSON.stringify(prevValue.current) == JSON.stringify(output)) return;

    prevValue.current = output;

    dispatch({ type: 'UPDATE_OUTPUT', output, id });
  }, [state, dispatch]);

  const handleSocketRef = useCallback((node) => {
    if (node != null) {
      setSocketRef(node);
    }
  }, []);

  useEffect(() => {
    if (socketRef != null) {
      const dragoverHandler = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'link';
      };

      socketRef.addEventListener('dragover', dragoverHandler);

      const dropHandler = (e) => {
        e.preventDefault();

        const [outputNodeId, outputSocketLabel] = e.dataTransfer
          .getData('application/node-context')
          .split('.');

        dispatch({
          type: 'ADD_LISTENER',
          listener: { node: id, socket: label },
          emitter: { node: outputNodeId, socket: outputSocketLabel },
        });
      };

      socketRef.addEventListener('drop', dropHandler);

      // Link input here

      return () => {
        socketRef.removeEventListener('drop', dropHandler);
        socketRef.removeEventListener('dragover', dragoverHandler);

        // Unlink input here
      };
    }
  }, [socketRef, dispatch]);

  return (
    <div className={styles.nodeInput} title={value}>
      {label}
      <div ref={handleSocketRef} className={styles.socket}></div>
    </div>
  );
};

WranglerNodeInput.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default WranglerNodeInput;
