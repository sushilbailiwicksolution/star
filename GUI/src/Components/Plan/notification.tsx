import React from 'react';
import LeftPanel from './LeftPanel';

function Notification(props: any) {
  return (
    <React.Fragment>
      <div className='container-fluid content-body vh-100'>
        <div className='row'>
          <LeftPanel props={props} />
          <div className='col-lg-9 col-xl-10 my-4'>
            <div className='row mt-5'>
              <div className='col-md-8 d-flex align-items-center '>
                <h2 className='cl-white mr-5'>Notifications User List</h2>
                <button
                  className='cl-btn cl-btn-tartiary'
                  onClick={() => {
                    props.history.push('/create-notification');
                  }}
                >
                  Create
                </button>
              </div>
              <div className='col-md-4 d-flex align-items-center justify-content-end'>
                <div className='input-group'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text'>
                      <i className='fas fa-search'></i>
                    </span>
                  </div>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Search Name'
                  ></input>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12'>
                <table className='table table-striped table-dark mt-5'>
                  <thead>
                    <tr>
                      <th scope='col'>Customer</th>
                      <th scope='col'>Layer Name</th>
                      <th scope='col'>Created By</th>
                      <th scope='col'>View</th>
                      <th scope='col'>Edit</th>
                      <th scope='col'>Delete</th>
                      <th scope='col'>Acl</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>starads</td>
                      <td>Test_layers</td>
                      <td>TrooQA</td>
                      <td className='table-icon-cell'>
                        <i className='fa fa-eye' aria-hidden='true'></i>
                      </td>
                      <td className='table-icon-cell'>
                        <i className='fa fa-file' aria-hidden='true'></i>
                      </td>
                      <td className='table-icon-cell'>
                        <i className='fa fa-trash' aria-hidden='true'></i>
                      </td>
                      <td className='table-icon-cell'>
                        <i className='fa fa-key' aria-hidden='true'></i>
                      </td>
                    </tr>
                    <tr>
                      <td>starads</td>
                      <td>Test_layers</td>
                      <td>TrooQA</td>
                      <td className='table-icon-cell'>
                        <i className='fa fa-eye' aria-hidden='true'></i>
                      </td>
                      <td className='table-icon-cell'>
                        <i className='fa fa-file' aria-hidden='true'></i>
                      </td>
                      <td className='table-icon-cell'>
                        <i className='fa fa-trash' aria-hidden='true'></i>
                      </td>
                      <td className='table-icon-cell'>
                        <i className='fa fa-key' aria-hidden='true'></i>
                      </td>
                    </tr>
                    <tr>
                      <td>starads</td>
                      <td>Test_layers</td>
                      <td>TrooQA</td>
                      <td className='table-icon-cell'>
                        <i className='fa fa-eye' aria-hidden='true'></i>
                      </td>
                      <td className='table-icon-cell'>
                        <i className='fa fa-file' aria-hidden='true'></i>
                      </td>
                      <td className='table-icon-cell'>
                        <i className='fa fa-trash' aria-hidden='true'></i>
                      </td>
                      <td className='table-icon-cell'>
                        <i className='fa fa-key' aria-hidden='true'></i>
                      </td>
                    </tr>
                    <tr>
                      <td>starads</td>
                      <td>Test_layers</td>
                      <td>TrooQA</td>
                      <td className='table-icon-cell'>
                        <i className='fa fa-eye' aria-hidden='true'></i>
                      </td>
                      <td className='table-icon-cell'>
                        <i className='fa fa-file' aria-hidden='true'></i>
                      </td>
                      <td className='table-icon-cell'>
                        <i className='fa fa-trash' aria-hidden='true'></i>
                      </td>
                      <td className='table-icon-cell'>
                        <i className='fa fa-key' aria-hidden='true'></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Notification;
