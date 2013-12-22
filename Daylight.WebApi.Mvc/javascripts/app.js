(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("components/library_view", function(exports, require, module) {
var LibraryView, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = LibraryView = (function(_super) {
  __extends(LibraryView, _super);

  function LibraryView() {
    this.render = __bind(this.render, this);
    _ref = LibraryView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  LibraryView.prototype.tagName = 'ul';

  LibraryView.prototype._itemView = void 0;

  LibraryView.prototype._itemViews = void 0;

  LibraryView.prototype.dispose = function() {
    LibraryView.__super__.dispose.apply(this, arguments);
    delete this._itemView;
    delete this._itemViews;
    return delete this.collection;
  };

  LibraryView.prototype.initialize = function(options) {
    var _this = this;
    LibraryView.__super__.initialize.apply(this, arguments);
    this._itemView = options.itemView;
    this._itemViews = [];
    if (!this.collection) {
      throw new Error('ERROR: LibraryView.initialize() - collection option must be specified');
    }
    if (!this._itemView) {
      throw new Error('ERROR: LibraryView.initialize() - itemView option must be specified');
    }
    this.listenTo(this.collection, 'add', function(model, collection, options) {
      return _this._renderItem(model);
    });
    this.listenTo(this.collection, 'remove', function(model, collection, options) {
      return _this._removeItem(model);
    });
    return this.listenTo(this.collection, 'reset', function(collection, options) {
      return _this._reset();
    });
  };

  LibraryView.prototype.render = function() {
    LibraryView.__super__.render.apply(this, arguments);
    this.collection.each(this._renderItem);
    return this;
  };

  LibraryView.prototype.views = function() {
    return this._itemViews.slice(0);
  };

  LibraryView.prototype.size = function() {
    return this._itemViews.length;
  };

  LibraryView.prototype._renderItem = function(model) {
    var view;
    view = new this._itemView({
      model: model
    });
    this._itemViews.push(view);
    this._itemEvent('itemAdded', view);
    this.renderChild(view).el;
    this._itemEvent('itemRendered', view);
    this.$el.append(view.el);
    return view;
  };

  LibraryView.prototype._itemEvent = function(type, itemView) {
    return this.trigger(type, {
      target: this,
      itemView: itemView
    });
  };

  LibraryView.prototype._removeItem = function(model) {
    var i, view, _i, _len, _ref1, _results;
    _ref1 = this._itemViews;
    _results = [];
    for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
      view = _ref1[i];
      if (view.model.id === model.id) {
        this._itemViews.splice(i, 1);
        view.leave();
        this._itemEvent('itemRemoved', view);
        break;
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  LibraryView.prototype._reset = function() {
    var view, _i, _len, _ref1;
    _ref1 = this._itemViews;
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      view = _ref1[_i];
      view.leave();
    }
    this._itemViews = [];
    return this.render();
  };

  return LibraryView;

})(support.View);

});

;require.register("config", function(exports, require, module) {
module.exports = {
  IoC: {
    PatientCollection: {
      type: 'daylight/collections/patient_collection',
      lifestyle: 'transient',
      properties: {
        _url: '/API/Patients'
      }
    },
    PatientPageableCollection: {
      type: 'daylight/collections/patient_pageable_collection',
      lifestyle: 'transient',
      properties: {
        _url: '/API/Patients'
      }
    },
    PatientModel: {
      type: 'daylight/models/patient_model',
      properties: {
        _urlRoot: '/API/Patients',
        _thumbnailPath: '${patient.thumbnailPath}'
      }
    },
    ConditionsCollection: {
      type: 'daylight/collections/condition_collection',
      lifestyle: 'transient',
      properties: {
        url: '/API/Patients/:id/conditions'
      }
    },
    ConditionModel: {
      type: 'daylight/models/condition_model',
      properties: {
        _urlRoot: '/API/Patients/{0}/conditions'
      }
    }
  },
  defaultSettings: {
    patient: {
      rootUrl: '',
      thumbnailPath: '/API/Patients/{0}/Thumbnail?width=300'
    }
  }
};

});

;require.register("config_merger", function(exports, require, module) {
var ConfigMerger;

ConfigMerger = (function() {
  function ConfigMerger() {}

  ConfigMerger.prototype.execute = function(config) {
    var settings, str;
    settings = config.defaultSettings;
    str = JSON.stringify(config);
    return config = JSON.parse(str);
  };

  return ConfigMerger;

})();

module.exports = ConfigMerger;

});

;require.register("daylight/application", function(exports, require, module) {
var AddWidgetModalView, Application, ApplicationModel, DashboardView, PatientCollection, PatientCreateView, PatientListView, PatientModel, PatientPageableCollection, PatientTableView, PatientView, Router,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ApplicationModel = require('daylight/models/application_model');

PatientModel = require('daylight/models/patient_model');

DashboardView = require('daylight/views/dashboard_view');

AddWidgetModalView = require('daylight/views/add_widget_view');

PatientPageableCollection = require('daylight/collections/patient_pageable_collection');

PatientView = require('daylight/views/patient_view');

PatientTableView = require('daylight/views/patient_table_view');

PatientListView = require('daylight/views/patient_list_view');

PatientCreateView = require('daylight/views/patient_create_view');

Router = require('router/router');

PatientCollection = require('daylight/collections/patient_collection');

PatientPageableCollection = require('daylight/collections/patient_pageable_collection');

Application = (function(_super) {
  __extends(Application, _super);

  function Application($el) {
    var _this = this;
    this.$el = $el;
    this.onPatientPageChanged = __bind(this.onPatientPageChanged, this);
    this.showAddWidgetModal = __bind(this.showAddWidgetModal, this);
    this.showPatientCreate = __bind(this.showPatientCreate, this);
    this.showDefault = __bind(this.showDefault, this);
    Application.__super__.constructor.call(this, this.$el);
    this.router = new Router();
    window.App.eventAggregator.on('navigate:home', function(e) {
      return _this.showDefault(e || {});
    });
    window.App.eventAggregator.on('navigate:addwidget', function(e) {
      return _this.showAddWidgetModal(e || {});
    });
    window.App.eventAggregator.on('navigate:patients', function(e) {
      return _this.showPatientsList(e || {});
    });
    window.App.eventAggregator.on('navigate:addpatient', function(e) {
      return _this.showPatientCreate(e || {});
    });
    window.App.eventAggregator.on('navigate:patient', function(e) {
      return _this.showPatient(e.id, e.index, e.subIndex, e.editMode);
    });
    this.appModel = new ApplicationModel;
    Backbone.history.start();
  }

  Application.prototype.doShow = function(viewClass, load, show) {
    var view;
    if (load == null) {
      load = false;
    }
    if (show == null) {
      show = false;
    }
    if (!(this.currentView instanceof viewClass)) {
      view = new viewClass({
        model: this.appModel
      });
      if (load) {
        view.load();
      }
      if (show) {
        view.show();
      }
      this.showView(view);
      return this.$el.html(view.el);
    }
  };

  Application.prototype.showDefault = function(e) {
    var route;
    route = this.appModel.get('routes')["default"];
    route = "" + route;
    this.doShow(DashboardView);
    return this.router.navigate(route);
  };

  Application.prototype.showPatientCreate = function(e) {
    var route, view;
    route = this.appModel.get('routes').addpatient;
    route = "" + route;
    if (!(this.currentView instanceof PatientCreateView)) {
      view = new PatientCreateView({
        model: this.appModel
      });
    }
    view.show();
    return this.router.navigate(route);
  };

  Application.prototype.showAddWidgetModal = function(e) {
    var route;
    console.log('Add Widget Modal');
    route = this.appModel.get('routes').addwidget;
    route = "" + route;
    this.doShow(AddWidgetModalView);
    return this.router.navigate(route);
  };

  Application.prototype.showPatientsList = function(params) {
    var collection, route, _ref;
    if (params == null) {
      params = {};
    }
    /*route = @appModel.get('routes').patients
    		route = "#{route}"
    */

    /*patientsList = new PatientCollection url: 'patients.json'
    
    		patientListView = new PatientListView 
    			collection: patientsList
    
    		patientsList.fetch()
    		
    		##@$el.html patientListView.render().$el
    */

    if ((_ref = this.currentPatient) != null) {
      _ref.dispose();
    }
    window.App.currentPatient = this.currentPatient = null;
    route = '';
    if (!_.isEmpty(params)) {
      route = window.decache(this.router.addParamsToRoute(route, params));
    }
    collection = null;
    delete window.App.currentPlaylist;
    if (!(this.currentView instanceof PatientListView)) {
      collection = new PatientCollection;
      this.showView(new PatientListView({
        collection: collection
      }));
    } else {
      collection = this.currentView.collection;
    }
    if (!_.isEqual(collection.getFilter(), params)) {
      collection.setFilter(params);
      collection.fetch();
    }
    return this.router.navigate(route);
  };

  Application.prototype.showPatient = function(id, index, subIndex, editMode) {
    var patientModel, _ref,
      _this = this;
    if (index == null) {
      index = 0;
    }
    if (subIndex == null) {
      subIndex = 0;
    }
    if (editMode == null) {
      editMode = false;
    }
    if (this.currentPatient && ((_ref = this.currentPatient) != null ? _ref.id : void 0) === id) {
      return this.currentPatient.navigate(index, subIndex, editMode);
    } else {
      patientModel = window.IoC.get('PatientModel', {
        id: id
      }, {
        parse: true
      });
      window.App.currentPatient = this.currentPatient = patientModel;
      this.currentPatient.on('navigate', this.onPatientPageChanged);
      return this.currentPatient.fetch({
        success: function(model, response, options) {
          model.navigate(index, subIndex, editMode);
          return _this.showView(new PatientView({
            model: model
          }));
        },
        error: function(model, response, options) {
          if (response.status = 403) {
            return window.location = '/Error/Access';
          }
        }
      });
    }
  };

  Application.prototype.onPatientPageChanged = function(e) {
    return this.router.navigate(window.App.pageUrl({
      id: this.currentPatient.id,
      index: e.to.index,
      subIndex: e.to.subIndex,
      editMode: e.to.editMode
    }));
  };

  return Application;

})(support.Application);

module.exports = Application;

});

;require.register("daylight/collections/patient_collection", function(exports, require, module) {
var PatientCollection, PatientModel, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PatientModel = require('daylight/models/patient_model');

PatientCollection = (function(_super) {
  __extends(PatientCollection, _super);

  function PatientCollection() {
    this.anyFetchSuccess = __bind(this.anyFetchSuccess, this);
    _ref = PatientCollection.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  PatientCollection.prototype._skip = 0;

  PatientCollection.prototype._take = 20;

  PatientCollection.prototype.model = PatientModel;

  PatientCollection.prototype.url = 'API/Patients';

  PatientCollection.prototype.initialize = function(models, options) {
    PatientCollection.__super__.initialize.call(this, models, options);
    return this._filter = null;
  };

  PatientCollection.prototype.fetch = function(options) {
    options = options ? _.clone(options) : {};
    if (options.skip !== void 0) {
      this._skip = options.skip;
    }
    this._filter.skip = this._skip;
    this._filter.take = options.take === void 0 ? this._take : options.take;
    options = _.extend({}, options, {
      traditional: true,
      data: this._filter,
      cache: false,
      success: this.anyFetchSuccess
    });
    return PatientCollection.__super__.fetch.call(this, options);
  };

  PatientCollection.prototype.getFilter = function() {
    return this._filter;
  };

  PatientCollection.prototype.setFilter = function(value) {
    this._filter = value;
    this.invoke('dispose');
    return this.reset();
  };

  PatientCollection.prototype.reset = function() {
    PatientCollection.__super__.reset.apply(this, arguments);
    this._skip = 0;
    return this._take = 20;
  };

  PatientCollection.prototype.getMore = function() {
    return this.fetch({
      add: true,
      skip: this._skip + this._take,
      data: this._filter,
      success: this.anyFetchSuccess
    });
  };

  PatientCollection.prototype.anyFetchSuccess = function() {
    if (this.length < this._skip + this._take) {
      this.trigger('end');
    }
    if (this.length >= this._skip + this._take) {
      return this.trigger('open');
    }
  };

  return PatientCollection;

})(support.Collection);

module.exports = PatientCollection;

});

;require.register("daylight/collections/patient_pageable_collection", function(exports, require, module) {
var PatientModel, PatientPageableCollection, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PatientModel = require('daylight/models/patient_model');

PatientPageableCollection = (function(_super) {
  __extends(PatientPageableCollection, _super);

  function PatientPageableCollection() {
    _ref = PatientPageableCollection.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  PatientPageableCollection.prototype.url = 'API/Patients';

  PatientPageableCollection.prototype.model = PatientModel;

  PatientPageableCollection.prototype.state = {
    pageSize: 15
  };

  PatientPageableCollection.prototype.mode = 'client';

  return PatientPageableCollection;

})(support.LazyCollection);

module.exports = PatientPageableCollection;

});

;require.register("daylight/config_merger", function(exports, require, module) {
var ConfigMerger;

ConfigMerger = (function() {
  function ConfigMerger() {}

  ConfigMerger.prototype.execute = function(config) {
    var str;
    str = JSON.stringify(config);
    return config = JSON.parse(str);
  };

  return ConfigMerger;

})();

module.exports = ConfigMerger;

});

;require.register("daylight/models/application_model", function(exports, require, module) {
var ApplicationModel, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ApplicationModel = (function(_super) {
  __extends(ApplicationModel, _super);

  function ApplicationModel() {
    _ref = ApplicationModel.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  ApplicationModel.prototype.defaults = {
    routes: {
      "default": '',
      addwidget: 'addwidget',
      patients: 'patients',
      patient: 'patient'
    }
  };

  return ApplicationModel;

})(Backbone.Model);

module.exports = ApplicationModel;

});

;require.register("daylight/models/patient_collection", function(exports, require, module) {
var PatientCollection, PatientModel, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PatientModel = require('daylight/models/patient_model');

PatientCollection = (function(_super) {
  __extends(PatientCollection, _super);

  function PatientCollection() {
    _ref = PatientCollection.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  PatientCollection.prototype.url = 'patients.json';

  PatientCollection.prototype.model = PatientModel;

  return PatientCollection;

})(support.LazyCollection);

module.exports = PatientCollection;

});

;require.register("daylight/models/patient_model", function(exports, require, module) {
var PatientModel, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PatientModel = (function(_super) {
  __extends(PatientModel, _super);

  function PatientModel() {
    this.onRequestSave = __bind(this.onRequestSave, this);
    this.initialize = __bind(this.initialize, this);
    _ref = PatientModel.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  PatientModel.prototype.defaults = {
    id: void 0,
    username: void 0,
    relationshipStatus: void 0,
    name: '',
    otherNames: void 0,
    phone: void 0,
    email: void 0,
    dob: void 0,
    address: void 0,
    gender: void 0,
    uri: void 0,
    _editMode: false,
    _index: 0,
    _subIndex: 0,
    _thumbnailPath: '/API/Patients/{0}/Thumbnail?width=300',
    _hasParsed: void 0
  };

  PatientModel.prototype.urlRoot = function() {
    return window.App.url(this._urlRoot);
  };

  PatientModel.prototype.initialize = function(options) {
    var _this = this;
    PatientModel.__super__.initialize.call(this, options);
    this.throttledSave = _.throttle(function() {
      return _this.save();
    }, 1000, true);
    return this.on('change:_editMode', function(model, value, options) {
      if (value) {
        return window.App.eventAggregator.on('request:savePatient', _this.onRequestSave);
      } else {
        return window.App.eventAggregator.off('request:savePatient', _this.onRequestSave);
      }
    });
  };

  PatientModel.prototype.onRequestSave = function() {
    return this.throttledSave();
  };

  PatientModel.prototype.getThumbnailUrl = function() {
    var stamp, url;
    url = window.App.url(this.get('_thumbnailPath')).replace('{0}', this.id);
    stamp = this.get('dateOfBirth').replace(/\D/g, '');
    return window.decache(url, stamp);
  };

  PatientModel.prototype.toJSON = function() {
    var json;
    json = PatientModel.__super__.toJSON.apply(this, arguments);
    return json;
  };

  PatientModel.prototype.navigate = function(index, subIndex, editMode) {
    var oldEditMode, oldIndex, oldSubIndex;
    if (index == null) {
      index = 0;
    }
    if (subIndex == null) {
      subIndex = 0;
    }
    if (editMode == null) {
      editMode = false;
    }
    oldIndex = this.get('_index');
    oldSubIndex = this.get('_subIndex');
    oldEditMode = this.get('_editMode');
    this.set({
      _index: index,
      _subIndex: subIndex,
      _editMode: editMode
    });
    return this.trigger('navigate', {
      from: {
        index: oldIndex,
        subIndex: oldSubIndex,
        editMode: oldEditMode
      },
      to: {
        index: index,
        subIndex: subIndex,
        editMode: editMode
      }
    });
  };

  PatientModel.prototype.editMode = function(mode) {
    this.set('_editMode', mode);
    return this.get('conditions').invoke('editMode', mode);
  };

  PatientModel.prototype.dispose = function() {
    window.App.eventAggregator.off('request:savePatient', this.onRequestSave);
    return this.get('conditions').off();
  };

  return PatientModel;

})(support.Model);

module.exports = PatientModel;

});

;require.register("daylight/views/add_widget_view", function(exports, require, module) {
var AddWidgetModalView, AddWidgetTemplate, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

AddWidgetTemplate = require('templates/add_widget_template');

AddWidgetModalView = (function(_super) {
  __extends(AddWidgetModalView, _super);

  function AddWidgetModalView() {
    this.close = __bind(this.close, this);
    this.save = __bind(this.save, this);
    this.update = __bind(this.update, this);
    this.complete = __bind(this.complete, this);
    this.initialize = __bind(this.initialize, this);
    this.render = __bind(this.render, this);
    _ref = AddWidgetModalView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  AddWidgetModalView.prototype.events = {
    'click #completedbtn': 'complete',
    'click #updatebtn': 'update',
    'click #savebtn': 'save',
    'click #closebtn': 'close'
  };

  AddWidgetModalView.prototype.template = AddWidgetTemplate;

  AddWidgetModalView.prototype.render = function() {
    var formString;
    formString = this.template(this.model.toJSON());
    $(formString).dialog({
      resizable: false,
      width: 412,
      height: 375,
      title: 'Add Widget',
      modal: true,
      close: this.close
    });
    this.el = $(".modal-dialog");
    this.delegateEvents(this.events);
    return this;
  };

  AddWidgetModalView.prototype.initialize = function(options) {
    AddWidgetModalView.__super__.initialize.call(this, options);
    _.bindAll(this, "render");
    return this.render().el;
  };

  AddWidgetModalView.prototype.complete = function() {
    return console.log("test");
  };

  AddWidgetModalView.prototype.update = function() {
    return console.log("test");
  };

  AddWidgetModalView.prototype.save = function() {
    return console.log("test");
  };

  AddWidgetModalView.prototype.close = function(ev, ui) {
    $(this).remove();
    console.log('closed dialog');
    return window.App.eventAggregator.trigger('navigate:home');
  };

  return AddWidgetModalView;

})(support.View);

module.exports = AddWidgetModalView;

});

;require.register("daylight/views/dashboard_view", function(exports, require, module) {
var AddWidgetView, DashboardTemplate, DashboardView, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

DashboardTemplate = require('templates/dashboard_template');

AddWidgetView = require('daylight/views/add_widget_view');

DashboardView = (function(_super) {
  __extends(DashboardView, _super);

  function DashboardView() {
    this.addWidgetClick = __bind(this.addWidgetClick, this);
    this.render = __bind(this.render, this);
    _ref = DashboardView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  DashboardView.prototype.template = DashboardTemplate;

  DashboardView.prototype.events = {
    'click #addWidgetBtn': 'addWidgetClick'
  };

  DashboardView.prototype.render = function() {
    this.$el.html(this.template());
    return this;
  };

  DashboardView.prototype.addWidgetClick = function() {
    console.log("showme");
    this.addWidgetView = new AddWidgetView;
    return this.addWidgetView.render();
  };

  return DashboardView;

})(support.View);

if (typeof module !== "undefined" && module !== null) {
  module.exports = DashboardView;
}

});

;require.register("daylight/views/patient_create_view", function(exports, require, module) {
var PatientCreateTemplate, PatientCreateView, PatientModel, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PatientCreateTemplate = require('templates/patient_create_template');

PatientModel = require('daylight/models/patient_model');

PatientCreateView = (function(_super) {
  __extends(PatientCreateView, _super);

  function PatientCreateView() {
    this.onKeyDown = __bind(this.onKeyDown, this);
    this.save = __bind(this.save, this);
    this.render = __bind(this.render, this);
    _ref = PatientCreateView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  PatientCreateView.prototype.id = "create";

  PatientCreateView.prototype.className = "modal fade hide";

  PatientCreateView.prototype.template = PatientCreateTemplate;

  PatientCreateView.prototype.events = {
    'keydown': 'onKeyDown',
    'click .js-cancel-btn': 'onCancelClick',
    'click .js-save-btn': 'onSaveClick',
    'hidden': 'teardown'
  };

  PatientCreateView.prototype.initialize = function(options) {
    PatientCreateView.__super__.initialize.call(this, options);
    _.bindAll(this, "render");
    return this.render();
  };

  PatientCreateView.prototype.render = function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.modal({
      show: false
    });
    this.delegateEvents(this.events);
    return this;
  };

  PatientCreateView.prototype.save = function() {
    var name,
      _this = this;
    name = this.$('#patient-name-input').val();
    this.model.set(this.model.parse({
      name: name
    }));
    return this.model.save(null, {
      wait: true,
      success: function(model, response, options) {
        window.App.eventAggregator.trigger('navigate:patient');
        return _this.close();
      }
    });
  };

  PatientCreateView.prototype.dispose = function() {
    return Backbone.Validation.unbind(this);
  };

  PatientCreateView.prototype.show = function() {
    return this.$el.modal("show");
  };

  PatientCreateView.prototype.teardown = function() {
    this.$el.data("modal", null);
    return this.remove();
  };

  PatientCreateView.prototype.onKeyDown = function(e) {
    if (e.which === 13) {
      e.preventDefault();
      return this.save();
    }
  };

  PatientCreateView.prototype.onSaveClick = function(e) {
    e.preventDefault();
    alert('Save Clicked');
    return this.save();
  };

  PatientCreateView.prototype.onCancelClick = function(e) {
    e.preventDefault();
    return this.close();
  };

  return PatientCreateView;

})(support.View);

module.exports = PatientCreateView;

});

;require.register("daylight/views/patient_list_item_view", function(exports, require, module) {
var PatientListItemTemplate, PatientListItemView, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PatientListItemTemplate = require('templates/patient_list_item_template');

PatientListItemView = (function(_super) {
  __extends(PatientListItemView, _super);

  function PatientListItemView() {
    this.onDestroy = __bind(this.onDestroy, this);
    this.render = __bind(this.render, this);
    this.template = __bind(this.template, this);
    _ref = PatientListItemView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  PatientListItemView.prototype.tagName = 'tr';

  PatientListItemView.prototype.template = function(data) {
    return PatientListItemTemplate(data);
  };

  PatientListItemView.prototype.initialize = function(options) {
    PatientListItemView.__super__.initialize.call(this, options);
    this.bindTo(this.model, 'change', this.render);
    return this.bindTo(this.model, 'destroy', this.onDestroy);
  };

  PatientListItemView.prototype.render = function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  };

  PatientListItemView.prototype.onDestroy = function() {
    return this.leave();
  };

  return PatientListItemView;

})(support.View);

module.exports = PatientListItemView;

});

;require.register("daylight/views/patient_list_view", function(exports, require, module) {
var PatientListItemView, PatientListTemplate, PatientListView, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PatientListItemView = require('daylight/views/patient_list_item_view');

PatientListTemplate = require('templates/patient_list_template');

PatientListView = (function(_super) {
  __extends(PatientListView, _super);

  function PatientListView() {
    this.onViewPatientClick = __bind(this.onViewPatientClick, this);
    this.showNoResults = __bind(this.showNoResults, this);
    this.onCollectionOpen = __bind(this.onCollectionOpen, this);
    this.onCollectionEnd = __bind(this.onCollectionEnd, this);
    this.onLoadMore = __bind(this.onLoadMore, this);
    this.onFetchEnd = __bind(this.onFetchEnd, this);
    this.onFetchStart = __bind(this.onFetchStart, this);
    this.reset = __bind(this.reset, this);
    this.removePatient = __bind(this.removePatient, this);
    this.patientEvent = __bind(this.patientEvent, this);
    this.renderPatient = __bind(this.renderPatient, this);
    this.render = __bind(this.render, this);
    this.dispose = __bind(this.dispose, this);
    _ref = PatientListView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  PatientListView.prototype.template = PatientListTemplate;

  PatientListView.prototype.events = {
    'click .js-patients-loadmore': 'onLoadMore'
  };

  PatientListView.prototype.dispose = function() {
    PatientListView.__super__.dispose.apply(this, arguments);
    return delete this.collection;
  };

  PatientListView.prototype.initialize = function(options) {
    var _this = this;
    PatientListView.__super__.initialize.call(this, options);
    this.listenTo(this.collection, 'add', this.renderPatient);
    this.listenTo(this.collection, 'remove', function(model, collection, options) {
      return _this.removePatient(model);
    });
    this.listenTo(this.collection, 'reset', function(collection, options) {
      return _this.reset();
    });
    this.listenTo(this.collection, 'fetch:start', this.onFetchStart);
    this.listenTo(this.collection, 'fetch:end', this.onFetchEnd);
    this.listenTo(this.collection, 'end', this.onCollectionEnd);
    this.listenTo(this.collection, 'open', this.onCollectionOpen);
    return _.bindAll(this, 'render');
  };

  PatientListView.prototype.render = function() {
    PatientListView.__super__.render.apply(this, arguments);
    this.$el.empty();
    this.replaceElement(this.template());
    this.collection.forEach(this.renderPatient, this);
    return this;
  };

  PatientListView.prototype.renderPatient = function(model) {
    var view;
    view = new PatientListItemView({
      model: model
    });
    this.patientEvent('patientAdded', view);
    this.patientEvent('patientRendered', view);
    return this.$('.patient-grid').append(this.renderChild(view).el);
  };

  PatientListView.prototype.patientEvent = function(type, patientView) {
    return this.trigger(type, {
      target: this,
      patientView: patientView
    });
  };

  PatientListView.prototype.removePatient = function(model) {
    var view;
    view = new PatientListItemView({
      model: model
    });
    if (view.model.id === model.id) {
      view.leave();
      return this.patientEvent('patientRemoved', view);
    }
  };

  PatientListView.prototype.reset = function() {
    return this.render();
  };

  PatientListView.prototype.onFetchStart = function() {
    this.$('.load-more').addClass('activate');
    this.$('.activate').show();
    return this.$('.js-patients-loadmore').html('Loading...');
  };

  PatientListView.prototype.onFetchEnd = function() {
    this.$('.load-more').removeClass('activate');
    this.$('.activate').hide();
    this.$('.js-patients-loadmore').html('Load More');
    return this.showNoResults();
  };

  PatientListView.prototype.onLoadMore = function(e) {
    e.preventDefault();
    return this.collection.getMore();
  };

  PatientListView.prototype.onCollectionEnd = function(e) {
    return this.$('.js-patients-loadmore').html('Load More');
  };

  PatientListView.prototype.onCollectionOpen = function(e) {
    return this.$('.js-patients-loadmore').html('Load More');
  };

  PatientListView.prototype.showNoResults = function() {
    if (this.collection.length > 0) {
      return this.$('.no-results').hide();
    } else {
      return this.$('.no-results').show();
    }
  };

  PatientListView.prototype.onViewPatientClick = function(e) {
    e.preventDefault();
    e.stopPropagation();
    return this.viewPatient();
  };

  return PatientListView;

})(support.View);

if (typeof module !== "undefined" && module !== null) {
  module.exports = PatientListView;
}

});

;require.register("daylight/views/patient_table_view", function(exports, require, module) {
var PatientTableView, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PatientTableView = (function(_super) {
  __extends(PatientTableView, _super);

  function PatientTableView() {
    _ref = PatientTableView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  PatientTableView.prototype.columns = {
    name: {
      header: "Name"
    },
    gender: {
      header: "Gender"
    },
    dob: {
      header: "Date of Birth",
      draw: function(model) {
        return new Date(model.get("dob"));
      }
    }
  };

  PatientTableView.prototype.pagination = true;

  PatientTableView.prototype.size = 15;

  PatientTableView.prototype.search = {
    query: "name",
    detail: "Search by name..."
  };

  PatientTableView.prototype.filters = {
    type: {
      type: "option",
      options: [["All", ""], "Male", "Female"]
    }
  };

  return PatientTableView;

})(Backbone.TableView);

if (typeof module !== "undefined" && module !== null) {
  module.exports = PatientTableView;
}

});

;require.register("daylight/views/patient_view", function(exports, require, module) {
var PatientView, PatientViewTemplate, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PatientViewTemplate = require('templates/patient_view_template');

PatientView = (function(_super) {
  __extends(PatientView, _super);

  function PatientView() {
    this.onSaveSuccess = __bind(this.onSaveSuccess, this);
    this.onSaveStart = __bind(this.onSaveStart, this);
    this.onNavigate = __bind(this.onNavigate, this);
    this.onDestroy = __bind(this.onDestroy, this);
    this.render = __bind(this.render, this);
    this.template = __bind(this.template, this);
    _ref = PatientView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  PatientView.prototype.template = function(data) {
    return PatientViewTemplate(data);
  };

  PatientView.prototype.initialize = function(options) {
    PatientView.__super__.initialize.call(this, options);
    this.bindTo(this.model, 'destroy', this.onDestroy);
    this.bindTo(this.model, 'navigate', this.onNavigate);
    this.bindTo(this.model, 'save:start', this.onSaveStart);
    return this.bindTo(this.model, 'save:success', this.onSaveSuccess);
  };

  PatientView.prototype.render = function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  };

  PatientView.prototype.editMode = function(mode) {
    return this.model.editMode(mode);
  };

  PatientView.prototype.onDestroy = function() {
    return window.App.eventAggregator.trigger('navigate:patients');
  };

  PatientView.prototype.onNavigate = function(e) {
    return this.editMode(e.to.editMode);
  };

  PatientView.prototype.onSaveStart = function(model, response, options) {
    return alert('Saving');
  };

  PatientView.prototype.onSaveSuccess = function(model, response, options) {
    return alert('Saved');
  };

  return PatientView;

})(support.View);

if (typeof module !== "undefined" && module !== null) {
  module.exports = PatientView;
}

});

;require.register("daylight/views/patients_list_view", function(exports, require, module) {
var PatientsListTemplate, PatientsListView, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PatientsListTemplate = require('templates/patients_list_template');

PatientsListView = (function(_super) {
  __extends(PatientsListView, _super);

  function PatientsListView() {
    this.render = __bind(this.render, this);
    this.template = __bind(this.template, this);
    _ref = PatientsListView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  PatientsListView.prototype.template = function(data) {
    return PatientsListTemplate(data);
  };

  PatientsListView.prototype.initialize = function(options) {
    PatientsListView.__super__.initialize.call(this, options);
    return this.listenTo(this.model, 'change', this.render, this);
  };

  PatientsListView.prototype.render = function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  };

  return PatientsListView;

})(support.View);

module.exports = PatientsListView;

});

;require.register("initialize", function(exports, require, module) {
var Application, Config, ConfigMerger;

Application = require('daylight/application');

Config = require('config');

ConfigMerger = require('config_merger');

$(function() {
  var config, configMerger;
  delete Backbone.Model.prototype.escape;
  configMerger = new ConfigMerger();
  config = configMerger.execute(Config);
  window.IoC.init(config.IoC);
  window.App = {
    eventAggregator: new support.EventAggregator(),
    setting: function(path, defaultValue) {
      var arg, value, _i, _len, _ref;
      if (defaultValue == null) {
        defaultValue = void 0;
      }
      value = config.defaultSettings;
      _ref = path.split('.');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        arg = _ref[_i];
        value = value[arg];
        if (value === void 0) {
          return defaultValue;
        }
      }
      return value;
    },
    pageUrl: function(o) {
      var url;
      url = o.editMode ? '#edit/' : '#';
      url += "" + o.id;
      return url;
    },
    url: function(url) {
      return window.App.setting('patient.rootUrl').concat(url);
    }
  };
  return new Application($('#js-content'));
});

});

;require.register("router/router", function(exports, require, module) {
var Router, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Router = (function(_super) {
  __extends(Router, _super);

  function Router() {
    _ref = Router.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Router.prototype.routes = {
    '': 'default',
    'addwidget': 'addWidget',
    'edit/patients/:id': 'editPatient',
    'create': 'addPatient',
    'view/patients/:id': 'patient',
    ':id/condition:index.:subIndex': 'patient',
    ':id/condition:index': 'patient',
    'patients?*query': 'default',
    'patients': 'patients',
    'patients/:id': 'patient',
    ':id': 'patient'
  };

  Router.prototype["default"] = function(query) {
    var params;
    params = this.getParams(query) || {};
    return App.eventAggregator.trigger('navigate:home', params);
  };

  Router.prototype.patients = function(query) {
    var params;
    params = this.getParams(query) || {};
    return App.eventAggregator.trigger('navigate:patients', params);
  };

  Router.prototype.addWidget = function(query) {
    var params;
    params = this.getParams(query) || {};
    return App.eventAggregator.trigger('navigate:addwidget', params);
  };

  Router.prototype.addPatient = function(query) {
    var params;
    params = this.getParams(query) || {};
    return App.eventAggregator.trigger('navigate:addpatient', params);
  };

  Router.prototype.editPatient = function(id) {
    return this.patient(id, 1, 1, true);
  };

  Router.prototype.patient = function(id, index, subIndex, editMode) {
    if (index == null) {
      index = 1;
    }
    if (subIndex == null) {
      subIndex = 1;
    }
    if (editMode == null) {
      editMode = false;
    }
    index = parseInt(index) - 1;
    subIndex = parseInt(subIndex) - 1;
    return App.eventAggregator.trigger("navigate:patient", {
      id: id,
      index: index,
      subIndex: subIndex,
      editMode: editMode
    });
  };

  Router.prototype.getParams = function(str) {
    var params, rtn,
      _this = this;
    if (!str) {
      return null;
    }
    params = str.replace(/\?/, '');
    params = params.split('&');
    rtn = {};
    _.each(params, function(param) {
      param = param.split('=');
      return rtn[param[0]] = _this._decodeValue(param[1]);
    });
    return rtn;
  };

  Router.prototype.addParamsToRoute = function(route, params) {
    var iterator,
      _this = this;
    route = route || '';
    iterator = function(memo, value, key) {
      var isFirst;
      if (!value) {
        return memo;
      }
      isFirst = memo === route;
      value = _this._encodeValue(value);
      if (isFirst) {
        return "" + memo + "?" + key + "=" + value;
      } else {
        return "" + memo + "&" + key + "=" + value;
      }
    };
    return _.reduce(params, iterator, route);
  };

  Router.prototype._encodeValue = function(value, delimiter) {
    var rtn;
    if (delimiter == null) {
      delimiter = '+';
    }
    if (!_.isString(value)) {
      return value;
    }
    rtn = value.split(' ');
    rtn = _.map(rtn, function(el) {
      return encodeURIComponent(el);
    });
    return rtn = rtn.join(delimiter);
  };

  Router.prototype._decodeValue = function(value, delimiter) {
    var rtn;
    if (delimiter == null) {
      delimiter = '+';
    }
    if (!_.isString(value)) {
      return value;
    }
    rtn = value.split(delimiter);
    rtn = _.map(rtn, function(el) {
      return decodeURIComponent(el);
    });
    return rtn = rtn.join(' ');
  };

  return Router;

})(support.Router);

module.exports = Router;

});

;require.register("templates/add_widget_template", function(exports, require, module) {
module.exports = function (__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      __out.push('<div title="Add Widget" id="dialog_add_widget" class="modal-dialog" style="overflow:hidden">\n  <div class="modal-content">\n   <table class="table">\n        <tr>\n            <td>\n                Patients List\n            </td>\n            <td>\n                <button type="button" class="btn" onclick="Dashboard.addWidgetToDashboard(\'Patients List\', \'Widget1\'); return false;">\n                    Add</button>\n            </td>\n        </tr>\n        <tr>\n            <td>\n                Daily Visits\n            </td>\n            <td>\n                <button type="button" class="btn" onclick="Dashboard.addWidgetToDashboard(\'Daily Visits\', \'Widget3\'); return false;">\n                    Add</button>\n            </td>\n        </tr>\n        <tr>\n            <td>\n                Age-Gender Distribution\n            </td>\n            <td>\n                <button type="button" class="btn" onclick="Dashboard.addWidgetToDashboard(\'Age-Gender Distribution\', \'Widget2\'); return false;">\n                    Add</button>\n            </td>\n        </tr>\n        <tr>\n            <td>\n                Avg. Surgery Visit Duration\n            </td>\n            <td>\n                <button type="button" class="btn" onclick="Dashboard.addWidgetToDashboard(\'Avg. Surgery Visit Duration\', \'Widget4\'); return false;">\n                    Add</button>\n            </td>\n        </tr>\n        <tr>\n            <td>\n                Next Appointments\n            </td>\n            <td>\n                <button type="button" class="btn" onclick="Dashboard.addWidgetToDashboard(\'Next Appointments\', \'Widget5\'); return false;">\n                    Add</button>\n            </td>\n        </tr>\n        <tr>\n            <td>\n                Oustanding Payments\n            </td>\n            <td>\n                <button type="button" class="btn" onclick="Dashboard.addWidgetToDashboard(\'Oustanding Payments\', \'Widget6\'); return false;">\n                    Add</button>\n            </td>\n        </tr>\n    </table>\n  </div><!-- /.modal-content -->\n</div><!-- /.modal-dialog -->');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}
});

;require.register("templates/conditions_template", function(exports, require, module) {
module.exports = function (__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      __out.push('<div id="details" class="span7"></div>\n<div class="span5">\n    <div id="reports" class="well">\n        <h3 class="modal-header">Conditions</h3>\n\n        <div class="alert alert-info no-reports">\n            <h4 class="alert-heading">Info</h4>\n            ');
    
      __out.push(__sanitize(firstName));
    
      __out.push(' ');
    
      __out.push(__sanitize(lastName));
    
      __out.push(' has no direct reports\n        </div>\n    </div>\n</div>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}
});

;require.register("templates/dashboard_template", function(exports, require, module) {
module.exports = function (__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      __out.push('<div class="container-fluid">\n        <!--subnav-->\n        <div class="subnav">\n            <ul class="nav nav-pills">\n                <li><a href="#addwidget">+ Add Widget</a></li>\n                <li><a href="dashboardprinterfriendly.html" target="_blank">Printer Friendly</a></li>\n                <li><a href="#" onclick="javascript:ShowHelp()">Help</a></li>\n            </ul>\n        </div>\n        <!--Dashboad-->\n        <div id="columns" class="row-fluid">\n            <ul id="widget1" class="column ui-sortable unstyled">\n                <li id="Widget1" class="widget">\n                    <div class="widget-head">\n                        <span>Patients List</span></div>\n                    <div class="widget-content">\n                        <iframe id="iframeWidget1" class="widget-iframe" style="overflow: hidden;" src="widgets/widget1.html">\n                        </iframe>\n                    </div>\n                </li>\n                <li id="Widget4" class="widget">\n                    <div class="widget-head">\n                        <span>Avg. Surgery Visit Duration</span></div>\n                    <div class="widget-content">\n                        <iframe id="iframeWidget4" class="widget-iframe" style="overflow: hidden;" src="widgets/widget4.html">\n                        </iframe>\n                    </div>\n                </li>\n            </ul>\n            <ul id="widget2" class="column ui-sortable unstyled">\n                <li id="Widget2" class="widget">\n                    <div class="widget-head">\n                        <span>Daily Visits</span></div>\n                    <div class="widget-content">\n                        <iframe id="iframeWidget3" class="widget-iframe" style="overflow: hidden;" src="widgets/widget3.html">\n                        </iframe>\n                    </div>\n                </li>\n                <li id="Widget5" class="widget">\n                    <div class="widget-head">\n                        <span>Next Appointments</span></div>\n                    <div class="widget-content">\n                        <iframe id="iframeWidget5" class="widget-iframe" style="overflow: hidden;" src="widgets/widget5.html">\n                        </iframe>\n                    </div>\n                </li>\n            </ul>\n            <ul id="widget3" class="column ui-sortable unstyled">\n                <li id="Widget3" class="widget">\n                    <div class="widget-head">\n                        <span>Age-Gender Distribution</span></div>\n                    <div class="widget-content">\n                        <iframe id="iframeWidget2" class="widget-iframe" style="overflow: hidden;" src="widgets/widget2.html">\n                        </iframe>\n                    </div>\n                </li>\n                <li id="Widget6" class="widget">\n                    <div class="widget-head">\n                        <span>Oustanding Payments</span></div>\n                    <div class="widget-content">\n                        <iframe id="iframeWidget6" class="widget-iframe" style="overflow: hidden;" src="widgets/widget6.html">\n                        </iframe>\n                    </div>\n                </li>\n            </ul>\n        </div>\n    </div>');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}
});

;require.register("templates/patient_create_template", function(exports, require, module) {
module.exports = function (__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      __out.push('<!--<div class="modal fade hide" role="dialog">-->\n    <div class="modal-dialog">\n        <div class="modal-container">\n            <div class="modal-header">\n                <button type="button" class="close" data-dismiss="modal">×</button>\n                <h4 class="modal-title">Patient Registration</h4>\n            </div>\n            <div class="modal-body"> \n                <form class="form-horizontal" role="form">\n                    <div class="control-group">\n                        <label class="col-sm-2  control-label" for="inputName">Name</label>\n                        <div class="controls">\n                            <div class="input-prepend">\n                                <span class="add-on"><i class="icon-nameplate"></i></span>\n                                <input class="span4" id="inputName" type="text">\n                            </div>                            \n                        </div>\n                    </div>\n                    <div class="control-group">\n                        <label class="col-sm-2 control-label" for="gender">\n                            Gender</label>\n                        <div class="controls">\n                            <label class="radio inline" >\n                                <input type="radio" name="gender" id="optionsMale" value="Male" checked>Male\n                            </label>\n                            <label class="radio inline">\n                                <input type="radio" name="gender" id="optionsFemale" value="Female">Female\n                            </label>\n                        </div>\n                    </div>\n                    <div class="control-group">\n                        <label class="control-label" for="salutation">\n                            Salutation</label>\n                        <div class="controls">\n                            <label class="radio inline">\n                                <input type="radio" name="salutation" id="optionsMr" value="Mr." checked>Mr.\n                                    \n                            </label>\n                            <label class="radio inline">\n                                <input type="radio" name="salutation" id="optionsMrs" value="Mrs.">Mrs.\n                            </label>\n                            <label class="radio inline">\n                                <input type="radio" name="salutation" id="optionsMiss" value="Miss.">Miss\n                            </label>\n                            <label class="radio inline">\n                                <input type="radio" name="salutation" id="optionsMs" value="Ms.">Ms.\n                            </label>\n                            <label class="radio inline">\n                                <input type="radio" name="salutation" id="optionsDr" value="Dr.">Dr.\n                            </label>\n                            <label class="radio inline">\n                                <input type="radio" name="salutation" id="optionsProf" value="Prof.">Prof.\n                            </label>\n                        </div>\n                    </div>\n                    <div class="control-group">\n                        <label class="control-label" for="marital-status">\n                             Marital Status</label>\n                        <div class="controls">\n                            <label class="radio inline">\n                                <input type="radio" name="marital-status" id="optionsMarried" value="Married" checked>Married\n                            </label>\n                            <label class="radio inline">\n                                <input type="radio" name="marital-status" id="optionsSingle" value="Single">Single\n                            </label>\n                            <label class="radio inline">\n                                <input type="radio" name="marital-status" id="optionsDivorced" value="Divorced">Divorced\n                            </label>\n                            <label class="radio inline">\n                                <input type="radio" name="marital-status" id="optionsCommonLaw" value="Common Law">Common Law\n                            </label>\n                            <label class="radio inline">\n                                <input type="radio" name="marital-status" id="optionsSeparated" value="Separated">Separated\n                            </label>\n                            <label class="radio inline">\n                                <input type="radio" name="marital-status" id="optionsWidowed" value="Widowed">Widowed\n                            </label>\n                        </div>\n                    </div>\n                    <div class="control-group">\n                        <label class="control-label" for="inputBirthdate">\n                            Date Of Birth</label>\n                        <div class="controls">\n                            <input type="text" id="inputBirthdate" class="datepicker" data-date-format="mm/dd/yyyy">\n                        </div>\n                    </div>\n                    <div class="control-group">\n                        <label class="control-label" for="inputAddress">\n                            Address</label>\n                        <div class="controls">\n                            <textarea id="inputAddress" rows="3"></textarea>\n                        </div>\n                    </div>  \n                    <div class="control-group">\n                        <label class="control-label" for="inputPhone">\n                            Phone</label>\n                        <div class="controls">\n                            <div class="input-prepend">\n                                <span class="add-on"><i class="icon-comment"></i></span>\n                                <input class="span4" id="inputPhone" type="text">\n                            </div>\n                        </div>\n                    </div>\n                    <div class="control-group">\n                        <label class="control-label" for="inputEmail">\n                            E-mail</label>\n                        <div class="controls">\n                            <div class="input-prepend">\n                                <span class="add-on"><i class="icon-envelope"></i></span>\n                                <input class="span4" id="inputEmail" type="text">\n                            </div>\n                        </div>\n                    </div>                                             \n                </form>                     \n            </div>\n            <div class="modal-footer">\n                <a href="#" class="btn btn-primary js-save-btn" data-dismiss="modal">Save changes</a> \n                <a href="#" class="btn js-cancel-btn" data-dismiss="modal">Cancel</a>\n            </div>\n        </div>\n    </div>\n<!--</div>-->');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}
});

;require.register("templates/patient_list_item_template", function(exports, require, module) {
module.exports = function (__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      __out.push('<td>');
    
      __out.push(__sanitize(this.name));
    
      __out.push('</td>\n<td>');
    
      __out.push(__sanitize(this.gender));
    
      __out.push('</td>\n<td>');
    
      __out.push(__sanitize(this.dob));
    
      __out.push('</td>\n<td>');
    
      __out.push(__sanitize(this.address));
    
      __out.push('</td>\n<td>');
    
      __out.push(__sanitize(this.phone));
    
      __out.push('</td>\n<td class="center ">\n    <a href="#view/patients/');
    
      __out.push(__sanitize(this.id));
    
      __out.push('" rel="tooltip" data-original-title="View">\n    \t<i class="icon-user"></i>\n    </a>&nbsp;&nbsp;&nbsp;\n    <a href="#edit/patients/');
    
      __out.push(__sanitize(this.id));
    
      __out.push('" rel="tooltip" data-original-title="Edit">\n    \t<i class="icon-pencil"></i>\n    </a>&nbsp;&nbsp;&nbsp;\n    <a href="#" rel="tooltip" data-original-title="Delete">\n    \t<i class="icon-trash"></i>\n    </a>&nbsp;&nbsp;&nbsp;\n</td>');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}
});

;require.register("templates/patient_list_template", function(exports, require, module) {
module.exports = function (__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      __out.push('<div class="container">\n    <div class="row clearfix">\n        <div class="col-md-12 column">\n            <ul class="nav nav-pills">\n                <li><a href="#create" title="+ Add new patient"><i class="icon-large icon-user-add"></i></a></li>\n            </ul>\n        </div>\n    </div>\n    <div class="row clearfix">\n        <div class="col-md-8 column">\n            <table class="table table-bordered table-striped table-selectable">\n                <thead>\n                    <tr>\n                        <th>Name</th>\n                        <th>Gender</th>\n                        <th>Date Of Birth</th>\n                        <th>Address</th>\n                        <th>Phone</th>\n                        <th>Actions</th>                        \n                    </tr>\n                </thead>\n                <tbody class="patient-grid">\n                    <p class="no-results" style="display:none;">No Results</p>\n                </tbody>\n            </table>\n            <!-- Load More "Link" -->  \n            <div class="load-more">\n                <div id="followingBallsG" style="display:none;">\n                    <div id="followingBallsG_1" class="followingBallsG">\n                    </div>\n                    <div id="followingBallsG_2" class="followingBallsG">\n                    </div>\n                    <div id="followingBallsG_3" class="followingBallsG">\n                    </div>\n                    <div id="followingBallsG_4" class="followingBallsG">\n                    </div>\n                </div>\n\n                <a href="#" class="js-patients-loadmore">\n                    <div class="activate" style="display:none;"></div>\n                    Load More\n                </a>\n            </div>  \n        </div>\n        <div class="col-md-4 column">\n        </div>\n    </div>\n</div>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}
});

;require.register("templates/patient_view_template", function(exports, require, module) {
module.exports = function (__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      __out.push('<div class="container">\n\t<div class="row clearfix">\n\t\t<div class="col-md-4 column">\n\t\t</div>\n\t\t<div class="col-md-4 column">\n\t\t\t<div class="row clearfix">\n\t\t\t\t<div class="col-md-12 column">\n\t\t\t\t\t<div class="page-header">\n\t\t\t\t\t\t<h1>\n\t\t\t\t\t\t\t');
    
      __out.push(__sanitize(this.name));
    
      __out.push('\n\t\t\t\t\t\t</h1>\n\t\t\t\t\t</div> <address> ');
    
      __out.push(__sanitize(this.address));
    
      __out.push('<br /> <abbr title="Phone">P:</abbr> ');
    
      __out.push(__sanitize(this.phone));
    
      __out.push('</address>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="row clearfix">\n\t\t\t\t<div class="col-md-12 column">\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="col-md-4 column">\n\t\t</div>\n\t</div>\n</div>');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}
});

;require.register("templates/patients_template", function(exports, require, module) {
module.exports = function (__obj) {
  if (!__obj) __obj = {};
  var __out = [], __capture = function(callback) {
    var out = __out, result;
    __out = [];
    callback.call(this);
    result = __out.join('');
    __out = out;
    return __safe(result);
  }, __sanitize = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else if (typeof value !== 'undefined' && value != null) {
      return __escape(value);
    } else {
      return '';
    }
  }, __safe, __objSafe = __obj.safe, __escape = __obj.escape;
  __safe = __obj.safe = function(value) {
    if (value && value.ecoSafe) {
      return value;
    } else {
      if (!(typeof value !== 'undefined' && value != null)) value = '';
      var result = new String(value);
      result.ecoSafe = true;
      return result;
    }
  };
  if (!__escape) {
    __escape = __obj.escape = function(value) {
      return ('' + value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };
  }
  (function() {
    (function() {
      __out.push('<br/>\n<br/>\n<br/>\n<div class="row-fluid">\n    <div class="span4 text-center">\n        <img src="img/twitter.jpg" width="100"><br/><br/>\n        <p>Follow me on Twitter<br/>\n        <a href="http://twitter.com/ccoenraets">@chridam</a></p>\n        <br/>\n    </div>\n\n    <div class="span4 text-center">\n        <img src="img/github.jpg" width="100"><br/><br/>\n        <p>Watch me code on GitHub<br/>\n        <a href="https://github.com/chrisdamba">https://github.com/chrisdamba</a></p>\n        <br/>\n    </div>\n\n    <div class="span4 text-center">\n        <img src="img/blog.jpg" width="100"><br/><br/>\n        <p>Visit my blog<br/><a href="http://chridam.com/blog">http://chridam.com/blog</a></p>\n        <br/>\n    </div>\n</div>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}
});

;
//# sourceMappingURL=app.js.map