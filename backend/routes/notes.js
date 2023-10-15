const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// ROUTE 1: fetching all the notes using a get request
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json({notes });
});

// ROUTE 2: creating notes using the post request

router.post(
  "/addnotes",
  fetchUser,
  body("title", "Please enter the title for your note").exists(),
  body("description", "Your note goes here").isLength({
    min: 3,
  }),
  body(
    "tag",
    "Enter the tag for your note is related to - Default is General"
  ).isLength({ min: 3 }),

  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    const { title, description, tag } = req.body;
    console.log("woohoo", title, description, tag, "\n");

    try {
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

// ROUTE 3: Updating the existing note

router.put("/updatenote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  const newNote = {};

  console.log(req.body)
  if (title) { newNote.title = title;}
  if (description) {newNote.description = description;}
  if (tag) {newNote.tag = tag;}

  note = await Notes.findById(req.params.id);

  if(!note){
   return res.status(400).send("Not Found")
  }

  if(note.user.toString() !== req.user.id) { return res.status(401).send("Not allowed!")}

  note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
  res.json({note})
});


// ROUTE 4: Deleting an existing note

router.delete("/deletenote/:id", fetchUser, async (req, res) => {
    // const { title, description, tag } = req.body;
    // const newNote = {};
  
    // console.log(req.body)
    // if (title) { newNote.title = title;}
    // if (description) {newNote.description = description;}
    // if (tag) {newNote.tag = tag;}
  
    let note = await Notes.findById(req.params.id);
  
    if(!note){
     return res.status(400).send("Not Found")
    }
  
    if(note.user.toString() !== req.user.id) { return res.status(401).send("Not allowed!")}
  
    await Notes.findByIdAndDelete(req.params.id)
    res.json({"success":"Note has been deleted"})
  });

module.exports = router;
