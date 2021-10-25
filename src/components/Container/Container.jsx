import styles from './Container.module.scss';
import PropTypes from 'prop-types';

export default function Container({ children }) {
  return <div className={styles.container}>{children}</div>;
}

Container.prototype = {
  children: PropTypes.node,
};
