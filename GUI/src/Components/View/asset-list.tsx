import React, { useState, useEffect } from 'react';
import { assetService } from "../../Service/asset.service";
import { toast } from "react-toastify";
import viewIcon from '../../Assets/images/viewfile.png';
import exportIcon from '../../Assets/images/export-icon.png';
import { useHistory } from 'react-router-dom';

const AssetListComponent = () => {
  const [loader, setLoader] = useState(false);
  const [limitValues, updateLimitValues] = useState({
    page: 1,
    limit: 10,
  });
  const [pageCount, updatePageCount] = useState(3);
  const [showData, setShowData] = useState(false);
  const [assetsList, setAssetsList] = useState([]);

  let history = useHistory();

  useEffect(() => {
    onInit()
  }, [])

  const onInit = async () => {
    setLoader(true);
    await getAssetsList();
    setLoader(false);
  }

  const getAssetsList = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let userData = await assetService.getAssetsList();
        if (userData.status == '200') {
          const checkListArr = userData.data.results;
          console.log('checkListArr', checkListArr);
          setAssetsList(checkListArr);
        } else {
          setAssetsList([]);
        }
        resolve(true);
      } catch (error: any) {
        resolve(true);
        toast.error(error.msg);
        console.error(error);
      }
    });
  };

  const onClickView = (assetItem: any) => {
    history.push('/view/assetList/assetViewDevice', { selectedAsset: assetItem });
  }


  const AssetTable = () => {
    return (
      <div className='col-md-12 my-4 report-list'>
        <div className='row mt-5 d-flex justify-content-center'>
          <div className='col-md-11'>
            <div className='row'>
              <div className='col-md-8 d-flex align-items-center'>
                <h2 className='cl-white mr-5'>Assets List</h2>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12 table-responsive'>
                <table className='table table-striped table-dark mt-5'>
                  <thead>
                    <tr>
                      <th scope='col'>Customer</th>
                      <th scope='col'>Asset Name</th>
                      <th scope='col'>Last Update</th>
                      <th scope='col'>Battery</th>
                      <th scope='col'>Supply Voltage</th>
                      <th scope='col'>Device Type</th>
                      {/* <th scope='col'>Web Link</th> */}
                      <th scope='col'>View</th>
                      <th scope='col'>Export</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assetsList.map(
                      (item: any, index: any) => {
                        return (
                          <tr key={index}>
                            <td>{item.createdBy}</td>
                            <td>{item.name}</td>
                            <td>{item.updatedAt}</td>
                            <td>{`N/A`}</td>
                            <td>{`N/A`}</td>
                            <td>{item.deviceType}</td>
                            {/* <td className='textSelect'><a>Open</a></td> */}
                            <td className='text-center' onClick={() => { onClickView(item) }}><img className='icon-20 cursor-pointer' src={viewIcon}></img></td>
                            <td className='text-center'><img className='icon-20 cursor-pointer' src={exportIcon}></img></td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>)
  }

  return (
    <React.Fragment>
      <div className='container-fluid content-body vh-100'>
        <div className='loading' style={{ display: loader ? 'block' : 'none' }}>
          <img src='https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif' />
        </div>
        <div className='row h-100vh-80px'>
          {AssetTable()}
        </div>
      </div>

    </React.Fragment>
  );
};

export default AssetListComponent;
