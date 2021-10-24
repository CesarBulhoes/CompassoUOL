const {body, param, cookie, header, query, checkSchema} = require('express-validator')

class ClientValidation {

    add = [
		body('name').isLength({ min: 3 }).withMessage('Name must contain at least 3 characters')
    ]

    
	getAll = [
		query('name').optional().notEmpty().withMessage('Invalid name')

	]
    
	getById = [
		param('id').notEmpty().withMessage('Id must be informed')
                    .isLength({ min: 36 }).withMessage('Id is invalid')
                    .isLength({ max: 36 }).withMessage('Id is invalid')
	]

	update = [
        param('id').notEmpty().withMessage('Id must be informed')
                    .isLength({ min: 36 }).withMessage('Id is invalid')
                    .isLength({ max: 36 }).withMessage('Id is invalid'),
        body('name').isLength({ min: 3 }).withMessage('Name must contain at least 3 characters')
    ]
}

module.exports = new ClientValidation()