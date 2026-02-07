export default function Hero() {
  return (
    <div className="jumbotron jumbotron-fluid text-center hero">
      <div className="container py-5">
        <div className="row">
          <p className="text-center hero-badges">
            <img src="https://img.shields.io/badge/stability-wip-lightgrey.svg" alt="WIP" />
            <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/zentala/open-smart-desk" />
            <img alt="GitHub" src="https://img.shields.io/github/license/zentala/open-smart-desk" />
          </p>
          <h1 className="display-6 hero-subtitle">Public Research & Development Project</h1>
          <h1 className="display-4 hero-title">SmartDesk — Smart Height-Adjustable Desk</h1>
        </div>
        <div className="row justify-content-center">
          <p className="lead col-lg-8 hero-lead">
            A behavioral + IoT experiment focused on <strong>habit change</strong>, modular architecture,
            and an <strong>open communication standard</strong> for height‑adjustable desks.
          </p>
        </div>
        <div className="row">
          <div className="col">
            <a
              href="https://github.com/zentala/open-smart-desk"
              className="btn btn-primary btn-lg m-2"
              role="button"
              style={{ background: '#333' }}
            >
              <i className="bi bi-github" style={{ position: 'relative', top: '-2px' }}></i> GitHub
            </a>
            <a
              href="https://discord.com/invite/7s7P9Kga"
              className="btn btn-primary btn-lg m-2"
              role="button"
              style={{ background: '#5865f2' }}
            >
              <i className="bi bi-discord" style={{ position: 'relative', top: '-1px' }}></i> Discord
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
