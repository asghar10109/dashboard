import React, { useEffect, useState } from 'react'
// import LineChart from "../utils/LineChart"
import { useDispatch, useSelector } from 'react-redux';
import AreaChart from '../utils/AreaChart';
import { dashboard, getcampaigns, getDashboard, getUserError, recentCampaigns, getAllUsers } from '../store/slices/userSlice';
import moment from 'moment';
import { all } from 'axios';

import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';




const Dashboard = () => {
  const dispatch = useDispatch()
  const dashboardData = useSelector(getDashboard)
  const campaigns = useSelector(getcampaigns)
  const error = useSelector(getUserError)
  const [users, setUsers] = useState(null)
  const [name, setName] = useState([])

  async function data() {
    try {
      await dispatch(dashboard()).unwrap()
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError)
    }
  }

  const user = async () => {
    const response = await dispatch(getAllUsers()).unwrap();
    console.log("dashboard getting all users .....", response.data.data)
    setUsers(response?.data?.data)

  }

  const username = users?.map((user) => user.name)
  console.log("nnnnn", username)


  const xLabels = []
  users?.forEach((ele) => xLabels.push(ele?.name))
  console.log("=================================================", xLabels)

  const uData = []
  users?.forEach((ele, index) => uData.push(index))
  console.log("=================================================", uData)

  // const uData1 = [6, 5, 4, 3, 2, 1, 0];
  // const xLabels1 = ['zaeem uz zafar', 'izaan saqib', 'owais', 'asghar', 'abdullah', 'asghar poonja', 'asghar anonymous']


  useEffect(() => {
    user()
  }, [dispatch])

  useEffect(() => {
    let mount = true
    if ((mount && !dashboardData) || (mount && !campaigns)) {
      data();


    }
    return () => {
      mount = false
    }
  }, [dispatch])


  return (
    <>
      <div className="main-panel">
        <div className="content-wrapper2">
          <div className="page-header">
            <h3 className="page-title">
              <span className="page-title-icon  text-white me-2">
                <i className="mdi mdi-home" />
              </span> Dashboard
            </h3>
          </div>
          <div className="row ">
            <div className="col-md-4 stretch-card grid-margin">
              <div className="card bg-gradient-info card-img-holder text-white">
                <div className="card-body-1">
                  <img src="/assets/images/circle.png" className="card-img-absolute" alt="circle-image" />
                  <h4 className="font-weight-normal mb-3">Total Users<i className="mdi mdi-account mdi-24px float-right" />
                  </h4>
                  {/* <h2 className="mb-5">{dashboardData?.userCount}</h2> */}
                  {/* {console.log(users.length)} */}
                  <h2 className="mb-5">{users?.length}</h2>
                </div>
              </div>
            </div>
            <div className="col-md-4 stretch-card grid-margin">
              <div className="card bg-gradient-info card-img-holder text-white">
                <div className="card-body-1">
                  <img src="/assets/images/circle.png" className="card-img-absolute" alt="circle-image" />
                  <h4 className="font-weight-normal mb-3">Total IOS Users<i className="mdi mdi-account mdi-24px float-right" />
                  </h4>
                  {/* <h2 className="mb-5">{dashboardData?.iosCount}</h2> */}
                  <h2 className="mb-5">{users?.length}</h2>
                </div>
              </div>
            </div>
            <div className="col-md-4 stretch-card grid-margin">
              <div className="card bg-gradient-info card-img-holder text-white">
                <div className="card-body-1">
                  <img src="/assets/images/circle.png" className="card-img-absolute" alt="circle-image" />
                  <h4 className="font-weight-normal mb-3">Total Android Users<i className="mdi mdi-account mdi-24px float-right" />
                  </h4>
                  {/* <h2 className="mb-5">{dashboardData?.androidCount}</h2> */}
                  <h2 className="mb-5">{users?.length}</h2>
                </div>
              </div>
            </div>
            {/* <div className="col-md-4 stretch-card grid-margin">
              <div className="card bg-gradient-info card-img-holder text-white">
                <div className="card-body-1">
                  <img src="/assets/images/circle.png" className="card-img-absolute" alt="circle-image" />
                  <h4 className="font-weight-normal mb-3">Android Devices<i className="mdi mdi-android mdi-24px float-right" />
                  </h4>
                  <h2 className="mb-5">{dashboardData?.androidCount}</h2>
                </div>
              </div>
            </div> */}
            {/* <div className="col-md-4 stretch-card grid-margin">
              <div className="card bg-gradient-info card-img-holder text-white">
                <div className="card-body-1">
                  <img src="/assets/images/circle.png" className="card-img-absolute" alt="circle-image" />
                  <h4 className="font-weight-normal mb-3">Ios Devices <i className="mdi mdi-apple mdi-24px float-right" />
                  </h4>
                  <h2 className="mb-5">{dashboardData?.iosCount}</h2>
                </div>
              </div>
            </div> */}
            {/* <div className="col-md-4 stretch-card grid-margin">
              <div className="card bg-gradient-info card-img-holder text-white">
                <div className="card-body-1">
                  <img src="/assets/images/circle.png" className="card-img-absolute" alt="circle-image" />
                  <h4 className="font-weight-normal mb-3">Total Products <i className="mdi mdi-cart mdi-24px float-right" />
                  </h4>
                  <h2 className="mb-5">{dashboardData?.productsCount}</h2>
                </div>
              </div>
            </div> */}
            {/* <div className="col-md-4 stretch-card grid-margin">
              <div className="card bg-gradient-info card-img-holder text-white">
                <div className="card-body-1">
                  <img src="/assets/images/circle.png" className="card-img-absolute" alt="circle-image" />
                  <h4 className="font-weight-normal mb-3">Featured Products <i className="mdi mdi-clipboard-check mdi-24px float-right" />
                  </h4>
                  <h2 className="mb-5">{dashboardData?.featuredCount}</h2>
                </div>
              </div>
            </div> */}
          </div>
          {/* <div className="row">
            <div className="col-md-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body-1">
                  <div className="clearfix">
                    <h4 className="card-title float-left">All Customers</h4>
                    <div id="visit-sale-chart-legend" className="rounded-legend legend-horizontal legend-top-right float-right" />
                  </div>
                  <LineChart />
                </div>
              </div>
            </div>
            <div className="col-md-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body-1 ">
                  <h4 className="card-title">All Business</h4>
                  <AreaChart />
                  <div id="traffic-chart-legend" className="rounded-legend legend-vertical legend-bottom-left pt-4" />
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className="row">
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="card-body-1">
                  <h4 className="card-title">Recent Campaigns</h4>
                  <div className="table-responsive" style={{textAlign:"center"}}>
                    {campaigns?.length > 0 ? (
                      <table className="table">
                        <thead style={{ textAlign: "center" }}>
                          <tr>
                            <th> S.No </th>
                            <th> Business </th>
                            <th> Product Name </th>
                            <th> Campaign Image </th>
                            <th> Discount </th>
                            <th> Start Date</th>
                            <th> End Date</th>
                          </tr>
                        </thead>
                        <tbody style={{ textAlign: "center" }}>
                          {campaigns?.map((item, i) =>
                          (<tr key={i}>
                            <td>{i+1}</td>
                            <td>
                              {item?.businessId?.imageName ? <>
                                <img src={`${process.env.REACT_APP_APIURL}${item?.businessId?.imageName}`} className="me-2" alt="image" /> {item?.businessId?.businessName}
                              </> : <><i className="fa fa-duotone fa-user" aria-hidden="true"></i> {item?.businessId?.businessName}</>}
                            </td>
                            <td>{item?.productName}</td>
                            <td><img src={`${process.env.REACT_APP_APIURL}${item?.campaignImage}`} className="me-2" alt="image" /></td>
                            <td>
                              <label className="badge badge-gradient-success" style={{ width: "30%" }}>{item?.discount} %</label>
                            </td>
                            <td>{moment(item?.startDate).format("DD-MMM-YYYY")}</td>
                            <td>{moment(item?.endDate).format("DD-MMM-YYYY")}</td>
                          </tr>)
                          )}
                        </tbody>
                      </table>
                    ) : (
                      <>{error}</>
                    )}

                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        {/* partial */}
      </div>

      <div className='charts'>

        {users && (
          <>
            <LineChart
              width={500}
              height={500}
              series={[{ data: uData, label: 'uv', area: true, showMark: false }]}
              xAxis={[{ scaleType: 'point', data: xLabels }]}
              sx={{
                '.MuiLineElement-root': {
                  display: 'none',
                },
              }}
            />

            <BarChart
              series={[
                { data: uData, stack: 'A', label: 'series A1' },
                { data: uData, stack: 'A', label: 'series A2' },
                { data: uData, stack: 'B', label: 'series B1' },
                { data: uData, stack: 'B', label: 'series B2' },
                { data: uData, label: 'series C1' },
              ]}
              width={500}
              height={500}
            />
          </>
        )}



      </div>

    </>
  )
}

export default Dashboard