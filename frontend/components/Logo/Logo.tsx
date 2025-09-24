import styles from './Logo.module.css';

const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 400 100"
    width="200"
    height="50"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <text x="5" y="78">
      <tspan className={styles['text__logo-accent']}>БУД</tspan>
      <tspan className={styles.text__logo} dx="5">лідер</tspan>
    </text>
  </svg>
);

export default Logo;
