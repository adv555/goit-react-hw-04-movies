import styles from './OnGoBackBtn.module.scss';
import PropTypes from 'prop-types';
import { TiArrowLeftThick } from 'react-icons/ti';

export default function OnGoBackButton({ onClick, label }) {
  return (
    <button type="button" className={styles.Button} onClick={onClick}>
      <TiArrowLeftThick />
      {label}
    </button>
  );
}

OnGoBackButton.prototype = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};
