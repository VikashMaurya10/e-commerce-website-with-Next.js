const { NextResponse } = require("next/server");

const errorHandler = (msg, error) => {
  var message = msg || "Internal server error";

  return NextResponse.json({ error: message, err_msg: error });
};

export default errorHandler;
