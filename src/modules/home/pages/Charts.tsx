import { Tab, TabList } from "@fluentui/react-components";
import { Suspense } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Charts() {
  const navigate = useNavigate();
  return (
    <div className="space-y-1.5">
      <TabList>
        <Tab onClick={() => navigate("/chart/line")} value="line">Line</Tab>
        <Tab onClick={() => navigate("/chart/area")} value="area">Area</Tab>
        <Tab onClick={() => navigate("/chart/bar")} value="bar">Bar</Tab>
      </TabList>
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  );
}
