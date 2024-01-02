import React, { useEffect, useState } from "react";
import LeftPanel from "../LeftPanel";

/**
 * This component is handling view aspects of event notification.
 * @component
 */
function ViewNotificationEvent(props: any) {
  const [loader, setLoader] = useState(false);

  return (
    <React.Fragment>
      <div className="loading" style={{ display: loader ? "block" : "none" }}>
        <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" />
      </div>
      <div className="container-fluid content-body vh-100">
        <div className="row">
          <LeftPanel props={props} />
          <div className="col-lg-9 col-xl-10 mt-4">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb p-0">
                <li className="breadcrumb-item">
                  <a href="#">GeoFences</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  View
                </li>
              </ol>
            </nav>
            <table className="table table-striped table-bordered table-dark custom-dark-table">
              <tbody>
                <tr>
                  <td className="small-shell">
                    <h3 className="edit-heading">Customer</h3>
                  </td>
                  <td colSpan={3}>StarAds</td>
                </tr>
                <tr>
                  <td className="small-shell">
                    <h3 className="edit-heading">Creator</h3>
                  </td>
                  <td>admin</td>
                  <td className="small-shell">
                    <h3 className="edit-heading">Active</h3>
                  </td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td className="small-shell">
                    <h3 className="edit-heading">Severity</h3>
                  </td>
                  <td colSpan={3}>Low</td>
                </tr>
                <tr>
                  <td className="small-shell">
                    <h3 className="edit-heading">Notify Map</h3>
                  </td>
                  <td>Yes</td>
                  <td className="small-shell">
                    <h3 className="edit-heading">Notify Email</h3>
                  </td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td className="small-shell">
                    <h3 className="edit-heading">Name</h3>
                  </td>
                  <td>SSAA left athens</td>
                  <td className="small-shell">
                    <h3 className="edit-heading">Notify</h3>
                  </td>
                  <td>On Exit</td>
                </tr>
                <tr>
                  <td className="small-shell">
                    <h3 className="edit-heading">Aircraft</h3>
                  </td>
                  <td>
                    <ul className="list">
                      <li>None</li>
                      <li>None</li>
                      <li>None</li>
                    </ul>
                  </td>
                  <td className="small-shell">
                    <h3 className="edit-heading">Notification lists</h3>
                  </td>
                  <td>
                    <ul className="list">
                      <li>None</li>
                      <li>None</li>
                      <li>None</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="small-shell">
                    <h3 className="edit-heading">Layer Name</h3>
                  </td>
                  <td>Test_Layer</td>
                  <td className="small-shell">
                    <h3 className="edit-heading">Buffer Distance</h3>
                  </td>
                  <td>16.199 nm</td>
                </tr>
                <tr>
                  <td className="small-shell">
                    <h3 className="edit-heading">Landmark</h3>
                  </td>
                  <td>Athens Airport</td>
                  <td className="small-shell">
                    <h3 className="edit-heading">Description</h3>
                  </td>
                  <td>Aircraft left Athens</td>
                </tr>
              </tbody>
            </table>

            <div className="d-flex align-items-center justify-content-end mt-3 mr-3">
              <button
                type="button"
                className="cl-btn cl-btn-primary white-btn mr-3"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default ViewNotificationEvent;
