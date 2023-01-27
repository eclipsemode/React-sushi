import React from "react";
import { BrowserRouter } from "react-router-dom";
import { PulseLoader } from "react-spinners";
const withRouter = (component: () => React.ReactNode) => () => {
  const loader = (
    <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <PulseLoader color="#8ba4f9" />
    </div>
  );
  return (
    <BrowserRouter>
    <React.Suspense fallback={loader}>
      {component()}
    </React.Suspense>
  </BrowserRouter>
  )
}


export default withRouter;