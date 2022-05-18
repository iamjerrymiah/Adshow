const Like = require('./../models/likeModel');
const factory = require('./handlerFactory');
// const catchAsync = require('./../utils/catchAsync');

exports.getAllLikes = factory.getAll(Like);
exports.getLike = factory.getOne(Like);
exports.createLike = factory.createOne(Like);  
exports.updateLike = factory.updateOne(Like);
exports.deleteLike = factory.deleteOne(Like);
