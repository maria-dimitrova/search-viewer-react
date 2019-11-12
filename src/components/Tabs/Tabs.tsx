import React, { useState } from 'react';
// import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Search from '../Search/Search';

// class Tabis extends React.Component {
//     render() {
//         return (
//             <>
//                 <ul className="nav nav-tabs">
//                     <li className="nav-item">
//                         <a className="nav-link active" href="#">Active</a>
//                     </li>
//                     <li className="nav-item">
//                         <a className="nav-link" href="#">Link</a>
//                     </li>
//                     <li className="nav-item">
//                         <a className="nav-link" href="#">Link</a>
//                     </li>
//                     <li className="nav-item">
//                         <a className="nav-link disabled" href="#" aria-disabled="true">Disabled</a>
//                     </li>
//                 </ul>
//             </>
//         )
//     }
// }
// let test = 1;

// export default connect(
//     null,
//     { test: (content: any) => ({
//         type: 'test',
//         payload: {
//           id: ++test,
//           content
//         }
//       })
// }
//   )(Tabis)

  function ControlledTabs() {
    const [key, setKey] = useState('home');
  
    return (
      <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k: any) => setKey(k)}>
        <Tab eventKey="home" title="Home">
          <div>
              <Search />
          </div>
        </Tab>
        <Tab eventKey="profile" title="Profile">
          <div>bimi</div>
        </Tab>
        <Tab eventKey="contact" title="Contact">
        <div>dimi</div>
        </Tab>
      </Tabs>
    );
  }
  
  // render(<ControlledTabs />);

  export default ControlledTabs;