// import React, { useEffect, useState } from "react";
// import { Layout, Menu } from "antd";
// import axios from "axios";
// // import { Card, Avatar, Col, Typography, Row, Button } from "antd";
// import { Col, Row, Button } from "antd";
// import TuneSharpIcon from "@material-ui/icons/TuneSharp";
// import { Divider } from "@material-ui/core";
// import PersonIcon from "@material-ui/icons/Person";
// import Icon from "@ant-design/icons";
// import { MessageFilled } from "@ant-design/icons";
// import "./Test.css";
// import TypeAheadDropDown from "./SearchBar.js";
// import cities from "./cities.js";
// import SearchIcon from "@material-ui/icons/Search";
// // import { IconButton } from '@material-ui/core';
// // import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons
// import Select from "react-select";
// import makeAnimated from "react-select/animated";
// // import Title from "antd/lib/skeleton/Title";
// import { makeStyles } from "@material-ui/core/styles";
// import clsx from "clsx";
// import Card from "@material-ui/core/Card";
// import CardHeader from "@material-ui/core/CardHeader";
// import CardMedia from "@material-ui/core/CardMedia";
// import CardContent from "@material-ui/core/CardContent";
// import CardActions from "@material-ui/core/CardActions";
// import Collapse from "@material-ui/core/Collapse";
// import Avatar from "@material-ui/core/Avatar";
// import IconButton from "@material-ui/core/IconButton";
// import Typography from "@material-ui/core/Typography";
// import { blue, red } from "@material-ui/core/colors";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import ShareIcon from "@material-ui/icons/Share";
// import ExpandMoreSharpIcon from "@material-ui/icons/ExpandMoreSharp";
// // import ExpandMoreSharpIcon from '@material-ui/icons/ExpandMoreSharp';
// import MoreVertIcon from "@material-ui/icons/MoreVert";
// // const { Title } = Typography;
// // const { Meta } = Card;
// const animatedComponents = makeAnimated();
// const options = [
//   { value: "Date ⬆", label: "Date ⬆" },
//   { value: "Likes ⬆", label: "Likes ⬆" },
//   { value: "Comments ⬆", label: "Comments ⬆" },
//   { value: "Category ⬆", label: "Category ⬆" },
//   { value: "Status ⬆", label: "Status ⬆" },
//   { value: "Title ⬆", label: "Title ⬆" },
//   { value: "Date ⬇", label: "Date ⬇" },
//   { value: "Likes ⬇", label: "Likes ⬇" },
//   { value: "Comments ⬇", label: "Comments ⬇" },
//   { value: "Category ⬇", label: "Category ⬇" },
//   { value: "Status ⬇", label: "Status ⬇" },
//   { value: "Title ⬇", label: "Title ⬇" },
// ];
// const { SubMenu } = Menu;
// const { Header, Content, Footer, Sider } = Layout;
// const useStyles = makeStyles((theme) => ({
//   root: {
//     maxWidth: 350,
//     backgroundColor: "#e0ebeb",
//   },
//   media: {
//     height: 0,
//     paddingTop: "15.25%", // 16:9
//   },
//   expand: {
//     transform: "rotate(0deg)",
//     marginLeft: "auto",
//     transition: theme.transitions.create("transform", {
//       duration: theme.transitions.duration.shortest,
//     }),
//   },
//   expandOpen: {
//     transform: "rotate(180deg)",
//   },
//   avatar: {
//     backgroundColor: blue[800],
//   },
// }));

// function Test(props) {
//   const [titles, setTitles] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [statuses, setStatuses] = useState([]);
//   const [ideas, setIdeas] = useState([]);
//   const [titlesSrch, setTitlesSrch] = useState([]);
//   const [categoriesSrch, setCategoriesSrch] = useState([]);
//   const [statusesSrch, setStatusesSrch] = useState([]);
//   // const [Bcc, setBcc] = useState("Title Ascending");
//   const classes = useStyles();
//   const [expanded, setExpanded] = React.useState(false);
//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

//   const cardClicked = (e) => {
//     // console.log("The card is clicked  ::"  )
//     // console.log(e.title)
//   };

