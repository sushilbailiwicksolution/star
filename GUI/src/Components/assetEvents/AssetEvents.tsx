
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from 'react-dropzone';
import axios from "axios";
import DatePicker from "react-datepicker";
import { viewService } from "../../Service/view.service";
import { assetService } from "../../Service/asset.service";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTypedSelector } from "../../Reducers/RootReducer";
import { customerService } from "../../Service/customer.service";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

/**
 * This component is handling Events on the dropdown with track.
 * @component
 */

const AssetEvents = () => {
  const selectedCustomer = useTypedSelector(state => state.viewReducer.selectedCustomer); // Access the selectedCustomer from the Redux store
  
  const [loader, setLoader] = useState(false);
  
  const [eventTypeData, setEventTypeData] = useState([]);
  const [assetList, setAssetsList] = useState<any>([]);
  const [selectedAircraftArrayData, setSelectedAircraftArrayData] = useState(
    ''
  );
  
  const [selectedEventTypeData, setSelectedEventTypeData] = useState("1");
  const [selectedEventsArrayData, setSelectedEventsArrayData] = useState([]);
  const [selectedAssetType, setSelectedAssetData] = useState("1");
  const [showFilter, setShowFilter] = useState(true);
  const [name, setName] = useState('');

  const [file, setFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(""); 
  const fileInputRef = useRef<HTMLInputElement | null>(null); 
  const [isButtonHighlighted, setIsButtonHighlighted] = useState(false);
  //Using react-dropzone
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  const [eventsData, setEventData] = useState<any>([]);
  //Conditional showing events button 
  const [isEventDataAvailable, setIsEventDataAvailable] = useState(false);

  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedCustomerDropDown, setSelectedCustomerDropDown]= useState<any>();
  let   [loggedUserCustomer, setloggedUserCustomer]=useState("");

  const changeCustomer = (val: any) => {
    setSelectedAssetData(val);
  };

  const changeEventType = (val: any) => {
    setSelectedEventTypeData(val);
  };

  
  type AcceptedFileTypes = "xlsx" | "xls";
    
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file:any = acceptedFiles[0];

      // Get the file extension and convert it to lowercase
  const fileExtension = file.name.split('.').pop()?.toLowerCase() as AcceptedFileTypes;

  // Validate the file type here
  const validFileTypes: AcceptedFileTypes[] = ["xlsx", "xls"];

  if (!validFileTypes.includes(fileExtension)) {
    // Handle invalid file type
    toast.error("Invalid file type. Please upload a .xlsx or .xls file.");
    return;
  }
      setFile(file);
      setSelectedFile(file ? file.name : "");
    },
  });

  useEffect(() => {
    
    onInit();
    setSelectedAircraftArrayData('');
    setEventData([])
  }, [selectedCustomer]);

  useEffect(()=>{},[selectedAssetType])

  useEffect(()=>{
    setLoader(true)
    if(selectedAircraftArrayData){
      getEventData();
    }
    else{
      setEventData([])
    }
    setLoader(false)
  },[selectedAircraftArrayData])

  //Selected customer Change
  useEffect(()=>{
    const getCustomers = async () => {
      const response = await customerService.getCustomersList();
      setCustomers(response.data.results);
    };
    getCustomers();
  })
  const onInit = async () => {
    setLoader(true);
    await getEventTypes();
    await getAssetsList();
    setLoader(false);
  };

  let logedInUser: any = localStorage.getItem('logedInUser');
logedInUser = JSON.parse(logedInUser);  
const accountType=logedInUser.results.accountType;
const customerId = logedInUser.results.customerId;

// const customerLogged="CUSTOMER"?loggedUserCustomer="TEST":selectedCustomer;


