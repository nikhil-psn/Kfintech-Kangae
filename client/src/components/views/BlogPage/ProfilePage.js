import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "./controls/Controls";
import { useForm, Form } from "./useForm";
import { Editor } from "@tinymce/tinymce-react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
// import Select from '@material-ui/core/Select';
import Select from "react-select";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import { Divider } from "@material-ui/core";
import "./Test.css";
import TypeAheadDropDown from "./SearchBar.js";
import makeAnimated from "react-select/animated";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { blue, red } from "@material-ui/core/colors";
import "./DisplayForm.css";
import "./DisplayFormPaper.css";
import DisplayFormPaper from "./DisplayFormPaper.js";
import Trending from "./Trending";
// import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Header from "./Header";
import Paper from "@material-ui/core/Paper";
import { useSelector } from "react-redux";

const optionsSort = [
  { value: "Date 1", label: "Date ⬆" },
  { value: "Likes 1", label: "Likes ⬆" },
  { value: "Comments 1", label: "Comments ⬆" },
  { value: "Category 1", label: "Category ⬆" },
  { value: "Status 1", label: "Status ⬆" },
  { value: "Title 1", label: "Title ⬆" },
  { value: "Date -1", label: "Date ⬇" },
  { value: "Likes -1", label: "Likes ⬇" },
  { value: "Comments -1", label: "Comments ⬇" },
  { value: "Category -1", label: "Category ⬇" },
  { value: "Status -1", label: "Status ⬇" },
  { value: "Title -1", label: "Title ⬇" },
];

const animatedComponents = makeAnimated();

const useStyles = makeStyles((theme) => ({
  appMain: {
    paddingLeft: "0px",
    width: "100%",
  },
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    //textAlign: 'center',
    color: "black",
  },
  searchInput: {
    //opacity: '0.6',
    padding: `10px ${theme.spacing(1)}px`,
    backgroundColor: "#f2f2f2",
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
    backgroundColor: "#e0ebeb",
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

function IdeasPage() {
  const user = useSelector((state) => state.user);
  const classes = useStyles();
  const name = user.userData.email;
  const [votes, setVotes] = useState(4);
  const [categories, setCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [categoriesSrch, setCategoriesSrch] = useState([]);
  const [statusesSrch, setStatusesSrch] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [titlesDropdown, setTitlesDropdown] = useState([]);
  const [sort, setSort] = useState("time -1");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const cardClicked = (e) => {
    // console.log("The card is clicked  ::"  )
    // console.log(e.title)
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
  }, []);

  const searchValue = (e) => {
    console.log("the value in search field is changed to :: ");
    console.log(e.target.value);
  };
  const searchTriggered = () => {
    console.log("The value triggering the search is ::");
    console.log(document.getElementById("searchBar").value);
    setCategoriesSrch(categories);
    setStatusesSrch(statuses);
    axios
      .post("/api/ideas/searchIdeas", {
        searchStr: document.getElementById("searchBar").value,
      })
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.ideas);
          setIdeas(response.data.ideas);
        } else {
          alert("Couldnt get idea`s lists");
        }
      });
  };

  useEffect(() => {
    const categories1 = categories.map((c) => c.value);
    const statuses1 = statuses.map((s) => s.value);
    const cSrch = categoriesSrch.length > 0 ? categoriesSrch : categories1;
    const sSrch = statusesSrch.length > 0 ? statusesSrch : statuses1;
    const variables = {
      email: user.userData.email,

      cSrch: cSrch,
      sSrch: sSrch,
      col: sort.split(" ")[0],
      val: parseInt(sort.split(" ")[1]),
    };
    console.log("the axios params are : ");
    console.log(variables);
    axios.post("/api/ideas/getMyIdeas", variables).then((response) => {
      if (response.data.success) {
        console.log("the ideas used by UI are :");
        console.log(response.data.ideas);
        setIdeas(response.data.ideas);
      } else {
        alert("Couldnt get idea`s lists");
      }
    });
    // },[sort]);
  }, [sort, categories, statuses, categoriesSrch, statusesSrch]);

  return (
    <div style={{ backgroundColor: "rgb(60,68,177)", paddingBottom: "15px" }}>
      <div
        style={{ minWidth: "100vw", minHeight: "100%" }}
        className={classes.appMain}
        style={{ backgroundColor: "#3C44B1" }}
      >
        <Header style={{ minHeight: "100vh" }} />
        <Paper className={classes.pageContent}>
          <Form style={{ height: "100%" }}>
            <Grid container spacing={3} style={{ paddingBottom: "25px" }}>
              <Grid
                xs={3}
                style={{
                  alignContent: "center",
                  paddingTop: "10.5px",
                  paddingLeft: "15px",
                }}
              >
                {/* <InputBase
                    placeholder="Search topics"
                    className={classes.searchInput}
                    startAdornment={<SearchIcon fontSize="medium"  style={{color:"blue"}}/>}
                    style={{color:"black"}}
                /> */}
                <TypeAheadDropDown
                  id="searchDropdown"
                  iteams={titlesDropdown}
                  onChange={searchValue}
                />
                <IconButton aria-label="search" onClick={searchTriggered}>
                  <SearchIcon />
                </IconButton>
              </Grid>
              <Grid xs={3} sm={3}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <Select
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
                  {/* <InputLabel htmlFor="outlined-age-native-simple">State</InputLabel> */}
                  <Select
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
                <DisplayFormPaper ideas={ideas} />
              </Grid>
            </Grid>
          </Form>
        </Paper>
      </div>
    </div>
  );
}

export default IdeasPage;
