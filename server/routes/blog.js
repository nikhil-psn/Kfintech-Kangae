const express = require("express");
const router = express.Router();
const { Blog } = require("../models/Blog");

const { auth } = require("../middleware/auth");
const multer = require("multer");
const { query } = require("express");

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

router.post("/createPost", (req, res) => {
  let blog = new Blog({
    content: req.body.content,
    To: req.body.To,
    Cc: req.body.Cc,
    // writer: req.body.userID,
    Bcc: req.body.Bcc,
  });

  blog.save((err, postInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true, postInfo });
  });

  //생각 해보니  세이브 할떄 populate 할필요가 없다.   가져올떄 하면 되니깐...
  // blog.save((err, response) => {
  //     if (err) return res.json({ success: false, err });
  //     Blog.find({ _id: response._id })
  //         .populate('writer')
  //         .exec((err, result) => {
  //             let postInfo = result[0]
  //             if (err) return res.json({ success: false, err });
  //             return res.status(200).json({ success: true,  postInfo });
  //         })
  // });
});

router.get("/getBcc", (req, res) => {

  console.log("The unique Bcc's are :: ");
  Blog.distinct("Bcc").exec((err, blogs) => {
    if(blogs){
      console.log(blogs)
    }
    else{
      console.log("No Bcc's found")
    }
  });
});

router.get("/getBlogs", (req, res) => {
  Blog.find().exec((err, blogs) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, blogs });
  });
});
router.get("/getBlogsBccAsc", (req, res) => {
  // const srch = req.body.srch;
  Blog.find()
    .sort({ Bcc: 1 })
    .exec((err, blogs) => {
      if (err) {
        return res.status(400).send(err);
        console.log("Error occurred");
      }
      res.status(200).json({ success: true, blogs });
      // console.log("The blogs found are ::");
      // console.log(blogs);
    });
});
// router.get("/getBlogsBccAsc", (req, res) => {
//   Blog.find()
//     .sort({ Bcc: 1 })
//     .exec((err, blogs) => {
//       if (err) return res.status(400).send(err);
//       res.status(200).json({ success: true, blogs });
//     });
// });
router.get("/getBlogsBccDesc", (req, res) => {
  console.log("search text is ::");
  console.log(req.body.srch);
  Blog.find({ Bcc: req.body.srch })
    .sort({ Bcc: -1 })
    .exec((err, blogs) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, blogs });
    });
});

router.get("/getFinanceBlogs", (req, res) => {
  Blog.find({ type: "Finance" }).exec((err, blogs) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, blogs });
  });
});
router.get("/getNewsBlogs", (req, res) => {
  Blog.find({ type: "News" }).exec((err, blogs) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, blogs });
  });
});
router.get("/getProjectsBlogs", (req, res) => {
  Blog.find({ type: "Projects" }).exec((err, blogs) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, blogs });
  });
});
router.get("/getTechnologyBlogs", (req, res) => {
  Blog.find({ type: "Technology" }).exec((err, blogs) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, blogs });
  });
});

router.delete("/deletePost/:id", (req, res) => {
  console.log("The Email being deleted is " + req.params.id);
  Blog.findOneAndDelete({ _id: req.params.id }).exec((err, post) => {
    if (post == null) {
      console.log("didnt find the Email");
    }
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, post });
  });
});

router.post("/getPost", (req, res) => {
  console.log("the post being fetched is " + req.body.postId);
  Blog.findOne({ _id: req.body.postId }).exec((err, post) => {
    if (err) {
      console.log("error in backend \n" + err);
      return res.status(400).send(err);
    } else {
      console.log("Sucessfully fetched the Email");
      res.status(200).json({ success: true, post });
    }
  });
});

router.patch("/editPost", (req, res) => {
  const To = req.body.To;
  const content = req.body.content;
  const Cc = req.body.Cc;
  const Bcc = req.body.Bcc;
  console.log("the email being edited is " + req.body.postId);
  Blog.findOneAndUpdate(
    { _id: req.body.postId },
    {
      $set: {
        To,
        content,
        Cc,
        Bcc,
      },
    },
    { new: true }
  ).exec((err, post) => {
    if (err) {
      console.log("error in backend \n" + err);
      return res.status(400).send(err);
    }
    if (!post) {
      console.log("no email found");
    }
    console.log("Sucessfulyy updated the email");
    res.status(200).json({ success: true, post });
  });
});

module.exports = router;
