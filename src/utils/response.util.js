class ResponseUtil {
  static success(res, data, message = 'Success', status = 200) {
    return res.status(status).json({
      success: true,
      message,
      data
    });
  }

  static error(res, message = 'Error', status = 500, errors = null) {
    const response = {
      success: false,
      message
    };

    if (errors) {
      response.errors = errors;
    }

    return res.status(status).json(response);
  }
}

module.exports = ResponseUtil;