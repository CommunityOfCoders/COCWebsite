const { Resource, Topic } = require("../models/Resources");

module.exports = {
  /**
   * @route GET api/topic
   * @description Retrieve all resources grouped by topics
   * @param {Object} req The request
   * @param {Object} res The response
   */
  getAllTopics: async (req, res) => {
    try {
      const topicsAndResources = await Topic.find({}).populate("resources");
      res.status(200).json(topicsAndResources);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  /**
   * @route GET api/resource/bytopic/:id
   * @description Retrieve all resources of a topic by its _id
   * @param {Object} req The request
   * @param {Object} res The response
   * @param {String} req.params.id The _id of the topic
   */
  getResourcesByTopicId: async (req, res) => {
    try {
      const topics = await Topic.findById(req.params.id).populate("resources");
      res.status(200).json(topics);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  /**
   * @route GET api/topic/:id
   * @description Get a particular topic (and its resources) by its _id
   * @param {Object} req The request
   * @param {Object} res The response
   * @param {String} req.params.id The _id of the topic
   */
  getTopicById: async (req, res) => {
    try {
      const topic = await Topic.findById(req.params.id).populate("resources");
      res.status(200).json(topic);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  /**
   * @route GET api/resource/:id
   * @description Get a particular resource by its _id
   * @param {Object} req The request
   * @param {Object} res The response
   * @param {String} req.params.id The _id of the resource
   */
  getResourceById: async (req, res) => {
    try {
      const resource = await Resource.findById(req.params.id);
      res.status(200).json(resource);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  /**
   * @route POST api/resource/add
   * @description Add a new resource
   * @param {Object} req The request
   * @param {Object} res The response
   * @param {String} req.body.topicId _id of the topic of this resource
   * @param {String} req.body.title
   * @param {String} req.body.description
   * @param {String} req.body.link The link (URL) to the resource
   */
  addResource: async (req, res) => {
    try {
      const topic = await Topic.findById(req.body.topicId);
      const resource = await Resource.create({
        title: req.body.title,
        description: req.body.description,
        link: req.body.link,
      });
      topic.resources.push(resource._id);
      topic.save();
      res.status(201).json(resource);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  /**
   * @route POST api/topic/add
   * @description Add a new topic
   * @param {Object} req The request
   * @param {Object} res The response
   * @param {String} req.body.name
   */
  addTopic: async (req, res) => {
    console.log(req.body);
    try {
      const topic = await Topic.create({ name: req.body.name });
      res.status(201).json(topic);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  /**
   * @route PUT api/resource/edit/:id
   * @description Update a resource
   * @param {Object} req The request
   * @param {Object} res The response
   * @param {Object} req.body Update fields
   * @param {String} req.params.id The _id of the resource
   */
  updateResourceById: async (req, res) => {
    try {
      const resource = await Resource.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      res.status(201).json({ id: resource._id });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  /**
   * @route PUT api/topic/edit/:id
   * @description Update a topic
   * @param {Object} req The request
   * @param {Object} res The response
   * @param {Object} req.body Update fields
   * @param {String} req.params.id The _id of the topic
   */
  updateTopicById: async (req, res) => {
    try {
      const topic = await Topic.findByIdAndUpdate(req.params.id, req.body);
      res.status(201).json({ id: topic._id });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  /**
   * @route DELETE api/resource/delete/:id
   * @description Delete a resource
   * @param {Object} req The request
   * @param {Object} res The response
   * @param {String} req.params.id The _id of the resource
   */
  deleteResourceById: async (req, res) => {
    try {
      await Resource.findByIdAndDelete(req.params.id);
      res.status(200).end();
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  /**
   * @route DELETE api/topic/delete/:id
   * @description Delete a topic
   * @param {Object} req The request
   * @param {Object} res The response
   * @param {String} req.params.id The _id of the topic
   */
  deleteTopicById: async (req, res) => {
    try {
      await Topic.findByIdAndDelete(req.params.id);
      res.status(200).end();
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};
