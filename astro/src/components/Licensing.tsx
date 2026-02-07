export default function Licensing() {
  return (
    <section className="container wrapper mb-5">
      <h2>Licensing</h2>
      <div className="content">
        <div className="h3">Open HSP</div>
        <p>
          <strong>Open Smart Desk</strong> is an <strong>Open HSP</strong> initiative where everything is open on{' '}
          <a href="https://github.com/zentala/open-smart-desk/blob/master/LICENSE.md" target="_blank" rel="noreferrer">
            GPL-3.0 License
          </a>
          :
        </p>
        <ul>
          <li><strong>H</strong> (Hardware) stands for projects of electronic boards which you can print yourself</li>
          <li><strong>S</strong> (Software) stands for ready to use firmware you can use on printed hardware</li>
          <li><strong>P</strong> (Printables) stands for cases and other plastic elements you can print on a 3D printer and use with our hardware</li>
        </ul>
        <p>With all elements in place, you can assemble a complete device. You can use it as-is or fork and modify it for your needs.</p>
      </div>
    </section>
  );
}
