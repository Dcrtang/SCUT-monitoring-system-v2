import { Routes, Route } from "react-router-dom";
import { homeRoutes } from "./constants";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from "react";

const genrateRoutes = (route: any): React.ReactNode => {
  if (!route?.children) {
    return <Route key={route.path} path={route.path} element={route.element} />;
  }

  return (
    <Route key={route.path} path={route.path} element={route.element}>
      {route.children.map(
        (curRoute: {
          path: Key | null | undefined;
          element:
            | string
            | number
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | ReactFragment
            | ReactPortal
            | null
            | undefined;
        }) => (
          <Route
            key={curRoute.path}
            path={curRoute.path}
            element={curRoute.element}
          />
        )
      )}
    </Route>
  );
};

function App() {
  return (
    <>
      <Routes>{homeRoutes.map(genrateRoutes)}</Routes>
    </>
  );
}

export default App;
