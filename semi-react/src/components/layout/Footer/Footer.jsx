import { Wrap, Inner, Brand, Dot, Links, Copy } from "./Footer.styles";

const Footer = () => {
  return (
    <Wrap>
      <Inner>
        <Brand>Pre-Semi</Brand>
        <Links>
          <a href="http://kh-academy.co.kr">KH</a>
          <a href="#">이용약관</a>
          <a href="#">고객센터</a>
          <Copy>
            © {new Date().getFullYear()} Pre-Semi. All rights reserved.{" "}
          </Copy>
        </Links>
      </Inner>
    </Wrap>
  );
};

export default Footer;
