import React from "react";
import styled from "styled-components";

const AppFooter = () => {
  return (
    <Footer>
      <FooterSection>
        <FooterLink
          href="https://github.com/jimmytricks/CanucksHockey"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub
          <span className="fab fa-github fa-lg" />
        </FooterLink>
      </FooterSection>
      <FooterSection>DidYouWatchTheGame.com</FooterSection>
      <FooterSection>
        Crafted in the ZU:
        <FooterLink
          href="http://www.przu.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          PRZU.com
        </FooterLink>
      </FooterSection>
    </Footer>
  );
};

const Footer = styled.footer`
  grid-area: footer;
  background-color: #32292f;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #eae8ff;
  .fa-github {
    margin-left: 0.25em;
  }
  @media (max-width: 630px) {
    display: block;
  }
`;

const FooterLink = styled.a`
  text-decoration: none;
  color: #eae8ff;
  :hover {
    color: white;
  }
`;

const FooterSection = styled.section`
  padding: 5px 0;
  text-align: center;
  @media (min-width: 631px) {
    :nth-child(1) {
      text-align: left;
    }
    :nth-child(3) {
      text-align: right;
    }
  }
`;

export default AppFooter;
