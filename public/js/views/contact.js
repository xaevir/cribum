define(function(require) {

var tpl = require('text!templates/contact.html')
  , Contact = require('models/contact-page') 
  , AlertView = require('views/site/alert').alert         

return Backbone.View.extend({

  className: 'contact',

  events: {
    'submit form' : 'submit',
  },

  initialize: function(options){
    _.bindAll(this); 
    this.model = new Contact()
    Backbone.Validation.bind(this)
    this.model.on('sync', this.notice, this) 
    this.model.on('sync', this.reset, this) 
  },

  render: function(){
    $(this.el).html(tpl);
    return this; 
  },

  submit: function(e) {
    e.preventDefault()
    var params = this.$('form').serializeObject();
    this.model.save(params);
  },

  notice: function(){
    new AlertView({
      message: '<strong>Thank you for the message. I shall email you back as soon as possible</strong>',
      type: 'info'
    })
  },

  reset: function() {
    this.render()
    this.model.clear({silent: true})
  },


});


});
