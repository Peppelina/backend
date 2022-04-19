import PostService from "../Services/PostService.js";

class PostController{
    static async create(req, res) {
        try {
            const newPost = await PostService.create(req.body)
            res.json(newPost)
        }
        catch (e) {
            res.status(500).json(e)
        }
    }

    static async getAll(req, res) {
        try {
            const query = req.query
            const [posts, totalCount] = await PostService.getAll(query.limit, query.page)
            res.header("X-Total-Count", totalCount)
            return res.json(posts)
        }
        catch (e) {
            res.status(500).json(e)
        }
    }



    static async getOne(req, res) {
        try {
            const post = await PostService.getOne(req.params.id)
            return res.json(post)
        }
        catch (e) {
            res.status(500).json(e)
        }
    }

    static async update(req, res) {
        try {
            const updatePost = await PostService.update(req.body)
            return res.json(updatePost)
        }
        catch (e) {
            res.status(500).json(e.message)
        }
    }

    static async delete(req, res) {
        try {
            const post = await PostService.delete(req.params.id)
            return res.json(post)
        }
        catch (e) {
            res.status(500).json(e)
        }
    }
}

export default PostController