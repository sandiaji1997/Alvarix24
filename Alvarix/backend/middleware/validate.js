function validateBody(schema) {
  return (req, res, next) => {
    const errors = []

    for (const field of schema.required || []) {
      if (req.body[field] === undefined || req.body[field] === null || req.body[field] === '') {
        errors.push(`${field} is required`)
      }
    }

    for (const [field, allowedValues] of Object.entries(schema.enums || {})) {
      if (req.body[field] !== undefined && !allowedValues.includes(req.body[field])) {
        errors.push(`${field} must be one of: ${allowedValues.join(', ')}`)
      }
    }

    for (const field of schema.numbers || []) {
      if (req.body[field] !== undefined && Number.isNaN(Number(req.body[field]))) {
        errors.push(`${field} must be a number`)
      }
    }

    if (errors.length) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors
      })
    }

    return next()
  }
}

module.exports = {
  validateBody
}
