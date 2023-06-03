import React from 'react'
import {GiMoneyStack} from 'react-icons/gi'
import {FaUsers, FaCarSide} from 'react-icons/fa'
import ApexCharts from 'apexcharts';
import ReactApexChart from "react-apexcharts";

function Dashboard_graph(props) {

let earningPerMonth = props.profitGraph 
let bookingPerMonth = props.bookingGraph

    const chartData = {
      chart: {
        type: "line",
        id: "apexchart-example",
        foreColor: '#373d3f',
        height: 'full'
      },
      xaxis: {
        categories: ['Januvary', 'Februvary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 100]
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center',
      },
      series: [
        {
          name: "Earnig Per Month",
          type: "column",
          data: earningPerMonth
        },
        {
          name: "Booking Per Month",
          type: "line",
          data: bookingPerMonth
        }
      ],
      stroke: {
        curve: 'smooth',
      }
    };
    




  
  
    return (
      <div className="w-[750px]">

      <ReactApexChart options={chartData} series={chartData.series} />

      </div>

    )
  };


export default Dashboard_graph