const loggedData=logedInUser.results;


  const getAssetsList = () => {
    return new Promise(async (resolve, reject) => {

      try {
        if(accountType==="CUSTOMER"){
          const customer_response = await customerService.getCustomerByUserId(loggedData?.id);
          // console.log('customer response', customer_response.data.results);
          setloggedUserCustomer(customer_response.data.results.name)
          let response = await assetService.getCustomerAssets(customer_response.data.results.id);
          setLoader(false);
          if (response.status === 200) {
            console.log(response.data.results);
            setAssetsList(response.data.results);
          }
        }
        else if (accountType === "USER") {
          let response = await assetService.getUserAssets(loggedData?.customerId);
          const customer_response = await customerService.getCustomerById(loggedData?.customerId);
          console.log('user c', customer_response);
          
          setloggedUserCustomer(customer_response.data.results.name)
          setLoader(false);
          if (response.status === 200) {
            console.log(response.data.results);
            setAssetsList(response.data.results);
          }
        }
        else if(accountType==="SERVICE" && customerId !==0){
          let response = await assetService.getUserAssets(customerId);
          setLoader(false);
          if (response.status === 200) {
            console.log(response.data.results);
            setAssetsList(response.data.results);
            
          }
        }
        else if(accountType==="SERVICE" && customerId===0){
          let userData;
          if(selectedCustomer){
            userData= await assetService.getCustomerAssets(selectedCustomer.id);
            setLoader(false);
          }
          else{
           
              userData=null;
            
          }
          
          if (userData.status == '200') {
          const checkListArr = userData.data.results;
          
          setAssetsList(checkListArr);

        } else {
          setAssetsList([]);
        }
        console.log("Asset List in AssetEvents.tsx:", assetList);
        resolve(true);
      }
      } catch (error: any) {
        resolve(true);
        console.error(error);
      }

    });
  };

  const getEventTypes = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data: any = await viewService.getEventTypes();
        setEventTypeData(data);
        resolve(true);
      } catch (error) {
        setEventTypeData([]);
        resolve(true);
      }
    });
  };

  const onChangeEventTypeCheckbox = (event: any, data: any) => {
    const checked = event.target.checked;
    const value = data.eid;
    if (checked) {
      const eventTypeDataArr: any = [...selectedEventsArrayData];
      eventTypeDataArr.push(value);
      setSelectedEventsArrayData(eventTypeDataArr);
    } else {
      const eventTypeDataArr: any = [...selectedEventsArrayData];
      const filterArr = eventTypeDataArr.filter((item: any) => item !== value);
      setSelectedEventsArrayData(filterArr);
    }

    let dataArr: any = [...eventTypeData];
    dataArr = dataArr.map((item: any) => {
      if (item.id === data.id) {
        item.checked = checked;
      }
      return item;
    });
    setEventTypeData(dataArr);
  };

  // const onChangeAircraftCheckbox = (event: any, data: any) => {
  //   const checked = event.target.checked;
  //   const value = data.name;
  //   if (checked) {
  //     const aircraftDataArr: any = [...selectedAircraftArrayData];
  //     console.log('aircraft list',aircraftDataArr);
      
  //     aircraftDataArr.push(value);
  //     setSelectedAircraftArrayData(aircraftDataArr);
  //   } else {
  //     const aircraftDataArr: any = [...selectedAircraftArrayData];
  //     const filterArr = aircraftDataArr.filter((item: any) => item !== value);
  //     setSelectedAircraftArrayData(filterArr);
  //   }

  //   let dataArr: any = [...assetList];
  //   dataArr = dataArr.map((item: any) => {
  //     if (item.name === data.name) {
  //       item.checked = checked;
  //     }
  //     return item;
  //   });
    
  //   setAssetsList(dataArr);
  // };

  const getEventData = async () => {
    const payLoad =  selectedAircraftArrayData;
    try {
      setLoader(true);
      const data = await viewService.getEventListForFlight(payLoad);
      console.log("data", data);
      setEventData(data);
      setIsEventDataAvailable(data.length > 0);
      setLoader(false);
    } catch (error) {
      setEventData([]);
      setIsEventDataAvailable(false);
      setLoader(false);
    }
  };

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleFileUpload = (event:any) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    setSelectedFileName(uploadedFile ? uploadedFile.name : ""); 
    setIsButtonHighlighted(uploadedFile !== null);
  };




const handleCustomerChange = async (event:any) => {
 
  const response = await customerService.getCustomerById(event.target.value);
  
  var customerDetails =response.data.results
  // console.log('customer selected name', customerDetails.name);
  
  setSelectedCustomerDropDown(customerDetails)
  //Handle dropdown click 

  setloggedUserCustomer(customerDetails.name)
};

