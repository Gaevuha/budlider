import Logo from "@/components/Logo/Logo";
import Address from "@/components/Address/Address";
import SocialMenu from "@/components/SocialMenu/SocialMenu";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.footer__container} container`}>
        <a
          className={styles.logo__footer}
          href="./index.html"
          aria-label="Site logo"
        >
          <Logo />
        </a>
        <Address />
        <SocialMenu />
      </div>
    </footer>
  );
}
