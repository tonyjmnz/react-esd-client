var $ = require('jquery');
var React = window.React = require('react');
var ReactDOM = require("react-dom");
var EmergencyApp = require("./Views/EmergencyApp");
var Root = require("./views/Root");

var reactApp = $("#react-app").get(0);
var history = require('history').createHistory();

ReactDOM.render(<Root history={history}/>, reactApp);
