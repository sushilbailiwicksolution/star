import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { assetService } from '../../Service/asset.service';
import LeftPanel from './LeftPanel';
import { customerService } from '../../Service/customer.service';
import { useTypedSelector } from '../../Reducers/RootReducer';

function Assets(props: any) {

  const selectedCustomerFromIcon = useTypedSelector(state => state.viewReducer.selectedCustomer); // Access the selectedCustomer from the Redux store


  console.log(selectedCustomerFromIcon?.id, 'from icon');

  const [loader, setLoader] = useState(true);
const [assetList, setAssetList] = useState([]);
const [loggedInUser, setLoggedInUser] = useState('');
// const [accountType, setAccountType] = useState('');
const [selectedCustomer, setSelectedCustomer]= useState<any>()
const [customers, setCustomers] = useState<any[]>([]);

let logedInUser: any = localStorage.getItem('logedInUser');
logedInUser = JSON.parse(logedInUser);  
const accountType=logedInUser.results.accountType;
const customerId=logedInUser.results.customerId;
const loggedData=logedInUser.results;
useEffect(() => {
  const getCustomers = async () => {
    const response = await customerService.getCustomersList();
    setCustomers(response.data.results);
  };
  getCustomers();
  setLoggedInUser(logedInUser.results.username);
  getAssetsList();
}, [selectedCustomer, selectedCustomerFromIcon]);

const getAssetsList = async () => {
  console.log(loggedData);
  try {
    if (accountType === "CUSTOMER") {
      const customer_response = await customerService.getCustomerByUserId(loggedData?.id);
      let response = await assetService.getCustomerAssets(customer_response.data.results.id);
      setLoader(false);
      if (response.status === 200) {
        console.log(response.data.results);
        setAssetList(response.data.results);
      }
    } else if (accountType === "USER") {
      let response = await assetService.getUserAssets(loggedData?.customerId);
      setLoader(false);
      if (response.status === 200) {
        console.log(response.data.results);
        setAssetList(response.data.results);
      }
    }
    else if (accountType==="SERVICE" && customerId !==0){
      let response = await assetService.getUserAssets(customerId);
      setLoader(false);
      if (response.status === 200) {
        console.log(response.data.results);
        setAssetList(response.data.results);
      }
    }
    
    else if (accountType==="SERVICE" && customerId===0){
      //Get selected customer in here then show list of asset based on selected customer 
      //  console.log(selectedCustomer);
      if(selectedCustomerFromIcon){
        let response = await assetService.getCustomerAssets(selectedCustomerFromIcon.id);
        if (response.status === 200) {
          console.log(response.data.results);
          setAssetList(response.data.results);
        }
      
      }
       
      if(selectedCustomer.id){
        let response = await assetService.getCustomerAssets(selectedCustomer.id);
        setLoader(false);
        if (response.status === 200) {
          console.log(response.data.results);
          setAssetList(response.data.results);
        }
      }
      else{
        let response = await assetService.getAssetsList();
        setLoader(false);
        if (response.status === 200) {
          console.log(response.data.results);
          setAssetList(response.data.results);
        }
      }
    } 
    
    else {
      let response = await assetService.getAssetsList();
      setLoader(false);
      if (response.status === 200) {
        console.log(response.data.results);
        setAssetList(response.data.results);
      }
    }
  } catch (error: any) {
    setLoader(false);
    toast.error(error.msg);
  }
};

//Handle dropdown click 
const handleCustomerChange = async (event:any) => {
  console.log(event.target.value);
  const response = await customerService.getCustomerById(event.target.value);
  console.log(response.data.results);
  var customerDetails =response.data.results

  setSelectedCustomer(customerDetails)

};

  const deleteAsset = async (item: any) => {
    setLoader(true);
    try {
      let response = await assetService.deleteAsset(item.id);
      setAssetList(assetList.filter((event: any) => event.id !== item.id));
      setLoader(false);
      toast.success(response.msg);
    } catch (error: any) {
      setLoader(false);
      toast.error(error.msg);
    }
  };

  return (
    <React.Fragment>
      <div className='loading' style={{ display: loader ? 'block' : 'none' }}>
        <img src='https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif' />
      </div>
      <div className='container-fluid content-body vh-100'>
        <div className='row h-100vh-80px'>
          <LeftPanel props={props} />
          <div className='col-lg-9 col-xl-10 my-4'>
            <div className='row mt-5'>
              <div className='col-md-8 d-flex align-items-center '>
                <h2 className='cl-white mr-5'>Assets</h2>
                { accountType !=="USER" &&( 
                <button
                  className='cl-btn cl-btn-tartiary'
                  onClick={() => {
                    props.history.push('/create-asset');
                  }}
                >
                  Create
                </button>
                )}
              </div>
              <div className='col-md-4 d-flex align-items-center justify-content-end'>
                
                {logedInUser.results.accountType === "SERVICE" && logedInUser.results.customerId===0 && (
      <tr>
      <select onChange={handleCustomerChange}>
        <option value="">Select a customer</option>
        {customers.map((customer:any) => (
          <option key={customer.id} value={customer.id}>
            {customer.name}
          </option>
        ))}
      </select>
      </tr>
    )}
                
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12'>
                <table className='table table-striped table-dark mt-5'>
                  <thead>
                    <tr>
                      <th scope='col'>Asset Id</th>
                      <th scope='col'>Name</th>
                      <th scope='col'>Customer</th>
                      <th scope='col'>Description</th>
                      <th scope='col'>View</th>
                      <th scope='col'>Edit</th>
                      <th scope='col'>Delete</th>
                      {/* <th scope='col'>Acl</th> */}
                    </tr>
                  </thead>
                  <tbody>
                     {assetList?.map((item: any, index: any) => {
                      return (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{loggedInUser}</td>
                          <td>{item.description}</td>
                          <td className='table-icon-cell'>
                            <i
                              className='fa fa-eye cursor-pointer'
                              aria-hidden='true'
                              onClick={() => {
                                props.history.push({
                                  pathname: '/create-asset',
                                  state: { isEdit: false, data: item }, // your data array of objects
                                });
                              }}
                            ></i>
                          </td>
                          <td className='table-icon-cell'>
                            <i
                              className='fa fa-file cursor-pointer'
                              aria-hidden='true'
                              onClick={() => {
                                props.history.push({
                                  pathname: '/create-asset',
                                  state: { isEdit: true, data: item }, // your data array of objects
                                });
                              }}
                            ></i>
                          </td>
                          <td className='table-icon-cell'>
                            <i
                              className='fa fa-trash cursor-pointer'
                              aria-hidden='true'
                              onClick={() => deleteAsset(item)}
                            ></i>
                          </td>
                        </tr>
                      );
                    })}
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

export default Assets;
