import PropTypes from 'prop-types';
import WranglerBaseNode from '../WranglerBaseNode';

const WranglerScalarNode = ({ initialPosition, label, initialValue }) => {
  return (
    <WranglerBaseNode initialPosition={initialPosition} label={label}>
      {/* <input type='text' value={initialValue}  /> */}
    </WranglerBaseNode>
  );
};

WranglerScalarNode.propTypes = {
  initialPosition: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  label: PropTypes.string,
  initialValue: PropTypes.string,
};

WranglerScalarNode.defaultProps = {
  initialPosition: { x: 40, y: 40 },
  label: 'Node',
  initialValue: '',
};

export default WranglerScalarNode;
