const FormElement = require('../models/FormElement');
module.exports = {
    regForm(req, res) {
        const elements = elementsValidate(req.elements);
        for(const element of elements) {
        }
    }
}