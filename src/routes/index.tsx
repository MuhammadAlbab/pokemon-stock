import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RouteList from "./routes";

const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {RouteList.map((e) => {
          return <Route path={e.path} element={e.element} key={e.path} />;
        })}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
