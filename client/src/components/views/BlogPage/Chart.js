import React, { useState, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import "./Chart.css";
import axios from "axios";
import CountUp from "react-countup";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function Chart(props) {
  const [chartDataC, setChartDataC] = useState([]);
  const [chartDataS, setChartDataS] = useState([]);
  const [dayCounts, setDayCounts] = useState([]);
  const [monthCounts, setMonthCounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [categoryCount, setCategoryCount] = useState([]);
  const [statusCount, setStatusCount] = useState([]);
  const [ideasPosted, setIdeasPosted] = useState(0);
  const [activeBrainstormers, setActiveBrainstormers] = useState(0);

  useEffect(() => {
    axios
      .post("/api/ideas/searchIdeas", {
        searchStr: "",
      })
      .then((response) => {
        if (response.data.success) {
          console.log("the total ideas are ::");
          console.log(response.data.ideas.length);
          setIdeasPosted(response.data.ideas.length);
        } else {
          alert("Couldnt get idea`s lists");
        }
      });

    axios.get("/api/users/getEmails").then((response) => {
      if (response.data.success) {
        console.log("the total users  fetched are : ");
        console.log(response.data.emails.length);
        setActiveBrainstormers(response.data.emails.length);
      } else {
        alert("Couldnt get users list");
      }
    });
    axios.get("/api/ideas/getstatuses").then((response) => {
      if (response.data.success) {
        console.log("the statuses used by UI are :::");
        console.log(response.data.statuses);
        setStatuses(response.data.statuses);
      }
    });
    axios.get("/api/ideas/getcategories").then((response) => {
      if (response.data.success) {
        console.log("the categories used by UI are :::");
        console.log(response.data.categories);
        setCategories(response.data.categories);
      }
    });

    axios.get("api/ideas/byDayCounts").then((response) => {
      if (response.data.success) {
        console.log("The counts by day used by UI are :::");
        console.log(response.data.docs);
        var days = [];
        var counts = [];
        response.data.docs.map((value) => {
          counts = [...counts, value.count];
          days = [...days, value._id.timestamp];
        });
        const dayData = {
          labels: days,
          datasets: [
            {
              label: "Number of Ideas",
              data: counts,
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
        };
        setDayCounts(dayData);
      }
    });

    axios.get("api/ideas/byMonthCounts").then((response) => {
      if (response.data.success) {
        console.log("The counts by month used by UI are :::");
        console.log(response.data.docs);
        var months = [];
        var counts = [];
        response.data.docs.map((value) => {
          counts = [...counts, value.count];
          months = [...months, value._id.timestamp];
        });
        var monthData = {
          labels: months,
          datasets: [
            {
              label: "Number of Ideas",
              data: counts,
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
        };
        setMonthCounts(monthData);
      }
    });
  }, []);

  useEffect(() => {
    var cCounts = [];
    categories.map((C) => {
      // console.log(C);
      const c = C;
      axios
        .post("/api/ideas/getcount", { column: "category", columnVal: c })
        .then((response) => {
          if (response.data.success) {
            // console.log("the count used by UI is :::");
            // console.log(response.data.ideas);
            cCounts = [...cCounts, response.data.ideas.length];
            setCategoryCount(cCounts);
            console.log(cCounts);
          }
        });
    });
    var sCounts = [];
    statuses.map((S) => {
      // console.log(S);
      const s = S;
      axios
        .post("/api/ideas/getcount", { column: "status", columnVal: s })
        .then((response) => {
          if (response.data.success) {
            // console.log("the count used by UI is :::");
            // console.log(response.data.ideas);
            sCounts = [...sCounts, response.data.ideas.length];
            setStatusCount(sCounts);
            console.log(sCounts);
          }
        });
    });
    console.log("the categories counts is :::");
    console.log(categoryCount);
    console.log("the statuses counts is :::");
    console.log(statusCount);
  }, [categories, statuses]);

  useEffect(() => {
    const cData = {
      labels: categories,
      datasets: [
        {
          label: "Number of Ideas",
          data: categoryCount,
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
    };
    setChartDataC(cData);
    const sData = {
      labels: statuses,
      datasets: [
        {
          label: "Number of Ideas",
          data: statusCount,
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
    };
    setChartDataS(sData);
  }, [categoryCount, statusCount]);

  return (
    <div className="chart" style={{ fontFamily: "ratiobold", margin: "none" }}>
      <Grid container spacing={3} style={{ fontFamily: "ratiobold" }}>
        <Grid item xs={12} sm={5} style={{ paddingLeft: "22px" }}>
          <Paper elevation={3}>
            <Bar
              data={chartDataC}
              options={{
                title: {
                  display: true,
                  text: "Ideas by Category",
                  fontSize: 25,
                  fontFamily: "ratiobold",
                  fontColor: "grey",
                },
                legend: {
                  display: true,
                  position: "bottom",
                },
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Paper elevation={3}>
            <div className="users__inflow">
              <div className="inflow__title">Users Inflow</div>
              <div className="inflow__count">
                <CountUp end={activeBrainstormers} duration={5} />
              </div>
              <div className="inflow__percentage">
                <ArrowUpwardIcon /> 24.5%
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={5} style={{ paddingRight: "22px" }}>
          <Paper elevation={3}>
            {" "}
            <Pie
              data={chartDataC}
              options={{
                title: {
                  display: "Ideas by Category",
                  text: "Category",
                  fontSize: 25,
                  fontFamily: "ratiobold",
                  fontColor: "grey",
                },
                legend: {
                  display: true,
                  position: "bottom",
                },
              }}
            />
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3} style={{ fontFamily: "ratiobold" }}>
        <Grid item xs={12} sm={5} style={{ paddingLeft: "22px" }}>
          <Paper elevation={3}>
            <Bar
              data={chartDataS}
              options={{
                title: {
                  display: true,
                  text: "Ideas by Status",
                  fontSize: 25,
                  fontFamily: "ratiobold",
                  fontColor: "grey",
                },
                legend: {
                  display: true,
                  position: "bottom",
                },
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Paper elevation={3}>
            <div className="users__inflow">
              <div className="inflow__title">Ideas Inflow</div>
              <div className="inflow__count">
                <CountUp end={ideasPosted} duration={5} />
              </div>
              <div className="inflow__percentage">
                <ArrowUpwardIcon /> 24.5%
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={5} style={{ paddingRight: "22px" }}>
          <Paper elevation={3}>
            {" "}
            <Pie
              data={chartDataS}
              options={{
                title: {
                  display: "Ideas by Status",
                  text: "Ideas by Status",
                  fontSize: 25,
                  fontFamily: "ratiobold",
                  fontColor: "grey",
                },
                legend: {
                  display: true,
                  position: "bottom",
                },
              }}
            />
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3} style={{ fontFamily: "ratiobold" }}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3}>
            <Line
              style={{ fontFamily: "ratiobold", padding: "none" }}
              data={dayCounts}
              options={{
                title: {
                  display: true,
                  text: "Ideas by Day",
                  fontSize: 25,
                  fontFamily: "ratiobold",
                },
                legend: {
                  display: true,
                  position: "bottom",
                },
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3}>
            <Line
              style={{ fontFamily: "ratiobold", padding: "none" }}
              data={monthCounts}
              options={{
                title: {
                  display: true,
                  text: "Ideas by Month",
                  fontSize: 25,
                  fontFamily: "ratiobold",
                },
                legend: {
                  display: true,
                  position: "bottom",
                },
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
