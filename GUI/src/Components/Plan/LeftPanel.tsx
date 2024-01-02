import React from "react";


/**
 * This component is handling left panel of notifications which include geofence, landmark etc.
 * @component
 */
function LeftPanel(props: any) {
  return (
    <React.Fragment>
      <div className="col-lg-3 col-xl-2">
        <div className="sidebar-wrapper mt-4">
          <div className="d-flex justify-content-between px-3 pt-3">
            <label>Notifications</label>
            {/* <div className="d-flex align-items-center">
              <div className="rounded-plus mr-4">
                <i className="fas fa-plus"></i>
              </div>
              <i className="fas fa-ellipsis-v fa-icon-size"></i>
            </div> */}
          </div>

          <div className="list-wrapper user-list mt-4">
            <ul>
              <li
                className="px-3"
                onClick={() => {
                  props.props.history.push("/plan");
                }}
              >
                <div className="ml-2">
                  <label className="m-0">Layers</label>
                </div>
              </li>
              <li
                className="px-3"
                onClick={() => {
                  props.props.history.push("/landmark-list");
                }}
              >
                <div className="ml-2">
                  <label className="m-0">Landmark</label>
                </div>
              </li>
              <li
                className="px-3"
                onClick={() => {
                  props.props.history.push("/notification");
                }}
              >
                <div className="ml-2">
                  <label
                    className="m-0"
                    onClick={() => {
                      props.props.history.push("/notification");
                    }}
                  >
                    Notifications
                  </label>
                </div>
              </li>
              <li
                className="px-3"
                onClick={() => {
                  props.props.history.push("/geofences");
                }}
              >
                <div className="ml-2">
                  <label className="m-0">Geofence</label>
                </div>
              </li>
              <li
                className="px-3"
                onClick={() => {
                  props.props.history.push("/notificationEvent");
                }}
              >
                <div className="ml-2">
                  <label className="m-0">Event Notification</label>
                </div>
              </li>
              <li
                className="px-3"
                onClick={() => {
                  props.props.history.push("/notificationReport");
                }}
              >
                <div className="ml-2">
                  <label className="m-0">Report Notification Config</label>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default LeftPanel;
