// import React, { useEffect, Component } from "react";
// import { Bar, Line, Pie } from "react-chartjs-2";
// import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import Grid from "@material-ui/core/Grid";
// import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
// import "./Chart.css";
// import CountUp from "react-countup";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: "center",
//     color: theme.palette.text.secondary,
//   },
// }));

// class Chart extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       chartData: props.chartData,
//       chartData1: props.chartData1,
//     };
//   }

//   static defaultProps = {
//     displayTitle: true,
//     displayLegend: true,
//     legendPosition: "right",
//     location: "City",
//   };

//   render() {
//     return (
//         <div
//           className="chart"
//           style={{ fontFamily: "ratiobold", margin: "none" }}
//         >
//           <Grid container spacing={3} style={{ fontFamily: "ratiobold" }}>
//             <Grid item xs={12} sm={5} style={{ paddingLeft: "22px" }}>
//               <Paper elevation={3}>
//                 <Bar
//                   data={this.state.chartData}
//                   options={{
//                     title: {
//                       display: this.props.displayTitle,
//                       text: "Ideas Insights " + this.props.location,
//                       fontSize: 25,
//                       fontFamily: "ratiobold",
//                       fontColor: "grey",
//                     },
//                     legend: {
//                       display: this.props.displayLegend,
//                       position: this.props.legendPosition,
//                     },
//                   }}
//                 />
//               </Paper>
//             </Grid>

//             <Grid item xs={12} sm={2}>
//               <Paper elevation={3}>
//                 <div className="users__inflow">
//                   <div className="inflow__title">Users Inflow</div>
//                   <div className="inflow__count">
//                     <CountUp end={762} duration={5} />
//                   </div>
//                   <div className="inflow__percentage">
//                     <ArrowUpwardIcon /> 24.5%
//                   </div>
//                 </div>
//               </Paper>
//             </Grid>
//             <Grid item xs={12} sm={5} style={{ paddingRight: "22px" }}>
//               <Paper elevation={3}>
//                 {" "}
//                 <Pie
//                   data={this.state.chartData}
//                   options={{
//                     title: {
//                       display: "Category",
//                       text: "Category",
//                       fontSize: 25,
//                       fontFamily: "ratiobold",
//                       fontColor: "grey",
//                     },
//                     legend: {
//                       display: this.props.displayLegend,
//                       position: this.props.legendPosition,
//                     },
//                   }}
//                 />
//               </Paper>
//             </Grid>
//           </Grid>
//           <Grid container spacing={3} style={{ fontFamily: "ratiobold" }}>
//             <Grid item xs={12} sm={4} style={{ paddingLeft: "22px" }}>
//               <Paper elevation={3}>
//                 <Bar
//                   data={this.state.chartData}
//                   options={{
//                     title: {
//                       display: this.props.displayTitle,
//                       text: "Ideas Insights " + this.props.location,
//                       fontSize: 25,
//                       fontFamily: "ratiobold",
//                       fontColor: "grey",
//                     },
//                     legend: {
//                       display: this.props.displayLegend,
//                       position: this.props.legendPosition,
//                     },
//                   }}
//                 />
//               </Paper>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <Paper elevation={3}>
//                 <Line
//                   style={{ fontFamily: "ratiobold", padding: "none" }}
//                   data={this.state.chartData}
//                   options={{
//                     title: {
//                       display: this.props.displayTitle,
//                       text: "Ideas Insights " + this.props.location,
//                       fontSize: 25,
//                       fontFamily: "ratiobold",
//                     },
//                     legend: {
//                       display: this.props.displayLegend,
//                       position: this.props.legendPosition,
//                     },
//                   }}
//                 />
//               </Paper>
//             </Grid>
//             <Grid item xs={12} sm={4} style={{ paddingRight: "22px" }}>
//               <Paper elevation={3}>
//                 {" "}
//                 <Pie
//                   data={this.state.chartData}
//                   options={{
//                     title: {
//                       display: "Category",
//                       text: "Category",
//                       fontSize: 25,
//                       fontFamily: "ratiobold",
//                       fontColor: "grey",
//                     },
//                     legend: {
//                       display: this.props.displayLegend,
//                       position: this.props.legendPosition,
//                     },
//                   }}
//                 />
//               </Paper>
//             </Grid>
//           </Grid>
//         </div>
//       );
//     }
// }

// export default Chart;
