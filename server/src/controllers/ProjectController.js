const Domain = require('../models/Domain.js');
const Project = require('../models/Project.js');
const redis_client = require("../config/redis");

module.exports = {
  async allProjects(_req,res){
    try{
      const projects = await Project.find().populate({
        path: 'domains',
        select: ['_id', 'domainName']
      }).exec();
      redis_client.setex("projects", 3600, projects);
      res.status(200).json({ projects });
    } catch(e){
      res.status(500).json({ error: e.message });
    }
  },
  async viewProjectsByDomain(req,res){
    try{
      const domain = await Domain.findById(req.params.id).populate({
        path: 'projects',
        populate: {
          path: 'domains',
          select: ['_id', 'domainName']
        }
      }).exec();
      if(domain){
        res.status(200).json({ projects: domain.projects });
      }else{
        res.status(404).json({ error: "The requested domain doesn't exist" });
      }
    }catch(e){
      res.status(500).json({ error: e });
    }
  },
  async viewProjectById(req,res){
    try{
      const project = await Project.findById(req.params.id).populate({
        path: 'domains',
        select: ['_id', 'domainName']
      }).exec();
      if(project){
        res.status(200).json(project);
      }else{
        res.status(404).json({ error: "The requested project doesn't exist" });
      }
    }catch(e){
      res.status(500).json({ error: e.message });
    }
  },
  async createProject(req,res){
    try{
      // assumes that domain of the project already exists
      const project = await Project.create(req.body);
      for(const domainId of project.domains){
        let domain = await Domain.findById(domainId);
        domain.projects.push(project._id);
        await domain.save();
      }
      res.status(201).json({ id: project._id });
    }catch(e){
      res.status(500).json({ error: e.message });
    }
  },
  async deleteProjectById(req,res){
    try{
      const projectId = req.params.id;
      const project = await Project.findById(projectId);
      const domains = project.domains;
      for(const domainId of domains){
        let domain = await Domain.findById(domainId);
        domain.projects = domain.projects.filter((id) => {
          return id !== projectId;
        });
        await domain.save();
      }
      await Project.findByIdAndRemove(projectId);
      res.status(204).json({});
    }catch(e){
      res.status(500).json({ error: e.message });
    }
  }
}