//   useEffect(() => {
//     axios.get("/api/ideas/gettitles").then((response) => {
//       if (response.data.success) {
//         console.log("the titles fetched are : ");
//         console.log(response.data.titles);
//         const Titles = [];
//         var i;
//         for (i = 0; i < response.data.titles.length; i++) {
//           console.log(response.data.titles[i]);
//           Titles.push({
//             value: response.data.titles[i],
//             label: response.data.titles[i],
//           });
//         }
//         setTitles(Titles);
//         console.log("the titles options are : ");
//         console.log(Titles);
//       } else {
//         alert("Couldnt get titles list");
//         setTitles([]);
//       }
//     });
//     axios.get("/api/ideas/getcategories").then((response) => {
//       if (response.data.success) {
//         console.log("the categories fetched are : ");
//         console.log(response.data.categories);
//         const Categories = [];
//         var i;
//         for (i = 0; i < response.data.categories.length; i++) {
//           console.log(response.data.categories[i]);
//           Categories.push({
//             value: response.data.categories[i],
//             label: response.data.categories[i],
//           });
//         }
//         setCategories(Categories);
//         console.log("the categories options are : ");
//         console.log(Categories);
//       } else {
//         alert("Couldnt get categories list");
//         setCategories([]);
//       }
//     });
//     axios.get("/api/ideas/getstatuses").then((response) => {
//       if (response.data.success) {
//         console.log("the statuses fetched are : ");
//         console.log(response.data.statuses);
//         const Statuses = [];
//         var i;
//         for (i = 0; i < response.data.statuses.length; i++) {
//           console.log(response.data.statuses[i]);
//           Statuses.push({
//             value: response.data.statuses[i],
//             label: response.data.statuses[i],
//           });
//         }
//         setStatuses(Statuses);
//         console.log("the statuses options are : ");
//         console.log(Statuses);
//       } else {
//         alert("Couldnt get statuses list");
//         setStatuses([]);
//       }
//     });
//   }, []);

//   useEffect(() => {
//     const titles1 = titles.map((t) => t.value);
//     const categories1 = categories.map((c) => c.value);
//     const statuses1 = statuses.map((s) => s.value);
//     const tSrch = titlesSrch.length > 0 ? titlesSrch : titles1;
//     const cSrch = categoriesSrch.length > 0 ? categoriesSrch : categories1;
//     const sSrch = statusesSrch.length > 0 ? statusesSrch : statuses1;
//     const variables = {
//       tSrch: tSrch,
//       cSrch: cSrch,
//       sSrch: sSrch,
//     };
//     console.log("the axios params are : ");
//     console.log(variables);
//     axios.post("/api/ideas/getIdeas", variables).then((response) => {
//       if (response.data.success) {
//         console.log(response.data.ideas);
//         setIdeas(response.data.ideas);
//       } else {
//         alert("Couldnt get idea`s lists");
//       }
//     });
//   }, [titles, categories, statuses, titlesSrch, categoriesSrch, statusesSrch]);

//   const searchValue = (e) => {
//     // console.log("the value in search field is changed to :: ");
//     // console.log(e.target.value);
//   };
//   const searchTriggered = () => {
//     console.log("The value triggering the search is ::");
//     console.log(document.getElementById("searchBar").value);
//     setTitlesSrch(titles);
//     setCategoriesSrch(categories);
//     setStatusesSrch(statuses);
//     axios
//       .post("/api/ideas/searchIdeas", {
//         searchStr: document.getElementById("searchBar").value,
//       })
//       .then((response) => {
//         if (response.data.success) {
//           console.log(response.data.ideas);
//           setIdeas(response.data.ideas);
//         } else {
//           alert("Couldnt get idea`s lists");
//         }
//       });
//   };

//   const itemClickedTitle = (value) => {
//     const values = value.map((v) => v.value);
//     console.log(values);
//     setTitlesSrch(values);
//   };
//   const itemClickedCategory = (value) => {
//     const values = value.map((v) => v.value);
//     console.log(values);
//     setCategoriesSrch(values);
//   };
//   const itemClickedStatus = (value) => {
//     const values = value.map((v) => v.value);
//     console.log(values);
//     setStatusesSrch(values);
//   };

//   const renderCards = ideas.map((idea, index) => {
//     return (
//       <Col
//         key={idea._id}
//         xs={{ span: 24, offset: 0 }}
//         md={{ span: 12, offset: 0 }}
//         lg={{ span: 7, offset: 0 }}
//       >
//         <Card className={classes.root} onClick={cardClicked(idea)}>
//           <CardHeader
//             avatar={
//               <Avatar aria-label="recipe" className={classes.avatar}>
//                 {idea.email ? (
//                   idea.email.substring(0, 1).toUpperCase()
//                 ) : (
//                   <PersonIcon />
//                 )}
//               </Avatar>
//             }
//             action={
//               <IconButton aria-label="settings">
//                 <MoreVertIcon />
//               </IconButton>
//             }
//             title={idea.title}
//             subheader={idea.createdAt}
//           />
//           <CardContent>
//             <Typography variant="body2" color="textSecondary" component="p">
//               {idea.body.substring(0, 50)}...
//             </Typography>
//           </CardContent>
//           <CardActions disableSpacing>
//             <IconButton aria-label="add to favorites">
//               <FavoriteIcon className="like__button" />
//             </IconButton>
//             <IconButton aria-label="share">
//               <MessageFilled />
//             </IconButton>
//             <IconButton
//               className={clsx(classes.expand, {
//                 [classes.expandOpen]: expanded,
//               })}
//               onClick={handleExpandClick}
//               aria-expanded={expanded}
//               aria-label="show more"
//             >
//               <ExpandMoreSharpIcon />
//             </IconButton>
//           </CardActions>
//           <Collapse in={expanded} timeout="auto" unmountOnExit>
//             <CardContent>
//               <Typography paragraph>{idea.body}</Typography>
//             </CardContent>
//           </Collapse>
//         </Card>
//       </Col>
//     );
//   });

