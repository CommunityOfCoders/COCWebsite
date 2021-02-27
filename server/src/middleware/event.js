const { body, param, query } = require('express-validator');

module.exports = {
  validate(method) {
    switch (method) {
      case 'checkID': {
        return [
          param('id', 'invalid id').isMongoId()
        ]
      }
      case 'checkEventBody': {
        return [
          body('eventName', 'eventName is required').exists(),
          body('description', 'description is required').exists().trim().escape(),
          body('venue', 'venue is required').exists(),
          body('date', 'date is required').exists(),
          body('graduationYear', 'graduationYear is required').exists(),
        ]
      }
      case 'checkFormURL': {
        return [
          body('formURL', 'formURL is required').exists()
        ]
      }
      case 'checkQueryParams': {
        return [
          query('uid', 'uid is required').exists().isMongoId(),
          query('eid', 'eid is required').exists().isMongoId()
        ]
      }
    }
  }
}
