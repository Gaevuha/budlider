import styles from './Address.module.css';

export default function Address() {
  return (
    <div className={styles['wrap-address']}>
      <p className={styles['footer-text']}>Контакти:</p>
      <address className={styles['address-menu']}>
        <ul className={styles['address-list']}>
          <li className={styles['address-item']}>
            <a className={styles['address-link']} href="tel:+380681111111">
              +380 (68) 111-11-11
            </a>
          </li>
          <li className={styles['address-item']}>
            <a className={styles['address-link']} href="mailto:test@gmail.com">
              test@gmail.com
            </a>
          </li>
        </ul>
      </address>
    </div>
  );
}
