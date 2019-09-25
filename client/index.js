// import React from "react";
import Route from "./utils/Route";
import {render} from "react-dom";
import React from "react";
const rootNode = document.createElement("div");
document.body.appendChild(rootNode);

render(<Route/>, rootNode);