//   return (
//     <div>
//       <Layout className="layout1">
//         <Sider
//           className="sider"
//           breakpoint="lg"
//           collapsedWidth="0"
//           onBreakpoint={(broken) => {
//             console.log(broken);
//           }}
//           onCollapse={(collapsed, type) => {
//             console.log(collapsed, type);
//           }}
//         >
//           <div className="logo" />
//           <div className="filter">
//             <TuneSharpIcon className="filter__icon" />
//             <p
//               style={{ verticalAlign: "center", padding: "0" }}
//               className="filter__label"
//             >
//               {" "}
//               Filter Menu
//             </p>
//           </div>
//           <Select
//             id="dropdown1"
//             onChange={itemClickedTitle}
//             closeMenuOnSelect={false}
//             components={animatedComponents}
//             isMulti
//             placeholder="Title"
//             options={titles}
//             style={{ padding: "10px" }}
//           />
//           <Select
//             id="dropdown2"
//             onChange={itemClickedCategory}
//             closeMenuOnSelect={false}
//             components={animatedComponents}
//             isMulti
//             placeholder="Category"
//             options={categories}
//             style={{ padding: "10px" }}
//           />
//           <Select
//             id="dropdown2"
//             onChange={itemClickedStatus}
//             closeMenuOnSelect={false}
//             components={animatedComponents}
//             isMulti
//             placeholder="Status"
//             options={statuses}
//             style={{ padding: "10px" }}
//           />
//           {/* <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} >
//         <Menu.Item key="1">
//           nav 1
//         </Menu.Item>
//         <Menu.Item key="2">
//           nav 2
//         </Menu.Item>
//         <Menu.Item key="3">
//           nav 3
//         </Menu.Item>
//         <Menu.Item key="4">
//           nav 4
//         </Menu.Item>
//       </Menu> */}
//         </Sider>
//         <Divider orientation="vertical" flexItem />
//         <Layout className="layout2">
//           {/* <Header className="site-layout-sub-header-background" style={{ padding: 0 }} /> */}
//           <Content className="content" style={{ margin: "24px 16px 0" }}>
//             <div
//               className="site-layout-background"
//               style={{ padding: 24, minHeight: 360 }}
//             >
//               <div className="sort__div">
//                 <p style={{ verticalAlign: "center" }}>Sort By</p>
//                 <Select
//                   id="dropdownSort"
//                   className="sort__by"
//                   // onChange={SortChanged}
//                   closeMenuOnSelect={false}
//                   components={animatedComponents}
//                   placeholder="Sort By"
//                   options={options}
//                   style={{ padding: "10px" }}
//                 />
//               </div>
//               <div
//                 className="search__div"
//                 style={{ marginBottom: "20px", marginTop: "20px" }}
//               >
//                 <TypeAheadDropDown
//                   id="searchDropdown"
//                   iteams={cities}
//                   onChange={searchValue}
//                 />
//                 <IconButton aria-label="search" onClick={searchTriggered}>
//                   <SearchIcon />
//                 </IconButton>
//               </div>
//               <Row gutter={[32, 32]}>{renderCards}</Row>
//               {/* <Row>
//           <Col xs={{ span: 24, offset: 0 }} md={{ span: 12, offset: 0 }} lg={{ span: 7, offset: 1 }} style={{background:"red"}}>
//             Col
//           </Col>
//           <Col xs={{ span: 24, offset: 0 }} md={{ span: 12, offset: 0 }} lg={{ span: 7, offset: 1 }} style={{background:"green"}}>
//             Col
//           </Col>
//           <Col xs={{ span: 24, offset: 0 }} md={{ span: 12, offset: 0 }} lg={{ span: 7, offset: 1 }} style={{background:"blue"}}>
//             Col
//           </Col>
//         </Row> */}
//               {/* <Title level={2}> Mailing List </Title> */}
//               {/* <Row gutter={[32, 16]}>{renderCards}</Row> */}
//             </div>
//           </Content>
//           {/* <Footer style={{ textAlign: 'center' }}>© Copyright Kfintech 2020 | All Rights Reserved.</Footer> */}
//         </Layout>
//       </Layout>
//       ,
//     </div>
//   );
// }

// export default Test;
