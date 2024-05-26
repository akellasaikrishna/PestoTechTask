const mongoose = require("mongoose");

const dbUri =
  "mongodb+srv://saikrishna55089:6hPUGWV2RRCbrZl0@krishnasfreecluster.szwyd6a.mongodb.net/?retryWrites=true&w=majority&appName=KrishnasFreeCluster";
mongoose.connect(dbUri);
mongoose.Promise = global.Promise;
module.exports = mongoose;
