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
require.register("components/collection_view", function(exports, require, module) {
var CollectionView, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = CollectionView = (function(_super) {
  __extends(CollectionView, _super);

  function CollectionView() {
    this.render = __bind(this.render, this);
    _ref = CollectionView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  CollectionView.prototype.tagName = 'ul';

  CollectionView.prototype._itemView = void 0;

  CollectionView.prototype._itemViews = void 0;

  CollectionView.prototype.dispose = function() {
    CollectionView.__super__.dispose.apply(this, arguments);
    delete this._itemView;
    delete this._itemViews;
    return delete this.collection;
  };

  CollectionView.prototype.initialize = function(options) {
    var _this = this;
    CollectionView.__super__.initialize.apply(this, arguments);
    this._itemView = options.itemView;
    this._itemViews = [];
    if (!this.collection) {
      throw new Error('ERROR: CollectionView.initialize() - collection option must be specified');
    }
    if (!this._itemView) {
      throw new Error('ERROR: CollectionView.initialize() - itemView option must be specified');
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

  CollectionView.prototype.render = function() {
    CollectionView.__super__.render.apply(this, arguments);
    this.collection.each(this._renderItem);
    return this;
  };

  CollectionView.prototype.views = function() {
    return this._itemViews.slice(0);
  };

  CollectionView.prototype.size = function() {
    return this._itemViews.length;
  };

  CollectionView.prototype._renderItem = function(model) {
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

  CollectionView.prototype._itemEvent = function(type, itemView) {
    return this.trigger(type, {
      target: this,
      itemView: itemView
    });
  };

  CollectionView.prototype._removeItem = function(model) {
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

  CollectionView.prototype._reset = function() {
    var view, _i, _len, _ref1;
    _ref1 = this._itemViews;
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      view = _ref1[_i];
      view.leave();
    }
    this._itemViews = [];
    return this.render();
  };

  return CollectionView;

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

;require.register("daylight/application", function(exports, require, module) {
var Application, ApplicationModel, HomeView, PatientCollection, PatientListView, PatientView, Router, ShellView,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ApplicationModel = require('daylight/models/application_model');

HomeView = require('daylight/views/home_view');

PatientView = require('daylight/views/patient_view');

PatientListView = require('daylight/views/patient_list_view');

ShellView = require('daylight/views/shell_view');

Router = require('router/router');

PatientCollection = require('daylight/collections/patient_collection');

Application = (function(_super) {
  __extends(Application, _super);

  function Application($el) {
    var _this = this;
    this.$el = $el;
    this.onPatientPageChanged = __bind(this.onPatientPageChanged, this);
    this.showDefault = __bind(this.showDefault, this);
    Application.__super__.constructor.call(this, this.$el);
    this.router = new Router();
    this.shellView = new ShellView;
    $("body").html(this.shellView.render().el);
    $("body").click(function() {
      return $(".dropdown").removeClass("open");
    });
    window.App.eventAggregator.on('navigate:home', function(e) {
      return _this.showDefault(e || {});
    });
    window.App.eventAggregator.on('navigate:patients', function(e) {
      return _this.showPatientList(e || {});
    });
    window.App.eventAggregator.on('navigate:patient', function(e) {
      return _this.showPatient(e.id, e.index, e.subIndex, e.editMode);
    });
    this.appModel = new ApplicationModel;
    Backbone.history.start();
  }

  Application.prototype.doShow = function(viewClass, load) {
    var view;
    if (load == null) {
      load = false;
    }
    if (!(this.currentView instanceof viewClass)) {
      view = new viewClass({
        model: this.appModel
      });
      if (load) {
        view.load();
      }
      this.showView(view);
      this.$el.html(view.el);
      return this.shellView.selectMenuItem("home-menu");
    }
  };

  Application.prototype.showDefault = function(e) {
    var route;
    route = this.appModel.get('routes')["default"];
    route = "" + route;
    this.doShow(HomeView);
    return this.router.navigate(route);
  };

  Application.prototype.showPatientList = function(params) {
    var collection, route, _ref;
    if (params == null) {
      params = {};
    }
    if ((_ref = this.currentPatient) != null) {
      _ref.dispose();
    }
    window.App.currentPatient = this.currentPatient = null;
    route = '';
    if (!_.isEmpty(params)) {
      route = window.decache(this.router.addParamsToRoute(route, params));
    }
    collection = null;
    delete window.App.currentPatient;
    if (!(this.currentView instanceof PatientsView)) {
      collection = new PatientCollection({
        url: 'API/Patients'
      });
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
    $.get(window.decache(window.App.url('/Patients/Activity/')));
    return this.router.navigate(route);
  };

  Application.prototype.showPatient = function(id, index, subIndex, editMode) {
    var _ref,
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
      this.currentPatient.navigate(index, subIndex, editMode);
    } else {
      window.App.currentPatient = this.currentPatient = window.IoC.get('PatientModel', {
        id: id
      }, {
        parse: true
      });
      this.currentPatient.on('navigate', this.onPatientPageChanged);
      this.currentPatient.fetch({
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
    return this.shellView.selectMenuItem();
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
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PatientModel = require('daylight/models/patient_model');

PatientCollection = (function(_super) {
  __extends(PatientCollection, _super);

  function PatientCollection() {
    _ref = PatientCollection.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  PatientCollection.prototype.url = 'API/Patients';

  PatientCollection.prototype.model = PatientModel;

  return PatientCollection;

})(support.LazyCollection);

module.exports = PatientCollection;

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

  PatientCollection.prototype.url = 'API/Patients';

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
    username: void 0,
    relationshipStatus: void 0,
    name: void 0,
    otherNames: void 0,
    telecoms: void 0,
    dateOfBirth: void 0,
    dobEstimate: false,
    relationships: void 0,
    addresses: void 0,
    conditions: void 0,
    medications: void 0,
    procedures: void 0,
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
    console.log(json);
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
    index = Math.max(0, Math.min(this.get('conditions').length - 1, index));
    oldIndex = this.get('_index');
    oldSubIndex = this.get('_subIndex');
    oldEditMode = this.get('_editMode');
    this.set({
      _index: index,
      _subIndex: subIndex,
      _editMode: editMode
    });
    this.get('conditions').at(index).navigate(subIndex);
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

;require.register("daylight/views/home_view", function(exports, require, module) {
var HomeView, HomeViewTemplate, ShellView, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

HomeViewTemplate = require('templates/home_template');

ShellView = require('daylight/views/shell_view');

HomeView = (function(_super) {
  __extends(HomeView, _super);

  function HomeView() {
    this.showMeBtnClick = __bind(this.showMeBtnClick, this);
    this.render = __bind(this.render, this);
    _ref = HomeView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  HomeView.prototype.template = HomeViewTemplate;

  HomeView.prototype.events = {
    'click #showMeBtn': 'showMeBtnClick'
  };

  HomeView.prototype.render = function() {
    this.$el.html(this.template());
    return this;
  };

  HomeView.prototype.showMeBtnClick = function() {
    console.log("showme");
    this.shellView = new ShellView;
    return this.shellView.search();
  };

  return HomeView;

})(support.View);

if (typeof module !== "undefined" && module !== null) {
  module.exports = HomeView;
}

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

  PatientListItemView.prototype.tagName = 'li';

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
var PatientListItemView, PatientListView, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PatientListItemView = require('daylight/views/patient_list_item_view');

PatientListView = (function(_super) {
  __extends(PatientListView, _super);

  function PatientListView() {
    this.reset = __bind(this.reset, this);
    this.removePatient = __bind(this.removePatient, this);
    this.patientEvent = __bind(this.patientEvent, this);
    this.renderPatient = __bind(this.renderPatient, this);
    this.render = __bind(this.render, this);
    this.dispose = __bind(this.dispose, this);
    _ref = PatientListView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  PatientListView.prototype.tagName = 'ul';

  PatientListView.prototype.className = 'nav nav-list';

  PatientListView.prototype.dispose = function() {
    PatientListView.__super__.dispose.apply(this, arguments);
    return delete this._collection;
  };

  PatientListView.prototype.initialize = function(options) {
    var _this = this;
    PatientListView.__super__.initialize.call(this, options);
    this._collection = options.model;
    if (!this._collection) {
      throw new Error('ERROR: PatientListView.initialize() - collection option must be specified');
    }
    this.listenTo(this._collection, 'add', this.renderPatient);
    this.listenTo(this._collection, 'remove', function(model, collection, options) {
      return _this.removePatient(model);
    });
    this.listenTo(this._collection, 'reset', function(collection, options) {
      return _this.reset();
    });
    return _.bindAll(this, 'render');
  };

  PatientListView.prototype.render = function() {
    PatientListView.__super__.render.apply(this, arguments);
    this.$el.empty();
    this._collection.forEach(this.renderPatient, this);
    return this;
  };

  PatientListView.prototype.renderPatient = function(model) {
    var view;
    view = new PatientListItemView({
      model: model
    });
    this.patientEvent('patientAdded', view);
    this.patientEvent('patientRendered', view);
    return this.$el.append(this.renderChild(view).el);
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

  return PatientListView;

})(support.View);

if (typeof module !== "undefined" && module !== null) {
  module.exports = PatientListView;
}

});

;require.register("daylight/views/patient_summary_view", function(exports, require, module) {
var PatientSummaryTemplate, PatientSummaryView, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PatientSummaryTemplate = require('templates/patient_summary_template');

PatientSummaryView = (function(_super) {
  __extends(PatientSummaryView, _super);

  function PatientSummaryView() {
    this.render = __bind(this.render, this);
    this.template = __bind(this.template, this);
    _ref = PatientSummaryView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  PatientSummaryView.prototype.template = function(data) {
    return PatientSummaryTemplate(data);
  };

  PatientSummaryView.prototype.initialize = function(options) {
    PatientSummaryView.__super__.initialize.call(this, options);
    return this.listenTo(this.model, 'change', this.render, this);
  };

  PatientSummaryView.prototype.render = function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  };

  return PatientSummaryView;

})(support.View);

module.exports = PatientSummaryView;

});

;require.register("daylight/views/patient_view", function(exports, require, module) {
var PatientListView, PatientSummaryTemplate, PatientSummaryView, PatientView, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PatientSummaryView = require('daylight/views/patient_summary_view');

PatientListView = require('daylight/views/patient_list_view');

PatientSummaryTemplate = require('templates/patient_summary_template');

PatientView = (function(_super) {
  __extends(PatientView, _super);

  function PatientView() {
    this.render = __bind(this.render, this);
    this.template = __bind(this.template, this);
    _ref = PatientView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  PatientView.prototype.template = function(data) {
    return PatientSummaryTemplate(data);
  };

  PatientView.prototype.render = function() {
    this.$el.html(this.template(this.model.toJSON()));
    $("#details", this.el).html(new PatientSummaryView({
      model: this.model
    }).render().el);
    this.model.conditions.fetch({
      success: function(data) {
        if (data.length === 0) {
          return $(".no-reports").show();
        }
      }
    });
    $("#reports", this.el).append(new PatientListView({
      collection: this.model.conditions
    }).render().el);
    return this;
  };

  return PatientView;

})(support.View);

if (typeof module !== "undefined" && module !== null) {
  module.exports = PatientView;
}

});

;require.register("daylight/views/shell_view", function(exports, require, module) {
var PatientCollection, PatientListView, ShellTemplate, ShellView, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PatientListView = require('daylight/views/patient_list_view');

ShellTemplate = require('templates/shell_template');

PatientCollection = require('daylight/collections/patient_collection');

ShellView = (function(_super) {
  __extends(ShellView, _super);

  function ShellView() {
    this.selectMenuItem = __bind(this.selectMenuItem, this);
    this.onkeypress = __bind(this.onkeypress, this);
    this.search = __bind(this.search, this);
    this.render = __bind(this.render, this);
    this.template = __bind(this.template, this);
    _ref = ShellView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  ShellView.prototype.events = {
    'keyup .search-query': 'search',
    'keypress .search-query': 'onkeypress'
  };

  ShellView.prototype.template = function(data) {
    return ShellTemplate(data);
  };

  ShellView.prototype.initialize = function(options) {
    ShellView.__super__.initialize.call(this, options);
    this.searchResults = new PatientCollection({
      url: 'API/Patients'
    });
    this.searchResults.fetch();
    console.log(this.searchResults);
    return this.searchresultsView = new PatientListView({
      model: this.searchResults,
      className: "dropdown-menu"
    });
  };

  ShellView.prototype.render = function() {
    this.$el.html(this.template(this.model));
    $(".navbar-search", this.el).append(this.searchresultsView.render().el);
    return this;
  };

  ShellView.prototype.search = function(e) {
    var key, self;
    key = $("#searchText").val();
    this.searchResults.fetch({
      reset: true,
      data: {
        name: key
      }
    });
    self = this;
    return setTimeout(function() {
      return $(".dropdown").addClass("open");
    });
  };

  ShellView.prototype.onkeypress = function(e) {
    if (e.keyCode === 13) {
      return e.preventDefault();
    }
  };

  ShellView.prototype.selectMenuItem = function(menuItem) {
    $(".navbar .nav li").removeClass("active");
    if (menuItem) {
      return $("." + menuItem).addClass("active");
    }
  };

  return ShellView;

})(support.View);

module.exports = ShellView;

});

;require.register("initialize", function(exports, require, module) {
var Application;

Application = require('daylight/application');

$(function() {
  delete Backbone.Model.prototype.escape;
  window.App = {
    eventAggregator: new support.EventAggregator(),
    host: ''
  };
  return new Application($('#content'));
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
    '?*query': 'default',
    '*actions': 'default',
    '': 'default',
    'edit/:id/patient:index.:subIndex': 'editPatient',
    'edit/:id/patient:index': 'editPatient',
    ':id/condition:index.:subIndex': 'patient',
    ':id/condition:index': 'patient',
    'patients/:id': 'patient',
    ':id': 'patient'
  };

  Router.prototype["default"] = function(query) {
    var params;
    params = this.getParams(query) || {};
    return App.eventAggregator.trigger('navigate:home', params);
  };

  Router.prototype.editPatient = function(id, index, subIndex) {
    if (index == null) {
      index = 1;
    }
    if (subIndex == null) {
      subIndex = 1;
    }
    return this.patient(id, index, subIndex, true);
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

;require.register("templates/book_template", function(exports, require, module) {
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
      __out.push('<img src="');
    
      __out.push(__sanitize(this.coverImage));
    
      __out.push('" />\n    <ul>\n        <li>');
    
      __out.push(__sanitize(this.title));
    
      __out.push('</li>\n        <li>');
    
      if (this.author) {
        __out.push(__sanitize(this.author.displayName));
      }
    
      __out.push('</li>\n        <li>');
    
      __out.push(__sanitize(this.releaseDate));
    
      __out.push('</li>\n        <li>');
    
      __out.push(__sanitize(this.keywords));
    
      __out.push('</li>\n    </ul>\n\n<button class="delete">Delete</button>');
    
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

;require.register("templates/home_template", function(exports, require, module) {
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
      __out.push('<div class="hero-unit" style="padding-bottom: 20px;">\n    <div class="row-fluid">\n        <div class="span5">\n            <img src="img/logo.png">\n        </div>\n\n        <div class="span7">\n            <h2>Welcome to Daylight Surgery Clinical Portal</h2>\n            <p>Daylight Surgery is a clinal portal app.</p>\n        </div>\n    </div>\n    <div class="row-fluid" style="padding-top:30px;">\n        <div class="span3">\n            <iframe class="github-btn"\n                    src="http://ghbtns.com/github-btn.html?user=ccoenraets&amp;repo=directory-backbone-bootstrap&amp;type=watch&amp;count=true"\n                    allowtransparency="true" frameborder="0" scrolling="0" height="20px"></iframe>\n        </div>\n        <div class="span3">\n            <iframe class="github-btn"\n                    src="http://ghbtns.com/github-btn.html?user=ccoenraets&amp;repo=directory-backbone-bootstrap&amp;type=fork&amp;count=true"\n                    allowtransparency="true" frameborder="0" scrolling="0" height="20px"></iframe>\n        </div>\n        <div class="span3">\n            <iframe allowtransparency="true" frameborder="0" scrolling="no"\n                    src="http://platform.twitter.com/widgets/tweet_button.1359159993.html#_=1360071947974&amp;count=horizontal&amp;id=twitter-widget-0&amp;lang=en&amp;\n                    original_referer=http%3A%2F%2Fcoenraets.org%2F&amp;size=m&amp;text=Sociogram&amp;url=http%3A%2F%2Fcoenraets.org%2Fblog/directory&amp;via=ccoenraets"\n                    class="twitter-share-button twitter-count-horizontal" style="height: 20px;"\n                    title="Twitter Tweet Button" data-twttr-rendered="true"></iframe>\n\n        </div>\n        <div class="span3">\n            <iframe allowtransparency="true" frameborder="0" scrolling="no"\n                    src="http://platform.twitter.com/widgets/follow_button.1359159993.html#_=1360071947985&amp;id=twitter-widget-1&amp;lang=en&amp;screen_name=ccoenraets&amp;show_count=true&amp;show_screen_name=true&amp;size=m"\n                    class="twitter-follow-button twitter-follow-button" style="height: 20px;"\n                    title="Twitter Follow Button" data-twttr-rendered="true"></iframe>\n        </div>\n    </div>\n</div>\n\n\n<div class="row-fluid">\n    <div class="span4">\n        <h2>Try It</h2>\n\n        <p>Enter a few characters in the Search Box in the upper right corner of the screen, and select an employee. In\n            the Employee view, you can navigate up and down the Org Chart by clicking either the Manager link,\n            or one of the Direct Reports in the sidebar on the right of the screen.</p>\n\n        <p><a id="showMeBtn" class="btn" href="#">Show Me &raquo;</a></p>\n    </div>\n    <div class="span4">\n        <h2>Get the Code</h2>\n\n        <p>The source code for this application is maintained in <a\n                href="https://github.com/ccoenraets/backbone-directory">this GitHub repository</a>. The repository includes several adapters to use the application with different data persistence solutions: in-memory store, REST API, REST with JSONP, Node.js, MongoDB, etc.</p>\n\n        <p><a class="btn" href="https://github.com/ccoenraets/directory-backbone-bootstrap/zipball/master">Download &raquo;</a></p>\n    </div>\n    <div class="span4">\n        <h2>Get More</h2>\n        <p>The Employee Directory use case is simple enough to be easily understandable. It\'s also not entirely trivial and provides a good playground to test frameworks in a real-life context. Other versions of the application built with other frameworks are available on the author\'s blog.<p>\n        <p><a class="btn" href="http://coenraets.org">Visit the Blog</a></p>\n    </div>\n</div>\n');
    
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
      __out.push('<a href=\'#patients/');
    
      __out.push(__sanitize(this.patientId));
    
      __out.push('\'>\n    <img width="50" height="50" src="pics/');
    
      __out.push(__sanitize(this.name.givenName));
    
      __out.push('_');
    
      __out.push(__sanitize(this.name.familyName));
    
      __out.push('50.jpg" style="float:left;margin-right: 10px;"/>\n    <p class="list-item">');
    
      __out.push(__sanitize(this.name.givenName));
    
      __out.push(' ');
    
      __out.push(__sanitize(this.name.familyName));
    
      __out.push('<br />');
    
      __out.push(__sanitize(this.dateOfBirth));
    
      __out.push('</p>\n</a>');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}
});

;require.register("templates/patient_summary_template", function(exports, require, module) {
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
      __out.push('<p><img src="pics/');
    
      __out.push(__sanitize(this.names.givenName));
    
      __out.push('_');
    
      __out.push(__sanitize(this.names.familyName));
    
      __out.push('.jpg" width="160" height="160"/></p>\n<h3>');
    
      __out.push(__sanitize(this.name.givenName));
    
      __out.push(' ');
    
      __out.push(__sanitize(this.name.familyName));
    
      __out.push('</h3>\n<h4>');
    
      __out.push(__sanitize(this.dateOfBirth));
    
      __out.push('</h4>\n<br>\n        <table class="table table-striped">\n            <tr>\n                <td>Relationship Status:</td>\n                <td><i class="icon-home"></i> ');
    
      __out.push(__sanitize(this.relationshipStatus));
    
      __out.push('</td>\n            </tr>\n            <tr>\n                <td>Cell Phone:</td>\n                <td><i class="icon-headphones"></i> 9309430439349</td>\n            </tr>\n            <tr>\n                <td>Email:</td>\n                <td><i class="icon-envelope"></i> <a href="mailto:test@test.com">test@test.com</a></td>\n            </tr>\n            <tr>\n                <td>Twitter:</td>\n                <td><i class="icon-retweet"></i> <a href="">chridam</a></td>\n            </tr>\n        </table>\n\n        <div class="alert alert-warning">\n          <h4 class="alert-heading">Warning</h4>\n          This is just a test!\n        </div>\n');
    
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

;require.register("templates/shell_template", function(exports, require, module) {
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
      __out.push('<div class="navbar navbar-fixed-top">\n    <div class="navbar-inner">\n        <div class="container">\n            <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">\n                <span class="icon-bar"></span>\n                <span class="icon-bar"></span>\n                <span class="icon-bar"></span>\n            </button>\n            <a class="brand" href="#">Daylight Surgery</a>\n\n            <div class="nav-collapse collapse">\n                <ul class="nav">\n                    <li class="home-menu active"><a href="#">Home</a></li>\n                    <li class="contact-menu"><a href="#contact">Consultations</a></li>\n                    <li class="contact-menu"><a href="#contact">Appointments</a></li>\n                    <li class="contact-menu"><a href="#contact">My Patients</a></li>\n                    <li class="contact-menu"><a href="#contact">My Practice</a></li>\n                </ul>\n                <form class="navbar-search pull-right dropdown">\n                    <input id="searchText" type="search" class="search-query dropdown-toggle" placeholder="Search" autocomplete="off">\n                </form>\n            </div>\n            <!--/.nav-collapse -->\n        </div>\n    </div>\n</div>\n\n\n<div class="container">\n    <br/>\n\n    <div class="row-fluid">\n        <div class="span12" id="content"></div>\n    </div>\n\n    <hr>\n\n    <footer>\n        <p>&copy; Daylight Surgery 2013</p>\n    </footer>\n\n</div>');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}
});

;
//# sourceMappingURL=app.js.map