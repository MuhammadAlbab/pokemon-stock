import Detail from "../pages/Detail";
import List from "../pages/List";
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
interface route {
  path: string;
  element: ReactElement;
}

const routes: Array<route> = [
  {
    path: "/",
    element: <List />,
  },
  {
    path: "/detail",
    element: <Detail />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];

export default routes;
