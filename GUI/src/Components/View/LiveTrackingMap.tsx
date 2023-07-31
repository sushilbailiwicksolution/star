/* eslint-disable jsx-a11y/anchor-is-valid */
import moment from "moment";
import React, {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ViewsConstants } from "../../Constants/constants";
import { getAirCraft, getAirCraftDetails } from "../../Service";
import { assetService } from "../../Service/asset.service";
import Events from "./events-tab";
import DataLayers from "./dataLayer-tab";
import "./view.css";
import ContextMenu from "./ContextMenu";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ModeStandbyIcon from "@mui/icons-material/ModeStandby";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import PermDeviceInformationIcon from "@mui/icons-material/PermDeviceInformation";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { AirCraftDetailInterval } from "../../Config/siteConfig";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";
import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { fixDecimalService } from "../../Service/fixDecimal.service";
import { useTypedSelector } from "../../Reducers/RootReducer";
import { customerService } from "../../Service/customer.service";

const ITEM_HEIGHT = 48;

const defaultFilter = {
  filter: null,
};

const defaultSort = {
  sort: null,
};


/**
 * This component is handling map section inside track tab.
 * @component
 * @param {Object} props - The props object passed to the component.
 * @param {Function} props.parentContainerClicked - The function to handle parent container click event.
 * @param {Object} ref - The ref object used to handle component's imperative functions.
 * @example
 * const LiveTrackingMap = forwardRef((props, ref) => {
 *   // Component logic here
 * });
 */

/**
 * @callback refreshCallback
 * @description Callback function for refreshing the component data.
 */

/**
 * @callback onClickAlarmCallback
 * @description Callback function for handling alarm click event.
 */

/**
 * @callback toggleHideCallback
 * @description Callback function for toggling the context menu visibility.
 */

/**
 * @typedef {Object} AssetData
 * @property {string} id - The unique ID of the asset.
 * @property {string} name - The name of the asset.
 * @property {string} aircraftid - The aircraft ID associated with the asset.
 * @property {string} current_status - The current status of the asset.
 * @property {number} gps_lat - The latitude of the asset's location.
 * @property {number} gps_long - The longitude of the asset's location.
 * @property {string} location - The textual representation of the asset's location.
 */

/**
 * @typedef {Object} FuelDetails
 * @property {number} fuel - The fuel level of the asset.
 * @property {number} airSpeed - The airspeed of the asset.
 * @property {number} groundSpeed - The ground speed of the asset.
 * @property {number} altitude - The altitude of the asset.
 */

/**
 * @typedef {Object} SelectedEventInfo
 * @property {string|null} selectedEvent - The currently selected event name.
 * @property {number|null} selectedEventIndex - The index of the selected event in the events list.
 */

/**
 * @typedef {Object} FilterData
 * @property {string|null} filter - The filter value used for data filtering.
 */

/**
 * @typedef {Object} SortData
 * @property {string|null} sort - The sorting value used for data sorting.
 */

/**
 * @typedef {Object} Coordinate
 * @property {number} x - The x-coordinate.
 * @property {number} y - The y-coordinate.
 */

/**
 * @typedef {Object} LiveTrackingMapProps
 * @property {Function} parentContainerClicked - The function to handle parent container click event.
 */

/**
 * @typedef {Object} LiveTrackingMapRef
 * @property {refreshCallback} refresh - Function to trigger component data refresh.
 * @property {onClickAlarmCallback} onClickAlarm - Function to handle alarm click event.
 * @property {toggleHideCallback} toggleHide - Function to toggle the context menu visibility.
 */

/**
 * This component is handling map section inside track tab.
 * @component
 * @param {LiveTrackingMapProps} props - The props object passed to the component.
 * @param {React.ForwardedRef<LiveTrackingMapRef>} ref - The ref object used to handle component's imperative functions.
 * @returns {JSX.Element} The JSX element representing the LiveTrackingMap component.
 */

