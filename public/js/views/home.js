define(function(require) {

var tpl = require('text!templates/home.html')
  , HomepageSubject = require('models/homepage_subject')
  , ThankyouView = require('views/homepage_thankyou')      

return Backbone.View.extend({

  initialize: function(options){
    _.bindAll(this); 
    this.model = new HomepageSubject();
    Backbone.Validation.bind(this);
    this.model.on('sync', this.onSync, this)
    if (options.thankyou)
      this.onSync()
  },

  events: {
    'submit form' : 'submit',
    "click a:not([href^='#'])": "pushState",
  },

  template: tpl,

  pushState: function(e) {
    e.preventDefault() 
    var linkEl = $(e.currentTarget);
    var href = linkEl.attr("href");
    var router = new Backbone.Router();
    router.navigate(href.substr(1), true)
  },

  render: function(){
    $(this.el).html(this.template);
    return this; 
  },

  submit: function(e) {
    e.preventDefault()
    var params = this.$('form').serializeObject();
    var result = this.model.set(params)
    if (result !== false)
      this.model.save({}, {silent: true})  // dont validate on return from server
  },

  onSync: function(model){
    new ThankyouView({model: model})
    //var router = new Backbone.Router();
    //router.navigate('subjects', {trigger: true}) 
    this.render()
  }

});

});
