import Link from "next/link";
import LogoIcon from "../../../public/icons/logo2.png";

const Logo = () => {
  return (
    <Link href="/">
      <a className="container">
        <img className="logo" src={LogoIcon} />
        &nbsp;<span> Sellers</span>
        <style jsx>{`
          .container {
            font-size: 1.5rem;
            font-family: "Roboto";
            color: #202649;
            text-decoration: none;
            display: flex;
            align-items: center;
          }
          span {
            font-size: 2rem;
            font-weight: 300;
          }
          .logo {
            height: 2.2rem;
          }
        `}</style>
      </a>
    </Link>
  );
};

export default Logo;
