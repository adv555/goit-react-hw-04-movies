import PropTypes from 'prop-types';
import styles from './LoadMoreBtn.scss';

export default function Button({ onClick }) {
  return (
    <button
      type="button"
      name="Load more"
      className={styles.Button}
      onClick={onClick}
    >
      <span className="lable">Load more</span>
    </button>
  );
}

Button.propType = {
  onClick: PropTypes.func.isRequired,
};
