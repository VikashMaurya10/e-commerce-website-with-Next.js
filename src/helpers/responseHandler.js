const { NextResponse } = require("next/server");

const responseHandler = (msg, data) => {
  return NextResponse.json({ ...data, message: msg });
};

export default responseHandler;
