const mongoose = require("mongoose");


const { Schema } = mongoose;
const newsSchema = new Schema(
  {
      author_id:{type:mongoose.Types.ObjectId,ref:  'AdminUser'},
      meta_title_content:{type:String},
      meta_title_description:{type:String},
      meta_image_content:{type:String},
      game_type:{type:String},
      document_content:{type:String}
  },
  { timestamps: true }
);


const  newsModel = mongoose.model("newsContent", newsSchema);
module.exports = newsModel;

