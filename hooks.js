var eejs = require('ep_etherpad-lite/node/eejs');

exports.eejsBlock_editbarMenuLeft = function(hook_name, args, callback) {
  args.content = args.content + eejs.require("ep_link/templates/editbarButtons.ejs", {}, module);
  return callback();
};

exports.eejsBlock_scripts = function(hook_name, args, callback) {
  args.content = args.content + eejs.require("ep_link/templates/scripts.ejs", {}, module);
  return callback();
};

exports.eejsBlock_styles = function(hook_name, args, callback) {
  args.content = args.content + eejs.require("ep_link/templates/styles.ejs", {}, module);
  return callback();
};