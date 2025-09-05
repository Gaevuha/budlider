import Logo from '@/components/Logo/Logo';
import Address from '@/components/Address/Address';
import SocialMenu from '@/components/Social/SocialMenu';

export default function Footer() {
  return (
    <footer>
      <div className="container footer__container">
        <a className="logo" href="./index.html" aria-label="Site logo">
          <Logo />
        </a>
        <Address />
        <SocialMenu />
      </div>
    </footer>
  );
}