const LiveTrackingMap = forwardRef((props: any, ref) => {
  const selectedCustomer = useTypedSelector(
    (state) => state.viewReducer.selectedCustomer
  );

  const { parentContainerClicked } = props;
  const [selectedTab, setSelectedTab] = useState(1);
  const [loader, setLoader] = useState(false);
  const [assetsList, setAssetsList] = useState([]);
  const [customerId, setCustomerId] = useState<any>();
  const [selectedAicraftId, changeSelectedAircraftId] = useState<any>("");
  const [selectedAircraftFlightId, changeSelectedAircraftFlightId] =
    useState<any>("");
  const [selectedAsset, setSelectedAsset] = useState(-1);
  const [selectedAssetData, setSelectedAssetData] = useState<any>(null);
  const [intervalState, setIntervalState] = useState<any>();
  const [assetTogglebtn, setAssetTogglebtn] = useState(false);
  const [toggleContextMenu, setToggleContextMenu] = useState(false);
  const [toggleContextMenuEvent, setToggleContextMenuEvent] = useState(0);
  const [itemId, setItemId] = useState<any>(null);
  const [urlParamVal, setUrlParams] = useState("");
  const [itemPosition, setItemPosition] = useState({ x: 0, y: 0 });
  const [filterData, setFilterData] = useState<any>(defaultFilter);
  const [sortData, setSortData] = useState<any>(defaultSort);
  const [filterAnchorEl, setFilterAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [sortAnchorEl, setSortAnchorEl] = React.useState<null | HTMLElement>(
    null
  );

  const filterOpen = Boolean(filterAnchorEl);
  const sortOpen = Boolean(sortAnchorEl);

  const dispatch = useDispatch();

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };
  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setSortAnchorEl(event.currentTarget);
  };
  const handleSortClose = () => {
    setSortAnchorEl(null);
  };

  // When changing customer reset selected customer data
  useEffect(() => {
    clearInterval(intervalState);
    setSelectedAssetData([]);
    changeSelectedAircraftId("");
    changeSelectedAircraftFlightId("");
  }, [selectedCustomer]);

  useEffect(() => {
    return () => {
      if (intervalState) clearInterval(intervalState);
    };
  }, [intervalState]);

  useEffect(() => {
    setToggleContextMenu(false);
  }, [parentContainerClicked]);

  //loged in user based asset shown
  let logedInUser: any = localStorage.getItem("logedInUser");
  logedInUser = JSON.parse(logedInUser);
  const accountType = logedInUser.results.accountType;
  const loggedCustomerId = logedInUser.results.customerId;

  const fetchData = async () => {
    try {
      const response = await customerService.getCustomerByUserId(
        logedInUser.results.id
      );
      setCustomerId(response.data.results.id);
    } catch (error) {
      // Handle error here
      console.error("Failed to fetch customer data:", error);
    }
  };

  useEffect(() => {
    const onInit = async (params: string) => {
      setLoader(true);
      await getAssetsList(params);
      setLoader(false);
    };

    let params = "";
    if (filterData.filter && sortData.sort) {
      if (filterData.filter === "all") {
        params = `?sort=${sortData.sort}`;
      } else {
        params = `?filter=${filterData.filter}&&sort=${sortData.sort}`;
      }
    } else if (filterData.filter) {
      params = `?filter=${filterData.filter}`;
    } else if (sortData.sort) {
      params = `?sort=${sortData.sort}`;
    }

    // handling if a customer is selected from the customer icon
    if (accountType === "SERVICE" && loggedCustomerId !== 0) {
      params += `?customerId=${loggedCustomerId}`;
    }
    if (accountType === "SERVICE" && loggedCustomerId === 0) {
      if (selectedCustomer) {
        params += `?id=${selectedCustomer.id}`;
      } else {
        params += `?id=0`;
      }
    }

    if (accountType === "CUSTOMER") {
      fetchData();
      if (customerId) {
        params += `?id=${customerId}`;
      }
    }

    if (accountType === "USER") {
      params += `?customerId=${logedInUser.results.customerId}`;
    }

    setUrlParams(params);
    onInit(params);
  }, [filterData, sortData, selectedCustomer, customerId]);

  //Handle customer data

  const getAssetsList = (params: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        let userData = await assetService.getAssetsList(params);
        let checkListArr = [];
        if (userData.status == "200") {
          checkListArr = userData.data.results;
          const lastRefreshedTime = formatAMPM(new Date());
          dispatch({
            type: ViewsConstants.VIEW_ASSET_LIST,
            value: checkListArr,
          });
          dispatch({
            type: ViewsConstants.VIEW_LAST_REFRESHED_TIME,
            value: lastRefreshedTime,
          });
          setAssetsList(checkListArr);
          // if (checkListArr.length > 0) {
          //   changeSelectedAircraftId(checkListArr[0].name);
          // }
        } else {
          dispatch({
            type: ViewsConstants.VIEW_ASSET_LIST,
            value: [],
          });
          setAssetsList([]);
          changeSelectedAircraftId(undefined);
          changeSelectedAircraftFlightId(undefined);
        }
        setLoader(false);
        resolve(checkListArr);
      } catch (error: any) {
        setLoader(false);
        resolve([]);
        toast.error(error.msg);
        console.error(error);
      }
    });
  };

  const onRightClick = (e: any, id: any) => {
    const ele = document.getElementById("singleItem");
    let parentW = ele ? ele.offsetWidth : 0;
    e.preventDefault();

    let x = e.clientX,
      y = e.clientY;

    const conatinerEle = document.getElementById("liveTrackContainer");

    let innerWidth: any;

    if (conatinerEle) {
      innerWidth = conatinerEle.clientWidth;
    }

    let leftMarginOffset = (5 / 100) * parentW;

    if (innerWidth - e.clientX < 160 + leftMarginOffset) {
      x = innerWidth - (leftMarginOffset + 160);
    }

    if (window.innerHeight - e.clientY < 60) {
      y = window.innerHeight - 65;
    }

    var coordinate = { ...itemPosition };
    coordinate.x = x;
    coordinate.y = y - 70;

    setItemPosition(coordinate);
    setToggleContextMenu(true);
    setItemId(id);
  };

  const onContextMenuClick = (name: string) => {
    switch (name) {
      case "Move to Asset":
        const moveObj = {
          lat: itemId.gps_lat,
          long: itemId.gps_long,
        };
        dispatch({
          type: ViewsConstants.VIEW_MOVE_TO_ASSET,
          value: { ...moveObj },
        });
        return setToggleContextMenu(false);
      case "Zoom to Asset":
        const zoomObj = {
          lat: itemId.gps_lat,
          long: itemId.gps_long,
        };
        dispatch({
          type: ViewsConstants.VIEW_ZOOM_TO_ASSET,
          value: { ...zoomObj },
        });
        return setToggleContextMenu(false);
      case "Asset Events":
        setSelectedTab(2);
        return setToggleContextMenu(false);
    }
  };

  const changeTab = (tabId: number) => {
    if (selectedTab === tabId) return;
    setSelectedTab(tabId);
  };

  useEffect(() => {
    if (selectedAssetData) {
      setLoader(true);
      getFilghtDetails();
    }
  }, [selectedAssetData]);

  const getFilghtDetails = async () => {
    dispatch({
      type: ViewsConstants.START_TIMER,
      value: false,
    });
    dispatch({
      type: ViewsConstants.VIEW_SELECTED_ASSET,
      value: selectedAssetData.name,
    });
    const selectedEventvalue = {
      selectedEvent: null,
      selectedEventIndex: null,
    };
    dispatch({
      type: ViewsConstants.VIEW_SELECTED_EVENT,
      value: selectedEventvalue,
    });

    let toDate = new Date();
    const toDateFormat = moment(toDate).format("DD-MM-YYYY");
    let fromDate = getLastNMonthDate(toDate, -6);
    const fromDateFormat = moment(fromDate).format("DD-MM-YYYY");
    getAirCraftData(selectedAssetData.name, fromDateFormat, toDateFormat);
  };

  const onClickAsset = (item: any) => {
    setSelectedAsset(item.id);
    changeSelectedAircraftId(item.name);
    changeSelectedAircraftFlightId(item.aircraftid);
    setSelectedAssetData(item);
  };

  const getAirCraftData = async (
    assetName: any,
    fromDate: any,
    toDate: any
  ) => {
    // setLoader(true);
    try {
      const airCraftData = await getAirCraft(fromDate, toDate, assetName);
      const airCrafts = [] as any;
      for (let k in airCraftData) {
        airCrafts.push(airCraftData[k]);
      }
      if (airCrafts.length > 0) {
        getAirCraftDetailsData(airCrafts[airCrafts.length - 1].aircraftid);
      } else {
        setLoader(false);
      }
    } catch (e) {
      setLoader(false);
    }
  };

  const getAirCraftDetailsData = async (selectedFlight: any) => {
    getAirCraftDetailsAPI(selectedFlight);
    if (intervalState) {
      clearInterval(intervalState);
    }
    let count = 0;
    const interval = setInterval(async () => {
      const assetListData: any = await getAssetsList(urlParamVal);
      const selectedAssetItem = assetListData.find(
        (item: any) => item.name === selectedAssetData.name
      );
      if (
        selectedAssetItem &&
        selectedAssetItem.current_status != "ON-GROUND"
      ) {
        getAirCraftDetailsAPI(selectedFlight);
      }
      if (selectedAssetItem?.current_status == "ON-GROUND" && count == 0) {
        count = 1;
        getAirCraftDetailsAPI(selectedFlight);
      }
    }, AirCraftDetailInterval);
    setIntervalState(interval);
  };

  useImperativeHandle(ref, () => ({
    async refresh() {
      const assetListData: any = await getAssetsList(urlParamVal);
      if (selectedAssetData) {
        getFilghtDetails();
      }
    },
    async onClickAlarm() {
      changeTab(2);
    },
    async toggleHide() {
      setToggleContextMenu(false);
      setToggleContextMenuEvent((prev) => prev + 1);
    },
  }));

  const getAirCraftDetailsAPI = async (selectedFlight: any) => {
    try {
      const airCraftDetails = await getAirCraftDetails(selectedFlight);
      let airCrafts = [] as any;
      const fuelDetails = {
        fuel: 0,
        airSpeed: 0,
        groundSpeed: 0,
        altitude: 0,
      };

      let eventName = "";
      let startTimer = false;

      if (airCraftDetails.flightData) {
        airCrafts = airCraftDetails.flightData;
        startTimer = true;
      } else {
        if (intervalState) {
          clearInterval(intervalState);
        }
        airCrafts = [];
      }

      dispatch({
        type: ViewsConstants.FLIGHT_LIST_DATA,
        value: airCrafts,
      });

      if (airCraftDetails.data) {
        fuelDetails.fuel = airCraftDetails.data.fuel
          ? airCraftDetails.data.fuel
          : 0;
        fuelDetails.airSpeed = airCraftDetails.data.air_speed
          ? airCraftDetails.data.air_speed
          : 0;
        fuelDetails.groundSpeed = airCraftDetails.data.ground_speed
          ? airCraftDetails.data.ground_speed
          : 0;
        fuelDetails.altitude = airCraftDetails.data.altitude
          ? airCraftDetails.data.altitude
          : 0;
      }

      if (airCraftDetails.flightData) {
        eventName =
          airCraftDetails.flightData[airCraftDetails.flightData.length - 1]
            .event_name;
        console.log(
          airCraftDetails.flightData[airCraftDetails.flightData.length - 1]
            .event_name,
          "event Name"
        );
      }

      dispatch({
        type: ViewsConstants.EVENT_NAME,
        value: eventName,
      });

      dispatch({
        type: ViewsConstants.VIEW_FLIGHT_SPEED_DETAILS,
        value: fuelDetails,
      });
      dispatch({
        type: ViewsConstants.START_TIMER,
        value: startTimer,
      });
      setLoader(false);
    } catch (error) {
      dispatch({
        type: ViewsConstants.FLIGHT_LIST_DATA,
        value: [],
      });
      dispatch({
        type: ViewsConstants.START_TIMER,
        value: false,
      });
      setLoader(false);
    }
  };

  const getLastNMonthDate = (date: Date, months: number) => {
    date.setMonth(date.getMonth() + months);
    return date;
  };

  const onChangeStatusFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const obj = {
      filter: event.target.value,
    };
    setFilterData(obj);
  };

  const onChangeDirectionSort = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const obj = {
      sort: event.target.value,
    };
    setSortData(obj);
  };

  const onChangeDropdown = (value: any) => {
    changeSelectedAircraftId(value.name);
    changeSelectedAircraftFlightId(value.aircraftid);
    setSelectedAsset(value.id);
    setSelectedAssetData(value);
  };

  function formatAMPM(date: Date) {
    let hours: any = date.getUTCHours();
    let minutes: any = date.getUTCMinutes();
    let ampm: any = hours >= 12 ? "pm" : "am";
    let seconds: any = date.getUTCSeconds();
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + ":" + seconds + " " + ampm;
    return strTime;
  }

  const upToTwoDecimal = (value: any) => {
    return fixDecimalService.upToTwoDecimal(value);
  };

  const getLocationValue = (assetItem: any) => {
    if (assetItem.current_status === "ON-GROUND") {
      return assetItem.location;
    } else {
      return `LOC: ${assetItem.gps_lat},${assetItem.gps_long}`;
    }
  };

  const Assets = () => {
    return (
      <div className="color-white">
        <div className="row">
          <div className="dd-style w-100">
            <div className="row mb-3 pl-5 pr-5">
              <div className="col-md-9 ">
                <div className="select-dropdown">
                  {/* <select
                    className="form-control"
                    id="select2"
                    onChange={(e: any) => {
                      changeSelectedAircraftId(e.target.value);
                    }}
                    value={selectedAicraftId}
                  >
                    {assetsList.map((item: any) => {
                      return (
                        <option value={item.name} key={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select> */}
                  <Autocomplete
                    onChange={(event: any, newValue: any) => {
                      onChangeDropdown(newValue);
                    }}
                    id="controllable-states-demo"
                    options={assetsList}
                    getOptionLabel={(option: any) => option.name}
                    sx={{
                      width: 280,
                      mt: 2,
                      // border: "1px solid blue",
                      "& .MuiOutlinedInput-root": {
                        // border: "1px solid yellow",
                        borderRadius: "0",
                        padding: "0",
                      },
                      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                        {
                          border: "none",
                        },
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
              </div>
              <div className="col-md-3 d-flex text-align-center align-item-center">
                <>
                  <IconButton
                    aria-label="more"
                    id="filter-button"
                    aria-controls={filterOpen ? "filter-menu" : undefined}
                    aria-expanded={filterOpen ? "true" : undefined}
                    aria-haspopup="true"
                    size="large"
                    color="inherit"
                    onClick={handleFilterClick}
                  >
                    <FilterAltIcon />
                  </IconButton>
                  <Menu
                    id="filter-menu"
                    MenuListProps={{
                      "aria-labelledby": "filter-button",
                    }}
                    anchorEl={filterAnchorEl}
                    open={filterOpen}
                    onClose={handleFilterClose}
                    PaperProps={{
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "20ch",
                      },
                    }}
                  >
                    <MenuItem onClick={handleFilterClose}>
                      <FormControl>
                        <FormLabel id="filter-status-radio-buttons-group-label">
                          Status Filter
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="filter-status-radio-buttons-group-label"
                          defaultValue={
                            filterData.filter ? filterData.filter : "all"
                          }
                          name="radio-buttons-group"
                          onChange={onChangeStatusFilter}
                        >
                          <FormControlLabel
                            value="all"
                            control={<Radio />}
                            label="Show All"
                          />
                          <FormControlLabel
                            value="active"
                            control={<Radio />}
                            label="Show Active"
                          />
                          <FormControlLabel
                            value="inactive"
                            control={<Radio />}
                            label="Show Inactive"
                          />
                        </RadioGroup>
                      </FormControl>
                    </MenuItem>
                    {/* <MenuItem onClick={handleFilterClose}>
                      <FormControl>
                        <FormLabel id="filter-alarm-radio-buttons-group-label">
                          Alarm Filter
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="filter-alarm-radio-buttons-group-label"
                          defaultValue="Show All"
                          name="radio-buttons-group"
                        >
                          <FormControlLabel
                            value="Show All"
                            control={<Radio />}
                            label="Show All"
                          />
                          <FormControlLabel
                            value="Show Active"
                            control={<Radio />}
                            label="Show Medium"
                          />
                          <FormControlLabel
                            value="Show Inactive"
                            control={<Radio />}
                            label="Show Critical"
                          />
                        </RadioGroup>
                      </FormControl>
                    </MenuItem> */}
                  </Menu>
                </>
                <>
                  <IconButton
                    aria-label="more"
                    id="sort-button"
                    aria-controls={sortOpen ? "sort-menu" : undefined}
                    aria-expanded={sortOpen ? "true" : undefined}
                    aria-haspopup="true"
                    size="large"
                    color="inherit"
                    onClick={handleSortClick}
                  >
                    <SortIcon />
                  </IconButton>
                  <Menu
                    id="sort-menu"
                    MenuListProps={{
                      "aria-labelledby": "filter-button",
                    }}
                    anchorEl={sortAnchorEl}
                    open={sortOpen}
                    onClose={handleSortClose}
                    PaperProps={{
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: "20ch",
                      },
                    }}
                  >
                    <MenuItem onClick={handleSortClose}>
                      <FormControl>
                        <FormLabel id="sort-direction-radio-buttons-group-label">
                          Direction
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="sort-direction-radio-buttons-group-label"
                          defaultValue={sortData.sort ? sortData.sort : "asc"}
                          name="radio-buttons-group"
                          onChange={onChangeDirectionSort}
                        >
                          <FormControlLabel
                            value="asc"
                            control={<Radio />}
                            label="Ascending"
                          />
                          <FormControlLabel
                            value="dsc"
                            control={<Radio />}
                            label="Descending"
                          />
                        </RadioGroup>
                      </FormControl>
                    </MenuItem>
                    {/* <MenuItem onClick={handleFilterClose}>
                      <FormControl>
                        <FormLabel id="sort-attribute-radio-buttons-group-label">
                          Attribute
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="sort-attribute-radio-buttons-group-label"
                          defaultValue="name"
                          name="radio-buttons-group"
                        >
                          <FormControlLabel
                            value="name"
                            control={<Radio />}
                            label="Name"
                          />
                          <FormControlLabel
                            value="type"
                            control={<Radio />}
                            label="Type"
                          />
                          <FormControlLabel
                            value="state time"
                            control={<Radio />}
                            label="State Time"
                          />
                          <FormControlLabel
                            value="state"
                            control={<Radio />}
                            label="State"
                          />
                          <FormControlLabel
                            value="status"
                            control={<Radio />}
                            label="Status"
                          />
                          <FormControlLabel
                            value="alarm"
                            control={<Radio />}
                            label="Alarm"
                          />
                          <FormControlLabel
                            value="flight plan"
                            control={<Radio />}
                            label="Flight Plan"
                          />
                        </RadioGroup>
                      </FormControl>
                    </MenuItem> */}
                  </Menu>
                </>
              </div>
            </div>
          </div>
        </div>
        <div className="list-group asset-list">
          {assetsList.map((item: any) => {
            return (
              <a
                key={item.id}
                href="#"
                className={`list-group-item list-group-item-action ${
                  item.id === selectedAsset ? "selectedAsset" : ""
                }`}
                onClick={() => onClickAsset(item)}
                id="singleItem"
                onContextMenu={(e) => {
                  onRightClick(e, item);
                }}
              >
                <div className="list-row">
                  <img
                    src={require("../../Assets/images/plane.png").default}
                    alt={require("../../Assets/images/plane.png").default}
                    className="img-fluid"
                  />
                  <div className="list-child-2">
                    <h5>
                      {selectedCustomer && selectedCustomer.name
                        ? selectedCustomer.name
                        : ""}{" "}
                      <span> - </span> {item.name}
                    </h5>
                    {/* <h5>{item.name}</h5> */}
                    <p>
                      {upToTwoDecimal(item.speed)} knots{" "}
                      {upToTwoDecimal(item.heading)}°
                    </p>
                    {item.current_status === "IN-AIR" ? (
                      <p>Age: &lt; 1 min ago</p>
                    ) : (
                      <>
                        {item.elapsed_time.days === 0 &&
                        item.elapsed_time.hours === 0 ? (
                          <p>Age: {item.elapsed_time.minutes} mins ago</p>
                        ) : null}
                      </>
                    )}
                  </div>

                  {/* <div className="list-child-3">
                    <p>{item.current_status}</p>
                    <p className="text-truncate">{item.location.slice(7)}</p>
                    <p>
                      {item.elapsed_time.days} days {item.elapsed_time.hours}{" "}
                      hrs {item.elapsed_time.minutes} mins ago
                    </p>
                  </div> */}
                  <div className="list-child-3">
                    <p>{item.current_status}</p>
                    <p className="text-truncate">{getLocationValue(item)}</p>
                    {item.current_status === "ON-GROUND" && (
                      <p>
                        {item.elapsed_time.days > 0 &&
                          `${item.elapsed_time.days} days `}
                        {item.elapsed_time.days > 0 ||
                        item.elapsed_time.hours > 0
                          ? `${item.elapsed_time.hours} hrs `
                          : ""}
                        {item.elapsed_time.days > 0 ||
                        item.elapsed_time.hours > 0 ||
                        item.elapsed_time.minutes > 0
                          ? `${item.elapsed_time.minutes} mins `
                          : ""}
                        ago
                      </p>
                    )}
                  </div>
                </div>
              </a>
            );
          })}
          {toggleContextMenu && (
            <ContextMenu
              x={itemPosition.x}
              y={itemPosition.y}
              contextClicked={onContextMenuClick}
              type={"assets"}
            />
          )}
        </div>
        <div className="custom-card">
          <button
            className="btn btn-primary d-inline-flex align-items-center justify-content-center mb-3 rounded-circle"
            style={{ width: "30px", height: "30px", padding: "0px" }}
            onClick={() => setAssetTogglebtn(!assetTogglebtn)}
          >
            {assetTogglebtn ? (
              <KeyboardArrowDownIcon />
            ) : (
              <KeyboardArrowUpIcon />
            )}
          </button>
          <div
            className={
              assetTogglebtn
                ? "custom-card-container show-top"
                : "custom-card-container"
            }
          >
            <div className="custom-card-header">
              <ul className="nav">
                <li className="nav-item">
                  <a href="#" className="nav-link text-white px-2">
                    <OpenInNewIcon fontSize="large" />
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link text-white px-2">
                    <ZoomInIcon fontSize="large" />
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link text-white px-2">
                    <ModeStandbyIcon fontSize="large" />
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link text-white px-2">
                    <QuestionAnswerIcon fontSize="large" />
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link text-white px-2">
                    <PriorityHighIcon fontSize="large" />
                  </a>
                </li>
                <li className="nav-item ml-auto">
                  <a href="#" className="nav-link text-white px-2">
                    <PermDeviceInformationIcon fontSize="large" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="custom-card-body">
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th className="text-warning">Attribute</th>
                    <th className="text-warning">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedAssetData ? (
                    <>
                      <tr>
                        <td>Name</td>
                        <td>{selectedAssetData.name}</td>
                      </tr>
                      <tr>
                        <td>ESN</td>
                        <td>{selectedAssetData.esn}</td>
                      </tr>
                      <tr>
                        <td>Time</td>
                        <td>{selectedAssetData.date_time}</td>
                      </tr>
                      <tr>
                        <td>State</td>
                        <td>{selectedAssetData.current_status}</td>
                      </tr>
                      <tr>
                        <td>Location</td>
                        <td>{selectedAssetData.location}</td>
                      </tr>
                      <tr>
                        <td>Lat/Long</td>
                        <td>{`${selectedAssetData.gps_lat},${selectedAssetData.gps_long}`}</td>
                      </tr>
                      <tr>
                        <td>Speed</td>
                        <td>{upToTwoDecimal(selectedAssetData.speed)}</td>
                      </tr>
                      <tr>
                        <td>Heading</td>
                        <td>{selectedAssetData.heading}</td>
                      </tr>
                      <tr>
                        <td>Altitude</td>
                        <td>{upToTwoDecimal(selectedAssetData.altitude)}</td>
                      </tr>
                      <tr>
                        <td>Distance</td>
                        <td>{selectedAssetData.distance}</td>
                      </tr>
                      <tr>
                        <td>IMEI</td>
                        <td>{selectedAssetData.asset_id}</td>
                      </tr>
                      <tr>
                        <td>Device Type</td>
                        <td>{selectedAssetData.deviceType}</td>
                      </tr>
                      <tr>
                        <td>Description</td>
                        <td>{selectedAssetData.description}</td>
                      </tr>
                      <tr>
                        <td>Web Link</td>
                        <td>{selectedAssetData.weblink}</td>
                      </tr>
                    </>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="col-md-3 my-4 vh-90 left-box-padding"
      id="liveTrackContainer"
    >
      <div className="loading" style={{ display: loader ? "block" : "none" }}>
        <img
          src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"
          alt="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"
        />
      </div>
      <div className="sidebar-wrapper noheight-wrapper noheight-wrapper-view p-4">
        <label className="text-left d-block mb-3">Live Tracking Map</label>
        <div className="view-tabs">
          <span
            className={`cursor-pointer ${
              selectedTab === 1 ? "tab-active" : ""
            }`}
            onClick={() => {
              changeTab(1);
            }}
          >
            Assets
          </span>
          <span
            className={`cursor-pointer ${
              selectedTab === 2 ? "tab-active" : ""
            }`}
            onClick={() => {
              changeTab(2);
            }}
          >
            Events
          </span>
          <span
            className={`cursor-pointer ${
              selectedTab === 3 ? "tab-active" : ""
            }`}
            onClick={() => {
              changeTab(3);
            }}
          >
            Data Layers
          </span>
        </div>
        {selectedTab === 1 ? Assets() : null}
        {selectedTab === 2 ? (
          <Events
            selectedAicraftId={selectedAicraftId}
            selectedAircraftFlightId={selectedAircraftFlightId}
            toggleContextMenuEvent={toggleContextMenuEvent}
          />
        ) : null}
        {selectedTab === 3 ? <DataLayers /> : null}

        {/* <div className="view-bottom-popup-container color-white">
                    <div>Bottom Popup</div>
                </div> */}
      </div>
    </div>
  );
});

export default memo(LiveTrackingMap);
