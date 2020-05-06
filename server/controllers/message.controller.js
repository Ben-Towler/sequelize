const db = require('../models/index');

exports.getAllMessages = async (ctx) => {
  try {
    ctx.body = await db.message.findAll();
    ctx.status = 203;
  } catch (error) {
    console.error(error);
    ctx.status = 500;
  }
}

exports.set = async (ctx) => {
  try {
    ctx.body = await db.message.create(ctx.request.body);
    ctx.status = 201
  } catch (error) {
    console.error(error);
    ctx.status = 500;
  }
}


