const express = require("express");
const router = express.Router();
const { Idea } = require("../models/Idea");

const { auth } = require("../middleware/auth");
const multer = require("multer");
const { query } = require("express");

//blog.js routes has a route of uplaoding files. That is still needed,so do not delete that file.

// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".png" && ext !== ".mp4") {
      return cb(res.status(400).end("only jpg, png, mp4 is allowed"), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage: storage }).single("file");

//=================================
//             Blog
//=================================

// fieldname: 'file',
// originalname: 'React.png',
// encoding: '7bit',
// mimetype: 'image/png',
// destination: 'uploads/',
// filename: '1573656172282_React.png',
// path: 'uploads/1573656172282_React.png',
// size: 24031

router.post("/uploadfiles", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.get("/gettitles", (req, res) => {
  // console.log("The unique titles are :: ");
  Idea.distinct("title").exec((err, titles) => {
    if (err) return res.status(400).send(err);
    // console.log(titles)
    res.status(200).json({ success: true, titles });
  });
});

router.get("/getcategories", (req, res) => {
  // console.log("The unique categories are :: ");
  Idea.distinct("category").exec((err, categories) => {
    if (err) return res.status(400).send(err);
    // console.log(categories)
    res.status(200).json({ success: true, categories });
  });
});

router.get("/getstatuses", (req, res) => {
  // console.log("The unique statuses are :: ");
  Idea.distinct("status").exec((err, statuses) => {
    if (err) return res.status(400).send(err);
    // console.log(statuses)
    res.status(200).json({ success: true, statuses });
  });
});

router.post("/createIdea", (req, res) => {
  let idea = new Idea({
    title: req.body.title,
    email: req.body.email,
    category: req.body.category,
    body: req.body.body,
    anonymous: req.body.anonymous,
    status: req.body.status,
    likes: req.body.likes,
    unlikes: req.body.unlikes,
    comments: req.body.comments,
    time: req.body.time,
  });

  idea.save((err, IdeaInfo) => {
    if (err) return res.json({ success: false, err });
    console.log("Idea saved successfully");
    return res.status(200).json({ success: true, IdeaInfo });
  });
});

router.post("/searchIdeas", (req, res) => {
  Idea.find({
    title: { $regex: ".*" + req.body.searchStr + ".*", $options: "i" },
  }).exec((err, ideas) => {
    // Idea.find().exec((err, ideas) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, ideas });
    console.log("the request body is : ");
    console.log(req.body);
    console.log("The ideas found are : ");
    console.log(ideas);
  });
});

router.post("/addComment", (req, res) => {
  Idea.update(
    { _id: req.body.ideaId },
    { $push: { comments: req.body.comment } }
  ).exec((err, ideas) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, ideas });
    console.log("the request body is : ");
    console.log(req.body);
    console.log("The idea commented is : ");
    console.log(ideas);
  });
});

router.post("/getIdeas", (req, res) => {
  const query = {};
  const col = req.body.col;
  const val = req.body.val;
  query[col] = val;
  console.log(query);
  if (col == "likes") {
    if (val == "-1") {
      Idea.aggregate([
        {
          $addFields: {
            answers_count: {
              $subtract: [
                { $size: { $ifNull: ["$likes", []] } },
                { $size: { $ifNull: ["$unlikes", []] } },
              ],
            },
          },
        },
        {
          $sort: { answers_count: -1 },
        },
      ]).exec((err, ideas) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, ideas });
        console.log(ideas);
      });
    } else {
      Idea.aggregate([
        {
          $addFields: {
            answers_count: {
              $subtract: [
                { $size: { $ifNull: ["$likes", []] } },
                { $size: { $ifNull: ["$unlikes", []] } },
              ],
            },
          },
        },
        {
          $sort: { answers_count: 1 },
        },
      ]).exec((err, ideas) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, ideas });
        console.log(ideas);
      });
    }
  }
  // Idea.find()
  else
    Idea.find({
      status: { $in: req.body.sSrch },
      category: { $in: req.body.cSrch },
    })
      .sort(query)
      .exec((err, ideas) => {
        // Idea.find().exec((err, ideas) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, ideas });
        // console.log("the request body is : ");
        // console.log(req.body);
        // console.log("The ideas found are : Server");
        console.log(ideas);
      });
});

router.post("/getMyIdeas", (req, res) => {
  Idea.find({ email: req.body.email })
    .sort({ time: -1 })
    .exec((err, ideas) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, ideas });
      // console.log("the request body is : ");
      // console.log(req.body);
      // console.log("The ideas found are : ");
      // console.log(ideas);
    });
});

router.get("/getTrending", (req, res) => {
  var date = new Date();
  date.setDate(date.getDate() - 1);
  Idea.aggregate([
    { $match: { time: { $gt: date } } },
    {
      $addFields: {
        answers_count: {
          $subtract: [
            { $size: { $ifNull: ["$likes", []] } },
            { $size: { $ifNull: ["$unlikes", []] } },
          ],
        },
      },
    },
    {
      $sort: { answers_count: -1 },
    },
  ]).exec((err, ideas) => {
    // Idea.find().exec((err, ideas) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, ideas });
    // console.log("The ideas found are : ");
    // console.log(ideas);
  });
});

router.delete("/deleteIdea/:id", (req, res) => {
  console.log("The Idea being deleted is " + req.params.id);
  Idea.findOneAndDelete({ _id: req.params.id }).exec((err, idea) => {
    if (idea == null) {
      console.log("didnt find the Idea");
    }
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, idea });
  });
});

router.post("/getIdea", (req, res) => {
  console.log("the idea being fetched is " + req.body.ideaId);
  Idea.findOne({ _id: req.body.ideaId }).exec((err, idea) => {
    if (err) {
      console.log("error in backend \n" + err);
      return res.status(400).send(err);
    } else {
      console.log("Sucessfully fetched the Idea");
      res.status(200).json({ success: true, idea });
    }
  });
});

router.post("/likeIdea", (req, res) => {
  Idea.findByIdAndUpdate(
    req.body.ideaId,
    { likes: req.body.likes, unlikes: req.body.unlikes },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Liked/unliked idea : ", docs);
      }
    }
  );
});

router.patch("/editIdea", (req, res) => {
  const title = req.body.title;
  const email = req.body.email;
  const category = req.body.category;
  const body = req.body.body;
  const anonymous = req.body.anonymous;
  const likes = req.body.likes;
  const unlikes = req.body.unlikes;
  const comments = req.body.comments;
  const time = req.body.time;
  const status = req.body.status;
  console.log("the idea being edited is " + req.body.ideaId);
  Idea.findOneAndUpdate(
    { _id: req.body.ideaId },
    {
      $set: {
        title,
        email,
        category,
        body,
        anonymous,
        likes,
        unlikes,
        comments,
        time,
        status,
      },
    },
    { new: true }
  ).exec((err, idea) => {
    if (err) {
      console.log("error in backend \n" + err);
      return res.status(400).send(err);
    }
    if (!idea) {
      console.log("no idea found");
    }
    console.log("Sucessfulyy updated the idea");
    res.status(200).json({ success: true, idea });
  });
});

module.exports = router;
