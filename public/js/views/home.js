define(function(require) {

var tpl = require('text!templates/home.html')
  , LandingPage = require('models/landingPage')
  , AlertView = require('views/site/alert').alert         
  , ModalView = require('views/modal')      

return Backbone.View.extend({

  initialize: function(options){
    _.bindAll(this); 
    this.model = new LandingPage();
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
    var msg  = '<p>Thank you very much for your help. Your kindness is greatly apprecited.'
        msg += ' I will email you back and let you know how it goes.</p>'
        msg += '<p style="float: right">- Bobby Chambers</p>'
    new ModalView(msg)
  },

  reset: function() {
    this.render()
    this.model.clear({silent: true})
  },
  

});

});
