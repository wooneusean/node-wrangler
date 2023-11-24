import PropTypes from 'prop-types';
import WranglerNodeInput from '../WranglerNodeInput';
import WranglerNodeOutput from '../WranglerNodeOutput';
import WranglerOperation from '../WranglerOperationNode';
import WranglerScalarNode from '../WranglerScalarNode';
import styles from './Wrangler.module.scss';

const Wrangler = ({ children }) => {
  return <div className={styles.workBook}>{children}</div>;
};

Wrangler.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Wrangler.Operation = WranglerOperation;
Wrangler.Scalar = WranglerScalarNode;
Wrangler.NodeOutput = WranglerNodeOutput;
Wrangler.NodeInput = WranglerNodeInput;

export default Wrangler;
