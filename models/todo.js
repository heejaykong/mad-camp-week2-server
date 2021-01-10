const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Schemes
const TodoSchema = new Schema({
  todoid: { type: Number, required: true, unique: true },
  content: { type: String, required: true },
  completed: { type: String, default: false }
},
{
  timestamps: true
});

const Todo = mongoose.model("Todo", TodoSchema);

// const todo = new Todo({
//   todoid: 2,
//   content: 'Todo Content2',
//   completed: false,
// });

// todo.save(function(err, todo){
//   if(err) return console.error(err);
//   console.log(todo);
// })

// Create new todo document
TodoSchema.statics.create = function (payload) {
  // this === Model
  const todo = new this(payload);
  // return Promise
  return todo.save();
};

// Find All
TodoSchema.statics.findAll = function () {
  // return promise
  // V4부터 exec() 필요없음
  return this.find({});
};

// Find One by todoid
TodoSchema.statics.findOneByTodoid = function (todoid) {
  return this.findOne({ todoid });
};

// Update by todoid
TodoSchema.statics.updateByTodoid = function (todoid, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate({ todoid }, payload, { new: true });
};

// Delete by todoid
TodoSchema.statics.deleteByTodoid = function (todoid) {
  return this.remove({ todoid });
};

// Create Model & Export
module.exports = mongoose.model('Todo', TodoSchema);
