import React from "react";
import logo from '../images/logo.png'
import Link from "../components/nav/link";

export class TheEnd extends React.Component {
  render() {
    return (<div className='mountains marquee'>
      <div className="crawl">
        <div><img src={logo} style={{ width: '50%', height: 'auto' }}/></div>
        <div style={{ color: 'pink',
          textShadow: '-2px -2px 0 darkred, 2px -2px 0 darkred, -2px 2px 0 darkred, 2px 2px 0 darkred',
          fontSize: '125%',
          lineHeight: 2,
        }}>
          <h3>a schwartz.world production</h3>
          <p>
            css:<br />
            <a href="https://nostalgic-css.github.io/NES.css/">https://nostalgic-css.github.io/NES.css/</a>;
          </p>
          <p>
            h3 js bindinds:<br />
            <a href="https://github.com/uber/h3-js">https://github.com/uber/h3-js</a>;
          </p>
          <p>
            map library<br />
            <a href="https://leafletjs.com/">https://leafletjs.com/</a>;
          </p>
          <p>
            editable maps:<br />
            <a href="https://github.com/codeofsumit/leaflet.pm">https://github.com/codeofsumit/leaflet.pm</a>;
          </p>
          <p>
            moral support:<br />
            maddie the greyhound;
          </p>
          <p>
            semicolons:<br />
            encouraged;
          </p>
          <p>
            <h3>Special thanks to:</h3>
            <ul>
              <li>bostonjs</li>
              <li>google</li>
              <li>caffeine</li>
            </ul>
          </p>
          <p>
            See something that could be improved?
          </p>
          <p>
            Submit a PR at<br/>
            <a href="https://github.com/ianschwartz/h3-presentation">https://github.com/ianschwartz/h3-presentation</a>
          </p>
        </div>
        <p>
          <Link to='/' className="nes-btn">play again</Link>
        </p>
      </div>
    </div>)
  }
}
