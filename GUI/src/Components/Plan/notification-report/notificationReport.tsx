import React, { useEffect, useState } from "react";
import { planService } from "../../../Service/plan.service";
import LeftPanel from "../LeftPanel";
import { toast } from "react-toastify";
import { useTypedSelector } from "../../../Reducers/RootReducer";


/**
 * This component is handling event notification creation and editing.
 * @component
 * @param {Object} props - The props passed to the component.
 * @param {Object} props.location - The location object provided by React Router containing the state data.
 * @param {Object} props.location.state - The state data passed from the previous location.
 * @param {Object} props.history - The history object provided by React Router for navigation.
 */


function NotificationReport(props: any) {
  const selectedCustomer = useTypedSelector(
    (state) => state.viewReducer.selectedCustomer
  );
  let logedInUser: any = localStorage.getItem("logedInUser");
  logedInUser = JSON.parse(logedInUser);
  const [selectedReport, setSelectedReport] = useState('');
  const [customer , setCustomer]= useState('');
const initialReportList = ['Engineering and Maintanance', 'Eng Condition', 'Flight Safety', 'Finance and Admin', 'Flight Operations', 'MOQA', 'FOQA', 'OOOI'];
const mapReportToCode = (reportName: string) => {
  switch (reportName) {
    case 'Eng Condition':
      return 'EOFSR_ENGI_COND_MONI';
    case 'Flight Operations':
      return 'EOFSR_FLIG_OPER';
    case 'Engineering and Maintanance':
      return 'eofsr_em';
    case 'Flight Safety':
      return 'EOFSR_FLIG_SAFE';
    case 'Finance and Admin':
      return 'EOFSR_FINA_ADMI';
    case 'MOQA':
      return 'EOFSR_MOQA';
    case 'FOQA':
      return 'EOFSR_FOQA';
    case 'OOOI':
      return 'OOOI';
    default:
      return '';
  }
};

  const [loader, setLoader] = useState(false);
  const [selectedCustomerDataExist, setSelectedCustomerDataExist]= useState(false);
  const { state } = props.location;
  const [checkboxNotificationList, setCheckboxNotificationList] = useState([]);
  
  const getReportNoificationList = async () => {
    try {
      if (!selectedCustomer || !selectedReport) {
        return;
      }
      const report = mapReportToCode(selectedReport);
      const response = await planService.getReportNotification(selectedCustomer.id, report);
      if (response.status === 200) {
        const data = response.data;
        setSelectedCustomerDataExist(data.notificationIds && data.notificationIds.length > 0);
        const checkListArr: any = checkboxNotificationList.map((item: any) => {
          item.isChecked = data.notificationIds.includes(String(item.id));
          console.log('Is checked' , item.isChecked);
          return item;
        });
        
          setCheckboxNotificationList(checkListArr);
        
      }
    } catch (error: any) {
      setSelectedCustomerDataExist(false)
     
      console.error(error);
    }
  };

  useEffect(() => {
    onInit();
  }, [selectedCustomer, selectedReport]);



  const onInit = async () => {
    setLoader(true);    
    await getNoificationList();
    await getReportNoificationList();
    setLoader(false);

  };




 

  const getNoificationList = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let userData = await planService.getNotificationList();
        if (userData.status == "200") {
          let checkListArr = userData.data.results;
          checkListArr = checkListArr.map((item: any, index: any) => {
            item["isChecked"] = false;
            return item;
          });
          if (state && state.data) {
            if (state.data.notifications.length > 0) {
              state.data.notifications.forEach((user: any) => {
                let index = checkListArr.findIndex(
                  (item: any) => item.id === user.id
                );
                if (index > -1) {
                  checkListArr[index].isChecked = true;
                }
              });
            }
          }
          setCheckboxNotificationList(checkListArr);
          resolve(true);
        }
      } catch (error: any) {
        resolve(true);
        toast.error(error.msg);
        console.error(error);
      }
    });
  };


