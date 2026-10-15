const cl = console.log;

let post = [
    {
        "userId": 1,
        "id": "1",
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    },
    {
        "userId": 1,
        "id": "2",
        "title": "qui est esse",
        "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
    },
    {
        "userId": 1,
        "id": "3",
        "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
    },
    {
        "userId": 1,
        "id": "4",
        "title": "eum et est occaecati",
        "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
    }
]

const PORT = 3000;
const express = require('express');
const app = express();
app.use(express.json())


//GET ALL
app.get('/api/posts', (req, res) => {
    // cl("GET POSTS API CALLED");

    try {
        res.status(200).json({
            data: post,
            success: true
        })
    }
    catch (err) {
        res.status(500).json({
            data: post,
            success: false,
            message: `Error while fetching posts`,
            error: err.message
        })
    }
})



//GET SINGLE
app.get('/api/posts/:id', (req, res) => {
    try {
        let postid = req.params.id;
        let singlepost = post.find(post => post.id === postid);
        if (!singlepost) {
            return res.status(404).json({
                success: false,
                message: `Post with id ${postid} not found`
            })
        }
        res.status(200).json({
            success: true,
            data: singlepost,
            message: `Post with id ${postid} fetched successfully`
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error while fetching post',
            error: err.message
        })
    }
})


//CREATE
app.post('/api/posts', (req, res) => {
    try {
        let data = req.body;
        if (!data.title || !data.body) {
            return res.status(400).json({
                success: false,
                message: `title and content are required failed`
            })
        }
        let new_post = {
            userId: data.userId,
            title: data.title,
            body: data.body,
            id: Date.now().toString(),
            createdAt: Date.now(),
            updatedAt: null
        }
        post.unshift(new_post);
        res.status(201).json({
            success: true,
            data: new_post,
            message: `The post with id ${new_post.id} created successfully`
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error while creating post"
        })
    }
})


//update
app.patch('/api/posts/:id', (req, res) => {
    try {
        let updateId = req.params.id;
        let getIndex = post.findIndex(post => post.id === updateId);
        if (getIndex === -1) {
            return res.status(404).json({
                success: false,
                message: `The post with id ${updateId} is not found`
            })
        }
        // let obj = post.find(ele => ele.id === updateId);

        // let { userId, title, body } = req.body;

        let update_post = {
            ...post[getIndex],
            ...req.body,
            updatedAt: Date.now(),
            id: updateId
        }

        post[getIndex] = update_post;

        res.status(200).json({
            success: true,
            data: update_post,
            message: `The post with id ${updateId} updated successfully`
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: `Something went wrong while updating post`,
            error: err.message,
        })
    }
})

//DELETE
app.delete('/api/posts/:id', (req, res) => {
    try {
        let removeId = req.params.id;
        let getIndex = post.findIndex(p => p.id === removeId);
        if (getIndex == -1) {
            return res.status(404).json({
                success: false,
                message: `The post with id ${removeId} is not found`
            })
        }
        let removepost = post.splice(getIndex, 1);
        res.status(200).json({
            success: true,
            message: `The post with id ${removeId} is removed successfully`,
            data: removepost[0]
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error while deleting post",
            error: err.message
        })
    }
})

app.listen(PORT, () => {
    cl(`server running on port ${PORT}`);
})