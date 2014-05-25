/** @jsx React.DOM */
'use strict';
require('browsernizr');
var $ = require('jquery');
window.jQuery = $;
var underscore = require('underscore');
window._ = underscore;
var bootstrap = require('bootstrap');
/*react library*/
var React = require('react/addons');
window.React = React;

/*require component for main application*/
var transformer = require('./components/transformer.jsx');
/*main application logic*/
$(document).ready(function() {
    /* App Module */
    React.renderComponent(<transformer />, document.getElementById('transformer'));
});
