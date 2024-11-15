import {
  FaFacebook,
  FaInstagram,
  FaMeetup,
  FaTwitter,
  FaVimeo,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
            <FaFacebook size={24} />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
            <FaTwitter size={24} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram size={24} />
          </a>
          <a href="https://www.whatsapp.com" target="_blank" rel="noreferrer">
            <FaWhatsapp size={24} />
          </a>
          <a href="https://www.meetup.com" target="_blank" rel="noreferrer">
            <FaMeetup size={24} />
          </a>
          <a href="https://www.vimeo.com" target="_blank" rel="noreferrer">
            <FaVimeo size={24} />
          </a>
        </div>
        <p>&copy; 2024 codelovers. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
