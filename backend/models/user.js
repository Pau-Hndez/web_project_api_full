const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    required: true,
    type: String,
    validate: {
      validator: (url) =>
        /^https?:\/\/(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=-]*)?$/.test(
          url,
        ),
      message: "URL inválida",
    },
  },
});

module.exports = mongoose.model("user", userSchema);
