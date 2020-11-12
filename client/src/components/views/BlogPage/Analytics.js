import React, { Component } from "react";

import "./Analytics.css";
import Chart from "./Chart";

class Analytics extends Component {
  constructor() {
    super();
    this.state = {
      chartData: {},
      charData1: {},
    };
  }

  componentWillMount() {
    // this.getchartData(); // this should be this.getChartData();
    this.getChartData();
  }

  getChartData() {
    // Ajax calls here
    this.setState({
      chartData: {
        labels: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        datasets: [
          {
            label: "Ideas",
            data: [60, 3, 1, 200, 5, 3],
            backgroundColor: [
              "rgba(60, 68, 177, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(30, 128, 128, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(244, 56, 61, 0.6)",
              "rgba(255, 99, 132, 0.6)",
            ],
          },
        ],
      },

      chartData1: {
        labels: [
          "Accounting",
          "Development",
          "Finance",
          "HR",
          "Operations",
          "Technology",
        ],
        datasets: [
          {
            label: "Ideas",
            data: [6, 3, 1, 2, 5, 3],
            backgroundColor: [
              "rgba(60, 68, 177, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(30, 128, 128, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(244, 56, 61, 0.6)",
              "rgba(255, 99, 132, 0.6)",
              // '#3C44B1' ,
              // '#3C44B1' ,
              // '#3C44B1' ,
              // '#3C44B1' ,
              // '#3C44B1' ,
              // '#3C44B1' ,
              // '#3C44B1' ,
            ],
          },
        ],
      },
    });
  }

  render() {
    return (
      <div className="App1" style={{ padding: "15px", marginTop: "10px" }}>
        <Chart />
      </div>
    );
  }
}

export default Analytics;