useEffect(()=>{
 handleDropdownChange()
},[selectedCustomerDropDown])

const handleDropdownChange = async()=>{
  if(selectedCustomerDropDown){
    const response = await assetService.getCustomerAssets(selectedCustomerDropDown.id);
    // console.log('ye', response.data.results);
    setAssetsList(response.data.results)
  }
}


  const handleUpload = async () => {
    try {
     updateDatabaseWithSelectedEvents();
     if (file) {
        const formData = new FormData();
        formData.append("file", file);
        // await axios.post("upload-url", formData);
        const response= await axios.post(`https://star-ads-app.com:3378/asset/events/upload/${selectedAircraftArrayData}`, formData);
        console.log('server resp', response);
        if(response){
         toast.success(response.data)
        }
      } else {
        // toast.error();
        if(selectedEventsArrayData.length > 0){
          // toast.success("Events Update Succesfull")
        }
        else{
          toast.error("No Selected events or file")
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleClickBrowse = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const buttonClasses = isButtonHighlighted
    ? "btn btn-secondary selected-button"
    : "btn btn-primary";
    

    //Function to download events when its available in database as excel sheet 
    const handleDownloadEvents = async () => {
      try {
        const response = await axios.get('https://star-ads-app.com:3378/download-events', {
          params: {
            assetId: selectedAircraftArrayData, // Pass the selected asset ID as a parameter
          },
          responseType: 'blob', // Set the response type to 'blob' to handle binary data
        });
    
        // Create a Blob from the response data
        const blob = new Blob([response.data], { type: 'application/octet-stream' });
    
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
          .toString()
          .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
        const fileName = `events_${selectedAircraftArrayData}_${formattedDate}.xlsx`;
    
        // Create a URL for the Blob
        const url = window.URL.createObjectURL(blob);
    
        // Create a temporary link element and trigger the download
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
    
        // Clean up by revoking the URL
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error downloading Excel file:', error);
        toast.error('Error downloading Excel file.');
      }
    };
    
//When User is trying to update existing data by selecting from event list from dropdown this function is called 
const updateDatabaseWithSelectedEvents = async () => {
  try {
    if (selectedEventsArrayData.length > 0) {
      const payload = {
        assetId: selectedAircraftArrayData,
        selectedEvents: selectedEventsArrayData,
      };

      console.log('Selected Events By User',payload);
      

      // Make an API call to update the database
      const response = await axios.post(
        'https://star-ads-app.com:3378/update-events',
        payload
      );

      if (response.status === 200) {
        toast.success('Database updated successfully.');
        // You can also reset the selected events array here if needed.
        setSelectedEventsArrayData([]);
      } else {
        toast.error('Failed to update the database.');
      }
    } else {
      // toast.error('No events selected to update.');
    }
  } catch (error) {
    console.error('Error updating database:', error);
    toast.error('Error updating the database.');
  }
};


// console.log('selected', loggedUserCustomer);


  const EventTable = () => {
    return (
      <div className="col-md-12 my-4 report-list">
        <div className="row mt-5 d-flex justify-content-center">
          <div className="col-md-11">
            <div className="row">
              <div className="col-md-8 d-flex align-items-center">
                <h2 className="cl-white mr-5">Events For Asset </h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="colored-heading">
                  <h3 className="cl-white text-left m-0 p-4">
                    {" "}
                    {showFilter ? (
                      <span
                        onClick={() => {
                          setShowFilter(false);
                        }}
                      >
                        <ArrowDropUpIcon />
                      </span>
                    ) : (
                      <span
                        onClick={() => {
                          setShowFilter(true);
                        }}
                      >
                        <ArrowDropDownIcon />
                      </span>
                    )}
                  </h3>
                </div>
                {showFilter ? (
                  <div className="light-card-bg p-4">
                    <div className="row m-2 cl-white text-left event-style">
                    {logedInUser.results.accountType === "SERVICE" && logedInUser.results.customerId===0 && !selectedCustomer &&(
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
                    <div className="row">
                      <div className="col-md-6">
                        <div className="row mb-2">
                          <div className="col-md-2 d-flex justify-content-between">
                            <p className="m-0 cl-white text-left">Customer :</p>
                            <span className="cl-white"></span>
                          </div>
                          <div className="col-md-4">
                            <p className="m-2 cl-white text-left event-style">
                             {selectedCustomer?selectedCustomer?.name:loggedUserCustomer}
                             {/* {customerLogged} */}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                    


      

      <div className="col-md-6">
  <div className="row mb-2">
    <div className="col-md-2 d-flex justify-content-between">
      <p className="m-0 cl-white text-left">Aircraft :</p>
      <span className="cl-white"></span>
    </div>
    <div className="col-md-8">
      <p className="m-0 cl-white text-left event-style">
        <div className="select-dropdown">
          <select
            className="form-control"
            onChange={(e: any) => {
              setSelectedAircraftArrayData(e.target.value); // Update the selected aircraft directly
            }}
            value={selectedAircraftArrayData} // Use the selected aircraft value directly
          >
            <option value={""}>{"Select an Aircraft"}</option>
            {assetList.map((item: any) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </p>
    </div>
  </div>
</div>

    </div>



                    <div className="row">
                    <div className="col-md-6">
        <div className="row mb-2">
          <div className="col-md-2 d-flex justify-content-between">
            <p className="m-0 cl-white text-left">Event File :</p>
            
            <span className="cl-white"></span>
          </div>

          <div className="row-mb-4">
  <div {...getRootProps()} className="dropzone-container" style={{borderRadius:"5px"}}>
    <input {...getInputProps()} onClick={handleFileUpload} />
    <p className="text-center">
      {selectedFile ? (
        <span className="animated-text">{selectedFile}</span>
      ) : (
       <span className="animated-text"> Click to select a file </span>
      )} <i className="fas fa-file-excel fa-bounce fa-lg"></i>
    </p>
  </div>
  </div>
        </div>
      </div>

     
                    

                    </div>
                    <div className="row">
                    <div className="col-md-6">
  <div className="row mb-2">
    <div className="col-md-3 d-flex justify-content-between">
      <p className="m-0 cl-white text-left">
        Events List:
      </p>
      <span className="cl-white"></span>
    </div>
    
  </div>  
{eventsData.length > 0 ? (
    <div className="row mb-2">
      <div className="col-md-3 d-flex justify-content-between"></div>
      <div className="col-md-8">
        <p className="m-0 cl-white text-left event-style">
          <div className="mutilselect-items" style={{borderRadius:"10px"}}>
            <div>
              <ul>
                {eventsData.map((item: any, i: any) => {
                  return (
                    <li key={i}>
                      <div className="checkbox-item">
                        <input
                          type="checkbox"
                          name={item.ename}
                          value={item.asset}
                          checked={item.checked}
                          onChange={(e) =>
                            onChangeEventTypeCheckbox(e, item)
                          }
                        />
                        {item.ename}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </p>
        {isEventDataAvailable && (
  <div className="row">
    <div className="col-md-12 mb-3">
      <div className="button-block d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-primary pl-5 pr-5"
          onClick={handleDownloadEvents}
        >
          Download Events
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  ) : (
    <div className="row mb-2">
      <div className="col-md-3 d-flex justify-content-between"></div>
      <div className="col-md-8">
        <p className="m-0 cl-white text-left event-style">
          <div className="mutilselect-items" style={{borderRadius:"20px", height:"50px" , display:"flex", justifyContent:"center", alignItems:"center"}}>
            <div>
              <ul>
                <li className="animated-text">No Data Available</li>
              </ul>
            </div>
          </div>
        </p>
      </div>
    </div>
  )}
</div>

                    </div>
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <div className="button-block d-flex justify-content-center">
                          {/* <button
                            type="button"
                            className="btn btn-primary pl-5 pr-5"
                            onClick={getEventData}
                          >
                            Create
                          </button> */}

<button
  type="button"
  className="btn btn-primary pl-5 pr-5"
  onClick={handleUpload}
>
{selectedEventsArrayData.length > 0 ? "Update" : "Create"}
</button>

                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="container-fluid content-body vh-100">
        <div className="loading" style={{ display: loader ? "block" : "none" }}>
          <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" />
        </div>
        <div className="row">{EventTable()}</div>
      </div>
    </React.Fragment>
  );
};


export default AssetEvents;
