import React from "react";

const Footer = props => {
  return (
    <footer className="footer">
      <div className="github-container">
        <a
          href="https://github.com/jimmytricks/CanucksHockey"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub
          <span className="fab fa-github fa-lg" />
        </a>
      </div>
      <div className="central-footer">
        <p>DidYouWatchTheGame.com</p>
      </div>
      <div className="zu-container">
        <p>
          Crafted in the ZU:
          <a
            href="http://www.przu.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            PRZU.com
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
