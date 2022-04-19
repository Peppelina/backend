import Post from "../Models/Post.js";

class PostService {
    static async create(post) {
        const createdPost = await Post.create(post)
        return createdPost
    }

    static async getAll(limit, page) {
        const posts = await Post.find().skip(limit*(page-1)).limit(limit)
        const totalCount = await Post.find().count()
        return [posts,totalCount]
    }

    static async getOne(id) {
        if (!id) {
            throw new Error('не указан id')
        }
        const post = await Post.findById(id)
        return post
    }

    static async update(post) {
        if (!post._id) {
            throw new Error('не указан id')
        }
        const updatePost = await Post.findByIdAndUpdate(post._id, post, {new: true})
        return updatePost
    }

    static async delete(id) {
        if (!id) {
            throw new Error('не указан id')
        }
        const post = await Post.findByIdAndDelete(id)
        return post
    }
}

export default PostService