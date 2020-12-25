const Domain = require('../models/Domain.js');

module.exports = {
  async allDomains(_req,res){
    try{
      let domains = await Domain.find();
      res.status(200).json({ domains });
    } catch(e){
      res.status(500).json({ error: e.message });
    }
  },
  async viewDomainById(req,res){
    try{
      let domain = await Domain.findById(req.params.id);
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
      let domain = await Domain.create(req.body);
      res.status(200).json({ id: domain._id });
    }catch(e){
      res.status(500).json({ error: e.message });
    }
  },
  async editDomainById(req,res){
    try{
      let domain = await Domain.findByIdAndUpdate(req.params.id, req.body,{
        new: true
      });
      res.status(200).json(domain);
    }catch(e){
      res.status(500).json({ error: e.message });
    }
  },
  async deleteDomainById(req,res){
    let domain = await Domain.findByIdAndRemove(req.params.id);
    res.status(204).json({});
  }
}
