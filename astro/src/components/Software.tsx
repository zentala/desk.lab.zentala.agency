export default function Software() {
  return (
    <section className="container py-2">
      <h2>Software</h2>
      <p>
        I conducted experiments using both <a href="https://github.com/zentala/open-smart-desk">Node.js</a> (more extensive version)
        and <a href="https://github.com/zentala/open-smart-desk-python-experiment">Python</a>. While working with Python, I encountered
        serious threading issues and abandoned this approach. In the Node.js version, I ended up with a web interface that replicates
        the physical controller. It processes data from the laser meter and can switch relays.
      </p>
      <div className="text-center">
        <figure className="figure">
          <img src="images/web.png" className="figure-img img-fluid rounded" alt="Web interface of Open Smart Desk" />
          <figcaption className="figure-caption text-center">Web interface of Open Smart Desk</figcaption>
        </figure>
      </div>
    </section>
  );
}
