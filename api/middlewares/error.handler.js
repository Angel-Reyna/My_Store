import { ValidationError } from 'sequelize'

function errorsLog (err, req, res, next) {
  next(err)
}

function errorHandler (err, req, res, next) {
  // if (err.parent) {
  //   const { fields } = err;
  //   res.status(500).json({
  //     field: fields,
  //     message: 'email must be unique'
  //   });
  // } else {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
  // }
  next(err)
}

function ormErrorHandler (err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.errors[0].message,
      detail: err.parent.detail,
      errors: err.errors
    })
  }
  next(err)
}

function boomErrorHandler (err, req, res, next) {
  if (err.isBoom) {
    const { output } = err
    res.status(output.statusCode).json(output.payload)
  } else {
    next(err)
  }
}

export { errorsLog, errorHandler, boomErrorHandler, ormErrorHandler }
