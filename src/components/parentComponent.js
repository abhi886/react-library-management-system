import React from "react";
import { Link } from "react-router-dom";

const ParentComponent = (props) => (
  <div className='card calculator'>
    <p>
      <Link onClick={props.addChild}>
        <div className='btn btn-primary'>Input Element</div>
      </Link>
    </p>
    <div id='children-pane'>{props.children}</div>
  </div>
);

export default ParentComponent;
