import React, { useEffect, useState } from "react";
import MapContainers from "./map";
import LeftPanel from "./LeftPanel";
import { getLayer } from "./../../Service/index";
import { planService } from "../../Service/plan.service";
import { toast } from "react-toastify";

/**
 * This component is handling dashboard
 * @component
 */
function Dashboard(props: any) {
  const [rightPanelCss, updateRightPanelCss] = useState({
    width: "calc(100% - 263px)",
    height: "initial",
  });

  useEffect(() => {
    const width = document.getElementById("sliding_pannel")?.offsetWidth;
    console.log("width", width);
    initData();
  });

  const initData = async () => {
    try {
      const layerData = await getLayer();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <div className="container-fluid content-body">
        <div className="row landmark-box">
          <LeftPanel props={props} />
          <div className="right-area" id="map_container" style={rightPanelCss}>
            <div id="map_dashboard" className="mt-4">
              <MapContainers />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
