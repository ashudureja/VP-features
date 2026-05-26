import React, { forwardRef, useRef } from "react";


import FeaturesGrid from "./VP-Features-Grid";

import LocomotiveScroll from 'locomotive-scroll';



const App = () => {
  const scroll = new LocomotiveScroll();
  return (
<FeaturesGrid/>
  )
}

export default App