const handleDropdownChange = (event:any) => {
  setSelectedReport(event.target.value);
};
 

  
  const handleNotificationListCheckboxChange = (id: any) => {
    const newCheckboxes: any = [...checkboxNotificationList];
    let index = newCheckboxes.findIndex((item: any) => item.id == id);
    newCheckboxes[index].isChecked = newCheckboxes[index].isChecked
      ? false
      : true;
    setCheckboxNotificationList(newCheckboxes);
  };

  const handleSubmit = () => {
    if (!selectedReport) {
      // Handle case where no report is selected
      toast.error('Please Enter necesaary fields')
      return;
    }
    
    const report = mapReportToCode(selectedReport);    

    let notification_List = checkboxNotificationList.filter(
      (item: any) => item.isChecked == true
    );

    let requestParams = {
      
      customerName: selectedCustomer ? selectedCustomer.name : "",
      customerId:selectedCustomer?selectedCustomer.id:0,
      notifications: notification_List,
      createdBy: logedInUser.results.username,
      report:report
      
    };
    console.log('Request for report notification',requestParams);
    
    createReportNotification(requestParams);
  };

  const handleUpdateSubmit=()=>{
    if (!selectedReport) {
      // Handle case where no report is selected
      toast.error('Please Enter necesaary fields')
      return;
    }
    
    const report = mapReportToCode(selectedReport);    

    let notification_List = checkboxNotificationList.filter(
      (item: any) => item.isChecked == true
    );

    let requestParams = {
      
      customerName: selectedCustomer ? selectedCustomer.name : "",
      customerId:selectedCustomer?selectedCustomer.id:0,
      notifications: notification_List,
      createdBy: logedInUser.results.username,
      report:report
  }
  //Function to handle update
  updateReportNotification(requestParams ,report, selectedCustomer.id);
}

  const GET_CREATE_UPDATE_BUTTON = () => {
    if (!selectedCustomerDataExist) {
      return (
        <button
          type="button"
          className="cl-btn cl-btn-primary white-btn mr-3"
          onClick={handleSubmit}
        >
          Create
        </button>
      );
    } else {
      return (
        <button
          type="button"
          className="cl-btn cl-btn-primary white-btn mr-3"
          onClick={handleUpdateSubmit}
        >
          Update
        </button>
      );
    }
  };

  

  const createReportNotification = async (request: any) => {
    setLoader(true);
    try {
      let data = await planService.createReportNotification(request)
      setLoader(false);
      if (data.status === 200) {
        toast('Report Notification Added Succesfully');
      }
      
    } catch (err: any) {
      setLoader(false);
      toast(err.msg);
    }
  };

  const updateReportNotification=async(reportData:any ,reportName:any, selectedCustomerId:any)=>{
     setLoader(true);
     try{
      let data = await planService.updateReportNotification(reportData, reportName,selectedCustomerId)
      setLoader(false);
      if (data.status === 200) {
        toast('Report Notification Updated Succesfully');
      }
     }catch(err:any){
      setLoader(false);
      toast(err.msg);
     }
  }

  return (
    <React.Fragment>
      <div className="loading" style={{ display: loader ? "block" : "none" }}>
        <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" />
      </div>
      <div className="container-fluid content-body vh-100">
        <div className="row">
          <LeftPanel props={props} />
          <div className="col-lg-9 col-xl-10 mt-4">
            
            <div className="cl-white text-left mt-4 mb-3">
              <h3>Add/Update Report Notification</h3>
            </div>
            <table className="table table-striped table-bordered table-dark custom-dark-table">
              <tbody>
                <tr>
                  <td className="small-shell">
                    <h3 className="edit-heading">Customer</h3>
                  </td>
                  <td colSpan={3}>{selectedCustomer?.name}</td>
                </tr>
          
                <tr>
                  <td className="small-shell">
                    <h3 className="edit-heading">Report Lists</h3>
                  </td>
                  <td>
                     <div className="scrollableArea">        
                            <select
            className="form-group form-check m-0 d-flex align-items-center justify-content-between"
            value={selectedReport}
            onChange={handleDropdownChange}
          >
            <option value="">Select a report</option>
            {initialReportList.map((report, index) => (
              <option key={index} value={report}>
                {report}
              </option>
            ))}
          </select>
                    </div>
                   </td>
                  <td className="small-shell">
                    <h3 className="edit-heading">Notification Lists</h3>
                  </td>
                  <td>
                    <div className="scrollableArea">
                      {checkboxNotificationList.map((item: any, index: any) => {
                        return (
                          <div className="check-items-block selection-list">
                            <div className="form-group form-check m-0 d-flex align-items-center justify-content-between">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id={item.id}
                                checked={item.isChecked}
                                onChange={() =>
                                  handleNotificationListCheckboxChange(item.id)
                                }
                               
                              ></input>
                              <label
                                className="form-check-label ml-3"
                                htmlFor="exampleCheck1"
                              >
                                {item.name}
                              </label>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                   </td>
                </tr> 
              </tbody>
            </table>

            
              <div className="d-flex align-items-center justify-content-end mt-3 mr-3">
                <GET_CREATE_UPDATE_BUTTON></GET_CREATE_UPDATE_BUTTON>
                <button
                  type="button"
                  className="cl-btn cl-btn-secondary white-btn"
                >
                  Cancel
                </button>
              </div>
            
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default NotificationReport;
