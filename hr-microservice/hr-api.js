const {api} = require("./hr-api-config");
// http://localhost:8100/api-docs
api.listen(8100, () => {
  console.log("HR Application is running...REST Api serving at port 8100");
});