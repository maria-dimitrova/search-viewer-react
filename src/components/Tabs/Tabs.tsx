import React from "react";
import { connect } from 'react-redux';

class Tabs extends React.Component {
    render() {
        return (
            <>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Active</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#" aria-disabled="true">Disabled</a>
                    </li>
                </ul>
            </>
        )
    }
}
let test = 1;

export default connect(
    null,
    { test: (content: any) => ({
        type: 'test',
        payload: {
          id: ++test,
          content
        }
      })
}
  )(Tabs)

