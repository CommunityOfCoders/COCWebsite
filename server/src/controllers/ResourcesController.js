const { Resource, Topic } = require("../models/Resources");
const redis_client = require("../config/redis");

/* 
  Topics and resources behave a bit differently when it comes to endpoints. The delete cache
  middleware does a path lookup, but we need to update the "topics" values, even if 
  there is a change in resources. So, a function that does the same tasks, but exclusively for topics.
*/
function deleteFromCache() {
  redis_client.del("topics");
}

module.exports = {
  /**
   * @route GET api/topics
   * @description Retrieve all resources grouped by topics
   * @param {Object} req The request
   * @param {Object} res The response
   * @param {Function} next The callback function in case of a successful response.
   */
  getAllTopics: async (req, res, next) => {
    try {
      const topicsAndResources = await Topic.find({}).populate("resources").lean();
      res.locals.cache = topicsAndResources;
      res.status(200).json(topicsAndResources);
      next();
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  /**
   * @route GET api/topics/:id
   * @description Get a particular topic (and its resources) by its _id
   * @param {Object} req The request
   * @param {Object} res The response
   * @param {String} req.params.id The _id of the topic
   */
  getTopicById: async (req, res) => {
    try {
      const topic = await Topic.findById(req.params.id).populate("resources").lean();
      res.status(200).json(topic);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  /**
   * @route GET api/resources/:id
   * @description Get a particular resource by its _id
   * @param {Object} req The request
   * @param {Object} res The response
   * @param {String} req.params.id The _id of the resource
   */
  getResourceById: async (req, res) => {
    try {
      const resource = await Resource.findById(req.params.id).lean();
      res.status(200).json(resource);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  /**
   * @route POST api/resources/add
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
      deleteFromCache();
      await topic.save();
      res.status(201).json(resource);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  /**
   * @route POST api/topics/add
   * @description Add a new topic
   * @param {Object} req The request
   * @param {Object} res The response
   * @param {String} req.body.name
   */
  addTopic: async (req, res, next) => {
    console.log(req.body);
    try {
      const topic = await Topic.create({ name: req.body.name });
      res.status(201).json(topic);
      next();
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  /**
   * @route PUT api/resources/edit/:id
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
        req.body,
        { new: true }
      ).select({"_id":1}).lean();
      deleteFromCache();
      res.status(201).json({ id: resource._id });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  /**
   * @route PUT api/topics/edit/:id
   * @description Update a topic
   * @param {Object} req The request
   * @param {Object} res The response
   * @param {Object} req.body Update fields
   * @param {String} req.params.id The _id of the topic
   */
  updateTopicById: async (req, res, next) => {
    try {
      const topic = await Topic.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      ).select({"_id":1}).lean();
      res.status(201).json({ id: topic._id });
      next();
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  /**
   * @route DELETE api/resources/delete/:id
   * @description Delete a resource
   * @param {Object} req The request
   * @param {Object} res The response
   * @param {String} req.params.id The _id of the resource
   */
  deleteResourceById: async (req, res) => {
    try {
      await Resource.findByIdAndDelete(req.params.id).lean();
      deleteFromCache();
      res.status(204).json({});
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  /**
   * @route DELETE api/topics/delete/:id
   * @description Delete a topic
   * @param {Object} req The request
   * @param {Object} res The response
   * @param {String} req.params.id The _id of the topic
   */
  deleteTopicById: async (req, res, next) => {
    try {
      await Topic.findByIdAndDelete(req.params.id).lean();
      res.status(204).json({});
      next();
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};
