import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";
import Controls from "../controls/Controls";
import Popup from "../controls/Popup";
import { useForm, Form } from "../useForm.js";
import QuillEditor from "../../../editor/QuillEditor2";
import { useSelector } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const CategoryOptions = [
  { id: "Accounting", title: "Accounting" },
  { id: "Development", title: "Development" },
  { id: "Finance", title: "Finance" },
  { id: "HR", title: "HR" },
  { id: "Operations", title: "Operations" },
  { id: "Marketing", title: "Marketing" },
  { id: "Technology", title: "Technology" },
];

const initialFValues = {
  id: 0,
  fullName: "",
  departmentId: "",
  isPermanent: false,
};

export default function EmployeeForm() {
  const user = useSelector((state) => state.user);

  const [isPermanent, setIsPermanent] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [content1, setContent1] = useState("");
  const [files, setFiles] = useState([]);
  const onFirstRender = "";

  const onEditorChange = (value) => {
    setContent1(value);
    console.log(content1);
  };

  const onFilesChange = (files) => {
    setFiles(files);
  };

  const classes = useStyles();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("fullName" in fieldValues)
      temp.fullName = fieldValues.fullName ? "" : "This field is required.";
    if ("departmentId" in fieldValues)
      temp.departmentId =
        fieldValues.departmentId.length != 0 ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("the name is :");
      console.log(document.getElementsByName("fullName")[0].value);
      console.log("the category is :");
      console.log(document.getElementsByName("departmentId")[0].value);
      console.log("the editor  value is :");
      console.log(content1);
      console.log("Anonymous?");
      console.log(isPermanent);
      if (user.userData && !user.userData.isAuth) {
        alert("Please Log in first");
      } else {
        console.log("the user is :");
        console.log(user.userData);
        console.log(user.userData.email);
      }
      const d = new Date();
      console.log(d);
      const variables = {
        title: document.getElementsByName("fullName")[0].value,
        email: user.userData.email,
        category: document.getElementsByName("departmentId")[0].value,
        body: content1,
        anonymous: isPermanent,
        likes: [],
        unlikes: [],
        comments: [],
        status: "Ideation",
        time: d,
      };

      axios.post("/api/ideas/createIdea", variables).then((response) => {
        if (response.data.success) {
          setOpenPopup(true);
          // message.success("Idea Created Successfully!");
          // setContent1("");
          // resetForm();
          setTimeout(() => {
            window.location = "/ideas";
          }, 200);
        }
      });
    }
  };

  const CheckboxChange = (v) => {
    console.log("Checkbox changed");
    if (isPermanent) {
      setIsPermanent(false);
      console.log("checkbox unchecked");
    } else {
      setIsPermanent(true);
      console.log("checkbox checked");
    }
  };

  // const handleEditorChange = (content, editor) => {
  //   console.log("Content was updated:", content);
  //   console.log(editor.value)
  //   // setEditorContent(content)
  // };
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container xs={12}>
        <Grid item xs={8}>
          <Controls.Input
            id="name_id"
            name="fullName"
            label="Title"
            value={values.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
          />
          <Controls.Select
            id="category_id"
            className="categoryselection"
            name="departmentId"
            label="Category"
            value={values.departmentId}
            onChange={handleInputChange}
            options={CategoryOptions}
            error={errors.departmentId}
          />
          <Controls.Checkbox
            id="isPermanent"
            name="isPermanent"
            label="Anonymous"
            value={isPermanent}
            onChange={CheckboxChange}
          />
          <QuillEditor
            style={{ width: "95%" }}
            placeholder={"What is your idea?"}
            onEditorChange={onEditorChange}
            onFilesChange={onFilesChange}
            onFirstRender={onFirstRender}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Tips
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Kindly refrain from posting redundant ideas. Go through the
                  existing ideas to check if an indistinguishable idea has
                  already been put up. Leverage this portal to bring your ideas
                  in the view of Kfintech's Management. Do not try to criticize,
                  demean or blame anyone. Do not use offensive language.
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Leverage this portal to bring your ideas in the view of
                  Kfintech's Management.
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Do not try to criticize, demean or blame anyone. Do not use
                  offensive language.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} style={{ paddingTop: "16px" }}>
          <div>
            {/* <Controls.Button type="submit" text="Submit"  onClick ={()=>setOpenPopup(true)} /> */}
            <Controls.Button type="submit" text="Submit" />
            <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}></Popup>
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
