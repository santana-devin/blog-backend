const { Posts } = require('../models');

module.exports = {
    async index(req,res){
        const posts = await Posts.findAll();
        res.json(posts);
        console.log(req.params);
    },
    async store(req,res){
        const post = await Posts.findByPk(req.params.id);
        res.json(post);
    },
    async create(req,res){
        try {
            const post = await Posts.create(req.body);
            res.json(post);
        } catch (error) {
            res.status(500).json({"err": error });   
        }        
    },
    async update(req,res){
        try {
            const post = await Posts.update(req.body,{ where:{id:req.params.id } });
            res.json(post);
        } catch (error) {
            res.status(500).json({"err": error });   
        }
    },
    async delete(req,res){        
        try {
            const deleted = await Posts.destroy( {
                where: { id: req.params.id }
            });
            if(deleted){
                res.status(204).send("Post Deletado");
            }
            throw new Error("post not found!");
        } catch (error) {
            res.status(500).json({"err" : error});
        }
    }
}