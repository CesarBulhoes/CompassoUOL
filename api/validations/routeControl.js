const { validationResult } = require('express-validator')
const { ErrorIncorrectInput } = require('../../errors')

const checkErrors = (req, res, next) => {

	const errors = validationResult(req)

	if (!errors.isEmpty()) {

		next(new ErrorIncorrectInput(errors.array()))

	} else {
		return next()
	}
}

module.exports = {
	checkErrors: checkErrors
}