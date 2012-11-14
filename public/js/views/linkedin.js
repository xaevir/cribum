define(function(require) {

var tpl = require('text!templates/linkedin.mustache')
  , Linkedin = require('models/linkedin')
  , AlertView = require('views/site/alert').alert         
  , ModalView = require('views/modal')      

return Backbone.View.extend({

  initialize: function(options){
    _.bindAll(this); 
    this.model = new Linkedin();
    Backbone.Validation.bind(this);
    this.model.on('sync', this.notice, this) 
    this.model.on('sync', this.reset, this) 
  },

  events: {
    'submit form' : 'submit',
  },

  template: tpl,

  render: function(){
    $(this.el).html(this.template);
    return this; 
  },

  submit: function(e) {
    e.preventDefault()
    var params = this.$('form').serializeObject();
    var result = this.model.save(params)
  },

  notice: function(model){
    new ModalView('<p>Thank you very much for your help. I will email you back as soon as the site is ready</p>') 
  },

  reset: function() {
    this.render()
    this.model.clear({silent: true})
  },
  

});

});
