/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo, useEffect, useState } from "react";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { viewService } from "../../Service/view.service";
import { Checkbox, Typography } from "@mui/material";
import { BaronMethods } from "./baron-weather.js";
import {
  DefaultMapID,
  MAP_ID_OPTIONS,
  ViewsConstants,
} from "../../Constants/constants";
import { useDispatch } from "react-redux";

const DataLayers = () => {
  // const classes = useStyles();
  const [dataTogglebtn, setDataTogglebtn] = useState(false);
  const [loader, setLoader] = useState(false);
  const [mapIdValue, setMapIdValue] = useState(DefaultMapID);
  const dispatch = useDispatch();

  const [layerData, setLayerData] = useState([]);
  useEffect(() => {
    getDataLayerData();
  }, []);

  const getDataLayerData = async () => {
    try {
      setLoader(true);
      const dataLayerData = await viewService.dataLayerData();
      setLoader(false);
      dataLayerData.results
        ? setLayerData(dataLayerData.results)
        : setLayerData([]);
    } catch (error) {
      setLayerData([]);
      setLoader(false);
    }
  };

  const handleOnChange = (
    has_subcategory: boolean,
    parentIndex: number,
    childIndex: number,
    grandChildIndex?: number
  ) => {
    if (has_subcategory) {
      const layer_data: any = [...layerData];
      if (grandChildIndex !== undefined) {
        const item =
          layer_data[parentIndex].data[childIndex].product[grandChildIndex];
        item.isChecked = item.isChecked ? false : true;
        setLayerData(layer_data);
        callBaronApi(item.product_id, item.isChecked);
      }
    } else {
      const layer_data: any = [...layerData];
      const item = layer_data[parentIndex].data[childIndex];
      item.isChecked = item.isChecked ? false : true;
      setLayerData(layer_data);
      callBaronApi(item.product_id, item.isChecked);
    }
  };

  const handleMapChange = (id: string) => {
    setMapIdValue(id);
    dispatch({
      type: ViewsConstants.UPDATE_MAP_TYPE_ID,
      value: id,
    });
  };

  const callBaronApi = async (product_id: string, isChecked: boolean) => {
    // const PRODUCT = 'C39-0x0302-0';
    const PRODUCT = product_id;
    if (isChecked) {
      try {
        setLoader(true);
        const baronMapData = await BaronMethods.baronWeatherMap(PRODUCT);
        setLoader(false);
        dispatch({
          type: ViewsConstants.BARON_WEATHER_DATA,
          value: baronMapData,
        });
      } catch (error) {
        console.log("baronMapData error", error);
        setLoader(false);
      }
    }
  };

  return (
    <>
      <div className="loading" style={{ display: loader ? "block" : "none" }}>
        <img
          src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"
          alt="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"
        />
      </div>
      <div className="color-white">
        <div>
          <TreeView
            aria-label="multi-select"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            multiSelect
            sx={{ flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
          >
            {layerData.map((item: any, parentIndex: any) => {
              return (
                <TreeItem
                  nodeId={item.id}
                  label={item.category}
                  sx={{ textAlign: "left" }}
                >
                  {item.data.map((data: any, childIndex: any) => {
                    if (item.has_subcategory) {
                      return (
                        <TreeItem
                          nodeId={`${item.id}_${data.id}`}
                          label={data.value}
                          sx={{ textAlign: "left" }}
                        >
                          {data.product.map(
                            (data2: any, grandChildIndex: number) => {
                              const isChecked = data2.isChecked;
                              const label = (
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Checkbox
                                    id={`checkbox-${item.id}_${data.id}_${grandChildIndex}_${data2.product_id}`}
                                    color="primary"
                                    checked={isChecked ? true : false}
                                    onChange={() =>
                                      handleOnChange(
                                        item.has_subcategory,
                                        parentIndex,
                                        childIndex,
                                        grandChildIndex
                                      )
                                    }
                                  />
                                  <Typography
                                    variant="body2"
                                    sx={{ fontSize: "1rem" }}
                                  >
                                    {data2.product_name}
                                  </Typography>
                                </div>
                              );
                              return (
                                <TreeItem
                                  nodeId={`${item.id}_${data.id}_${grandChildIndex}_${data2.product_id}`}
                                  label={label}
                                  sx={{ textAlign: "left" }}
                                />
                              );
                            }
                          )}
                        </TreeItem>
                      );
                    } else {
                      const isChecked = data.isChecked;
                      const label = (
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Checkbox
                            id={`checkbox-${item.id}_${data.id}`}
                            color="primary"
                            checked={isChecked ? true : false}
                            onChange={() =>
                              handleOnChange(
                                item.has_subcategory,
                                parentIndex,
                                childIndex
                              )
                            }
                          />
                          <Typography variant="body2" sx={{ fontSize: "1rem" }}>
                            {data.value}
                          </Typography>
                        </div>
                      );
                      return (
                        <TreeItem
                          nodeId={`${item.id}_${data.id}`}
                          label={label}
                          sx={{
                            textAlign: "left",
                          }}
                        ></TreeItem>
                      );
                    }
                  })}
                </TreeItem>
              );
            })}

            <TreeItem
              nodeId="Base_Maps"
              label="Base Maps"
              sx={{ textAlign: "left" }}
            >
              {MAP_ID_OPTIONS.map((item: any) => {
                return (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Checkbox
                      id={`checkbox-${item.id}`}
                      color="primary"
                      checked={mapIdValue === item.id ? true : false}
                      onChange={() => handleMapChange(item.id)}
                    />
                    <Typography variant="body2" sx={{ fontSize: "1rem" }}>
                      {item.label}
                    </Typography>
                  </div>
                );
              })}
            </TreeItem>
          </TreeView>

          {/* <TreeView
                    aria-label="multi-select"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    multiSelect
                    sx={{ flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
                >
                    <TreeItem nodeId="1" label="Applications" sx={{ textAlign: 'left' }}>
                        <TreeItem nodeId="2" label="Calendar" sx={{ textAlign: 'left' }} />
                        <TreeItem nodeId="3" label="Chrome" sx={{ textAlign: 'left' }} />
                        <TreeItem nodeId="4" label="Webstorm" sx={{ textAlign: 'left' }} />
                    </TreeItem>
                    <TreeItem nodeId="5" label="Documents" sx={{ textAlign: 'left' }}>
                        <TreeItem nodeId="6" label="MUI" sx={{ textAlign: 'left' }}>
                            <TreeItem nodeId="7" label="src" sx={{ textAlign: 'left' }}>
                                <TreeItem nodeId="8" label="index.js" sx={{ textAlign: 'left' }} />
                                <TreeItem nodeId="9" label="tree-view.js" sx={{ textAlign: 'left' }} />
                            </TreeItem>
                        </TreeItem>
                    </TreeItem>
                </TreeView> */}
        </div>
        <div className="custom-card">
          <button
            className="btn btn-primary px-3 py-2 mb-3"
            onClick={() => setDataTogglebtn(!dataTogglebtn)}
          >
            <i
              className={
                dataTogglebtn ? "fas la-angle-down" : "fas la-angle-up"
              }
            ></i>
          </button>
          <div
            className={
              dataTogglebtn
                ? "custom-card-container show-top"
                : "custom-card-container"
            }
          >
            <div className="custom-card-header">
              <ul className="nav justify-content-end">
                <li className="nav-item">
                  <a href="#" className="nav-link text-white">
                    <i className="fas la-trash-alt"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link text-white">
                    <i className="fas la-home"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link text-white">
                    <i className="fas la-pen"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link text-white">
                    <i className="fas la-external-link-alt"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link text-white">
                    <i className="fas la-save"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="custom-card-body">
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th className="text-warning">Attribute</th>
                    <th className="text-warning">value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>John</td>
                    <td>Doe</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(DataLayers);
