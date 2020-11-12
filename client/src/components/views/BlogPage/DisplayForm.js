import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "./controls/Controls";
import { useForm, Form } from "./useForm";
import FormControl from "@material-ui/core/FormControl";
import Select from "react-select";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import { Divider } from "@material-ui/core";
import makeAnimated from "react-select/animated";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { blue, red } from "@material-ui/core/colors";
import "./DisplayForm.css";
import "./DisplayFormPaper.css";
import DisplayFormPaper from "./DisplayFormPaper.js";
import Trending from "./Trending";
import TrendingIdea from "./TrendingIdea";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import { InputBase } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import ExpandMoreSharpIcon from "@material-ui/icons/ExpandMoreSharp";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import ForumIcon from "@material-ui/icons/Forum";
import Chats from "./Chats.js";
import Analytics from "./Analytics";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import WbIncandescentOutlinedIcon from "@material-ui/icons/WbIncandescentOutlined";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import PersonIcon from "@material-ui/icons/Person";
import CountUp from "react-countup";
import "./Chart.css";

const animatedComponents = makeAnimated();
const optionsSort = [
  { value: "time 1", label: "Date ⬆" },
  { value: "likes 1", label: "Likes ⬆" },
  { value: "category 1", label: "Category ⬆" },
  { value: "status 1", label: "Status ⬆" },
  { value: "time -1", label: "Date ⬇" },
  { value: "likes -1", label: "Likes ⬇" },
  { value: "category -1", label: "Category ⬇" },
  { value: "status -1", label: "Status ⬇" },
];

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: "black",
  },
  searchInput: {
    backgroundColor: "#f2f2f2",
    marginTop: "1px",
    marginBottom: "1px",
    height: "39px",
    borderRadius: "5px",
    fontSize: "1rem",
    "&:hover": {
      backgroundColor: "#f2f2f2",
    },
    "& .MuiSvgIcon-root": {
      marginRight: theme.spacing(1),
    },
  },
  root: {
    flexGrow: 1,
    maxWidth: 350,
    backgroundColor: "#f5f5f0",
  },
  rootTrending: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  media: {
    height: 0,
    paddingTop: "15.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: blue[800],
  },
}));

