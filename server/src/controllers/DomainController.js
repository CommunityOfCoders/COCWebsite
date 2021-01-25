const Domain = require('../models/Domain.js');
const redis_client = require("../config/redis");

module.exports = {
  async allDomains(_req,res){
    try{
      const domains = await Domain.find();
      redis_client.setex("domains", 3600, domains);
      res.status(200).json({ domains });
    } catch(e){
      res.status(500).json({ error: e.message });
    }
  },
  async viewDomainById(req,res){
    try{
      const domain = await Domain.findById(req.params.id);
      if(domain){
        res.status(200).json(domain);
      }else{
        res.status(404).json({ error: "The requested domain doesn't exist"});
      }
    }catch(e){
      res.status(500).json({ error: e.message });
    }
  },
  async createDomain(req,res){
    try{
      const domain = await Domain.create(req.body);
      res.status(201).json({ id: domain._id });
    }catch(e){
      res.status(500).json({ error: e.message });
    }
  },
  async editDomainById(req,res){
    try{
      const domain = await Domain.findByIdAndUpdate(req.params.id, req.body,{
        new: true
      });
      res.status(200).json(domain);
    }catch(e){
      res.status(500).json({ error: e.message });
    }
  },
  async deleteDomainById(req,res){
    await Domain.findByIdAndRemove(req.params.id);
    res.status(204).json({});
  }
}
