import "./Footer.css";

export default function Footer() {

  const handleLinkedin = (e) => {
    e.preventDefault();
    window.open('https://www.linkedin.com/in/miroslawa-borkowska-3b72332a0/');
  };


  return (
    <div id="footer-container">
      <div className="creator-div">
        {/* <div className="creator1">Developer:</div> */}
        <div className="creator">
          <div className="creator-text">©2023 MiroslawaBorkowska™</div>
          <a
            href="https://github.com/Mirabordem"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github creator-link-icon"></i>
          </a>
          <i class="fa-brands fa-linkedin footer-icon" onClick={handleLinkedin}></i>
          {/* <div className="dot">•</div> */}
          {/* <div className="year-aa">November 2023</div> */}
        </div>
      </div>
    </div>
  );
}
