import Detail from "../pages/Detail";
import List from "../pages/List";
import { ReactElement } from "react";

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
];

export default routes;