export default function DisplayForm(props) {
  const classes = useStyles();
  const [votes, setVotes] = useState(4);
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [categoriesSrch, setCategoriesSrch] = useState([]);
  const [statusesSrch, setStatusesSrch] = useState([]);
  const [titlesDropdown, setTitlesDropdown] = useState([]);
  const [sort, setSort] = useState("time -1");
  const [refreshVal, setRefreshVal] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [expanded1, setExpanded1] = useState(false);
  const [ideasImplemented, setIdeasImplemented] = useState(0);
  const [ideasPosted, setIdeasPosted] = useState(0);
  const [activeBrainstormers, setActiveBrainstormers] = useState(0);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleExpandClick1 = () => {
    setExpanded1(!expanded1);
  };

  const refreshValChanged = (newValue) => {
    setRefreshVal(newValue);
  };

  const [state, setState] = React.useState({
    sortBy: "",
    state: "",
    department: "",
    age: "",
    name: "hai",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const SortChanged = (value) => {
    console.log("Sort changed to :");
    console.log(value.value);
    setSort(value.value);
  };

  const itemClickedCategory = (value) => {
    if (value == null) {
      setCategoriesSrch([]);
    } else {
      const values = value.map((v) => v.value);
      console.log(values);
      setCategoriesSrch(values);
    }
  };

  const itemClickedStatus = (value) => {
    if (value == null) {
      setStatusesSrch([]);
    } else {
      const values = value.map((v) => v.value);
      console.log(values);
      setStatusesSrch(values);
    }
  };

  useEffect(() => {
    var impCounts = 0;
    axios
      .post("/api/ideas/getcount", { column: "status", columnVal: "Deployed" })
      .then((response) => {
        if (response.data.success) {
          // console.log("the count used by UI is :::");
          // console.log(response.data.ideas);
          impCounts = response.data.ideas.length;
          // setCategoryCount(iCounts);
          console.log("the implemented ideas are ::");
          console.log(impCounts);
          setIdeasImplemented(impCounts);
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
  }, []);

  useEffect(() => {
    axios.get("/api/ideas/getcategories").then((response) => {
      if (response.data.success) {
        console.log("the categories fetched are : ");
        console.log(response.data.categories);
        const Categories = [];
        var i;
        for (i = 0; i < response.data.categories.length; i++) {
          console.log(response.data.categories[i]);
          Categories.push({
            value: response.data.categories[i],
            label: response.data.categories[i],
          });
        }
        setCategories(Categories);
        console.log("the categories options are : ");
        console.log(Categories);
      } else {
        alert("Couldnt get categories list");
        setCategories([]);
      }
    });
    axios.get("/api/ideas/getstatuses").then((response) => {
      if (response.data.success) {
        console.log("the statuses fetched are : ");
        console.log(response.data.statuses);
        const Statuses = [];
        var i;
        for (i = 0; i < response.data.statuses.length; i++) {
          console.log(response.data.statuses[i]);
          Statuses.push({
            value: response.data.statuses[i],
            label: response.data.statuses[i],
          });
        }
        setStatuses(Statuses);
        console.log("the statuses options are : ");
        console.log(Statuses);
      } else {
        alert("Couldnt get statuses list");
        setStatuses([]);
      }
    });
  }, [refreshVal]);

  const searchValue = (e) => {
    console.log("the value in search field is changed to :: ");
    console.log(e.target.value);
  };

  const searchingNow = (e) => {
    e.preventDefault();
    setRefreshVal(refreshVal + 1);
  };

  useEffect(() => {
    const categories1 = categories.map((c) => c.value);
    const statuses1 = statuses.map((s) => s.value);
    const cSrch = categoriesSrch.length > 0 ? categoriesSrch : categories1;
    const sSrch = statusesSrch.length > 0 ? statusesSrch : statuses1;
    const variables = {
      cSrch: cSrch,
      sSrch: sSrch,
      col: sort.split(" ")[0],
      val: parseInt(sort.split(" ")[1]),
      searchStr: document.getElementById("searchBar").value,
    };
    console.log("the axios params are : ");
    console.log(variables);
    axios.post("/api/ideas/getIdeas", variables).then((response) => {
      if (response.data.success) {
        console.log("the ideas used by UI are :");
        console.log(response.data.ideas);
        setIdeas(response.data.ideas);
      } else {
        alert("Couldnt get idea`s lists");
      }
    });
    // },[sort]);
  }, [sort, categories, statuses, categoriesSrch, statusesSrch, refreshVal]);

  return (
    <Paper className={classes.pageContent}>
      <Form style={{ height: "100%" }}>
        <Grid container spacing={3} style={{ paddingBottom: "25px" }}>
          <Grid xs={3} style={{ paddingTop: "7px", paddingLeft: "9px" }}>
            <form onSubmit={searchingNow}>
              <InputBase
                style={{ fontFamily: "ratiomedium" }}
                placeholder="Search ideas"
                id="searchBar"
                className={classes.searchInput}
                startAdornment={
                  <SearchIcon fontSize="medium" style={{ color: "blue" }} />
                }
                style={{ color: "black" }}
              />
            </form>
          </Grid>
          <Grid xs={3} sm={3}>
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                style={{ fontFamily: "ratiomedium" }}
                id="dropdownSort"
                className="sort__by"
                onChange={SortChanged}
                closeMenuOnSelect={false}
                components={animatedComponents}
                placeholder="Sort By"
                options={optionsSort}
                style={{ padding: "10px" }}
              />
            </FormControl>
          </Grid>
          <Grid xs={3} sm={3}>
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                style={{ fontFamily: "ratiomedium" }}
                id="dropdown2"
                onChange={itemClickedCategory}
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                placeholder="Category"
                options={categories}
                style={{ padding: "10px" }}
              />
            </FormControl>
          </Grid>
          <Grid xs={3} sm={3}>
            <FormControl variant="outlined" className={classes.formControl}>
              <Select
                style={{ fontFamily: "ratiomedium" }}
                id="dropdown2"
                onChange={itemClickedStatus}
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                placeholder="Status"
                options={statuses}
                style={{ padding: "10px" }}
              />
            </FormControl>
          </Grid>
          <Grid xs={12} style={{ paddingTop: "10px" }}>
            <Divider />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid
            className="postscontainer"
            xs={8}
            sm={8}
            style={{ paddingLeft: "10px" }}
          >
            <DisplayFormPaper
              admin={props.admin}
              refreshVal={refreshVal}
              refreshValChanged={refreshValChanged}
              ideas={ideas}
            />
          </Grid>
          <Grid xs={4} style={{ paddingLeft: "20px", paddingRight: "10px" }}>
            <List
              component="nav"
              className={classes.rootTrending}
              aria-label="contacts"
            >
              <ListItem button onClick={handleExpandClick}>
                <ListItemIcon>
                  <WhatshotIcon fontSize="large" style={{ color: "#3C44B1" }} />
                </ListItemIcon>
                <ListItemText fontSize="large">
                  {" "}
                  <strong
                    style={{
                      fontSize: "22px",
                      fontFamily: "ratiobold",
                      color: "#3C44B1",
                    }}
                  >
                    Trending
                  </strong>
                </ListItemText>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreSharpIcon />
                </IconButton>
              </ListItem>
            </List>
            <Collapse
              className={classes.root}
              in={expanded}
              timeout="auto"
              unmountOnExit
            >
              <CardContent className="collapse__card">
                <TrendingIdea refreshVal={refreshVal} />
              </CardContent>
            </Collapse>
            <List
              component="nav"
              className={classes.rootTrending}
              aria-label="contacts"
            >
              <ListItem button onClick={handleExpandClick1}>
                <ListItemIcon>
                  <ForumIcon fontSize="large" style={{ color: "#3C44B1" }} />
                </ListItemIcon>
                <ListItemText fontSize="large">
                  {" "}
                  <strong
                    style={{
                      fontSize: "22px",
                      color: "#3C44B1",
                      fontFamily: "ratiobold",
                    }}
                  >
                    Chats
                  </strong>
                </ListItemText>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded1,
                  })}
                  onClick={handleExpandClick1}
                  aria-expanded={expanded1}
                  aria-label="show more"
                >
                  <ExpandMoreSharpIcon />
                </IconButton>
              </ListItem>
            </List>
            <Collapse
              className={classes.root}
              in={expanded1}
              timeout="auto"
              unmountOnExit
            >
              <CardContent>
                <Chats />
              </CardContent>
            </Collapse>
            <Grid xs={11}>
              <Paper
                elevation={3}
                style={{ maxWidth: "350px", marginTop: "16px" }}
              >
                <div className="users__inflow1">
                  <div className="inflow__title">Ideas Implemented</div>
                  <div className="inflow__count">
                    <CheckCircleIcon style={{ fontSize: "32px" }} />
                    <CountUp end={ideasImplemented} duration={5} />
                  </div>
                  <div className="inflow__percentage">
                    <ArrowUpwardIcon /> 13.8%
                  </div>
                </div>
              </Paper>
            </Grid>

            <Grid xs={11}>
              <Paper
                elevation={3}
                style={{ maxWidth: "350px", marginTop: "16px" }}
              >
                <div className="users__inflow1">
                  <div className="inflow__title">Active Brainstormers</div>
                  <div className="inflow__count">
                    <PersonIcon style={{ fontSize: "42px" }} />
                    <CountUp end={activeBrainstormers} duration={5} />
                  </div>
                  <div className="inflow__percentage">
                    <ArrowUpwardIcon /> 13.8%
                  </div>
                </div>
              </Paper>
            </Grid>

            <Grid xs={11}>
              <Paper
                elevation={3}
                style={{ maxWidth: "350px", marginTop: "16px" }}
              >
                <div className="users__inflow1">
                  <div className="inflow__title">Ideas Posted</div>
                  <div className="inflow__count">
                    <EmojiObjectsOutlinedIcon style={{ fontSize: "42px" }} />
                    <CountUp end={ideasPosted} duration={5} />
                  </div>
                  {/* <div className="inflow__percentage"><ArrowUpwardIcon/> 13.8%</div> */}
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Form>
    </Paper>
  );
}
