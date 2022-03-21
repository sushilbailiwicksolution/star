import React from 'react';

function LeftPanel(props: any) {
  return (
    <React.Fragment>
      <div className='col-lg-3 col-xl-2'>
        <div className='sidebar-wrapper mt-4'>
          <div className='d-flex justify-content-between px-3 pt-3'>
            <label>Categories</label>
            <div className='d-flex align-items-center'>
              <div className='rounded-plus mr-4'>
                <i className='fas fa-plus'></i>
              </div>
              <i className='fas fa-ellipsis-v fa-icon-size'></i>
            </div>
          </div>

          <div className='list-wrapper user-list mt-4'>
            <ul>
              <li
                className='px-3'
                onClick={() => {
                  props.props.history.push('/plan');
                }}
              >
                <div className='ml-2'>
                  <label className='m-0'>Layers</label>
                </div>
              </li>
              <li
                className='px-3'
                onClick={() => {
                  props.props.history.push('/landmark-list');
                }}
              >
                <div className='ml-2'>
                  <label className='m-0'>Landmark</label>
                </div>
              </li>
              <li
                className='px-3'
                onClick={() => {
                  props.props.history.push('/notification');
                }}
              >
                <div className='ml-2'>
                  <label
                    className='m-0'
                    onClick={() => {
                      props.props.history.push('/notification');
                    }}
                  >
                    Notifications
                  </label>
                </div>
              </li>
              <li
                className='px-3'
                onClick={() => {
                  props.props.history.push('/geofences');
                }}
              >
                <div className='ml-2'>
                  <label className='m-0'>Geofence</label>
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
