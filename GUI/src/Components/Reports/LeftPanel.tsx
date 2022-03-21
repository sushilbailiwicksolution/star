import React from 'react';

function LeftPanel(props: any) {
  return (
    <React.Fragment>
      <input type='checkbox' id='toggle-sidebar' />
      <div className='col-lg-3 col-xl-2'>
        <label htmlFor='toggle-sidebar' className='toggle-btn'>
          {/* <i className='fa fa-bars'></i> */}
          <i className='fa fa-cog' aria-hidden='true'></i>
        </label>
        <div className='sidebar-wrapper checked-toggle my-4'>
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
              <li className='px-3 active'>
                <div className='ml-2'>
                  <label className='m-0'>Engine Condition</label>
                </div>
              </li>
              <li className='px-3'>
                <div className='ml-2'>
                  <label className='m-0'>Engineering and Maintanance</label>
                </div>
              </li>
              <li className='px-3'>
                <div className='ml-2'>
                  <label className='m-0'>Finance and admin</label>
                </div>
              </li>
              <li className='px-3'>
                <div className='ml-2'>
                  <label className='m-0'>Flight Operations</label>
                </div>
              </li>
              <li className='px-3'>
                <div className='ml-2'>
                  <label className='m-0'>Flight Safety</label>
                </div>
              </li>
              <li className='px-3'>
                <div className='ml-2'>
                  <label className='m-0'>MOQA</label>
                </div>
              </li>
              <li className='px-3'>
                <div className='ml-2'>
                  <label className='m-0'>FOQA</label>
                </div>
              </li>
              <li className='px-3'>
                <div className='ml-2'>
                  <label className='m-0'>OOOI</label>
                </div>
              </li>
              <li className='px-3'>
                <div className='ml-2'>
                  <label className='m-0'>Schedule List</label>
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
