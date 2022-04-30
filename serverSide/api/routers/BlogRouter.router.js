const express = require('express');
const router = express.Router()
const multer = require('multer');
const blog = require('../models/Blog.model');
const cours = require('../models/course.model')
var diskstorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        const mimeType = file.mimetype.split('/');
        // const fileType = mimeType[1];
        const fileName = file.originalname;
        cb(null, fileName);
        // cb(null, file.filename + '-' + Date.now());
    }
});
var storage = multer({ storage: diskstorage }).single('image');


router.post('/addBlog', storage, async(req, res) => {
    // console.log(req.body.title)
    // console.log(req.file.originalname)
    const blg = new blog({
        title: req.body.title,
        module: req.body.module,
        image: 'http://localhost:3100/uploads/' + req.file.originalname
    })
    try {
        await blg.save();

        return res.json({ status: 500, message: "the blog added succesfully" });
    } catch (error) {
        return res.json({ status: true, message: error })
    }
});



router.get('/listblog', async(req, res) => {
    try {
        courses = await blog.find().populate('courses')
            // console.log("cours:", courses)
        return res.send(courses)
    } catch (error) {
        return res.send({ status: true, message: 'error in fetching the blogs' })
    }
})



//  add course
router.post('/addCourse/:id', async(req, res) => {
    blg = await blog.findById({ _id: req.params.id })
        // console.log(blg)
    const course = new cours({
        content: req.body.data.content,
        blog: blg,
    })
    try {
        await course.save();
        blg.courses.push(course)
        blgs = await blg.save();
        return res.json({ status: 500, message: "the blog has been added succesfully" });
    } catch (error) {
        return res.json({ status: true, message: error })
    }
})

router.post('/addImageToBlog', storage, async(req, res) => {
    blg = await blog.findById({ _id: req.body.id })
    const course = new cours({
        image: 'http://localhost:3100/uploads/' + req.file.originalname,
        blog: blg,
    })
    try {
        await course.save();
        blg.courses.push(course)
        blgs = await blg.save();
        // console.log(blgs)
        return res.json({ status: 500, message: "the blog has been added succesfully" });
    } catch (error) {
        return res.json({ status: true, message: error })
    }
})




router.get('/Searchblog/:term', async(req, res) => {
    try {
        const blogs = await (await blog.find({ title: req.params.term }).populate('courses'));
        return res.send(blogs)

    } catch (error) {
        return res.send({ status: true, message: "Not Found any blogs" })
    }
})

module.exports = router;
// module.exports = router;