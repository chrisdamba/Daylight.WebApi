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
var LibraryView,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = LibraryView = (function(_super) {
  __extends(LibraryView, _super);

  function LibraryView() {
    this.render = __bind(this.render, this);
    return LibraryView.__super__.constructor.apply(this, arguments);
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
    LibraryView.__super__.initialize.apply(this, arguments);
    this._itemView = options.itemView;
    this._itemViews = [];
    if (!this.collection) {
      throw new Error('ERROR: LibraryView.initialize() - collection option must be specified');
    }
    if (!this._itemView) {
      throw new Error('ERROR: LibraryView.initialize() - itemView option must be specified');
    }
    this.listenTo(this.collection, 'add', (function(_this) {
      return function(model, collection, options) {
        return _this._renderItem(model);
      };
    })(this));
    this.listenTo(this.collection, 'remove', (function(_this) {
      return function(model, collection, options) {
        return _this._removeItem(model);
      };
    })(this));
    return this.listenTo(this.collection, 'reset', (function(_this) {
      return function(collection, options) {
        return _this._reset();
      };
    })(this));
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
    var i, view, _i, _len, _ref, _results;
    _ref = this._itemViews;
    _results = [];
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      view = _ref[i];
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
    var view, _i, _len, _ref;
    _ref = this._itemViews;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      view = _ref[_i];
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
    PatientModel: {
      type: 'daylight/models/patient_model',
      properties: {
        _urlRoot: '/API/Patients',
        _thumbnailPath: '${patient.thumbnailPath}'
      }
    },
    ConditionCollection: {
      type: 'daylight/collections/condition_collection',
      lifestyle: 'transient',
      properties: {
        url: '/API/Patients/:id/Conditions'
      }
    },
    ConditionModel: {
      type: 'daylight/models/condition_model',
      properties: {
        _urlRoot: '/API/Patients/:id/Conditions'
      }
    },
    VitalCollection: {
      type: 'daylight/collections/vital_collection',
      lifestyle: 'transient',
      properties: {
        url: '/API/Patients/:id/Vitals'
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
var Application, ApplicationModel, DashboardView, PatientCollection, PatientCreateView, PatientEditView, PatientListView, PatientModel, PatientView, Router,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ApplicationModel = require('daylight/models/application_model');

PatientModel = require('daylight/models/patient_model');

DashboardView = require('daylight/views/dashboard_view');

PatientView = require('daylight/views/patient_view');

PatientListView = require('daylight/views/patient_list_view');

PatientCreateView = require('daylight/views/patient_create_view');

PatientEditView = require('daylight/views/patient_edit_view');

Router = require('router/router');

PatientCollection = require('daylight/collections/patient_collection');

Application = (function(_super) {
  __extends(Application, _super);

  function Application($el) {
    this.$el = $el;
    this.onPatientPageChanged = __bind(this.onPatientPageChanged, this);
    this.showPatientCreate = __bind(this.showPatientCreate, this);
    this.showDefault = __bind(this.showDefault, this);
    Application.__super__.constructor.call(this, this.$el);
    this.router = new Router();
    window.App.eventAggregator.on('navigate:home', (function(_this) {
      return function(e) {
        return _this.showDefault(e || {});
      };
    })(this));
    window.App.eventAggregator.on('navigate:addwidget', (function(_this) {
      return function(e) {
        return _this.showAddWidgetModal(e || {});
      };
    })(this));
    window.App.eventAggregator.on('navigate:patients', (function(_this) {
      return function(e) {
        return _this.showPatientsList(e || {});
      };
    })(this));
    window.App.eventAggregator.on('navigate:addpatient', (function(_this) {
      return function(e) {
        return _this.showPatientCreate(e || {});
      };
    })(this));
    window.App.eventAggregator.on('navigate:patient', (function(_this) {
      return function(e) {
        return _this.showPatient(e.id, e.index, e.subIndex, e.editMode);
      };
    })(this));
    window.App.eventAggregator.on('navigate:pageCondition', (function(_this) {
      return function(e) {
        return _this.showPatient(_this.currentPatient.id, _this.currentPatient.get('_index'), e.subPageIndex, _this.currentPatient.get('_editMode'));
      };
    })(this));
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

  Application.prototype.showPatientsList = function(params) {
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
    var patientModel, _ref;
    if (index == null) {
      index = 0;
    }
    if (subIndex == null) {
      subIndex = 0;
    }
    if (editMode == null) {
      editMode = false;
    }
    if (!(this.currentPatient && ((_ref = this.currentPatient) != null ? _ref.id : void 0) === id)) {
      patientModel = window.IoC.get('PatientModel', {
        id: id
      }, {
        parse: true
      });
      window.App.currentPatient = this.currentPatient = patientModel;
      this.currentPatient.on('navigate', this.onPatientPageChanged);
    }
    return this.currentPatient.fetch({
      success: (function(_this) {
        return function(model, response, options) {
          model.navigate(index, subIndex, editMode);
          return _this.showView(new PatientView({
            model: model
          }));
        };
      })(this),
      error: (function(_this) {
        return function(model, response, options) {
          if (response.status = 403) {
            return window.location = '/Error/HttpError';
          }
        };
      })(this)
    });
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

;require.register("daylight/collections/condition_collection", function(exports, require, module) {
var ConditionCollection, ConditionModel,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ConditionModel = require('daylight/models/condition_model');

ConditionCollection = (function(_super) {
  __extends(ConditionCollection, _super);

  function ConditionCollection() {
    return ConditionCollection.__super__.constructor.apply(this, arguments);
  }

  ConditionCollection.prototype.model = ConditionModel;

  ConditionCollection.prototype.url = function() {
    if (this.patient) {
      return "" + (this.patient.url()) + "/conditions";
    } else {
      return '';
    }
  };

  ConditionCollection.prototype.initialize = function(models, options) {
    ConditionCollection.__super__.initialize.call(this, models, options);
    this.on('index-up', this.onIndexUp);
    return this.on('index-down', this.onIndexDown);
  };

  ConditionCollection.prototype.changeIndex = function(model, to) {
    var from;
    from = this.models.indexOf(model);
    this.models.splice(to, 0, this.models.splice(from, 1)[0]);
    return this.trigger('reorder', {
      from: {
        index: from
      },
      to: {
        index: to
      }
    });
  };

  ConditionCollection.prototype.onIndexUp = function(model) {
    return this.changeIndex(model, this.indexOf(model) + 1);
  };

  ConditionCollection.prototype.onIndexDown = function(model) {
    return this.changeIndex(model, this.indexOf(model) - 1);
  };

  return ConditionCollection;

})(support.Collection);

module.exports = ConditionCollection;

});

;require.register("daylight/collections/condition_search_collection", function(exports, require, module) {
var ConditionSearchCollection, SearchModel,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

SearchModel = require('daylight/models/search_model');

ConditionSearchCollection = (function(_super) {
  __extends(ConditionSearchCollection, _super);

  function ConditionSearchCollection() {
    return ConditionSearchCollection.__super__.constructor.apply(this, arguments);
  }

  ConditionSearchCollection.prototype.model = SearchModel;

  ConditionSearchCollection.prototype.sync = function(method, model, options) {
    var params, query;
    query = $('input[name=condition]').val();
    params = _.extend({
      url: this.url,
      type: 'GET',
      dataType: 'jsonp',
      data: {
        term: query
      }
    }, options);
    return $.ajax(params);
  };

  ConditionSearchCollection.prototype.initialize = function(models, options) {
    return ConditionSearchCollection.__super__.initialize.call(this, models, options);
  };

  ConditionSearchCollection.prototype.parse = function(response) {
    var condition, self;
    condition = {};
    self = this;
    $.map(response, function(item) {
      condition.conceptId = item.snomed_concept_id;
      condition.name = item.term;
      condition.synonyms = item.synonyms;
      return self.push(condition);
    });
    return this.models;
  };

  ConditionSearchCollection.prototype.addPartial = function(data) {
    return this.parse(data);
  };

  return ConditionSearchCollection;

})(support.Collection);

module.exports = ConditionSearchCollection;

});

;require.register("daylight/collections/medication_collection", function(exports, require, module) {
var MedicationCollection, MedicationModel,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

MedicationModel = require('daylight/models/medication_model');

MedicationCollection = (function(_super) {
  __extends(MedicationCollection, _super);

  function MedicationCollection() {
    return MedicationCollection.__super__.constructor.apply(this, arguments);
  }

  MedicationCollection.prototype.model = MedicationModel;

  MedicationCollection.prototype.url = function() {
    if (this.condition) {
      return "" + (this.condition.url()) + "/medications";
    } else {
      return '';
    }
  };

  MedicationCollection.prototype.initialize = function(models, options) {
    MedicationCollection.__super__.initialize.call(this, models, options);
    this.on('index-up', this.onIndexUp);
    return this.on('index-down', this.onIndexDown);
  };

  MedicationCollection.prototype.changeIndex = function(model, to) {
    var from;
    from = this.models.indexOf(model);
    this.models.splice(to, 0, this.models.splice(from, 1)[0]);
    return this.trigger('reorder', {
      from: {
        index: from
      },
      to: {
        index: to
      }
    });
  };

  MedicationCollection.prototype.onIndexUp = function(model) {
    return this.changeIndex(model, this.indexOf(model) + 1);
  };

  MedicationCollection.prototype.onIndexDown = function(model) {
    return this.changeIndex(model, this.indexOf(model) - 1);
  };

  return MedicationCollection;

})(support.Collection);

module.exports = MedicationCollection;

});

;require.register("daylight/collections/medication_search_collection", function(exports, require, module) {
var MedicationSearchCollection, SearchModel,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

SearchModel = require('daylight/models/search_model');

MedicationSearchCollection = (function(_super) {
  __extends(MedicationSearchCollection, _super);

  function MedicationSearchCollection() {
    return MedicationSearchCollection.__super__.constructor.apply(this, arguments);
  }

  MedicationSearchCollection.prototype.model = SearchModel;

  MedicationSearchCollection.prototype.sync = function(method, model, options) {
    var params, query;
    query = $('input[name=medication]').val();
    params = _.extend({
      url: this.url,
      type: 'GET',
      dataType: 'jsonp',
      data: {
        term: query
      }
    }, options);
    return $.ajax(params);
  };

  MedicationSearchCollection.prototype.initialize = function(models, options) {
    return MedicationSearchCollection.__super__.initialize.call(this, models, options);
  };

  MedicationSearchCollection.prototype.parse = function(response) {
    var medication, self;
    medication = {};
    self = this;
    $.map(response, function(item) {
      medication.conceptId = item.snomed_concept_id;
      medication.name = item.term;
      medication.synonyms = item.synonyms;
      return self.push(medication);
    });
    return this.models;
  };

  MedicationSearchCollection.prototype.addPartial = function(data) {
    return this.parse(data);
  };

  return MedicationSearchCollection;

})(support.Collection);

module.exports = MedicationSearchCollection;

});

;require.register("daylight/collections/patient_collection", function(exports, require, module) {
var PatientCollection, PatientModel,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PatientModel = require('daylight/models/patient_model');

PatientCollection = (function(_super) {
  __extends(PatientCollection, _super);

  function PatientCollection() {
    this.anyFetchSuccess = __bind(this.anyFetchSuccess, this);
    return PatientCollection.__super__.constructor.apply(this, arguments);
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

;require.register("daylight/collections/vital_collection", function(exports, require, module) {
var VitalCollection, VitalModel,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

VitalModel = require('daylight/models/vital_model');

VitalCollection = (function(_super) {
  __extends(VitalCollection, _super);

  function VitalCollection() {
    return VitalCollection.__super__.constructor.apply(this, arguments);
  }

  VitalCollection.prototype.model = VitalModel;

  VitalCollection.prototype.url = function() {
    if (this.model) {
      return "API/Patients/" + (this.model.get('patientId')) + "/vitals";
    } else {
      return '';
    }
  };

  VitalCollection.prototype.initialize = function(models, options) {
    VitalCollection.__super__.initialize.call(this, models, options);
    this.on('index-up', this.onIndexUp);
    return this.on('index-down', this.onIndexDown);
  };

  VitalCollection.prototype.fetch = function(options) {
    options = options ? _.clone(options) : {};
    return VitalCollection.__super__.fetch.call(this, options);
  };

  VitalCollection.prototype.changeIndex = function(model, to) {
    var from;
    from = this.models.indexOf(model);
    this.models.splice(to, 0, this.models.splice(from, 1)[0]);
    return this.trigger('reorder', {
      from: {
        index: from
      },
      to: {
        index: to
      }
    });
  };

  VitalCollection.prototype.onIndexUp = function(model) {
    return this.changeIndex(model, this.indexOf(model) + 1);
  };

  VitalCollection.prototype.onIndexDown = function(model) {
    return this.changeIndex(model, this.indexOf(model) - 1);
  };

  return VitalCollection;

})(support.Collection);

module.exports = VitalCollection;

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
var ApplicationModel,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ApplicationModel = (function(_super) {
  __extends(ApplicationModel, _super);

  function ApplicationModel() {
    return ApplicationModel.__super__.constructor.apply(this, arguments);
  }

  ApplicationModel.prototype.defaults = {
    routes: {
      "default": '',
      addwidget: 'addwidget',
      patients: 'view/patients',
      patient: 'view/patients/:id'
    }
  };

  return ApplicationModel;

})(Backbone.Model);

module.exports = ApplicationModel;

});

;require.register("daylight/models/condition_model", function(exports, require, module) {
var ConditionModel,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ConditionModel = (function(_super) {
  __extends(ConditionModel, _super);

  function ConditionModel() {
    this.urlRoot = __bind(this.urlRoot, this);
    return ConditionModel.__super__.constructor.apply(this, arguments);
  }

  ConditionModel.prototype.defaults = function() {
    return {
      conceptId: void 0,
      name: void 0,
      synonyms: void 0,
      startedAt: void 0,
      finishedAt: void 0,
      medications: void 0
    };
  };

  ConditionModel.prototype.conceptId = function() {
    return this.get('conceptId');
  };

  ConditionModel.prototype.patientId = function() {
    return this.get('patientId');
  };

  ConditionModel.prototype.value = function() {
    return this.get('id');
  };

  ConditionModel.prototype.label = function() {
    return this.get('name');
  };

  ConditionModel.prototype.synonyms = function() {
    return this.get('synonyms');
  };

  ConditionModel.prototype.initialize = function(options) {
    return ConditionModel.__super__.initialize.call(this, options);
  };

  ConditionModel.prototype.urlRoot = function() {
    return "/API/Patients/" + (this.patientId()) + "/Conditions";
  };

  ConditionModel.prototype.toJSON = function() {
    var json;
    json = ConditionModel.__super__.toJSON.apply(this, arguments);
    return json;
  };

  return ConditionModel;

})(support.Model);

module.exports = ConditionModel;

});

;require.register("daylight/models/medication_model", function(exports, require, module) {
var MedicationModel,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

MedicationModel = (function(_super) {
  __extends(MedicationModel, _super);

  function MedicationModel() {
    this.urlRoot = __bind(this.urlRoot, this);
    return MedicationModel.__super__.constructor.apply(this, arguments);
  }

  MedicationModel.prototype.defaults = function() {
    return {
      conceptId: '',
      name: '',
      synonyms: void 0,
      startedAt: void 0,
      finishedAt: void 0,
      cost: void 0,
      url: ''
    };
  };

  MedicationModel.prototype.conceptId = function() {
    return this.get('conceptId');
  };

  MedicationModel.prototype.conditionId = function() {
    return this.get('conditionId');
  };

  MedicationModel.prototype.patientId = function() {
    return this.get('patientId');
  };

  MedicationModel.prototype.value = function() {
    return this.get('id');
  };

  MedicationModel.prototype.label = function() {
    return this.get('name');
  };

  MedicationModel.prototype.synonyms = function() {
    return this.get('synonyms');
  };

  MedicationModel.prototype.initialize = function(options) {
    return MedicationModel.__super__.initialize.call(this, options);
  };

  MedicationModel.prototype.urlRoot = function() {
    return "/API/Patients/" + window.App.currentPatient.id + "/Conditions/" + (this.conditionId()) + "/Medications";
  };

  MedicationModel.prototype.toJSON = function() {
    var json;
    json = MedicationModel.__super__.toJSON.apply(this, arguments);
    return json;
  };

  MedicationModel.prototype.getSafeDate = function(dateString) {
    var arrays, dateArray, safeDate, timeArray, timeString;
    safeDate = this.get(dateString);
    if (safeDate) {
      arrays = safeDate.split('T');
      dateArray = arrays[0].split('-');
      timeArray = arrays[1].split(':');
      timeString = "" + timeArray[0] + ":" + timeArray[1];
      dateString = "" + dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];
      safeDate = "" + dateString + " " + timeString;
    } else {
      safeDate = '';
    }
    return safeDate;
  };

  return MedicationModel;

})(support.Model);

module.exports = MedicationModel;

});

;require.register("daylight/models/patient_model", function(exports, require, module) {
var PatientModel,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PatientModel = (function(_super) {
  __extends(PatientModel, _super);

  function PatientModel() {
    this.onRequestSave = __bind(this.onRequestSave, this);
    this.initialize = __bind(this.initialize, this);
    return PatientModel.__super__.constructor.apply(this, arguments);
  }

  PatientModel.prototype.defaults = {
    id: void 0,
    relationshipStatus: void 0,
    firstName: void 0,
    lastName: void 0,
    phone: void 0,
    email: void 0,
    dob: void 0,
    age: void 0,
    address: void 0,
    gender: void 0,
    dateRegistered: void 0,
    conditions: void 0,
    conditionsCount: void 0,
    vitals: void 0,
    uri: void 0,
    _editMode: false,
    _index: 0,
    _subIndex: 0,
    _thumbnailPath: '/API/Patients/{0}/Thumbnail?width=300',
    _hasParsed: void 0
  };

  PatientModel.prototype.urlRoot = function() {
    return 'API/Patients';
  };

  PatientModel.prototype.initialize = function(options) {
    PatientModel.__super__.initialize.call(this, options);
    this.throttledSave = _.throttle((function(_this) {
      return function() {
        return _this.save();
      };
    })(this), 1000, true);
    return this.on('change:_editMode', (function(_this) {
      return function(model, value, options) {
        if (value) {
          return window.App.eventAggregator.on('request:savePatient', _this.onRequestSave);
        } else {
          return window.App.eventAggregator.off('request:savePatient', _this.onRequestSave);
        }
      };
    })(this));
  };

  PatientModel.prototype.onRequestSave = function() {
    return this.throttledSave();
  };

  PatientModel.prototype.getSafeDateRegistered = function() {
    var arrays, dateArray, dateString, safeDate, timeArray, timeString;
    safeDate = this.get('dateRegistered');
    if (safeDate) {
      arrays = safeDate.split('T');
      dateArray = arrays[0].split('-');
      timeArray = arrays[1].split(':');
      timeString = "" + timeArray[0] + ":" + timeArray[1];
      dateString = "" + dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];
      safeDate = "" + dateString + " " + timeString;
    } else {
      safeDate = '';
    }
    return safeDate;
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
    return this.set('_editMode', mode);
  };

  PatientModel.prototype.dispose = function() {
    return window.App.eventAggregator.off('request:savePatient', this.onRequestSave);
  };

  return PatientModel;

})(support.Model);

module.exports = PatientModel;

});

;require.register("daylight/models/search_model", function(exports, require, module) {
var SearchModel,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

SearchModel = (function(_super) {
  __extends(SearchModel, _super);

  function SearchModel() {
    return SearchModel.__super__.constructor.apply(this, arguments);
  }

  SearchModel.prototype.idAttribute = 'id';

  SearchModel.prototype.defaults = function() {
    var snomed_concept_id;
    snomed_concept_id = '';
    return {
      term: '',
      synonyms: void 0
    };
  };

  SearchModel.prototype.conceptId = function() {
    return this.get('snomed_concept_id');
  };

  SearchModel.prototype.value = function() {
    return this.get('id');
  };

  SearchModel.prototype.label = function() {
    return this.get('term');
  };

  SearchModel.prototype.synonyms = function() {
    return this.get('synonyms');
  };

  SearchModel.prototype.initialize = function(options) {
    return SearchModel.__super__.initialize.call(this, options);
  };

  return SearchModel;

})(support.Model);

module.exports = SearchModel;

});

;require.register("daylight/models/vital_model", function(exports, require, module) {
var VitalModel,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

VitalModel = (function(_super) {
  __extends(VitalModel, _super);

  function VitalModel() {
    this.urlRoot = __bind(this.urlRoot, this);
    return VitalModel.__super__.constructor.apply(this, arguments);
  }

  VitalModel.prototype.defaults = function() {
    return {
      dateRecorded: void 0,
      pulse: void 0,
      bloodGlucose: void 0,
      diastolicBp: void 0,
      systolicBp: void 0,
      bodyTemperature: void 0,
      weight: void 0,
      height: void 0,
      timeStamp: void 0
    };
  };

  VitalModel.prototype.patientId = function() {
    return this.get('patientId');
  };

  VitalModel.prototype.value = function() {
    return this.get('id');
  };

  VitalModel.prototype.initialize = function(options) {
    return VitalModel.__super__.initialize.call(this, options);
  };

  VitalModel.prototype.urlRoot = function() {
    return "/API/Patients/" + (this.patientId()) + "/Vitals";
  };

  VitalModel.prototype.toJSON = function() {
    var json;
    json = VitalModel.__super__.toJSON.apply(this, arguments);
    return json;
  };

  return VitalModel;

})(support.Model);

module.exports = VitalModel;

});

;require.register("daylight/models/vitals_graph_model", function(exports, require, module) {


});

;require.register("daylight/views/add_widget_view", function(exports, require, module) {
var AddWidgetModalView, AddWidgetTemplate,
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
    return AddWidgetModalView.__super__.constructor.apply(this, arguments);
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

;require.register("daylight/views/condition/condition_list_item_view", function(exports, require, module) {
var ConditionCollection, ConditionListItemTemplate, ConditionListItemView, MedicationModel, MedicationsView,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ConditionCollection = require('daylight/collections/condition_collection');

ConditionListItemTemplate = require('templates/condition/condition_list_item_template');

MedicationModel = require('daylight/models/medication_model');

MedicationsView = require('daylight/views/medication/medications_view');

ConditionListItemView = (function(_super) {
  __extends(ConditionListItemView, _super);

  function ConditionListItemView() {
    this.onAddMedicationClick = __bind(this.onAddMedicationClick, this);
    this.onDeleteCondition = __bind(this.onDeleteCondition, this);
    this.onDestroy = __bind(this.onDestroy, this);
    this.render = __bind(this.render, this);
    this.template = __bind(this.template, this);
    return ConditionListItemView.__super__.constructor.apply(this, arguments);
  }

  ConditionListItemView.prototype.tagName = 'li';

  ConditionListItemView.prototype.className = 'parent_li';

  ConditionListItemView.prototype.events = {
    'click .js-delete-condition': 'onDeleteCondition',
    'click .js-medication-add': 'onAddMedicationClick'
  };

  ConditionListItemView.prototype.template = function(data) {
    return ConditionListItemTemplate(data);
  };

  ConditionListItemView.prototype.initialize = function(options) {
    ConditionListItemView.__super__.initialize.call(this, options);
    this.bindTo(this.model, 'change', this.render);
    return this.bindTo(this.model, 'destroy', this.onDestroy);
  };

  ConditionListItemView.prototype.render = function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  };

  ConditionListItemView.prototype.onDestroy = function() {
    return this.$el.remove();
  };

  ConditionListItemView.prototype.onDeleteCondition = function(e) {
    var _model;
    _model = this.model;
    $.SmartMessageBox({
      title: 'Shekhinah Surgery Condition Remove Alert!',
      content: 'Are you sure you want to remove this condition?',
      buttons: '[No][Yes]'
    }, function(ButtonPressed) {
      if (ButtonPressed === 'Yes') {
        _model.destroy({
          wait: true
        });
        $.smallBox({
          title: 'Shekhinah Surgery Condition Remove',
          content: "<i class='fa fa-clock-o'></i> <i>Condition successfully removed...</i>",
          color: '#659265',
          iconSmall: 'fa fa-times fa-2x fadeInRight animated',
          timeout: 4000
        });
        window.App.eventAggregator.trigger('navigate:patient', {
          id: _model.patientId()
        });
      }
      if (ButtonPressed === 'No') {
        return $.smallBox({
          title: 'Shekhinah Surgery Condition Remove',
          content: "<i class='fa fa-clock-o'></i> <i>Condition has not been removed...</i>",
          color: '#C46A69',
          iconSmall: 'fa fa-times fa-2x fadeInRight animated',
          timeout: 4000
        });
      }
    });
    return e.preventDefault();
  };

  ConditionListItemView.prototype.onAddMedicationClick = function(e) {
    var model, view;
    e.preventDefault();
    model = new MedicationModel;
    model.set({
      conditionId: this.model.value()
    });
    view = new MedicationsView({
      model: model
    });
    return view.show();
  };

  return ConditionListItemView;

})(support.View);

module.exports = ConditionListItemView;

});

;require.register("daylight/views/condition/condition_list_view", function(exports, require, module) {
var ConditionListItemView, ConditionListTemplate, ConditionListView,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ConditionListItemView = require('daylight/views/condition/condition_list_item_view');

ConditionListTemplate = require('templates/condition/condition_list_template');

ConditionListView = (function(_super) {
  __extends(ConditionListView, _super);

  function ConditionListView() {
    this.reset = __bind(this.reset, this);
    this.removeCondition = __bind(this.removeCondition, this);
    this.conditionEvent = __bind(this.conditionEvent, this);
    this.renderCondition = __bind(this.renderCondition, this);
    this.render = __bind(this.render, this);
    this.dispose = __bind(this.dispose, this);
    return ConditionListView.__super__.constructor.apply(this, arguments);
  }

  ConditionListView.prototype.tagName = 'ul';

  ConditionListView.prototype.className = 'condition-tree';

  ConditionListView.prototype.template = ConditionListTemplate;

  ConditionListView.prototype.itemView = ConditionListItemView;

  ConditionListView.prototype.dispose = function() {
    ConditionListView.__super__.dispose.apply(this, arguments);
    return delete this.collection;
  };

  ConditionListView.prototype.initialize = function(options) {
    ConditionListView.__super__.initialize.call(this, options);
    this.listenTo(this.collection, 'add', this.renderCondition);
    this.listenTo(this.collection, 'remove', (function(_this) {
      return function(model, collection, options) {
        return _this.removeCondition(model);
      };
    })(this));
    this.listenTo(this.collection, 'reset', (function(_this) {
      return function(collection, options) {
        return _this.reset();
      };
    })(this));
    return _.bindAll(this, 'render');
  };

  ConditionListView.prototype.render = function() {
    ConditionListView.__super__.render.apply(this, arguments);
    this.$el.empty();
    this.replaceElement(this.template());
    this.collection.fetch();
    this.collection.forEach(this.renderCondition, this);
    return this;
  };

  ConditionListView.prototype.renderCondition = function(model) {
    var view;
    view = new ConditionListItemView({
      model: model
    });
    this.conditionEvent('conditionAdded', view);
    this.conditionEvent('conditionRendered', view);
    return this.$el.append(this.renderChild(view).$el);
  };

  ConditionListView.prototype.conditionEvent = function(type, conditionView) {
    return this.trigger(type, {
      target: this,
      conditionView: conditionView
    });
  };

  ConditionListView.prototype.removeCondition = function(model) {
    var view;
    view = new ConditionListItemView({
      model: model
    });
    if (view.model.id === model.id) {
      view.leave();
      return this.conditionEvent('conditionRemoved', view);
    }
  };

  ConditionListView.prototype.reset = function() {
    return this.render();
  };

  return ConditionListView;

})(support.View);

if (typeof module !== "undefined" && module !== null) {
  module.exports = ConditionListView;
}

});

;require.register("daylight/views/condition/condition_search_view", function(exports, require, module) {
var AutocompleteView, ConditionSearchCollection, ConditionSearchTemplate, ConditionSearchView,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ConditionSearchCollection = require('daylight/collections/condition_search_collection');

ConditionSearchTemplate = require('templates/condition/condition_search_template');

AutocompleteView = require('daylight/views/search/autocomplete_view');

ConditionSearchView = (function(_super) {
  __extends(ConditionSearchView, _super);

  function ConditionSearchView() {
    this.render = __bind(this.render, this);
    return ConditionSearchView.__super__.constructor.apply(this, arguments);
  }

  ConditionSearchView.prototype.template = ConditionSearchTemplate;

  ConditionSearchView.prototype.className = 'condition-search';

  ConditionSearchView.prototype.events = {
    'focus #c2_condition': 'renderAutoComplete'
  };

  ConditionSearchView.prototype.initialize = function(options) {
    ConditionSearchView.__super__.initialize.call(this, options);
    this._collection = new ConditionSearchCollection();
    _.bindAll(this, 'render');
    return this.render();
  };

  ConditionSearchView.prototype.render = function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  };

  ConditionSearchView.prototype.renderAutoComplete = function() {
    return new AutocompleteView({
      input: $("#c2_condition"),
      model: this._collection,
      entity: 'conditions'
    }).render();
  };

  ConditionSearchView.prototype.autocompleteSelect = function(model) {
    $("#c2_condition").val(model.label());
    $("#c2_synonyms").val(model.synonyms());
    return $("#c2_conceptId").val(model.conceptId());
  };

  return ConditionSearchView;

})(support.View);

module.exports = ConditionSearchView;

});

;require.register("daylight/views/condition/conditions_view", function(exports, require, module) {
var ConditionCollection, ConditionModel, ConditionSearchView, ConditionsTemplate, ConditionsView,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ConditionsTemplate = require('templates/condition/conditions_template');

ConditionCollection = require('daylight/collections/condition_collection');

ConditionModel = require('daylight/models/condition_model');

ConditionSearchView = require('daylight/views/condition/condition_search_view');

ConditionsView = (function(_super) {
  __extends(ConditionsView, _super);

  function ConditionsView() {
    this.initializeAutoComplete = __bind(this.initializeAutoComplete, this);
    this.onClearSearch = __bind(this.onClearSearch, this);
    this.onSubmit = __bind(this.onSubmit, this);
    this.onSaveSuccess = __bind(this.onSaveSuccess, this);
    this.onNavigate = __bind(this.onNavigate, this);
    this.onKeyDown = __bind(this.onKeyDown, this);
    this.save = __bind(this.save, this);
    this.render = __bind(this.render, this);
    return ConditionsView.__super__.constructor.apply(this, arguments);
  }

  ConditionsView.prototype.id = "conditions-add";

  ConditionsView.prototype._query = void 0;

  ConditionsView.prototype.className = "modal fade";

  ConditionsView.prototype.template = ConditionsTemplate;

  ConditionsView.prototype.events = {
    'click .js-submit': 'onSubmit',
    'click .js-save-btn': 'onSaveClick'
  };

  ConditionsView.prototype.validationOptions = {
    ignore: [],
    rules: {
      conceptId: {
        required: true
      }
    },
    messages: {
      conceptId: 'Please enter a condition to search'
    },
    highlight: function(el) {
      return $(el).closest(".form-group").removeClass("has-success").addClass("has-error");
    },
    unhighlight: function(el) {
      return $(el).closest(".form-group").removeClass("has-error").addClass("has-success");
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function(error, el) {
      if (el.parent('.input-group').length) {
        return error.insertAfter(el.parent());
      } else {
        return error.insertAfter(el);
      }
    }
  };

  ConditionsView.prototype.initialize = function(options) {
    ConditionsView.__super__.initialize.call(this, options);
    window.App.eventAggregator.on('click:addentity', (function(_this) {
      return function(e) {
        var conceptId, name, synonyms;
        conceptId = e.get('snomed_concept_id');
        name = e.get('term');
        synonyms = e.get('synonyms');
        _this.model.set({
          'conceptId': conceptId
        });
        _this.model.set({
          'name': name
        });
        return _this.model.set({
          'synonyms': synonyms
        });
      };
    })(this));
    this.bindTo(this.model, 'navigate', this.onNavigate);
    this.listenTo(this.model, 'change', this.render);
    _.bindAll(this, "render");
    this.render();
    return this.initializeAutoComplete();
  };

  ConditionsView.prototype.render = function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.modal({
      show: false
    });
    this.delegateEvents(this.events);
    return this;
  };

  ConditionsView.prototype.save = function() {
    this.model.save(null, {
      wait: true,
      success: (function(_this) {
        return function(model, response, options) {
          return $.smallBox({
            title: "Condition has been successfully added!",
            content: "<i class='fa fa-clock-o'></i> <i>3 seconds ago...</i>",
            color: '#5F895F',
            iconSmall: 'fa fa-check bounce animated',
            timeout: 4000
          });
        };
      })(this)
    });
    this.teardown();
    return window.App.eventAggregator.trigger('navigate:patient', {
      id: this.model.patientId()
    });
  };

  ConditionsView.prototype.parseQuery = function(str) {
    str = str.replace(/\x20+(?=\x20)/g, '');
    return str = String.prototype.trim ? str.trim() : str;
  };

  ConditionsView.prototype.show = function() {
    return this.$el.modal("show");
  };

  ConditionsView.prototype.teardown = function() {
    return this.$el.modal("hide");
  };

  ConditionsView.prototype.onSaveClick = function(e) {
    var $valid, $validator;
    e.preventDefault();
    $validator = $("#searchcondition").validate(this.validationOptions);
    $valid = $('#searchcondition').valid();
    if (!$valid) {
      $validator.focusInvalid();
      return false;
    } else {
      return this.save();
    }
  };

  ConditionsView.prototype.onCancelClick = function(e) {
    e.preventDefault();
    return this.teardown();
  };

  ConditionsView.prototype.onKeyDown = function(e) {
    if (e.which === 13) {
      e.preventDefault();
    }
    return this.doSearch();
  };

  ConditionsView.prototype.onNavigate = function(e) {
    return this.render();
  };

  ConditionsView.prototype.onSaveSuccess = function() {
    return window.App.eventAggregator.trigger('navigate:patient', {
      id: this.model.patientId
    });
  };

  ConditionsView.prototype.onSubmit = function(e) {
    return e.preventDefault();
  };

  ConditionsView.prototype.onClearSearch = function(e) {
    e.preventDefault();
    return window.App.eventAggregator.trigger('navigate:patients', {
      filter: null
    });
  };

  ConditionsView.prototype.initializeAutoComplete = function() {
    var model, selector, view;
    model = new ConditionModel;
    view = new ConditionSearchView({
      model: model
    });
    selector = this.$el.find('#search_container');
    return selector.html(view.el);
  };

  return ConditionsView;

})(support.View);

module.exports = ConditionsView;

});

;require.register("daylight/views/dashboard_view", function(exports, require, module) {
var DashboardTemplate, DashboardView,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

DashboardTemplate = require('templates/dashboard_template');

DashboardView = (function(_super) {
  __extends(DashboardView, _super);

  function DashboardView() {
    this.render = __bind(this.render, this);
    return DashboardView.__super__.constructor.apply(this, arguments);
  }

  DashboardView.prototype.template = DashboardTemplate;

  DashboardView.prototype.render = function() {
    this.$el.html(this.template());
    return this;
  };

  return DashboardView;

})(support.View);

if (typeof module !== "undefined" && module !== null) {
  module.exports = DashboardView;
}

});

;require.register("daylight/views/graphs/bp_graph_view", function(exports, require, module) {
var BPGraphView,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BPGraphView = (function(_super) {
  __extends(BPGraphView, _super);

  function BPGraphView() {
    this.renderGraph = __bind(this.renderGraph, this);
    this.reset = __bind(this.reset, this);
    this.fetchData = __bind(this.fetchData, this);
    this.render = __bind(this.render, this);
    return BPGraphView.__super__.constructor.apply(this, arguments);
  }

  BPGraphView.prototype.attributes = {
    "class": 'graph'
  };

  BPGraphView.prototype.seriesColumn = 'timeStamp';

  BPGraphView.prototype.aColumn = 'diastolicBp';

  BPGraphView.prototype.bColumn = 'systolicBp';

  BPGraphView.prototype.plotOptions = {
    legend: {
      show: true,
      container: '.legend'
    },
    series: {
      lines: {
        show: true,
        lineWidth: 1,
        fill: true,
        fillColor: {
          colors: [
            {
              opacity: 0.1
            }, {
              opacity: 0.15
            }
          ]
        }
      },
      points: {
        show: true
      },
      shadowSize: 0
    },
    xaxis: {
      mode: 'time',
      timeformat: "%d/%m/%y",
      minTicksSize: [1, "day"]
    },
    yaxes: [
      {
        min: 20,
        tickLength: 5
      }
    ],
    grid: {
      hoverable: true,
      clickable: true,
      tickColor: "#efefef",
      borderWidth: 0,
      borderColor: "#efefef"
    },
    tooltip: true,
    tooltipOptions: {
      content: "%s on <b>%x</b> was %y",
      defaultTheme: false
    },
    colors: ["#E24913", "#6595b4"]
  };

  BPGraphView.prototype.initialize = function(options) {
    BPGraphView.__super__.initialize.call(this, options);
    this.listenTo(this.collection, 'add', this.renderGraph());
    this.listenTo(this.collection, 'reset', (function(_this) {
      return function(collection, options) {
        return _this.reset();
      };
    })(this));
    this.fetchData();
    return _.bindAll(this, 'render');
  };

  BPGraphView.prototype.render = function() {
    BPGraphView.__super__.render.apply(this, arguments);
    this.$el.empty();
    this.$el.html("<div class=\"legend\"></div><div class=\"plot flotPlaceholder\"></div>");
    this.renderGraph();
    return this;
  };

  BPGraphView.prototype.fetchData = function() {
    var self, url;
    self = this;
    this.collection.reset();
    url = this.collection.url;
    return $.getJSON(url, function(data) {
      return self.collection.reset(data);
    });
  };

  BPGraphView.prototype.reset = function() {
    return this.render();
  };

  BPGraphView.prototype.renderGraph = function(e) {
    var a, aC, b, bC, data, diastolic, i, options, sC, series, systolic;
    data = this.collection.toJSON();
    sC = this.seriesColumn;
    aC = this.aColumn;
    bC = this.bColumn;
    series = [];
    diastolic = [];
    systolic = [];
    options = _.clone(this.plotOptions);
    i = void 0;
    if (data.length > 0) {
      i = 0;
      while (i < data.length) {
        if (typeof data[i][sC] !== "undefined") {
          diastolic[i] = [];
          diastolic[i][0] = data[i][sC];
          diastolic[i][1] = data[i][aC];
          systolic[i] = [];
          systolic[i][0] = data[i][sC];
          systolic[i][1] = data[i][bC];
        }
        i++;
      }
      i = 0;
      a = {
        data: _.clone(diastolic),
        label: 'Diastolic BP'
      };
      b = {
        data: _.clone(systolic),
        label: 'Systolic BP'
      };
      series.push(a, b);
      this.$(".flotPlaceholder").css('min-height', "200px");
      this.$(".flotPlaceholder").css('height', "100%");
      this.$(".flotPlaceholder").css('width', "100%");
      return $.plot(this.$(".plot"), series, options);
    }
  };

  return BPGraphView;

})(support.View);

if (typeof module !== "undefined" && module !== null) {
  module.exports = BPGraphView;
}

});

;require.register("daylight/views/medication/medication_list_item_view", function(exports, require, module) {
var MedicationCollection, MedicationListItemTemplate, MedicationListItemView,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

MedicationCollection = require('daylight/collections/medication_collection');

MedicationListItemTemplate = require('templates/medication/medication_list_item_template');

MedicationListItemView = (function(_super) {
  __extends(MedicationListItemView, _super);

  function MedicationListItemView() {
    this.onDeleteMedication = __bind(this.onDeleteMedication, this);
    this.onDestroy = __bind(this.onDestroy, this);
    this.render = __bind(this.render, this);
    this.template = __bind(this.template, this);
    return MedicationListItemView.__super__.constructor.apply(this, arguments);
  }

  MedicationListItemView.prototype.tagName = 'li';

  MedicationListItemView.prototype.className = 'parent_li';

  MedicationListItemView.prototype.events = {
    'click .js-delete-medication': 'onDeleteMedication',
    'click .js-medication-add': 'onAddMedicationClick'
  };

  MedicationListItemView.prototype.template = function(data) {
    return MedicationListItemTemplate(data);
  };

  MedicationListItemView.prototype.initialize = function(options) {
    MedicationListItemView.__super__.initialize.call(this, options);
    this.bindTo(this.model, 'change', this.render);
    return this.bindTo(this.model, 'destroy', this.onDestroy);
  };

  MedicationListItemView.prototype.render = function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  };

  MedicationListItemView.prototype.onDestroy = function() {
    return this.$el.remove();
  };

  MedicationListItemView.prototype.onDeleteMedication = function(e) {
    var _model;
    _model = this.model;
    $.SmartMessageBox({
      title: 'Shekhinah Surgery medication Remove Alert!',
      content: 'Are you sure you want to remove this medication?',
      buttons: '[No][Yes]'
    }, function(ButtonPressed) {
      if (ButtonPressed === 'Yes') {
        _model.destroy({
          wait: true
        });
        $.smallBox({
          title: 'Shekhinah Surgery medication Remove',
          content: "<i class='fa fa-clock-o'></i> <i>medication successfully removed...</i>",
          color: '#659265',
          iconSmall: 'fa fa-times fa-2x fadeInRight animated',
          timeout: 4000
        });
        window.App.eventAggregator.trigger('navigate:patient', {
          id: _model.patientId()
        });
      }
      if (ButtonPressed === 'No') {
        return $.smallBox({
          title: 'Shekhinah Surgery medication Remove',
          content: "<i class='fa fa-clock-o'></i> <i>medication has not been removed...</i>",
          color: '#C46A69',
          iconSmall: 'fa fa-times fa-2x fadeInRight animated',
          timeout: 4000
        });
      }
    });
    return e.preventDefault();
  };

  return MedicationListItemView;

})(support.View);

module.exports = MedicationListItemView;

});

;require.register("daylight/views/medication/medication_search_view", function(exports, require, module) {
var AutocompleteView, MedicationSearchCollection, MedicationSearchTemplate, MedicationSearchView,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

MedicationSearchCollection = require('daylight/collections/medication_search_collection');

MedicationSearchTemplate = require('templates/medication/medication_search_template');

AutocompleteView = require('daylight/views/search/autocomplete_view');

MedicationSearchView = (function(_super) {
  __extends(MedicationSearchView, _super);

  function MedicationSearchView() {
    this.render = __bind(this.render, this);
    return MedicationSearchView.__super__.constructor.apply(this, arguments);
  }

  MedicationSearchView.prototype.template = MedicationSearchTemplate;

  MedicationSearchView.prototype.className = 'medication-search';

  MedicationSearchView.prototype.events = {
    'focus #m2_medication': 'renderAutoComplete'
  };

  MedicationSearchView.prototype.initialize = function(options) {
    MedicationSearchView.__super__.initialize.call(this, options);
    this._collection = new MedicationSearchCollection();
    _.bindAll(this, 'render');
    return this.render();
  };

  MedicationSearchView.prototype.render = function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  };

  MedicationSearchView.prototype.renderAutoComplete = function() {
    return new AutocompleteView({
      input: $("#m2_medication"),
      model: this._collection,
      entity: 'medications'
    }).render();
  };

  MedicationSearchView.prototype.autocompleteSelect = function(model) {
    $("#m2_medication").val(model.label());
    $("#m2_synonyms").val(model.synonyms());
    return $("#m2_conceptId").val(model.conceptId());
  };

  return MedicationSearchView;

})(support.View);

module.exports = MedicationSearchView;

});

;require.register("daylight/views/medication/medications_view", function(exports, require, module) {
var MedicationCollection, MedicationModel, MedicationSearchView, MedicationsTemplate, MedicationsView,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

MedicationsTemplate = require('templates/medication/medications_template');

MedicationCollection = require('daylight/collections/medication_collection');

MedicationModel = require('daylight/models/medication_model');

MedicationSearchView = require('daylight/views/medication/medication_search_view');

MedicationsView = (function(_super) {
  __extends(MedicationsView, _super);

  function MedicationsView() {
    this.initializeAutoComplete = __bind(this.initializeAutoComplete, this);
    this.onClearSearch = __bind(this.onClearSearch, this);
    this.onSubmit = __bind(this.onSubmit, this);
    this.onSaveSuccess = __bind(this.onSaveSuccess, this);
    this.onNavigate = __bind(this.onNavigate, this);
    this.onKeyDown = __bind(this.onKeyDown, this);
    this.save = __bind(this.save, this);
    this.render = __bind(this.render, this);
    return MedicationsView.__super__.constructor.apply(this, arguments);
  }

  MedicationsView.prototype.id = "medications-add";

  MedicationsView.prototype._query = void 0;

  MedicationsView.prototype.className = "modal fade";

  MedicationsView.prototype.template = MedicationsTemplate;

  MedicationsView.prototype.events = {
    'click .js-submit': 'onSubmit',
    'click .js-save-btn': 'onSaveClick'
  };

  MedicationsView.prototype.validationOptions = {
    ignore: [],
    rules: {
      conceptId: {
        required: true
      }
    },
    messages: {
      conceptId: 'Please enter a medication to search'
    },
    highlight: function(el) {
      return $(el).closest(".form-group").removeClass("has-success").addClass("has-error");
    },
    unhighlight: function(el) {
      return $(el).closest(".form-group").removeClass("has-error").addClass("has-success");
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function(error, el) {
      if (el.parent('.input-group').length) {
        return error.insertAfter(el.parent());
      } else {
        return error.insertAfter(el);
      }
    }
  };

  MedicationsView.prototype.initialize = function(options) {
    MedicationsView.__super__.initialize.call(this, options);
    window.App.eventAggregator.on('click:addentity', (function(_this) {
      return function(e) {
        var conceptId, name, synonyms;
        conceptId = e.get('snomed_concept_id');
        name = e.get('term');
        synonyms = e.get('synonyms');
        _this.model.set({
          'conceptId': conceptId
        });
        _this.model.set({
          'name': name
        });
        return _this.model.set({
          'synonyms': synonyms
        });
      };
    })(this));
    this.bindTo(this.model, 'navigate', this.onNavigate);
    this.listenTo(this.model, 'change', this.render);
    _.bindAll(this, "render");
    this.render();
    return this.initializeAutoComplete();
  };

  MedicationsView.prototype.render = function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.modal({
      show: false
    });
    this.delegateEvents(this.events);
    return this;
  };

  MedicationsView.prototype.save = function() {
    this.model.save(null, {
      wait: true,
      success: (function(_this) {
        return function(model, response, options) {
          return $.smallBox({
            title: "Medication has been successfully added!",
            content: "<i class='fa fa-clock-o'></i> <i>3 seconds ago...</i>",
            color: '#5F895F',
            iconSmall: 'fa fa-check bounce animated',
            timeout: 4000
          });
        };
      })(this)
    });
    this.teardown();
    return window.App.eventAggregator.trigger('navigate:patient', {
      id: window.App.currentPatient.id
    });
  };

  MedicationsView.prototype.parseQuery = function(str) {
    str = str.replace(/\x20+(?=\x20)/g, '');
    return str = String.prototype.trim ? str.trim() : str;
  };

  MedicationsView.prototype.show = function() {
    return this.$el.modal("show");
  };

  MedicationsView.prototype.teardown = function() {
    return this.$el.modal("hide");
  };

  MedicationsView.prototype.onSaveClick = function(e) {
    var $valid, $validator;
    e.preventDefault();
    $validator = $("#searchmedication").validate(this.validationOptions);
    $valid = $('#searchmedication').valid();
    if (!$valid) {
      $validator.focusInvalid();
      return false;
    } else {
      return this.save();
    }
  };

  MedicationsView.prototype.onCancelClick = function(e) {
    e.preventDefault();
    return this.teardown();
  };

  MedicationsView.prototype.onKeyDown = function(e) {
    if (e.which === 13) {
      e.preventDefault();
    }
    return this.doSearch();
  };

  MedicationsView.prototype.onNavigate = function(e) {
    return this.render();
  };

  MedicationsView.prototype.onSaveSuccess = function() {
    return window.App.eventAggregator.trigger('navigate:patient', {
      id: this.model.patientId()
    });
  };

  MedicationsView.prototype.onSubmit = function(e) {
    return e.preventDefault();
  };

  MedicationsView.prototype.onClearSearch = function(e) {
    e.preventDefault();
    return window.App.eventAggregator.trigger('navigate:patients', {
      filter: null
    });
  };

  MedicationsView.prototype.initializeAutoComplete = function() {
    var model, selector, view;
    model = new MedicationModel;
    view = new MedicationSearchView({
      model: model
    });
    selector = this.$el.find('#search_medication_container');
    return selector.html(view.el);
  };

  return MedicationsView;

})(support.View);

module.exports = MedicationsView;

});

;require.register("daylight/views/patient_create_view", function(exports, require, module) {
var PatientCreateTemplate, PatientCreateView, PatientModel,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PatientCreateTemplate = require('templates/patient_create_template');

PatientModel = require('daylight/models/patient_model');

PatientCreateView = (function(_super) {
  __extends(PatientCreateView, _super);

  function PatientCreateView() {
    this.onKeyDown = __bind(this.onKeyDown, this);
    this.createDatePicker = __bind(this.createDatePicker, this);
    this.save = __bind(this.save, this);
    this.render = __bind(this.render, this);
    return PatientCreateView.__super__.constructor.apply(this, arguments);
  }

  PatientCreateView.prototype.id = "create";

  PatientCreateView.prototype.className = "modal fade";

  PatientCreateView.prototype.template = PatientCreateTemplate;

  PatientCreateView.prototype.events = {
    'keydown': 'onKeyDown',
    'click .js-cancel-btn': 'onCancelClick',
    'click .js-save-btn': 'onSaveClick',
    'mouseover .clsDatePicker': 'createDatePicker',
    'hidden.bs.modal': 'teardown'
  };

  PatientCreateView.prototype.validationOptions = {
    rules: {
      fname: {
        required: true
      },
      lname: {
        required: true
      },
      building: {
        required: true
      },
      locality: {
        required: true
      },
      street: {
        required: true
      },
      dob: {
        required: true
      },
      phone: {
        required: true
      },
      relationshipStatus: {
        required: true
      }
    },
    messages: {
      fname: 'Please specify first name',
      lname: 'Please specify last name',
      building: 'Please specify building name/house number',
      street: 'Please specify street name',
      dob: 'Please specify date of birth',
      phone: 'Please specify telephone/mobile number',
      relationshipStatus: 'Please specifiy the marital status'
    },
    highlight: function(el) {
      return $(el).closest(".form-group").removeClass("has-success").addClass("has-error");
    },
    unhighlight: function(el) {
      return $(el).closest(".form-group").removeClass("has-error").addClass("has-success");
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function(error, el) {
      if (el.parent('.input-group').length) {
        return error.insertAfter(el.parent());
      } else {
        return error.insertAfter(el);
      }
    }
  };

  PatientCreateView.prototype.initialize = function(options) {
    PatientCreateView.__super__.initialize.call(this, options);
    _.bindAll(this, "render");
    this.render();
    return this.createDatePicker();
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
    var address, areaLocality, building, city, collection, dob, email, fname, form, gender, lname, phone, prefix, province, rstatus, street;
    form = this.$("form").serializeObject();
    prefix = this.$("input:radio[name ='salutation']:checked").val();
    fname = this.$('#fname').val();
    lname = this.$('#lname').val();
    gender = this.$('#gender').find(":selected").val();
    rstatus = this.$('#relationshipStatus').find(":selected").val();
    dob = this.$('#dob').val();
    phone = this.$('#phone').val();
    email = this.$('#email').val();
    areaLocality = this.$('#locality').val();
    building = this.$('#building').val();
    street = this.$('#street').val();
    city = this.$('#city').val();
    province = this.$('#province').val();
    address = "" + building + ", " + street + ", " + areaLocality + ", " + city + ", " + province;
    collection = window.IoC.get('PatientCollection');
    this.model.collection = collection;
    this.model.set(this.model.parse({
      gender: gender,
      relationshipStatus: rstatus,
      dob: dob,
      phone: phone,
      firstName: fname,
      lastName: lname,
      address: address,
      email: email
    }));
    console.log(JSON.stringify(this.model.toJSON()));
    this.model.save(null, {
      wait: true,
      success: (function(_this) {
        return function(model, response, options) {
          console.log(model);
          return $.smallBox({
            title: "Patient " + (_this.model.get('firstName' + _this.model.get('lastName'))) + " details have been successfully saved!",
            content: "<i class='fa fa-clock-o'></i> <i>3 seconds ago...</i>",
            color: '#5F895F',
            iconSmall: 'fa fa-check bounce animated',
            timeout: 4000
          });
        };
      })(this),
      error: (function(_this) {
        return function(model, response, options) {
          return window.location = '/Error/HttpError';
        };
      })(this)
    });
    this.teardown();
    return window.App.eventAggregator.trigger('navigate:patient', {
      id: this.model.get('id')
    });
  };

  PatientCreateView.prototype.createDatePicker = function() {
    var view;
    view = this;
    return $("#dob").datepicker({
      maxDate: '-2',
      dateFormat: 'dd/mm/yy',
      defaultDate: view.selectedDate
    });

    /*
    		enforceModalFocusFn = $.fn.modal.Constructor.prototype.enforceFocus
    		$.fn.modal.Constructor::enforceFocus = ->
    		
    		$confModal.on 'hidden', ->
    			$.fn.modal.Constructor::enforceFocus = enforceModalFocusFn
    
    		$confModal.modal backdrop: false
     */
  };

  PatientCreateView.prototype.dispose = function() {
    return Backbone.Validation.unbind(this);
  };

  PatientCreateView.prototype.show = function() {
    return this.$el.modal("show");
  };

  PatientCreateView.prototype.teardown = function() {
    return this.$el.modal("hide");
  };

  PatientCreateView.prototype.onKeyDown = function(e) {
    if (e.which === 13) {
      e.preventDefault();
      return this.onSaveClick();
    }
  };

  PatientCreateView.prototype.onSaveClick = function(e) {
    var $valid, $validator;
    e.preventDefault();
    $validator = $("#newpatient").validate(this.validationOptions);
    $valid = $('#newpatient').valid();
    if (!$valid) {
      $validator.focusInvalid();
      return false;
    } else {
      return this.save();
    }
  };

  PatientCreateView.prototype.onCancelClick = function(e) {
    e.preventDefault();
    return this.teardown();
  };

  return PatientCreateView;

})(support.View);

module.exports = PatientCreateView;

});

;require.register("daylight/views/patient_edit_view", function(exports, require, module) {
var PatientEditTemplate, PatientEditView, PatientModel,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PatientEditTemplate = require('templates/patient_edit_template');

PatientModel = require('daylight/models/patient_model');

PatientEditView = (function(_super) {
  __extends(PatientEditView, _super);

  function PatientEditView() {
    this.onKeyDown = __bind(this.onKeyDown, this);
    this.save = __bind(this.save, this);
    this.render = __bind(this.render, this);
    return PatientEditView.__super__.constructor.apply(this, arguments);
  }

  PatientEditView.prototype.id = "edit";

  PatientEditView.prototype.className = "modal fade";

  PatientEditView.prototype.template = PatientEditTemplate;

  PatientEditView.prototype.events = {
    'keydown': 'onKeyDown',
    'click .js-cancel-btn': 'onCancelClick',
    'click .js-save-btn': 'onSaveClick',
    'mouseover .clsDatePicker': 'createDatePicker',
    'hidden.bs.modal': 'teardown'
  };

  PatientEditView.prototype.validationOptions = {
    rules: {
      fname: {
        required: true
      },
      lname: {
        required: true
      },
      gender: {
        required: true
      },
      building: {
        required: true
      },
      locality: {
        required: true
      },
      street: {
        required: true
      },
      dob: {
        required: true
      },
      phone: {
        required: true
      },
      relationshipStatus: {
        required: true
      }
    },
    messages: {
      fname: 'Please specify first name',
      lname: 'Please specify last name',
      gender: 'Please select patient\'s sex',
      building: 'Please specify building name/house number',
      street: 'Please specify street name',
      dob: 'Please specify date of birth',
      phone: 'Please specify telephone/mobile number',
      relationshipStatus: 'Please specifiy the marital status'
    },
    highlight: function(el) {
      return $(el).closest(".form-group").removeClass("has-success").addClass("has-error");
    },
    unhighlight: function(el) {
      return $(el).closest(".form-group").removeClass("has-error").addClass("has-success");
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function(error, el) {
      if (el.parent('.input-group').length) {
        return error.insertAfter(el.parent());
      } else {
        return error.insertAfter(el);
      }
    }
  };

  PatientEditView.prototype.initialize = function(options) {
    PatientEditView.__super__.initialize.call(this, options);
    _.bindAll(this, "render");
    return this.render();
  };

  PatientEditView.prototype.render = function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.modal({
      show: false
    });
    this.delegateEvents(this.events);
    return this;
  };

  PatientEditView.prototype.save = function() {
    var address, areaLocality, building, city, collection, d, dob, email, fname, form, gender, lname, phone, prefix, province, rstatus, street;
    form = this.$("form").serializeObject();
    prefix = this.$("input:radio[name ='salutation']:checked").val();
    fname = this.$('#fname').val();
    lname = this.$('#lname').val();
    gender = this.$('#gender').find(":selected").val();
    rstatus = this.$('#relationshipStatus').find(":selected").val();
    d = $.datepicker.parseDate("dd MM yy", this.$('#dob').val());
    dob = $.datepicker.formatDate("dd/mm/yy", d);
    phone = this.$('#phone').val();
    email = this.$('#email').val();
    areaLocality = this.$('#locality').val();
    building = this.$('#building').val();
    street = this.$('#street').val();
    city = this.$('#city').val();
    province = this.$('#province').val();
    address = "" + building + ", " + street + ", " + areaLocality + ", " + city + ", " + province;
    collection = window.IoC.get('PatientCollection');
    this.model.collection = collection;
    this.model.set(this.model.parse({
      id: this.model.id,
      gender: gender,
      relationshipStatus: rstatus,
      dob: dob,
      phone: phone,
      firstName: fname,
      lastName: lname,
      address: address,
      email: email
    }));
    console.log(JSON.stringify(this.model.toJSON()));
    this.model.save(null, {
      wait: true,
      success: (function(_this) {
        return function(model, response, options) {
          console.log(model);
          return $.smallBox({
            title: "Patient " + (model.get('firstName' + model.get('lastName'))) + " has been successfully edited!",
            content: "<i class='fa fa-clock-o'></i> <i>3 seconds ago...</i>",
            color: '#5F895F',
            iconSmall: 'fa fa-check bounce animated',
            timeout: 4000
          });
        };
      })(this),
      error: (function(_this) {
        return function(model, response, options) {
          return window.location = '/Error/HttpError';
        };
      })(this)
    });
    this.teardown();
    return window.App.eventAggregator.trigger('navigate:patient', {
      id: this.model.id
    });
  };

  PatientEditView.prototype.createDatePicker = function(e) {
    var enforceModalFocusFn, view;
    view = this;
    $(e.currentTarget).datepicker({
      maxDate: '-2',
      dateFormat: 'dd/mm/yy',
      defaultDate: view.selectedDate,
      onSelect: function(dateText, datePicker) {
        console.log('onSelect', dateText);
        view.selectedDate = dateText;
        return view.onDateChange(datePicker);
      }
    });
    enforceModalFocusFn = $.fn.modal.Constructor.prototype.enforceFocus;
    $.fn.modal.Constructor.prototype.enforceFocus = function() {};
    $confModal.on('hidden', function() {
      return $.fn.modal.Constructor.prototype.enforceFocus = enforceModalFocusFn;
    });
    return $confModal.modal({
      backdrop: false
    });
  };

  PatientEditView.prototype.dispose = function() {
    return Backbone.Validation.unbind(this);
  };

  PatientEditView.prototype.show = function() {
    return this.$el.modal("show");
  };

  PatientEditView.prototype.teardown = function() {
    return this.$el.modal("hide");
  };

  PatientEditView.prototype.onKeyDown = function(e) {
    if (e.which === 13) {
      e.preventDefault();
      return this.save();
    }
  };

  PatientEditView.prototype.onSaveClick = function(e) {
    var $valid, $validator;
    e.preventDefault();
    $validator = $("#newpatient").validate(this.validationOptions);
    $valid = $('#newpatient').valid();
    if (!$valid) {
      $validator.focusInvalid();
      return false;
    } else {
      return this.save();
    }
  };

  PatientEditView.prototype.onCancelClick = function(e) {
    e.preventDefault();
    return this.teardown();
  };

  return PatientEditView;

})(support.View);

module.exports = PatientEditView;

});

;require.register("daylight/views/patient_list_item_view", function(exports, require, module) {
var PatientCollection, PatientEditView, PatientListItemTemplate, PatientListItemView,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PatientCollection = require('daylight/collections/patient_collection');

PatientListItemTemplate = require('templates/patient_list_item_template');

PatientEditView = require('daylight/views/patient_edit_view');

PatientListItemView = (function(_super) {
  __extends(PatientListItemView, _super);

  function PatientListItemView() {
    this.onPatientDeleteClick = __bind(this.onPatientDeleteClick, this);
    this.onEditPatientClick = __bind(this.onEditPatientClick, this);
    this.onDestroy = __bind(this.onDestroy, this);
    this.render = __bind(this.render, this);
    this.template = __bind(this.template, this);
    return PatientListItemView.__super__.constructor.apply(this, arguments);
  }

  PatientListItemView.prototype.tagName = 'tr';

  PatientListItemView.prototype.events = {
    'click .smart-mod-del': 'onPatientDeleteClick',
    'click .js-edit': 'onEditPatientClick'
  };

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
    this.$el.remove();
    return window.App.eventAggregator.trigger('navigate:patients');
  };

  PatientListItemView.prototype.onEditPatientClick = function(e) {
    var view;
    e.preventDefault();
    view = new PatientEditView({
      model: this.model
    });
    return view.show();
  };

  PatientListItemView.prototype.onPatientDeleteClick = function(e) {
    var _model, _name;
    _model = this.model;
    _name = this.model.get('firstName') + ' ' + this.model.get('lastName');
    $.SmartMessageBox({
      title: 'Daylight Surgery Patient Remove Alert!',
      content: "Are you sure you want to remove this patient " + _name + "?",
      buttons: '[No][Yes]'
    }, function(ButtonPressed) {
      if (ButtonPressed === 'Yes') {
        _model.destroy({
          wait: true
        });
        $.smallBox({
          title: 'Daylight Surgery Patient Remove',
          content: "<i class='fa fa-clock-o'></i> <i>Patient " + _name + " successfully removed...</i>",
          color: '#659265',
          iconSmall: 'fa fa-times fa-2x fadeInRight animated',
          timeout: 4000
        });
        window.App.eventAggregator.trigger('navigate:patients');
      }
      if (ButtonPressed === 'No') {
        return $.smallBox({
          title: 'Daylight Surgery Patient Remove',
          content: "<i class='fa fa-clock-o'></i> <i>Patient " + _name + " has not been removed...</i>",
          color: '#C46A69',
          iconSmall: 'fa fa-times fa-2x fadeInRight animated',
          timeout: 4000
        });
      }
    });
    return e.preventDefault();
  };

  return PatientListItemView;

})(support.View);

module.exports = PatientListItemView;

});

;require.register("daylight/views/patient_list_view", function(exports, require, module) {
var PatientListItemView, PatientListTemplate, PatientListView, SearchView,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PatientListItemView = require('daylight/views/patient_list_item_view');

PatientListTemplate = require('templates/patient_list_template');

SearchView = require('daylight/views/search/search_view');

PatientListView = (function(_super) {
  __extends(PatientListView, _super);

  function PatientListView() {
    this.onViewPatientClick = __bind(this.onViewPatientClick, this);
    this.showNoResults = __bind(this.showNoResults, this);
    this.onDropdownToggle = __bind(this.onDropdownToggle, this);
    this.onCollectionOpen = __bind(this.onCollectionOpen, this);
    this.onCollectionEnd = __bind(this.onCollectionEnd, this);
    this.onLoadMore = __bind(this.onLoadMore, this);
    this.onFetchEnd = __bind(this.onFetchEnd, this);
    this.onFetchStart = __bind(this.onFetchStart, this);
    this.reset = __bind(this.reset, this);
    this.removePatient = __bind(this.removePatient, this);
    this.patientEvent = __bind(this.patientEvent, this);
    this.renderSearch = __bind(this.renderSearch, this);
    this.renderPatient = __bind(this.renderPatient, this);
    this.render = __bind(this.render, this);
    this.dispose = __bind(this.dispose, this);
    return PatientListView.__super__.constructor.apply(this, arguments);
  }

  PatientListView.prototype.template = PatientListTemplate;

  PatientListView.prototype.events = {
    'click .js-patients-loadmore': 'onLoadMore',
    'click .dropdown-toggle': 'onDropdownToggle'
  };

  PatientListView.prototype.dispose = function() {
    PatientListView.__super__.dispose.apply(this, arguments);
    return delete this.collection;
  };

  PatientListView.prototype.initialize = function(options) {
    PatientListView.__super__.initialize.call(this, options);
    this.listenTo(this.collection, 'add', this.renderPatient);
    this.listenTo(this.collection, 'remove', (function(_this) {
      return function(model, collection, options) {
        return _this.removePatient(model);
      };
    })(this));
    this.listenTo(this.collection, 'reset', (function(_this) {
      return function(collection, options) {
        return _this.reset();
      };
    })(this));
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
    this.renderSearch();
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

  PatientListView.prototype.renderSearch = function() {
    var searchView;
    searchView = new SearchView({
      el: this.$('.patient-search'),
      collection: this.collection
    });
    this.renderChild(searchView);
    return this;
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
    return this.$('#loader').html('<h3><i class="fa fa-cog fa-spin"></i> Loading...</h3>');
  };

  PatientListView.prototype.onFetchEnd = function() {
    this.$('#loader').html('<h3>Load more</h3>');
    return this.showNoResults();
  };

  PatientListView.prototype.onLoadMore = function(e) {
    e.preventDefault();
    return this.collection.getMore();
  };

  PatientListView.prototype.onCollectionEnd = function(e) {
    return this.$('#loader').html('<h3>Load more</h3>');
  };

  PatientListView.prototype.onCollectionOpen = function(e) {
    return this.$('#loader').html('<h3>Load more</h3>');
  };

  PatientListView.prototype.onDropdownToggle = function(e) {
    var $item;
    e.preventDefault();
    $item = $(this).parent();
    $item.toggleClass('active');
    if ($item.hasClass('active')) {
      return $item.find('.submenu').slideDown('fast');
    } else {
      return $item.find('.submenu').slideUp('fast');
    }
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

;require.register("daylight/views/patient_view", function(exports, require, module) {
var BPGraphView, ConditionCollection, ConditionListView, ConditionModel, ConditionsView, PatientEditView, PatientView, PatientViewTemplate, VitalCollection, VitalModel, VitalsAddView,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PatientViewTemplate = require('templates/patient_view_template');

PatientEditView = require('daylight/views/patient_edit_view');

ConditionsView = require('daylight/views/condition/conditions_view');

ConditionModel = require('daylight/models/condition_model');

ConditionListView = require('daylight/views/condition/condition_list_view');

ConditionCollection = require('daylight/collections/condition_collection');

VitalsAddView = require('daylight/views/vitals/vitals_add_view');

VitalModel = require('daylight/models/vital_model');

VitalCollection = require('daylight/collections/vital_collection');

BPGraphView = require('daylight/views/graphs/bp_graph_view');

PatientView = (function(_super) {
  __extends(PatientView, _super);

  function PatientView() {
    this.onDeletePatientClick = __bind(this.onDeletePatientClick, this);
    this.onTreeNodeClick = __bind(this.onTreeNodeClick, this);
    this.setupTree = __bind(this.setupTree, this);
    this.onAddVitalsClick = __bind(this.onAddVitalsClick, this);
    this.onAddConditionClick = __bind(this.onAddConditionClick, this);
    this.onEditPatientClick = __bind(this.onEditPatientClick, this);
    this.onSaveSuccess = __bind(this.onSaveSuccess, this);
    this.onSaveStart = __bind(this.onSaveStart, this);
    this.onNavigate = __bind(this.onNavigate, this);
    this.onDestroy = __bind(this.onDestroy, this);
    this.renderBpGraph = __bind(this.renderBpGraph, this);
    this.renderConditions = __bind(this.renderConditions, this);
    this.render = __bind(this.render, this);
    this.template = __bind(this.template, this);
    return PatientView.__super__.constructor.apply(this, arguments);
  }

  PatientView.prototype.events = {
    'click .js-delete': 'onDeletePatientClick',
    'click .js-edit': 'onEditPatientClick',
    'click .condition-add': 'onAddConditionClick',
    'click .condition-edit': 'onEditConditionClick',
    'click .js-add-vitals': 'onAddVitalsClick'
  };

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
    this.renderConditions();
    this.renderBpGraph();
    this.setupTree();
    return this;
  };

  PatientView.prototype.renderConditions = function() {
    var collection, view;
    collection = new ConditionCollection;
    collection.url = "API/Patients/" + (this.model.get('id')) + "/conditions";
    view = new ConditionListView({
      collection: collection
    });
    this.$('.js-conditions-list').append(this.renderChild(view).el);
    return this;
  };

  PatientView.prototype.renderBpGraph = function() {
    var collection, view;
    collection = new VitalCollection;
    collection.url = "API/Patients/" + (this.model.get('id')) + "/vitals";
    view = new BPGraphView({
      collection: collection
    });
    return this.$('#bp-stats').append(this.renderChild(view).el);
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

  PatientView.prototype.onSaveStart = function(model, response, options) {};

  PatientView.prototype.onSaveSuccess = function(model, response, options) {};

  PatientView.prototype.onEditPatientClick = function(e) {
    var view;
    e.preventDefault();
    view = new PatientEditView({
      model: this.model
    });
    return view.show();
  };

  PatientView.prototype.onAddConditionClick = function(e) {
    var cmodel, view;
    e.preventDefault();
    cmodel = new ConditionModel;
    cmodel.set({
      patientId: this.model.id
    });
    view = new ConditionsView({
      model: cmodel
    });
    return view.show();
  };

  PatientView.prototype.onAddVitalsClick = function(e) {
    var view, vmodel;
    e.preventDefault();
    vmodel = new VitalModel;
    vmodel.set({
      patientId: this.model.id
    });
    view = new VitalsAddView({
      model: vmodel
    });
    return view.show();
  };

  PatientView.prototype.setupTree = function() {
    return this.$(".tree > ul").attr("role", "tree").find("ul").attr("role", "group");
  };

  PatientView.prototype.onTreeNodeClick = function(e) {
    var children;
    children = $(this).parent("li.parent_li").find(" > ul > li");
    console.log(children.is(":visible"));
    if (children.is(":visible")) {
      children.hide("fast");
      $(this).attr("title", "Expand this branch").find(" > i").removeClass().addClass("fa fa-lg fa-plus-circle");
    } else {
      children.show("fast");
      $(this).attr("title", "Collapse this branch").find(" > i").removeClass().addClass("fa fa-lg fa-minus-circle");
    }
    return e.stopPropagation();
  };

  PatientView.prototype.onDeletePatientClick = function(e) {
    var _model;
    _model = this.model;
    $.SmartMessageBox({
      title: 'Daylight Surgery Patient Remove Alert!',
      content: 'Are you sure you want to remove this patient?',
      buttons: '[No][Yes]'
    }, function(ButtonPressed) {
      if (ButtonPressed === 'Yes') {
        _model.destroy({
          wait: true
        });
        $.smallBox({
          title: 'Daylight Surgery Patient Remove',
          content: "<i class='fa fa-clock-o'></i> <i>Patient successfully removed...</i>",
          color: '#659265',
          iconSmall: 'fa fa-times fa-2x fadeInRight animated',
          timeout: 4000
        });
        window.App.eventAggregator.trigger('navigate:patients');
      }
      if (ButtonPressed === 'No') {
        return $.smallBox({
          title: 'Daylight Surgery Patient Remove',
          content: "<i class='fa fa-clock-o'></i> <i>Patient has not been removed...</i>",
          color: '#C46A69',
          iconSmall: 'fa fa-times fa-2x fadeInRight animated',
          timeout: 4000
        });
      }
    });
    return e.preventDefault();
  };

  return PatientView;

})(support.View);

if (typeof module !== "undefined" && module !== null) {
  module.exports = PatientView;
}

});

;require.register("daylight/views/patients_list_view", function(exports, require, module) {
var PatientsListTemplate, PatientsListView,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PatientsListTemplate = require('templates/patients_list_template');

PatientsListView = (function(_super) {
  __extends(PatientsListView, _super);

  function PatientsListView() {
    this.render = __bind(this.render, this);
    this.template = __bind(this.template, this);
    return PatientsListView.__super__.constructor.apply(this, arguments);
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

;require.register("daylight/views/search/autocomplete_item_view", function(exports, require, module) {
var AutocompleteItemView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

AutocompleteItemView = (function(_super) {
  __extends(AutocompleteItemView, _super);

  function AutocompleteItemView() {
    return AutocompleteItemView.__super__.constructor.apply(this, arguments);
  }

  AutocompleteItemView.prototype.tagName = 'li';

  AutocompleteItemView.prototype.template = "<a class='select-item'><%= label %></a>";

  AutocompleteItemView.prototype.events = {
    'click .select-item': 'select'
  };

  AutocompleteItemView.prototype.render = function() {
    this.$el.html(_.template(this.template, {
      label: this.model.label()
    }));
    return this;
  };

  AutocompleteItemView.prototype.select = function(e) {
    App.eventAggregator.trigger('click:addentity', this.model);
    this.$el.hide();
    e.preventDefault();
    return false;
  };

  return AutocompleteItemView;

})(support.View);

module.exports = AutocompleteItemView;

});

;require.register("daylight/views/search/autocomplete_view", function(exports, require, module) {
var AutocompleteItemView, AutocompleteView, SearchModel,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

AutocompleteItemView = require('daylight/views/search/autocomplete_item_view');

SearchModel = require('daylight/models/search_model');

AutocompleteView = (function(_super) {
  __extends(AutocompleteView, _super);

  function AutocompleteView() {
    return AutocompleteView.__super__.constructor.apply(this, arguments);
  }

  AutocompleteView.prototype.tagName = 'ul';

  AutocompleteView.prototype.itemView = AutocompleteItemView;

  AutocompleteView.prototype.className = 'autocomplete';

  AutocompleteView.prototype.wait = 100;

  AutocompleteView.prototype.currentText = '';

  AutocompleteView.prototype.minKeywordLength = 2;

  AutocompleteView.prototype.entity = 'conditions';

  AutocompleteView.prototype.events = {
    'keyup #c2_condition': 'keyup',
    'keydown #c2_condition': 'keydown'
  };

  AutocompleteView.prototype.initialize = function(options) {
    if (options.entity) {
      this.entity = options.entity;
    }
    _.extend(this, options);
    return this.filter = _.debounce(this.filter, this.wait);
  };

  AutocompleteView.prototype.render = function() {
    this.input.attr('autocomplete', 'off');
    this.$el.width(this.input.outerWidth());
    this.input.keyup(this.keyup.bind(this)).keydown(this.keydown.bind(this)).after(this.$el);
    return this;
  };

  AutocompleteView.prototype.keydown = function(e) {
    if (e.keyCode === 38) {
      return this.move(-1);
    }
    if (e.keyCode === 40) {
      return this.move(+1);
    }
    if (e.keyCode === 91) {
      return this.select();
    }
    if (e.keyCode === 13) {
      return this.onEnter();
    }
    if (e.keyCode === 27) {
      return this.hide();
    }
  };

  AutocompleteView.prototype.keyup = function() {
    var keyword;
    keyword = this.input.val();
    if (this.isChanged(keyword)) {
      if (this.isValid(keyword)) {
        return this.filter(keyword);
      } else {
        return this.hide();
      }
    }
  };

  AutocompleteView.prototype.filter = function(keyword) {
    var self, url;
    this.input.addClass('ui-autocomplete-loading');
    keyword = keyword.toLowerCase();
    self = this;
    this.model.reset();
    url = "https://api.howareyou.com/" + this.entity + "/search.json?term=" + keyword;
    return $.getJSON(url, function(data) {
      var models;
      models = data.map(function(m) {
        return new SearchModel(m);
      });
      self.model.reset(models);
      return self.loadResult(self.model.models, keyword);
    });
  };

  AutocompleteView.prototype.isValid = function(keyword) {
    return keyword.length > this.minKeywordLength;
  };

  AutocompleteView.prototype.isChanged = function(keyword) {
    return this.currentText !== keyword;
  };

  AutocompleteView.prototype.move = function(position) {
    var current, index, siblings;
    current = this.$el.children('.active');
    siblings = this.$el.children();
    index = current.index() + position;
    if (siblings.eq(index).length) {
      current.removeClass('active');
      siblings.eq(index).addClass('active');
    }
    return false;
  };

  AutocompleteView.prototype.onEnter = function() {
    this.$el.children('.active').click();
    return false;
  };

  AutocompleteView.prototype.loadResult = function(model, keyword) {
    this.currentText = keyword;
    this.$el.empty();
    if (model.length) {
      _.forEach(model, this.addItem, this);
      return this.show();
    } else {
      return this.hide();
    }
  };

  AutocompleteView.prototype.addItem = function(model) {
    return this.$el.append(new this.itemView({
      model: model,
      parent: this
    }).render().$el);
  };

  AutocompleteView.prototype.select = function(model) {
    var label;
    label = B.label();
    this.input.val(label);
    this.currentText = label;
    return this.onSelect(model);
  };

  AutocompleteView.prototype.reset = function() {
    this.$el.empty();
    return this;
  };

  AutocompleteView.prototype.hide = function() {
    this.$el.hide();
    return this;
  };

  AutocompleteView.prototype.show = function() {
    this.$el.show();
    return this;
  };

  AutocompleteView.prototype.onSelect = function(model) {};

  return AutocompleteView;

})(support.View);

module.exports = AutocompleteView;

});

;require.register("daylight/views/search/search_view", function(exports, require, module) {
var SearchTemplate, SearchView,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

SearchTemplate = require('templates/search/search_template');

SearchView = (function(_super) {
  __extends(SearchView, _super);

  function SearchView() {
    this.onClearSearch = __bind(this.onClearSearch, this);
    this.onSubmit = __bind(this.onSubmit, this);
    this.onKeyUp = __bind(this.onKeyUp, this);
    this.onKeyDown = __bind(this.onKeyDown, this);
    this.render = __bind(this.render, this);
    return SearchView.__super__.constructor.apply(this, arguments);
  }

  SearchView.prototype.template = SearchTemplate;

  SearchView.prototype.events = {
    'click .js-submit': 'onSubmit',
    'click .js-clear-search': 'onClearSearch',
    'keyup .js-search-terms': 'onKeyUp',
    'keydown .js-search-terms': 'onKeyDown',
    'click .help': 'onHelpClick'
  };

  SearchView.prototype.getTemplateAttrs = function() {
    var params, rtn;
    params = this.collection.getFilter();
    return rtn = {
      searchTerms: params && params.search ? params.search : ''
    };
  };

  SearchView.prototype.render = function() {
    this.$el.html(this.template(this.getTemplateAttrs()));
    return this;
  };

  SearchView.prototype.parseQuery = function(str) {
    str = str.replace(/\x20+(?=\x20)/g, '');
    return str = String.prototype.trim ? str.trim() : str;
  };

  SearchView.prototype.doSearch = function() {
    var params, terms;
    terms = this.$('input[name=SearchCriterion]').val();
    params = _.extend({}, this.collection.getFilter(), {
      search: this.parseQuery(terms)
    });
    return window.App.eventAggregator.trigger("navigate:patients", params);
  };

  SearchView.prototype.onKeyDown = function(e) {
    if (e.which === 13) {
      return e.preventDefault();
    }
  };

  SearchView.prototype.onKeyUp = function(e) {
    if (e.which === 13) {
      e.preventDefault();
      return this.doSearch();
    }
  };

  SearchView.prototype.onSubmit = function(e) {
    e.preventDefault();
    return this.doSearch();
  };

  SearchView.prototype.onClearSearch = function(e) {
    e.preventDefault();
    return window.App.eventAggregator.trigger('navigate:patients', {
      filter: null
    });
  };

  return SearchView;

})(support.View);

module.exports = SearchView;

});

;require.register("daylight/views/vitals/vitals_add_view", function(exports, require, module) {
var VitalModel, VitalsAddTemplate, VitalsAddView,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

VitalsAddTemplate = require('templates/vitals/vitals_add_template');

VitalModel = require('daylight/models/vital_model');

VitalsAddView = (function(_super) {
  __extends(VitalsAddView, _super);

  function VitalsAddView() {
    this.onKeyDown = __bind(this.onKeyDown, this);
    this.createDatePicker = __bind(this.createDatePicker, this);
    this.save = __bind(this.save, this);
    this.render = __bind(this.render, this);
    return VitalsAddView.__super__.constructor.apply(this, arguments);
  }

  VitalsAddView.prototype.id = "create";

  VitalsAddView.prototype.className = "modal fade";

  VitalsAddView.prototype.template = VitalsAddTemplate;

  VitalsAddView.prototype.events = {
    'keydown': 'onKeyDown',
    'click .js-cancel-btn': 'onCancelClick',
    'click .js-save-btn': 'onSaveClick',
    'mouseover .clsDatePicker': 'createDatePicker',
    'hidden.bs.modal': 'teardown'
  };

  VitalsAddView.prototype.validationOptions = {
    rules: {
      date: {
        required: true
      },
      time: {
        required: true
      },
      weight: {
        required: true
      },
      height: {
        required: true
      },
      systolic: {
        required: true
      },
      diastolic: {
        required: true
      },
      bloodGlucose: {
        required: true
      },
      temperature: {
        required: true
      },
      pulse: {
        required: true
      }
    },
    messages: {
      date: 'Please specify the date',
      time: 'Please specify last time',
      weight: 'Please specify weight',
      height: 'Please specify height',
      systolic: 'Please specify blood pressure systolic',
      diastolic: 'Please specify blood pressure diastolic',
      bloodGlucose: 'Please specifiy the blood glucose',
      temperature: 'Please specifiy the body temperature',
      pulse: 'Please specifiy pulse'
    },
    highlight: function(el) {
      return $(el).closest(".form-group").removeClass("has-success").addClass("has-error");
    },
    unhighlight: function(el) {
      return $(el).closest(".form-group").removeClass("has-error").addClass("has-success");
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function(error, el) {
      if (el.parent('.input-group').length) {
        return error.insertAfter(el.parent());
      } else {
        return error.insertAfter(el);
      }
    }
  };

  VitalsAddView.prototype.initialize = function(options) {
    VitalsAddView.__super__.initialize.call(this, options);
    _.bindAll(this, "render");
    this.render();
    return this.createDatePicker();
  };

  VitalsAddView.prototype.render = function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.modal({
      show: false
    });
    this.delegateEvents(this.events);
    return this;
  };

  VitalsAddView.prototype.save = function() {
    var bloodGlucose, collection, date, dateRecorded, diastolic, form, height, pulse, systolic, temperature, time, weight;
    form = this.$("form").serializeObject();
    date = this.$('#date').val();
    time = this.$('#time').val();
    dateRecorded = "" + date + " " + time;
    weight = this.$('#weight').val();
    height = this.$('#height').val();
    diastolic = this.$('#diastolic').val();
    systolic = this.$('#systolic').val();
    bloodGlucose = this.$('#bloodGlucose').val();
    temperature = this.$('#temperature').val();
    pulse = this.$('#pulse').val();
    console.log('date dateRecorded', dateRecorded);
    console.log('blood glucose', bloodGlucose);
    collection = window.IoC.get('VitalCollection');
    this.model.collection = collection;
    this.model.set(this.model.parse({
      dateRecorded: dateRecorded,
      pulse: pulse,
      weight: weight,
      height: height,
      diastolicBp: diastolic,
      systolicBp: systolic,
      bodyTemperature: temperature,
      bloodGlucose: bloodGlucose
    }));
    console.log(JSON.stringify(this.model.toJSON()));
    this.model.save(null, {
      wait: true,
      success: (function(_this) {
        return function(model, response, options) {
          console.log(model);
          return $.smallBox({
            title: "Patient vitals have been successfully added!",
            content: "<i class='fa fa-clock-o'></i> <i>3 seconds ago...</i>",
            color: '#5F895F',
            iconSmall: 'fa fa-check bounce animated',
            timeout: 4000
          });
        };
      })(this),
      error: (function(_this) {
        return function(model, response, options) {
          return window.location = '/Error/HttpError';
        };
      })(this)
    });
    this.teardown();
    return window.App.eventAggregator.trigger('navigate:patient', {
      id: this.model.patientId()
    });
  };

  VitalsAddView.prototype.createDatePicker = function() {
    var view;
    view = this;
    return $("#date").datepicker({
      maxDate: '-2',
      dateFormat: 'dd/mm/yy',
      defaultDate: view.selectedDate
    });

    /*enforceModalFocusFn = $.fn.modal.Constructor.prototype.enforceFocus
    		$.fn.modal.Constructor::enforceFocus = ->
    		
    		$confModal.on 'hidden', ->
    			$.fn.modal.Constructor::enforceFocus = enforceModalFocusFn
    
    		$confModal.modal backdrop: false
     */
  };

  VitalsAddView.prototype.dispose = function() {
    return Backbone.Validation.unbind(this);
  };

  VitalsAddView.prototype.show = function() {
    return this.$el.modal("show");
  };

  VitalsAddView.prototype.teardown = function() {
    return this.$el.modal("hide");
  };

  VitalsAddView.prototype.onKeyDown = function(e) {
    if (e.which === 13) {
      e.preventDefault();
      return this.onSaveClick();
    }
  };

  VitalsAddView.prototype.onSaveClick = function(e) {
    var $valid, $validator;
    e.preventDefault();
    $validator = $("#addvitals").validate(this.validationOptions);
    $valid = $('#addvitals').valid();
    if (!$valid) {
      $validator.focusInvalid();
      return false;
    } else {
      return this.save();
    }
  };

  VitalsAddView.prototype.onCancelClick = function(e) {
    e.preventDefault();
    return this.teardown();
  };

  return VitalsAddView;

})(support.View);

module.exports = VitalsAddView;

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
      url = o.editMode ? '#edit/patients/#{o.id}' : "#view/patients/" + o.id;
      return url;
    },
    url: function(url) {
      return window.App.setting('patient.rootUrl').concat(url);
    }
  };
  return new Application($('#content'));
});

});

;require.register("router/router", function(exports, require, module) {
var Router,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Router = (function(_super) {
  __extends(Router, _super);

  function Router() {
    return Router.__super__.constructor.apply(this, arguments);
  }

  Router.prototype.routes = {
    '?*query': 'patients',
    '': 'default',
    'addwidget': 'addWidget',
    'create': 'addPatient',
    'view/patients/:id': 'patient',
    'edit/patients/:id': 'editPatient',
    ':id/condition:index.:subIndex': 'patient',
    ':id/condition:index': 'patient',
    'view/patients?*query': 'patients',
    'view/patients': 'patients'
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

  Router.prototype.editPatient = function(query) {
    var params;
    params = this.getParams(query) || {};
    return App.eventAggregator.trigger('navigate:editpatient', params);
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
    var params, rtn;
    if (!str) {
      return null;
    }
    params = str.replace(/\?/, '');
    params = params.split('&');
    rtn = {};
    _.each(params, (function(_this) {
      return function(param) {
        param = param.split('=');
        return rtn[param[0]] = _this._decodeValue(param[1]);
      };
    })(this));
    return rtn;
  };

  Router.prototype.addParamsToRoute = function(route, params) {
    var iterator;
    route = route || '';
    iterator = (function(_this) {
      return function(memo, value, key) {
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
    })(this);
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

;require.register("templates/condition/condition_list_item_template", function(exports, require, module) {
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
      var med, _i, _len, _ref, _ref1;
    
      __out.push('<span title="Add medication" class="js-medication-add"><i class="fa fa-lg fa-plus-circle"></i> ');
    
      __out.push(__sanitize(this.name));
    
      __out.push('</span>\n<a class="remove label label-danger pull-right padding-5 js-delete-condition" href="#"  data-id="');
    
      __out.push(__sanitize(this.id));
    
      __out.push('">\n\t\t<i class="glyphicon glyphicon-remove"></i> remove\n</a>\n');
    
      if ((_ref = this.medications) != null ? _ref.length : void 0) {
        __out.push('\n\t<ul role="group">\n\t');
        _ref1 = this.medications;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          med = _ref1[_i];
          __out.push('\n\t\t<li class="parent_li" role="treeitem">\t\t\t\n\t\t\t<span class="label label-success" title="Expand this branch"><i class="fa fa-lg fa-plus-circle"></i> ');
          __out.push(__sanitize(med.name));
          __out.push('</span>\t\t\t\n\t\t</li>    \n\t');
        }
        __out.push('\n\t</ul>\n');
      }
    
      __out.push('\t\t\t\t\t\t\t\t\t\t\t\t\n\n\n<!-- <ul role="group">\n\t\t<li class="parent_li" role="treeitem">\n\t\t\t<span class="label label-success" title="Expand this branch"><i class="fa fa-lg fa-plus-circle"></i> Monday, January 7: 8.00 hours</span>\n\t\t\t<ul role="group">\n\t\t\t\t<li style="display: none;">\n\t\t\t\t\t<span><i class="fa fa-clock-o"></i> 8.00</span> &ndash; <a href="javascript:void(0);">Changed CSS to accomodate...</a>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t</li>\n\t\t<li class="parent_li" role="treeitem">\n\t\t\t<span class="label label-success" title="Expand this branch"><i class="fa fa-lg fa-plus-circle"></i> Tuesday, January 8: 8.00 hours</span>\n\t\t\t<ul role="group">\n\t\t\t\t<li style="display: none;">\n\t\t\t\t\t<span><i class="fa fa-clock-o"></i> 6.00</span> &ndash; <a href="javascript:void(0);">Altered code...</a>\n\t\t\t\t</li>\n\t\t\t\t<li style="display: none;">\n\t\t\t\t\t<span><i class="fa fa-clock-o"></i> 2.00</span> &ndash; <a href="javascript:void(0);">Simplified our approach to...</a>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t</li>\n\t\t<li class="parent_li" role="treeitem">\n\t\t\t<span class="label label-warning" title="Collapse this branch"><i class="fa fa-lg fa-minus-circle"></i> Wednesday, January 9: 6.00 hours</span>\n\t\t\t<ul role="group">\n\t\t\t\t<li>\n\t\t\t\t\t<span><i class="fa fa-clock-o"></i> 3.00</span> &ndash; <a href="javascript:void(0);">Fixed bug caused by...</a>\n\t\t\t\t</li>\n\t\t\t\t<li>\n\t\t\t\t\t<span><i class="fa fa-clock-o"></i> 3.00</span> &ndash; <a href="javascript:void(0);">Comitting latest code to Git...</a>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t</li>\n\t\t<li class="parent_li" role="treeitem">\n\t\t\t<span class="label label-danger" title="Collapse this branch"><i class="fa fa-lg fa-minus-circle"></i> Wednesday, January 9: 4.00 hours</span>\n\t\t\t<ul role="group">\n\t\t\t\t<li>\n\t\t\t\t\t<span><i class="fa fa-clock-o"></i> 2.00</span> &ndash; <a href="javascript:void(0);">Create component that...</a>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t</li>\n\t</ul> \n\t<li class="parent_li" role="treeitem">\n\t\t<span title="Collapse this branch"><i class="fa fa-lg fa-folder-open"></i> Carpal hygroma</span>\n\t\t<ul role="group">\n\t\t\t<li class="parent_li" role="treeitem">\n\t\t\t\t<span class="label label-success" title="Collapse this branch"><i class="fa fa-lg fa-minus-circle"></i> Monday, January 14: 8.00 hours</span>\n\t\t\t\t<ul role="group">\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<span><i class="fa fa-clock-o"></i> 7.75</span> &ndash; <a href="javascript:void(0);">Writing documentation...</a>\n\t\t\t\t\t</li>\n\t\t\t\t\t<li>\n\t\t\t\t\t\t<span><i class="fa fa-clock-o"></i> 0.25</span> &ndash; <a href="javascript:void(0);">Reverting code back to...</a>\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t</li>\n\t\t</ul> \n\t</li> -->');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}
});

;require.register("templates/condition/condition_list_template", function(exports, require, module) {
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
      __out.push('<ul role="tree" class="condition-tree"></ul>\n\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}
});

;require.register("templates/condition/condition_search_template", function(exports, require, module) {
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
      __out.push('<div class="row">\n\t<div class="col-sm-12">\n\t\t<div class="form-group">\n\t\t\t<div class="input-group margin-bottom-sm">\n\t\t\t\t<div class="inline-group">\n\t\t\t\t\t<div class="bbf-editor">\n\t\t\t\t\t\t<input class="form-control input-lg js-search-terms" autocomplete="off" placeholder="Search for condition" type="text" name="condition" id="c2_condition" value="');
    
      __out.push(__sanitize(this.name));
    
      __out.push('">\t\t\t\t\t\t\t\t\n\t\t\t\t\t</div>\t\t\t\t\t\t\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}
});

;require.register("templates/condition/conditions_template", function(exports, require, module) {
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
      __out.push('<div class="modal-dialog">\n\t<div class="modal-content">\n\t\t<div class="modal-header class="smart-form client-form"">\n\t\t\t<button type="button" class="close" data-dismiss="modal" aria-hidden="true">\n\t\t\t\t&times;\n\t\t\t</button>\n\t\t\t<header>\n\t\t\t\t<h2>Add Condition</h2>\t\t\t\t\t\t\t\t\t\n\t\t\t</header>\t\t\t\t\n\t\t</div>\n\t\t<div class="modal-body">\n\t\t\t<div class="row">\t\t\t\t\n\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t<form id="searchcondition" novalidate="novalidate">\n\t\t\t\t\t\t<div id="search_container"></div>\t\n\t\t\t\t\t\t<div class="panel-body no-padding">            \n\t\t\t\t\t\t\t<strong>');
    
      __out.push(__sanitize(this.name));
    
      __out.push('</strong> \n\t\t\t\t\t\t\t<input type="hidden" name="consynonyms" id="c2_synonyms" value="');
    
      __out.push(__sanitize(this.synonyms));
    
      __out.push('">\n\t\t\t\t\t\t\t<input type="hidden" name="conceptId" id="c2_conceptId" value="');
    
      __out.push(__sanitize(this.conceptId));
    
      __out.push('">\t\t\t\t\t\n\t\t\t\t\t    </div> \n\t\t\t\t\t</form>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\t\t\t\t\n\n\t\t<div class="modal-footer">\t\t\t\t\n\t\t\t<button type="button" class="btn btn-primary" data-dismiss="modal">\n\t\t\t\tCancel\n\t\t\t</button>\n\t\t\t<button type="submit" class="btn btn-primary js-save-btn">\n\t\t\t\t<i class="fa fa-save"></i>\n\t\t\t\tSave\n\t\t\t</button>\n\t\t</div>\t\t\t\n\t</div>\n</div>\t');
    
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
      __out.push('<div class="modal-dialog">\n\t<div class="modal-content">\n\t\t<div class="modal-header class="smart-form client-form"">\n\t\t\t<button type="button" class="close" data-dismiss="modal" aria-hidden="true">\n\t\t\t\t&times;\n\t\t\t</button>\n\t\t\t<header>\n\t\t\t\t<h2>Add Condition</h2>\t\t\t\t\t\t\t\t\t\n\t\t\t</header>\t\t\t\t\n\t\t</div>\n\t\t<div class="modal-body">\n\t\t\t<div class="row">\n\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t\t<form id="autocomplete-conditions">\n\t\t\t\t  \t\t\t\t<input name="search" autocomplete="off" style="width: 200px">\n\t\t\t\t\t\t\t</form>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\t\t\t\t\t\t\n\t\t\t\t</div>\n\t\t\t\t<div class="col-sm-6">\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\t\t\t\t\n\n\t\t<div class="modal-footer">\t\t\t\t\n\t\t\t<button type="button" class="btn btn-primary" data-dismiss="modal">\n\t\t\t\tCancel\n\t\t\t</button>\n\t\t\t<button type="submit" class="btn btn-primary js-save-btn">\n\t\t\t\t<i class="fa fa-save"></i>\n\t\t\t\tSave Changes\n\t\t\t</button>\n\t\t</div>\t\t\t\n\t</div>\n</div>\t');
    
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
      __out.push('<div class="row">\n\t<div class="col-xs-12 col-sm-7 col-md-7 col-lg-4">\n\t\t<h1 class="page-title txt-color-blueDark"><i class="fa-fw fa fa-home"></i> Dashboard <span>> My Dashboard</span></h1>\n\t</div>\n\t<div class="col-xs-12 col-sm-5 col-md-5 col-lg-8">\n\t\t<ul id="sparks" class="">\n\t\t\t<li class="sparks-info">\n\t\t\t\t<h5> My Income <span class="txt-color-blue">$47,171</span></h5>\n\t\t\t\t<div class="sparkline txt-color-blue hidden-mobile hidden-md hidden-sm">\n\t\t\t\t\t1300, 1877, 2500, 2577, 2000, 2100, 3000, 2700, 3631, 2471, 2700, 3631, 2471\n\t\t\t\t</div>\n\t\t\t</li>\n\t\t\t<li class="sparks-info">\n\t\t\t\t<h5> Site Traffic <span class="txt-color-purple"><i class="fa fa-arrow-circle-up" data-rel="bootstrap-tooltip" title="Increased"></i>&nbsp;45%</span></h5>\n\t\t\t\t<div class="sparkline txt-color-purple hidden-mobile hidden-md hidden-sm">\n\t\t\t\t\t110,150,300,130,400,240,220,310,220,300, 270, 210\n\t\t\t\t</div>\n\t\t\t</li>\n\t\t\t<li class="sparks-info">\n\t\t\t\t<h5> Site Orders <span class="txt-color-greenDark"><i class="fa fa-shopping-cart"></i>&nbsp;2447</span></h5>\n\t\t\t\t<div class="sparkline txt-color-greenDark hidden-mobile hidden-md hidden-sm">\n\t\t\t\t\t110,150,300,130,400,240,220,310,220,300, 270, 210\n\t\t\t\t</div>\n\t\t\t</li>\n\t\t</ul>\n\t</div>\n</div>\n<!-- widget grid -->\n<section id="widget-grid" class="">\n\n\t<!-- row -->\n\t<div class="row">\n\t\t<article class="col-sm-12">\n\t\t\t<!-- new widget -->\n\t\t\t<div class="jarviswidget" id="wid-id-0" data-widget-togglebutton="false" data-widget-editbutton="false" data-widget-fullscreenbutton="false" data-widget-colorbutton="false" data-widget-deletebutton="false">\n\t\t\t\t<!-- widget options:\n\t\t\t\tusage: <div class="jarviswidget" id="wid-id-0" data-widget-editbutton="false">\n\n\t\t\t\tdata-widget-colorbutton="false"\n\t\t\t\tdata-widget-editbutton="false"\n\t\t\t\tdata-widget-togglebutton="false"\n\t\t\t\tdata-widget-deletebutton="false"\n\t\t\t\tdata-widget-fullscreenbutton="false"\n\t\t\t\tdata-widget-custombutton="false"\n\t\t\t\tdata-widget-collapsed="true"\n\t\t\t\tdata-widget-sortable="false"\n\n\t\t\t\t-->\n\t\t\t\t<header>\n\t\t\t\t\t<span class="widget-icon"> <i class="glyphicon glyphicon-stats txt-color-darken"></i> </span>\n\t\t\t\t\t<h2>Live Feeds </h2>\n\n\t\t\t\t\t<ul class="nav nav-tabs pull-right in" id="myTab">\n\t\t\t\t\t\t<li class="active">\n\t\t\t\t\t\t\t<a data-toggle="tab" href="#s1"><i class="fa fa-clock-o"></i> <span class="hidden-mobile hidden-tablet">Live Stats</span></a>\n\t\t\t\t\t\t</li>\n\n\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t<a data-toggle="tab" href="#s2"><i class="fa fa-facebook"></i> <span class="hidden-mobile hidden-tablet">Social Network</span></a>\n\t\t\t\t\t\t</li>\n\n\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t<a data-toggle="tab" href="#s3"><i class="fa fa-dollar"></i> <span class="hidden-mobile hidden-tablet">Revenue</span></a>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t</ul>\n\n\t\t\t\t</header>\n\n\t\t\t\t<!-- widget div-->\n\t\t\t\t<div class="no-padding">\n\t\t\t\t\t<!-- widget edit box -->\n\t\t\t\t\t<div class="jarviswidget-editbox">\n\n\t\t\t\t\t\ttest\n\t\t\t\t\t</div>\n\t\t\t\t\t<!-- end widget edit box -->\n\n\t\t\t\t\t<div class="widget-body">\n\t\t\t\t\t\t<!-- content -->\n\t\t\t\t\t\t<div id="myTabContent" class="tab-content">\n\t\t\t\t\t\t\t<div class="tab-pane fade active in padding-10 no-padding-bottom" id="s1">\n\t\t\t\t\t\t\t\t<div class="row no-space">\n\t\t\t\t\t\t\t\t\t<div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">\n\t\t\t\t\t\t\t\t\t\t<span class="demo-liveupdate-1"> <span class="onoffswitch-title">Live switch</span> <span class="onoffswitch">\n\t\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" name="start_interval" class="onoffswitch-checkbox" id="start_interval">\n\t\t\t\t\t\t\t\t\t\t\t\t<label class="onoffswitch-label" for="start_interval"> <div class="onoffswitch-inner" data-swchon-text="ON" data-swchoff-text="OFF"></div> <div class="onoffswitch-switch"></div> </label> </span> </span>\n\t\t\t\t\t\t\t\t\t\t<div id="updating-chart" class="chart-large txt-color-blue"></div>\n\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 show-stats">\n\n\t\t\t\t\t\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t\t\t\t\t\t<span class="col-xs-6 col-sm-6 col-md-12 col-lg-12"> <span class="text"> My Tasks <span class="pull-right">130/200</span> </span>\n\t\t\t\t\t\t\t\t\t\t\t\t<div class="progress">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="progress-bar bg-color-blueDark" style="width: 65%;"></div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div> </span>\n\t\t\t\t\t\t\t\t\t\t\t<span class="col-xs-6 col-sm-6 col-md-12 col-lg-12"> <span class="text"> Transfered <span class="pull-right">440 GB</span> </span>\n\t\t\t\t\t\t\t\t\t\t\t\t<div class="progress">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="progress-bar bg-color-blue" style="width: 34%;"></div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div> </span>\n\t\t\t\t\t\t\t\t\t\t\t<span class="col-xs-6 col-sm-6 col-md-12 col-lg-12"> <span class="text"> Bugs Squashed<span class="pull-right">77%</span> </span>\n\t\t\t\t\t\t\t\t\t\t\t\t<div class="progress">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="progress-bar bg-color-blue" style="width: 77%;"></div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div> </span>\n\t\t\t\t\t\t\t\t\t\t\t<span class="col-xs-6 col-sm-6 col-md-12 col-lg-12"> <span class="text"> User Testing <span class="pull-right">7 Days</span> </span>\n\t\t\t\t\t\t\t\t\t\t\t\t<div class="progress">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="progress-bar bg-color-greenLight" style="width: 84%;"></div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div> </span>\n\n\t\t\t\t\t\t\t\t\t\t\t<span class="show-stat-buttons"> <span class="col-xs-12 col-sm-6 col-md-6 col-lg-6"> <a href="javascript:void(0);" class="btn btn-default btn-block hidden-xs">Generate PDF</a> </span> <span class="col-xs-12 col-sm-6 col-md-6 col-lg-6"> <a href="javascript:void(0);" class="btn btn-default btn-block hidden-xs">Report a bug</a> </span> </span>\n\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class="show-stat-microcharts">\n\t\t\t\t\t\t\t\t\t<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">\n\n\t\t\t\t\t\t\t\t\t\t<div class="easy-pie-chart txt-color-orangeDark" data-percent="33" data-pie-size="50">\n\t\t\t\t\t\t\t\t\t\t\t<span class="percent percent-sign">35</span>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<span class="easy-pie-title"> Server Load <i class="fa fa-caret-up icon-color-bad"></i> </span>\n\t\t\t\t\t\t\t\t\t\t<ul class="smaller-stat hidden-sm pull-right">\n\t\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t\t<span class="label bg-color-greenLight"><i class="fa fa-caret-up"></i> 97%</span>\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t\t<span class="label bg-color-blueLight"><i class="fa fa-caret-down"></i> 44%</span>\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t\t\t<div class="sparkline txt-color-greenLight hidden-sm hidden-md pull-right" data-sparkline-type="line" data-sparkline-height="33px" data-sparkline-width="70px" data-fill-color="transparent">\n\t\t\t\t\t\t\t\t\t\t\t130, 187, 250, 257, 200, 210, 300, 270, 363, 247, 270, 363, 247\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">\n\t\t\t\t\t\t\t\t\t\t<div class="easy-pie-chart txt-color-greenLight" data-percent="78.9" data-pie-size="50">\n\t\t\t\t\t\t\t\t\t\t\t<span class="percent percent-sign">78.9 </span>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<span class="easy-pie-title"> Disk Space <i class="fa fa-caret-down icon-color-good"></i></span>\n\t\t\t\t\t\t\t\t\t\t<ul class="smaller-stat hidden-sm pull-right">\n\t\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t\t<span class="label bg-color-blueDark"><i class="fa fa-caret-up"></i> 76%</span>\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t\t<span class="label bg-color-blue"><i class="fa fa-caret-down"></i> 3%</span>\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t\t\t<div class="sparkline txt-color-blue hidden-sm hidden-md pull-right" data-sparkline-type="line" data-sparkline-height="33px" data-sparkline-width="70px" data-fill-color="transparent">\n\t\t\t\t\t\t\t\t\t\t\t257, 200, 210, 300, 270, 363, 130, 187, 250, 247, 270, 363, 247\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">\n\t\t\t\t\t\t\t\t\t\t<div class="easy-pie-chart txt-color-blue" data-percent="23" data-pie-size="50">\n\t\t\t\t\t\t\t\t\t\t\t<span class="percent percent-sign">23 </span>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<span class="easy-pie-title"> Transfered <i class="fa fa-caret-up icon-color-good"></i></span>\n\t\t\t\t\t\t\t\t\t\t<ul class="smaller-stat hidden-sm pull-right">\n\t\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t\t<span class="label bg-color-darken">10GB</span>\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t\t<span class="label bg-color-blueDark"><i class="fa fa-caret-up"></i> 10%</span>\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t\t\t<div class="sparkline txt-color-darken hidden-sm hidden-md pull-right" data-sparkline-type="line" data-sparkline-height="33px" data-sparkline-width="70px" data-fill-color="transparent">\n\t\t\t\t\t\t\t\t\t\t\t200, 210, 363, 247, 300, 270, 130, 187, 250, 257, 363, 247, 270\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">\n\t\t\t\t\t\t\t\t\t\t<div class="easy-pie-chart txt-color-darken" data-percent="36" data-pie-size="50">\n\t\t\t\t\t\t\t\t\t\t\t<span class="percent degree-sign">36 <i class="fa fa-caret-up"></i></span>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<span class="easy-pie-title"> Temperature <i class="fa fa-caret-down icon-color-good"></i></span>\n\t\t\t\t\t\t\t\t\t\t<ul class="smaller-stat hidden-sm pull-right">\n\t\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t\t<span class="label bg-color-red"><i class="fa fa-caret-up"></i> 124</span>\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t\t<span class="label bg-color-blue"><i class="fa fa-caret-down"></i> 40 F</span>\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t\t\t<div class="sparkline txt-color-red hidden-sm hidden-md pull-right" data-sparkline-type="line" data-sparkline-height="33px" data-sparkline-width="70px" data-fill-color="transparent">\n\t\t\t\t\t\t\t\t\t\t\t2700, 3631, 2471, 2700, 3631, 2471, 1300, 1877, 2500, 2577, 2000, 2100, 3000\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<!-- end s1 tab pane -->\n\n\t\t\t\t\t\t\t<div class="tab-pane fade" id="s2">\n\t\t\t\t\t\t\t\t<div class="widget-body-toolbar bg-color-white">\n\n\t\t\t\t\t\t\t\t\t<form class="form-inline" role="form">\n\n\t\t\t\t\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t\t\t\t\t<label class="sr-only" for="s123">Show From</label>\n\t\t\t\t\t\t\t\t\t\t\t<input type="email" class="form-control input-sm" id="s123" placeholder="Show From">\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t\t\t\t\t<input type="email" class="form-control input-sm" id="s124" placeholder="To">\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t<div class="btn-group hidden-phone pull-right">\n\t\t\t\t\t\t\t\t\t\t\t<a class="btn dropdown-toggle btn-xs btn-default" data-toggle="dropdown"><i class="fa fa-cog"></i> More <span class="caret"> </span> </a>\n\t\t\t\t\t\t\t\t\t\t\t<ul class="dropdown-menu pull-right">\n\t\t\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);"><i class="fa fa-file-text-alt"></i> Export to PDF</a>\n\t\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);"><i class="fa fa-question-sign"></i> Help</a>\n\t\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t</form>\n\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="padding-10">\n\t\t\t\t\t\t\t\t\t<div id="statsChart" class="chart-large has-legend-unique"></div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<!-- end s2 tab pane -->\n\n\t\t\t\t\t\t\t<div class="tab-pane fade" id="s3">\n\n\t\t\t\t\t\t\t\t<div class="widget-body-toolbar bg-color-white smart-form" id="rev-toggles">\n\n\t\t\t\t\t\t\t\t\t<div class="inline-group">\n\n\t\t\t\t\t\t\t\t\t\t<label for="gra-0" class="checkbox">\n\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" name="gra-0" id="gra-0" checked="checked">\n\t\t\t\t\t\t\t\t\t\t\t<i></i> Target </label>\n\t\t\t\t\t\t\t\t\t\t<label for="gra-1" class="checkbox">\n\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" name="gra-1" id="gra-1" checked="checked">\n\t\t\t\t\t\t\t\t\t\t\t<i></i> Actual </label>\n\t\t\t\t\t\t\t\t\t\t<label for="gra-2" class="checkbox">\n\t\t\t\t\t\t\t\t\t\t\t<input type="checkbox" name="gra-2" id="gra-2" checked="checked">\n\t\t\t\t\t\t\t\t\t\t\t<i></i> Signups </label>\n\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t<div class="btn-group hidden-phone pull-right">\n\t\t\t\t\t\t\t\t\t\t<a class="btn dropdown-toggle btn-xs btn-default" data-toggle="dropdown"><i class="fa fa-cog"></i> More <span class="caret"> </span> </a>\n\t\t\t\t\t\t\t\t\t\t<ul class="dropdown-menu pull-right">\n\t\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);"><i class="fa fa-file-text-alt"></i> Export to PDF</a>\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);"><i class="fa fa-question-sign"></i> Help</a>\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class="padding-10">\n\t\t\t\t\t\t\t\t\t<div id="flotcontainer" class="chart-large has-legend-unique"></div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<!-- end s3 tab pane -->\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<!-- end content -->\n\t\t\t\t\t</div>\n\n\t\t\t\t</div>\n\t\t\t\t<!-- end widget div -->\n\t\t\t</div>\n\t\t\t<!-- end widget -->\n\n\t\t</article>\n\t</div>\n\n\t<!-- end row -->\n\n\t<!-- row -->\n\n\t<div class="row">\n\n\t\t<article class="col-sm-12 col-md-12 col-lg-6">\n\n\t\t\t<!-- new widget -->\n\t\t\t<div class="jarviswidget jarviswidget-color-blueDark" id="wid-id-1" data-widget-editbutton="false" data-widget-fullscreenbutton="false">\n\n\t\t\t\t<!-- widget options:\n\t\t\t\tusage: <div class="jarviswidget" id="wid-id-0" data-widget-editbutton="false">\n\n\t\t\t\tdata-widget-colorbutton="false"\n\t\t\t\tdata-widget-editbutton="false"\n\t\t\t\tdata-widget-togglebutton="false"\n\t\t\t\tdata-widget-deletebutton="false"\n\t\t\t\tdata-widget-fullscreenbutton="false"\n\t\t\t\tdata-widget-custombutton="false"\n\t\t\t\tdata-widget-collapsed="true"\n\t\t\t\tdata-widget-sortable="false"\n\n\t\t\t\t-->\n\n\t\t\t\t<header>\n\t\t\t\t\t<span class="widget-icon"> <i class="fa fa-comments txt-color-white"></i> </span>\n\t\t\t\t\t<h2> SmartChat </h2>\n\t\t\t\t\t<div class="widget-toolbar">\n\t\t\t\t\t\t<!-- add: non-hidden - to disable auto hide -->\n\n\t\t\t\t\t\t<div class="btn-group">\n\t\t\t\t\t\t\t<button class="btn dropdown-toggle btn-xs btn-success" data-toggle="dropdown">\n\t\t\t\t\t\t\t\tStatus <i class="fa fa-caret-down"></i>\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t<ul class="dropdown-menu pull-right js-status-update">\n\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);"><i class="fa fa-circle txt-color-green"></i> Online</a>\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);"><i class="fa fa-circle txt-color-red"></i> Busy</a>\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);"><i class="fa fa-circle txt-color-orange"></i> Away</a>\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t<li class="divider"></li>\n\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);"><i class="fa fa-power-off"></i> Log Off</a>\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</header>\n\n\t\t\t\t<!-- widget div-->\n\t\t\t\t<div>\n\t\t\t\t\t<!-- widget edit box -->\n\t\t\t\t\t<div class="jarviswidget-editbox">\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<label>Title:</label>\n\t\t\t\t\t\t\t<input type="text" />\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<!-- end widget edit box -->\n\n\t\t\t\t\t<div class="widget-body widget-hide-overflow no-padding">\n\t\t\t\t\t\t<!-- content goes here -->\n\n\t\t\t\t\t\t<!-- CHAT CONTAINER -->\n\t\t\t\t\t\t<div id="chat-container">\n\t\t\t\t\t\t\t<span class="chat-list-open-close"><i class="fa fa-user"></i><b>!</b></span>\n\n\t\t\t\t\t\t\t<div class="chat-list-body custom-scroll">\n\t\t\t\t\t\t\t\t<ul id="chat-users">\n\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);"><img src="img/avatars/5.png">Robin Berry <span class="badge badge-inverse">23</span><span class="state"><i class="fa fa-circle txt-color-green pull-right"></i></span></a>\n\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);"><img src="img/avatars/male.png">Mark Zeukartech <span class="state"><i class="last-online pull-right">2hrs</i></span></a>\n\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);"><img src="img/avatars/male.png">Belmain Dolson <span class="state"><i class="last-online pull-right">45m</i></span></a>\n\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);"><img src="img/avatars/male.png">Galvitch Drewbery <span class="state"><i class="fa fa-circle txt-color-green pull-right"></i></span></a>\n\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);"><img src="img/avatars/male.png">Sadi Orlaf <span class="state"><i class="fa fa-circle txt-color-green pull-right"></i></span></a>\n\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);"><img src="img/avatars/male.png">Markus <span class="state"><i class="last-online pull-right">2m</i></span> </a>\n\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);"><img src="img/avatars/sunny.png">Sunny <span class="state"><i class="last-online pull-right">2m</i></span> </a>\n\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);"><img src="img/avatars/male.png">Denmark <span class="state"><i class="last-online pull-right">2m</i></span> </a>\n\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="chat-list-footer">\n\n\t\t\t\t\t\t\t\t<div class="control-group">\n\n\t\t\t\t\t\t\t\t\t<form class="smart-form">\n\n\t\t\t\t\t\t\t\t\t\t<section>\n\t\t\t\t\t\t\t\t\t\t\t<label class="input">\n\t\t\t\t\t\t\t\t\t\t\t\t<input type="text" id="filter-chat-list" placeholder="Filter">\n\t\t\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t\t\t</section>\n\n\t\t\t\t\t\t\t\t\t</form>\n\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<!-- CHAT BODY -->\n\t\t\t\t\t\t<div id="chat-body" class="chat-body custom-scroll">\n\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t\t<li class="message">\n\t\t\t\t\t\t\t\t\t<img src="img/avatars/5.png" class="online">\n\t\t\t\t\t\t\t\t\t<span class="message-text">\n\t\t\t\t\t\t\t\t\t\t<time>\n\t\t\t\t\t\t\t\t\t\t\t12:23pm\n\t\t\t\t\t\t\t\t\t\t</time> <a href="javascript:void(0);" class="username">Sadi Orlaf</a> Hey did you see the new elected board of director? He\'s a bit of a arse if you ask me...anyway here is the report you requested. I am off to launch Lisa and Andrew, you wanna join?\n\t\t\t\t\t\t\t\t\t\t<p class="chat-file row">\n\t\t\t\t\t\t\t\t\t\t\t<b class="pull-left col-sm-6"> <!--<i class="fa fa-spinner fa-spin"></i>--> <i class="fa fa-file"></i> report-2013-demographic-report-annual-earnings.xls </b>\n\t\t\t\t\t\t\t\t\t\t\t<span class="col-sm-6 pull-right"> <a href="javascript:void(0);" class="btn btn-xs btn-default">cancel</a> <a href="javascript:void(0);" class="btn btn-xs btn-success">save</a> </span>\n\t\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t<p class="chat-file row">\n\t\t\t\t\t\t\t\t\t\t\t<b class="pull-left col-sm-6"> <i class="fa fa-ok txt-color-green"></i> tobacco-report-2012.doc </b>\n\t\t\t\t\t\t\t\t\t\t\t<span class="col-sm-6 pull-right"> <a href="javascript:void(0);" class="btn btn-xs btn-primary">open</a> </span>\n\t\t\t\t\t\t\t\t\t\t</p> </span>\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t<li class="message">\n\t\t\t\t\t\t\t\t\t<img src="img/avatars/sunny.png" class="online">\n\t\t\t\t\t\t\t\t\t<span class="message-text">\n\t\t\t\t\t\t\t\t\t\t<time>\n\t\t\t\t\t\t\t\t\t\t\t12:23pm\n\t\t\t\t\t\t\t\t\t\t</time> <a href="javascript:void(0);" class="username">John Doe</a> Haha! Yeah I know what you mean. Thanks for the file Sadi! <i class="fa fa-smile-o txt-color-orange"></i> </span>\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t</ul>\n\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<!-- CHAT FOOTER -->\n\t\t\t\t\t\t<div class="chat-footer">\n\n\t\t\t\t\t\t\t<!-- CHAT TEXTAREA -->\n\t\t\t\t\t\t\t<div class="textarea-div">\n\n\t\t\t\t\t\t\t\t<div class="typearea">\n\t\t\t\t\t\t\t\t\t<textarea placeholder="Write a reply..." id="textarea-expand" class="custom-scroll"></textarea>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<!-- CHAT REPLY/SEND -->\n\t\t\t\t\t\t\t<span class="textarea-controls">\n\t\t\t\t\t\t\t\t<button class="btn btn-sm btn-primary pull-right">\n\t\t\t\t\t\t\t\t\tReply\n\t\t\t\t\t\t\t\t</button> <span class="pull-right smart-form" style="margin-top: 3px; margin-right: 10px;"> <label class="checkbox pull-right">\n\t\t\t\t\t\t\t\t\t\t<input type="checkbox" name="subscription" id="subscription">\n\t\t\t\t\t\t\t\t\t\t<i></i>Press <strong> ENTER </strong> to send </label> </span> <a href="javascript:void(0);" class="pull-left"><i class="fa fa-camera fa-fw fa-lg"></i></a> </span>\n\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<!-- end content -->\n\t\t\t\t\t</div>\n\n\t\t\t\t</div>\n\t\t\t\t<!-- end widget div -->\n\t\t\t</div>\n\t\t\t<!-- end widget -->\n\n\t\t\t<!-- new widget -->\n\t\t\t<div class="jarviswidget jarviswidget-color-blueDark" id="wid-id-3" data-widget-colorbutton="false">\n\n\t\t\t\t<!-- widget options:\n\t\t\t\tusage: <div class="jarviswidget" id="wid-id-0" data-widget-editbutton="false">\n\n\t\t\t\tdata-widget-colorbutton="false"\n\t\t\t\tdata-widget-editbutton="false"\n\t\t\t\tdata-widget-togglebutton="false"\n\t\t\t\tdata-widget-deletebutton="false"\n\t\t\t\tdata-widget-fullscreenbutton="false"\n\t\t\t\tdata-widget-custombutton="false"\n\t\t\t\tdata-widget-collapsed="true"\n\t\t\t\tdata-widget-sortable="false"\n\n\t\t\t\t-->\n\t\t\t\t<header>\n\t\t\t\t\t<span class="widget-icon"> <i class="fa fa-calendar"></i> </span>\n\t\t\t\t\t<h2> My Events </h2>\n\t\t\t\t\t<div class="widget-toolbar">\n\t\t\t\t\t\t<!-- add: non-hidden - to disable auto hide -->\n\t\t\t\t\t\t<div class="btn-group">\n\t\t\t\t\t\t\t<button class="btn dropdown-toggle btn-xs btn-default" data-toggle="dropdown">\n\t\t\t\t\t\t\t\tShowing <i class="fa fa-caret-down"></i>\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t<ul class="dropdown-menu js-status-update pull-right">\n\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);" id="mt">Month</a>\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);" id="ag">Agenda</a>\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);" id="td">Today</a>\n\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</header>\n\n\t\t\t\t<!-- widget div-->\n\t\t\t\t<div>\n\t\t\t\t\t<!-- widget edit box -->\n\t\t\t\t\t<div class="jarviswidget-editbox">\n\n\t\t\t\t\t\t<input class="form-control" type="text">\n\n\t\t\t\t\t</div>\n\t\t\t\t\t<!-- end widget edit box -->\n\n\t\t\t\t\t<div class="widget-body no-padding">\n\t\t\t\t\t\t<!-- content goes here -->\n\t\t\t\t\t\t<div class="widget-body-toolbar">\n\n\t\t\t\t\t\t\t<div id="calendar-buttons">\n\n\t\t\t\t\t\t\t\t<div class="btn-group">\n\t\t\t\t\t\t\t\t\t<a href="javascript:void(0)" class="btn btn-default btn-xs" id="btn-prev"><i class="fa fa-chevron-left"></i></a>\n\t\t\t\t\t\t\t\t\t<a href="javascript:void(0)" class="btn btn-default btn-xs" id="btn-next"><i class="fa fa-chevron-right"></i></a>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div id="calendar"></div>\n\n\t\t\t\t\t\t<!-- end content -->\n\t\t\t\t\t</div>\n\n\t\t\t\t</div>\n\t\t\t\t<!-- end widget div -->\n\t\t\t</div>\n\t\t\t<!-- end widget -->\n\n\t\t</article>\n\n\t\t<article class="col-sm-12 col-md-12 col-lg-6">\n\n\t\t\t<!-- new widget -->\n\t\t\t<div class="jarviswidget" id="wid-id-2" data-widget-colorbutton="false" data-widget-editbutton="false">\n\n\t\t\t\t<!-- widget options:\n\t\t\t\tusage: <div class="jarviswidget" id="wid-id-0" data-widget-editbutton="false">\n\n\t\t\t\tdata-widget-colorbutton="false"\n\t\t\t\tdata-widget-editbutton="false"\n\t\t\t\tdata-widget-togglebutton="false"\n\t\t\t\tdata-widget-deletebutton="false"\n\t\t\t\tdata-widget-fullscreenbutton="false"\n\t\t\t\tdata-widget-custombutton="false"\n\t\t\t\tdata-widget-collapsed="true"\n\t\t\t\tdata-widget-sortable="false"\n\n\t\t\t\t-->\n\n\t\t\t\t<header>\n\t\t\t\t\t<span class="widget-icon"> <i class="fa fa-map-marker"></i> </span>\n\t\t\t\t\t<h2>Birds Eye</h2>\n\t\t\t\t\t<div class="widget-toolbar hidden-mobile">\n\t\t\t\t\t\t<span class="onoffswitch-title"><i class="fa fa-location-arrow"></i> Realtime</span>\n\t\t\t\t\t\t<span class="onoffswitch">\n\t\t\t\t\t\t\t<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" checked="checked" id="myonoffswitch">\n\t\t\t\t\t\t\t<label class="onoffswitch-label" for="myonoffswitch"> <div class="onoffswitch-inner" data-swchon-text="YES" data-swchoff-text="NO"></div> <div class="onoffswitch-switch"></div> </label> </span>\n\t\t\t\t\t</div>\n\t\t\t\t</header>\n\n\t\t\t\t<!-- widget div-->\n\t\t\t\t<div>\n\t\t\t\t\t<!-- widget edit box -->\n\t\t\t\t\t<div class="jarviswidget-editbox">\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<label>Title:</label>\n\t\t\t\t\t\t\t<input type="text" />\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<!-- end widget edit box -->\n\n\t\t\t\t\t<div class="widget-body no-padding">\n\t\t\t\t\t\t<!-- content goes here -->\n\n\t\t\t\t\t\t<div id="vector-map" class="vector-map"></div>\n\t\t\t\t\t\t<div id="heat-fill">\n\t\t\t\t\t\t\t<span class="fill-a">0</span>\n\n\t\t\t\t\t\t\t<span class="fill-b">5,000</span>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<table class="table table-striped table-hover table-condensed">\n\t\t\t\t\t\t\t<thead>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<th>Country</th>\n\t\t\t\t\t\t\t\t\t<th>Visits</th>\n\t\t\t\t\t\t\t\t\t<th class="text-align-center">User Activity</th>\n\t\t\t\t\t\t\t\t\t<th class="text-align-center">Online</th>\n\t\t\t\t\t\t\t\t\t<th class="text-align-center">Demographic</th>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t</thead>\n\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<td><a href="javascript:void(0);">USA</a></td>\n\t\t\t\t\t\t\t\t\t<td>4,977</td>\n\t\t\t\t\t\t\t\t\t<td class="text-align-center">\n\t\t\t\t\t\t\t\t\t<div class="sparkline txt-color-blue text-align-center" data-sparkline-height="22px" data-sparkline-width="90px" data-sparkline-barwidth="2">\n\t\t\t\t\t\t\t\t\t\t2700, 3631, 2471, 1300, 1877, 2500, 2577, 2700, 3631, 2471, 2000, 2100, 3000\n\t\t\t\t\t\t\t\t\t</div></td>\n\t\t\t\t\t\t\t\t\t<td class="text-align-center">143</td>\n\t\t\t\t\t\t\t\t\t<td class="text-align-center">\n\t\t\t\t\t\t\t\t\t<div class="sparkline display-inline" data-sparkline-type=\'pie\' data-sparkline-piecolor=\'["#E979BB", "#57889C"]\' data-sparkline-offset="90" data-sparkline-piesize="23px">\n\t\t\t\t\t\t\t\t\t\t17,83\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class="btn-group display-inline pull-right text-align-left hidden-tablet">\n\t\t\t\t\t\t\t\t\t\t<button class="btn btn-xs btn-default dropdown-toggle" data-toggle="dropdown">\n\t\t\t\t\t\t\t\t\t\t\t<i class="fa fa-cog fa-lg"></i>\n\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t\t<ul class="dropdown-menu dropdown-menu-xs pull-right">\n\t\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);"><i class="fa fa-file fa-lg fa-fw txt-color-greenLight"></i> <u>P</u>DF</a>\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);"><i class="fa fa-times fa-lg fa-fw txt-color-red"></i> <u>D</u>elete</a>\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t<li class="divider"></li>\n\t\t\t\t\t\t\t\t\t\t\t<li class="text-align-center">\n\t\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);">Cancel</a>\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t\t</div></td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<td><a href="javascript:void(0);">Australia</a></td>\n\t\t\t\t\t\t\t\t\t<td>4,873</td>\n\t\t\t\t\t\t\t\t\t<td class="text-align-center">\n\t\t\t\t\t\t\t\t\t<div class="sparkline txt-color-blue text-align-center" data-sparkline-height="22px" data-sparkline-width="90px" data-sparkline-barwidth="2">\n\t\t\t\t\t\t\t\t\t\t1000, 1100, 3030, 1300, -1877, -2500, -2577, -2700, 3631, 2471, 4700, 1631, 2471\n\t\t\t\t\t\t\t\t\t</div></td>\n\t\t\t\t\t\t\t\t\t<td class="text-align-center">247</td>\n\t\t\t\t\t\t\t\t\t<td class="text-align-center">\n\t\t\t\t\t\t\t\t\t<div class="sparkline display-inline" data-sparkline-type=\'pie\' data-sparkline-piecolor=\'["#E979BB", "#57889C"]\' data-sparkline-offset="90" data-sparkline-piesize="23px">\n\t\t\t\t\t\t\t\t\t\t22,88\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class="btn-group display-inline pull-right text-align-left hidden-tablet">\n\t\t\t\t\t\t\t\t\t\t<button class="btn btn-xs btn-default dropdown-toggle" data-toggle="dropdown">\n\t\t\t\t\t\t\t\t\t\t\t<i class="fa fa-cog fa-lg"></i>\n\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t\t<ul class="dropdown-menu dropdown-menu-xs pull-right">\n\t\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);"><i class="fa fa-file fa-lg fa-fw txt-color-greenLight"></i> <u>P</u>DF</a>\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);"><i class="fa fa-times fa-lg fa-fw txt-color-red"></i> <u>D</u>elete</a>\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t<li class="divider"></li>\n\t\t\t\t\t\t\t\t\t\t\t<li class="text-align-center">\n\t\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);">Cancel</a>\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t\t</div></td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<td><a href="javascript:void(0);">India</a></td>\n\t\t\t\t\t\t\t\t\t<td>3,671</td>\n\t\t\t\t\t\t\t\t\t<td class="text-align-center">\n\t\t\t\t\t\t\t\t\t<div class="sparkline txt-color-blue text-align-center" data-sparkline-height="22px" data-sparkline-width="90px" data-sparkline-barwidth="2">\n\t\t\t\t\t\t\t\t\t\t3631, 1471, 2400, 3631, 471, 1300, 1177, 2500, 2577, 3000, 4100, 3000, 7700\n\t\t\t\t\t\t\t\t\t</div></td>\n\t\t\t\t\t\t\t\t\t<td class="text-align-center">373</td>\n\t\t\t\t\t\t\t\t\t<td class="text-align-center">\n\t\t\t\t\t\t\t\t\t<div class="sparkline display-inline" data-sparkline-type=\'pie\' data-sparkline-piecolor=\'["#E979BB", "#57889C"]\' data-sparkline-offset="90" data-sparkline-piesize="23px">\n\t\t\t\t\t\t\t\t\t\t10,90\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class="btn-group display-inline pull-right text-align-left hidden-tablet">\n\t\t\t\t\t\t\t\t\t\t<button class="btn btn-xs btn-default dropdown-toggle" data-toggle="dropdown">\n\t\t\t\t\t\t\t\t\t\t\t<i class="fa fa-cog fa-lg"></i>\n\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t\t<ul class="dropdown-menu dropdown-menu-xs pull-right">\n\t\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);"><i class="fa fa-file fa-lg fa-fw txt-color-greenLight"></i> <u>P</u>DF</a>\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);"><i class="fa fa-times fa-lg fa-fw txt-color-red"></i> <u>D</u>elete</a>\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t<li class="divider"></li>\n\t\t\t\t\t\t\t\t\t\t\t<li class="text-align-center">\n\t\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);">Cancel</a>\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t\t</div></td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<td><a href="javascript:void(0);">Brazil</a></td>\n\t\t\t\t\t\t\t\t\t<td>2,476</td>\n\t\t\t\t\t\t\t\t\t<td class="text-align-center">\n\t\t\t\t\t\t\t\t\t<div class="sparkline txt-color-blue text-align-center" data-sparkline-height="22px" data-sparkline-width="90px" data-sparkline-barwidth="2">\n\t\t\t\t\t\t\t\t\t\t2700, 1877, 2500, 2577, 2000, 3631, 2471, -2700, -3631, 2471, 1300, 2100, 3000,\n\t\t\t\t\t\t\t\t\t</div></td>\n\t\t\t\t\t\t\t\t\t<td class="text-align-center">741</td>\n\t\t\t\t\t\t\t\t\t<td class="text-align-center">\n\t\t\t\t\t\t\t\t\t<div class="sparkline display-inline" data-sparkline-type=\'pie\' data-sparkline-piecolor=\'["#E979BB", "#57889C"]\' data-sparkline-offset="90" data-sparkline-piesize="23px">\n\t\t\t\t\t\t\t\t\t\t34,66\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class="btn-group display-inline pull-right text-align-left hidden-tablet">\n\t\t\t\t\t\t\t\t\t\t<button class="btn btn-xs btn-default dropdown-toggle" data-toggle="dropdown">\n\t\t\t\t\t\t\t\t\t\t\t<i class="fa fa-cog fa-lg"></i>\n\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t\t<ul class="dropdown-menu dropdown-menu-xs pull-right">\n\t\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);"><i class="fa fa-file fa-lg fa-fw txt-color-greenLight"></i> <u>P</u>DF</a>\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);"><i class="fa fa-times fa-lg fa-fw txt-color-red"></i> <u>D</u>elete</a>\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t<li class="divider"></li>\n\t\t\t\t\t\t\t\t\t\t\t<li class="text-align-center">\n\t\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);">Cancel</a>\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t\t</div></td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<td><a href="javascript:void(0);">Turkey</a></td>\n\t\t\t\t\t\t\t\t\t<td>1,476</td>\n\t\t\t\t\t\t\t\t\t<td class="text-align-center">\n\t\t\t\t\t\t\t\t\t<div class="sparkline txt-color-blue text-align-center" data-sparkline-height="22px" data-sparkline-width="90px" data-sparkline-barwidth="2">\n\t\t\t\t\t\t\t\t\t\t1300, 1877, 2500, 2577, 2000, 2100, 3000, -2471, -2700, -3631, -2471, 2700, 3631\n\t\t\t\t\t\t\t\t\t</div></td>\n\t\t\t\t\t\t\t\t\t<td class="text-align-center">123</td>\n\t\t\t\t\t\t\t\t\t<td class="text-align-center">\n\t\t\t\t\t\t\t\t\t<div class="sparkline display-inline" data-sparkline-type=\'pie\' data-sparkline-piecolor=\'["#E979BB", "#57889C"]\' data-sparkline-offset="90" data-sparkline-piesize="23px">\n\t\t\t\t\t\t\t\t\t\t75,25\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class="btn-group display-inline pull-right text-align-left hidden-tablet">\n\t\t\t\t\t\t\t\t\t\t<button class="btn btn-xs btn-default dropdown-toggle" data-toggle="dropdown">\n\t\t\t\t\t\t\t\t\t\t\t<i class="fa fa-cog fa-lg"></i>\n\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t\t<ul class="dropdown-menu dropdown-menu-xs pull-right">\n\t\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);"><i class="fa fa-file fa-lg fa-fw txt-color-greenLight"></i> <u>P</u>DF</a>\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);"><i class="fa fa-times fa-lg fa-fw txt-color-red"></i> <u>D</u>elete</a>\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t<li class="divider"></li>\n\t\t\t\t\t\t\t\t\t\t\t<li class="text-align-center">\n\t\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);">Cancel</a>\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t\t</div></td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<td><a href="javascript:void(0);">Canada</a></td>\n\t\t\t\t\t\t\t\t\t<td>146</td>\n\t\t\t\t\t\t\t\t\t<td class="text-align-center">\n\t\t\t\t\t\t\t\t\t<div class="sparkline txt-color-orange text-align-center" data-sparkline-height="22px" data-sparkline-width="90px" data-sparkline-barwidth="2">\n\t\t\t\t\t\t\t\t\t\t5, 34, 10, 1, 4, 6, -9, -1, 0, 0, 5, 6, 7\n\t\t\t\t\t\t\t\t\t</div></td>\n\t\t\t\t\t\t\t\t\t<td class="text-align-center">23</td>\n\t\t\t\t\t\t\t\t\t<td class="text-align-center">\n\t\t\t\t\t\t\t\t\t<div class="sparkline display-inline" data-sparkline-type=\'pie\' data-sparkline-piecolor=\'["#E979BB", "#57889C"]\' data-sparkline-offset="90" data-sparkline-piesize="23px">\n\t\t\t\t\t\t\t\t\t\t50,50\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<div class="btn-group display-inline pull-right text-align-left hidden-tablet">\n\t\t\t\t\t\t\t\t\t\t<button class="btn btn-xs btn-default dropdown-toggle" data-toggle="dropdown">\n\t\t\t\t\t\t\t\t\t\t\t<i class="fa fa-cog fa-lg"></i>\n\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t\t<ul class="dropdown-menu dropdown-menu-xs pull-right">\n\t\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);"><i class="fa fa-file fa-lg fa-fw txt-color-greenLight"></i> <u>P</u>DF</a>\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);"><i class="fa fa-times fa-lg fa-fw txt-color-red"></i> <u>D</u>elete</a>\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t<li class="divider"></li>\n\t\t\t\t\t\t\t\t\t\t\t<li class="text-align-center">\n\t\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);">Cancel</a>\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t\t</div></td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t\t<tfoot>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<td colspan=5>\n\t\t\t\t\t\t\t\t\t<ul class="pagination pagination-xs no-margin">\n\t\t\t\t\t\t\t\t\t\t<li class="prev disabled">\n\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);">Previous</a>\n\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t<li class="active">\n\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);">1</a>\n\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);">2</a>\n\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);">3</a>\n\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t<li class="next">\n\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);">Next</a>\n\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t</ul></td>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t</tfoot>\n\t\t\t\t\t\t</table>\n\n\t\t\t\t\t\t<!-- end content -->\n\n\t\t\t\t\t</div>\n\n\t\t\t\t</div>\n\t\t\t\t<!-- end widget div -->\n\t\t\t</div>\n\t\t\t<!-- end widget -->\n\n\t\t\t<!-- new widget -->\n\t\t\t<div class="jarviswidget jarviswidget-color-blue" id="wid-id-4" data-widget-editbutton="false" data-widget-colorbutton="false">\n\n\t\t\t\t<!-- widget options:\n\t\t\t\tusage: <div class="jarviswidget" id="wid-id-0" data-widget-editbutton="false">\n\n\t\t\t\tdata-widget-colorbutton="false"\n\t\t\t\tdata-widget-editbutton="false"\n\t\t\t\tdata-widget-togglebutton="false"\n\t\t\t\tdata-widget-deletebutton="false"\n\t\t\t\tdata-widget-fullscreenbutton="false"\n\t\t\t\tdata-widget-custombutton="false"\n\t\t\t\tdata-widget-collapsed="true"\n\t\t\t\tdata-widget-sortable="false"\n\n\t\t\t\t-->\n\n\t\t\t\t<header>\n\t\t\t\t\t<span class="widget-icon"> <i class="fa fa-check txt-color-white"></i> </span>\n\t\t\t\t\t<h2> ToDo\'s </h2>\n\t\t\t\t\t<!-- <div class="widget-toolbar">\n\t\t\t\t\tadd: non-hidden - to disable auto hide\n\n\t\t\t\t\t</div>-->\n\t\t\t\t</header>\n\n\t\t\t\t<!-- widget div-->\n\t\t\t\t<div>\n\t\t\t\t\t<!-- widget edit box -->\n\t\t\t\t\t<div class="jarviswidget-editbox">\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<label>Title:</label>\n\t\t\t\t\t\t\t<input type="text" />\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<!-- end widget edit box -->\n\n\t\t\t\t\t<div class="widget-body no-padding smart-form">\n\t\t\t\t\t\t<!-- content goes here -->\n\t\t\t\t\t\t<h5 class="todo-group-title"><i class="fa fa-warning"></i> Critical Tasks (<small class="num-of-tasks">1</small>)</h5>\n\t\t\t\t\t\t<ul id="sortable1" class="todo">\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<span class="handle"> <label class="checkbox">\n\t\t\t\t\t\t\t\t\t\t<input type="checkbox" name="checkbox-inline">\n\t\t\t\t\t\t\t\t\t\t<i></i> </label> </span>\n\t\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t\t<strong>Ticket #17643</strong> - Hotfix for WebApp interface issue [<a href="javascript:void(0);" class="font-xs">More Details</a>] <span class="text-muted">Sea deep blessed bearing under darkness from God air living isn\'t. </span>\n\t\t\t\t\t\t\t\t\t<span class="date">Jan 1, 2014</span>\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t<h5 class="todo-group-title"><i class="fa fa-exclamation"></i> Important Tasks (<small class="num-of-tasks">3</small>)</h5>\n\t\t\t\t\t\t<ul id="sortable2" class="todo">\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<span class="handle"> <label class="checkbox">\n\t\t\t\t\t\t\t\t\t\t<input type="checkbox" name="checkbox-inline">\n\t\t\t\t\t\t\t\t\t\t<i></i> </label> </span>\n\t\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t\t<strong>Ticket #1347</strong> - Inbox email is being sent twice <small>(bug fix)</small> [<a href="javascript:void(0);" class="font-xs">More Details</a>] <span class="date">Nov 22, 2013</span>\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<span class="handle"> <label class="checkbox">\n\t\t\t\t\t\t\t\t\t\t<input type="checkbox" name="checkbox-inline">\n\t\t\t\t\t\t\t\t\t\t<i></i> </label> </span>\n\t\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t\t<strong>Ticket #1314</strong> - Call customer support re: Issue <a href="javascript:void(0);" class="font-xs">#6134</a><small>(code review)</small>\n\t\t\t\t\t\t\t\t\t<span class="date">Nov 22, 2013</span>\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<span class="handle"> <label class="checkbox">\n\t\t\t\t\t\t\t\t\t\t<input type="checkbox" name="checkbox-inline">\n\t\t\t\t\t\t\t\t\t\t<i></i> </label> </span>\n\t\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t\t<strong>Ticket #17643</strong> - Hotfix for WebApp interface issue [<a href="javascript:void(0);" class="font-xs">More Details</a>] <span class="text-muted">Sea deep blessed bearing under darkness from God air living isn\'t. </span>\n\t\t\t\t\t\t\t\t\t<span class="date">Jan 1, 2014</span>\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ul>\n\n\t\t\t\t\t\t<h5 class="todo-group-title"><i class="fa fa-check"></i> Completed Tasks (<small class="num-of-tasks">1</small>)</h5>\n\t\t\t\t\t\t<ul id="sortable3" class="todo">\n\t\t\t\t\t\t\t<li class="complete">\n\t\t\t\t\t\t\t\t<span class="handle" style="display:none"> <label class="checkbox state-disabled">\n\t\t\t\t\t\t\t\t\t\t<input type="checkbox" name="checkbox-inline" checked="checked" disabled="disabled">\n\t\t\t\t\t\t\t\t\t\t<i></i> </label> </span>\n\t\t\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\t\t\t<strong>Ticket #17643</strong> - Hotfix for WebApp interface issue [<a href="javascript:void(0);" class="font-xs">More Details</a>] <span class="text-muted">Sea deep blessed bearing under darkness from God air living isn\'t. </span>\n\t\t\t\t\t\t\t\t\t<span class="date">Jan 1, 2014</span>\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ul>\n\n\t\t\t\t\t\t<!-- end content -->\n\t\t\t\t\t</div>\n\n\t\t\t\t</div>\n\t\t\t\t<!-- end widget div -->\n\t\t\t</div>\n\t\t\t<!-- end widget -->\n\n\t\t</article>\n\n\t</div>\n\n\t<!-- end row -->\n\n</section>\n<!-- end widget grid -->\n\n<script type="text/javascript">\n\t// DO NOT REMOVE : GLOBAL FUNCTIONS!\n\tpageSetUp();\n\n\t/*\n\t * PAGE RELATED SCRIPTS\n\t */\n\n\t$(".js-status-update a").click(function() {\n\t\tvar selText = $(this).text();\n\t\t$this = $(this);\n\t\t$this.parents(\'.btn-group\').find(\'.dropdown-toggle\').html(selText + \' <span class="caret"></span>\');\n\t\t$this.parents(\'.dropdown-menu\').find(\'li\').removeClass(\'active\');\n\t\t$this.parent().addClass(\'active\');\n\t});\n\n\t/*\n\t* TODOs\n\t* TODO: add a way to add more todo\'s to list\n\t*/\n\n\t// initialize sortable\n\t$(function() {\n\t\t$("#sortable1, #sortable2").sortable({\n\t\t\thandle : \'.handle\',\n\t\t\tconnectWith : ".todo",\n\t\t\tupdate : countTasks\n\t\t}).disableSelection();\n\t});\n\n\t// check and uncheck\n\t$(\'.todo .checkbox > input[type="checkbox"]\').click(function() {\n\t\t$this = $(this).parent().parent().parent();\n\n\t\tif ($(this).prop(\'checked\')) {\n\t\t\t$this.addClass("complete");\n\n\t\t\t// remove this if you want to undo a check list once checked\n\t\t\t//$(this).attr("disabled", true);\n\t\t\t$(this).parent().hide();\n\n\t\t\t// once clicked - add class, copy to memory then remove and add to sortable3\n\t\t\t$this.slideUp(500, function() {\n\t\t\t\t$this.clone().prependTo("#sortable3").effect("highlight", {}, 800);\n\t\t\t\t$this.remove();\n\t\t\t\tcountTasks();\n\t\t\t});\n\t\t} else {\n\t\t\t// insert undo code here...\n\t\t}\n\n\t})\n\t// count tasks\n\tfunction countTasks() {\n\n\t\t$(\'.todo-group-title\').each(function() {\n\t\t\t$this = $(this);\n\t\t\t$this.find(".num-of-tasks").text($this.next().find("li").size());\n\t\t});\n\n\t}\n\n\t/*\n\t* RUN PAGE GRAPHS\n\t*/\n\n\t// Load FLOAT dependencies (related to page)\n\tloadScript("js/plugin/flot/jquery.flot.cust.js", loadFlotResize);\n\n\tfunction loadFlotResize() {\n\t\tloadScript("js/plugin/flot/jquery.flot.resize.js", loadFlotToolTip);\n\t}\n\n\tfunction loadFlotToolTip() {\n\t\tloadScript("js/plugin/flot/jquery.flot.tooltip.js", generatePageGraphs);\n\t}\n\n\tfunction generatePageGraphs() {\n\n\t\t/* TAB 1: UPDATING CHART */\n\t\t// For the demo we use generated data, but normally it would be coming from the server\n\n\t\tvar data = [], totalPoints = 200, $UpdatingChartColors = $("#updating-chart").css(\'color\');\n\t\tfunction getRandomData() {\n\t\t\tif (data.length > 0)\n\t\t\t\tdata = data.slice(1);\n\n\t\t\t// do a random walk\n\t\t\twhile (data.length < totalPoints) {\n\t\t\t\tvar prev = data.length > 0 ? data[data.length - 1] : 50;\n\t\t\t\tvar y = prev + Math.random() * 10 - 5;\n\t\t\t\tif (y < 0)\n\t\t\t\t\ty = 0;\n\t\t\t\tif (y > 100)\n\t\t\t\t\ty = 100;\n\t\t\t\tdata.push(y);\n\t\t\t}\n\n\t\t\t// zip the generated y values with the x values\n\t\t\tvar res = [];\n\t\t\tfor (var i = 0; i < data.length; ++i)\n\t\t\t\tres.push([i, data[i]])\n\t\t\treturn res;\n\t\t}\n\n\t\t// setup control widget\n\t\tvar updateInterval = 1500;\n\t\t$("#updating-chart").val(updateInterval).change(function() {\n\n\t\t\tvar v = $(this).val();\n\t\t\tif (v && !isNaN(+v)) {\n\t\t\t\tupdateInterval = +v;\n\t\t\t\t$(this).val("" + updateInterval);\n\t\t\t}\n\n\t\t});\n\n\t\t// setup plot\n\t\tvar options = {\n\t\t\tyaxis : {\n\t\t\t\tmin : 0,\n\t\t\t\tmax : 100\n\t\t\t},\n\t\t\txaxis : {\n\t\t\t\tmin : 0,\n\t\t\t\tmax : 100\n\t\t\t},\n\t\t\tcolors : [$UpdatingChartColors],\n\t\t\tseries : {\n\t\t\t\tlines : {\n\t\t\t\t\tlineWidth : 1,\n\t\t\t\t\tfill : true,\n\t\t\t\t\tfillColor : {\n\t\t\t\t\t\tcolors : [{\n\t\t\t\t\t\t\topacity : 0.4\n\t\t\t\t\t\t}, {\n\t\t\t\t\t\t\topacity : 0\n\t\t\t\t\t\t}]\n\t\t\t\t\t},\n\t\t\t\t\tsteps : false\n\n\t\t\t\t}\n\t\t\t}\n\t\t};\n\n\t\tvar plot = $.plot($("#updating-chart"), [getRandomData()], options);\n\n\t\t/* live switch */\n\t\t$(\'input[type="checkbox"]#start_interval\').click(function() {\n\t\t\tif ($(this).prop(\'checked\')) {\n\t\t\t\t$on = true;\n\t\t\t\tvar updateInterval = 1500;\n\t\t\t\tupdate();\n\t\t\t} else {\n\t\t\t\tclearInterval(updateInterval);\n\t\t\t\t$on = false;\n\t\t\t}\n\t\t});\n\n\t\tfunction update() {\n\t\t\tif ($on == true) {\n\t\t\t\tplot.setData([getRandomData()]);\n\t\t\t\tplot.draw();\n\t\t\t\tsetTimeout(update, updateInterval);\n\n\t\t\t} else {\n\t\t\t\tclearInterval(updateInterval)\n\t\t\t}\n\n\t\t}\n\n\t\tvar $on = false;\n\n\t\t/*end updating chart*/\n\n\t\t/* TAB 2: Social Network  */\n\n\t\t$(function() {\n\t\t\t// jQuery Flot Chart\n\t\t\tvar twitter = [[1, 27], [2, 34], [3, 51], [4, 48], [5, 55], [6, 65], [7, 61], [8, 70], [9, 65], [10, 75], [11, 57], [12, 59], [13, 62]], facebook = [[1, 25], [2, 31], [3, 45], [4, 37], [5, 38], [6, 40], [7, 47], [8, 55], [9, 43], [10, 50], [11, 47], [12, 39], [13, 47]], data = [{\n\t\t\t\tlabel : "Twitter",\n\t\t\t\tdata : twitter,\n\t\t\t\tlines : {\n\t\t\t\t\tshow : true,\n\t\t\t\t\tlineWidth : 1,\n\t\t\t\t\tfill : true,\n\t\t\t\t\tfillColor : {\n\t\t\t\t\t\tcolors : [{\n\t\t\t\t\t\t\topacity : 0.1\n\t\t\t\t\t\t}, {\n\t\t\t\t\t\t\topacity : 0.13\n\t\t\t\t\t\t}]\n\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\tpoints : {\n\t\t\t\t\tshow : true\n\t\t\t\t}\n\t\t\t}, {\n\t\t\t\tlabel : "Facebook",\n\t\t\t\tdata : facebook,\n\t\t\t\tlines : {\n\t\t\t\t\tshow : true,\n\t\t\t\t\tlineWidth : 1,\n\t\t\t\t\tfill : true,\n\t\t\t\t\tfillColor : {\n\t\t\t\t\t\tcolors : [{\n\t\t\t\t\t\t\topacity : 0.1\n\t\t\t\t\t\t}, {\n\t\t\t\t\t\t\topacity : 0.13\n\t\t\t\t\t\t}]\n\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\tpoints : {\n\t\t\t\t\tshow : true\n\t\t\t\t}\n\t\t\t}];\n\n\t\t\tvar options = {\n\t\t\t\tgrid : {\n\t\t\t\t\thoverable : true\n\t\t\t\t},\n\t\t\t\tcolors : ["#568A89", "#3276B1"],\n\t\t\t\ttooltip : true,\n\t\t\t\ttooltipOpts : {\n\t\t\t\t\t//content : "Value <b>$x</b> Value <span>$y</span>",\n\t\t\t\t\tdefaultTheme : false\n\t\t\t\t},\n\t\t\t\txaxis : {\n\t\t\t\t\tticks : [[1, "JAN"], [2, "FEB"], [3, "MAR"], [4, "APR"], [5, "MAY"], [6, "JUN"], [7, "JUL"], [8, "AUG"], [9, "SEP"], [10, "OCT"], [11, "NOV"], [12, "DEC"], [13, "JAN+1"]]\n\t\t\t\t},\n\t\t\t\tyaxes : {\n\n\t\t\t\t}\n\t\t\t};\n\n\t\t\tvar plot3 = $.plot($("#statsChart"), data, options);\n\t\t});\n\n\t\t// END TAB 2\n\n\t\t// TAB THREE GRAPH //\n\t\t/* TAB 3: Revenew  */\n\n\t\t$(function() {\n\n\t\t\tvar trgt = [[1354586000000, 153], [1364587000000, 658], [1374588000000, 198], [1384589000000, 663], [1394590000000, 801], [1404591000000, 1080], [1414592000000, 353], [1424593000000, 749], [1434594000000, 523], [1444595000000, 258], [1454596000000, 688], [1464597000000, 364]], prft = [[1354586000000, 53], [1364587000000, 65], [1374588000000, 98], [1384589000000, 83], [1394590000000, 980], [1404591000000, 808], [1414592000000, 720], [1424593000000, 674], [1434594000000, 23], [1444595000000, 79], [1454596000000, 88], [1464597000000, 36]], sgnups = [[1354586000000, 647], [1364587000000, 435], [1374588000000, 784], [1384589000000, 346], [1394590000000, 487], [1404591000000, 463], [1414592000000, 479], [1424593000000, 236], [1434594000000, 843], [1444595000000, 657], [1454596000000, 241], [1464597000000, 341]], toggles = $("#rev-toggles"), target = $("#flotcontainer");\n\n\t\t\tvar data = [{\n\t\t\t\tlabel : "Target Profit",\n\t\t\t\tdata : trgt,\n\t\t\t\tbars : {\n\t\t\t\t\tshow : true,\n\t\t\t\t\talign : "center",\n\t\t\t\t\tbarWidth : 30 * 30 * 60 * 1000 * 80\n\t\t\t\t}\n\t\t\t}, {\n\t\t\t\tlabel : "Actual Profit",\n\t\t\t\tdata : prft,\n\t\t\t\tcolor : \'#3276B1\',\n\t\t\t\tlines : {\n\t\t\t\t\tshow : true,\n\t\t\t\t\tlineWidth : 3\n\t\t\t\t},\n\t\t\t\tpoints : {\n\t\t\t\t\tshow : true\n\t\t\t\t}\n\t\t\t}, {\n\t\t\t\tlabel : "Actual Signups",\n\t\t\t\tdata : sgnups,\n\t\t\t\tcolor : \'#71843F\',\n\t\t\t\tlines : {\n\t\t\t\t\tshow : true,\n\t\t\t\t\tlineWidth : 1\n\t\t\t\t},\n\t\t\t\tpoints : {\n\t\t\t\t\tshow : true\n\t\t\t\t}\n\t\t\t}]\n\n\t\t\tvar options = {\n\t\t\t\tgrid : {\n\t\t\t\t\thoverable : true\n\t\t\t\t},\n\t\t\t\ttooltip : true,\n\t\t\t\ttooltipOpts : {\n\t\t\t\t\t//content: \'%x - %y\',\n\t\t\t\t\t//dateFormat: \'%b %y\',\n\t\t\t\t\tdefaultTheme : false\n\t\t\t\t},\n\t\t\t\txaxis : {\n\t\t\t\t\tmode : "time"\n\t\t\t\t},\n\t\t\t\tyaxes : {\n\t\t\t\t\ttickFormatter : function(val, axis) {\n\t\t\t\t\t\treturn "$" + val;\n\t\t\t\t\t},\n\t\t\t\t\tmax : 1200\n\t\t\t\t}\n\n\t\t\t};\n\n\t\t\tplot2 = null;\n\n\t\t\tfunction plotNow() {\n\t\t\t\tvar d = [];\n\t\t\t\ttoggles.find(\':checkbox\').each(function() {\n\t\t\t\t\tif ($(this).is(\':checked\')) {\n\t\t\t\t\t\td.push(data[$(this).attr("name").substr(4, 1)]);\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t\tif (d.length > 0) {\n\t\t\t\t\tif (plot2) {\n\t\t\t\t\t\tplot2.setData(d);\n\t\t\t\t\t\tplot2.draw();\n\t\t\t\t\t} else {\n\t\t\t\t\t\tplot2 = $.plot(target, d, options);\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t};\n\n\t\t\ttoggles.find(\':checkbox\').on(\'change\', function() {\n\t\t\t\tplotNow();\n\t\t\t});\n\t\t\tplotNow()\n\n\t\t});\n\n\t}\n\n\t/*\n\t * VECTOR MAP\n\t */\n\n\tdata_array = {\n\t\t"US" : 4977,\n\t\t"AU" : 4873,\n\t\t"IN" : 3671,\n\t\t"BR" : 2476,\n\t\t"TR" : 1476,\n\t\t"CN" : 146,\n\t\t"CA" : 134,\n\t\t"BD" : 100\n\t};\n\n\t\n\t/*\n\t * FULL CALENDAR JS\n\t */\t\n\n\tif ($("#calendar").length) {\n\t\tvar date = new Date();\n\t\tvar d = date.getDate();\n\t\tvar m = date.getMonth();\n\t\tvar y = date.getFullYear();\n\n\t\tvar calendar = $(\'#calendar\').fullCalendar({\n\n\t\t\teditable : true,\n\t\t\tdraggable : true,\n\t\t\tselectable : false,\n\t\t\tselectHelper : true,\n\t\t\tunselectAuto : false,\n\t\t\tdisableResizing : false,\n\n\t\t\theader : {\n\t\t\t\tleft : \'title\', //,today\n\t\t\t\tcenter : \'prev, next, today\',\n\t\t\t\tright : \'month, agendaWeek, agenDay\' //month, agendaDay,\n\t\t\t},\n\n\t\t\tselect : function(start, end, allDay) {\n\t\t\t\tvar title = prompt(\'Event Title:\');\n\t\t\t\tif (title) {\n\t\t\t\t\tcalendar.fullCalendar(\'renderEvent\', {\n\t\t\t\t\t\ttitle : title,\n\t\t\t\t\t\tstart : start,\n\t\t\t\t\t\tend : end,\n\t\t\t\t\t\tallDay : allDay\n\t\t\t\t\t}, true // make the event "stick"\n\t\t\t\t\t);\n\t\t\t\t}\n\t\t\t\tcalendar.fullCalendar(\'unselect\');\n\t\t\t},\n\n\t\t\tevents : [{\n\t\t\t\ttitle : \'All Day Event\',\n\t\t\t\tstart : new Date(y, m, 1),\n\t\t\t\tdescription : \'long description\',\n\t\t\t\tclassName : ["event", "bg-color-greenLight"],\n\t\t\t\ticon : \'fa-check\'\n\t\t\t}, {\n\t\t\t\ttitle : \'Long Event\',\n\t\t\t\tstart : new Date(y, m, d - 5),\n\t\t\t\tend : new Date(y, m, d - 2),\n\t\t\t\tclassName : ["event", "bg-color-red"],\n\t\t\t\ticon : \'fa-lock\'\n\t\t\t}, {\n\t\t\t\tid : 999,\n\t\t\t\ttitle : \'Repeating Event\',\n\t\t\t\tstart : new Date(y, m, d - 3, 16, 0),\n\t\t\t\tallDay : false,\n\t\t\t\tclassName : ["event", "bg-color-blue"],\n\t\t\t\ticon : \'fa-clock-o\'\n\t\t\t}, {\n\t\t\t\tid : 999,\n\t\t\t\ttitle : \'Repeating Event\',\n\t\t\t\tstart : new Date(y, m, d + 4, 16, 0),\n\t\t\t\tallDay : false,\n\t\t\t\tclassName : ["event", "bg-color-blue"],\n\t\t\t\ticon : \'fa-clock-o\'\n\t\t\t}, {\n\t\t\t\ttitle : \'Meeting\',\n\t\t\t\tstart : new Date(y, m, d, 10, 30),\n\t\t\t\tallDay : false,\n\t\t\t\tclassName : ["event", "bg-color-darken"]\n\t\t\t}, {\n\t\t\t\ttitle : \'Lunch\',\n\t\t\t\tstart : new Date(y, m, d, 12, 0),\n\t\t\t\tend : new Date(y, m, d, 14, 0),\n\t\t\t\tallDay : false,\n\t\t\t\tclassName : ["event", "bg-color-darken"]\n\t\t\t}, {\n\t\t\t\ttitle : \'Birthday Party\',\n\t\t\t\tstart : new Date(y, m, d + 1, 19, 0),\n\t\t\t\tend : new Date(y, m, d + 1, 22, 30),\n\t\t\t\tallDay : false,\n\t\t\t\tclassName : ["event", "bg-color-darken"]\n\t\t\t}, {\n\t\t\t\ttitle : \'Smartadmin Open Day\',\n\t\t\t\tstart : new Date(y, m, 28),\n\t\t\t\tend : new Date(y, m, 29),\n\t\t\t\tclassName : ["event", "bg-color-darken"]\n\t\t\t}],\n\n\t\t\teventRender : function(event, element, icon) {\n\t\t\t\tif (!event.description == "") {\n\t\t\t\t\telement.find(\'.fc-event-title\').append("<br/><span class=\'ultra-light\'>" + event.description + "</span>");\n\t\t\t\t}\n\t\t\t\tif (!event.icon == "") {\n\t\t\t\t\telement.find(\'.fc-event-title\').append("<i class=\'air air-top-right fa " + event.icon + " \'></i>");\n\t\t\t\t}\n\t\t\t}\n\t\t});\n\n\t};\n\n\t/* hide default buttons */\n\t$(\'.fc-header-right, .fc-header-center\').hide();\n\n\t\n\n\n\t$(\'#calendar-buttons #btn-prev\').click(function() {\n\t\t$(\'.fc-button-prev\').click();\n\t\treturn false;\n\t});\n\n\t$(\'#calendar-buttons #btn-next\').click(function() {\n\t\t$(\'.fc-button-next\').click();\n\t\treturn false;\n\t});\n\n\t$(\'#calendar-buttons #btn-today\').click(function() {\n\t\t$(\'.fc-button-today\').click();\n\t\treturn false;\n\t});\n\n\t$(\'#mt\').click(function() {\n\t\t$(\'#calendar\').fullCalendar(\'changeView\', \'month\');\n\t});\n\n\t$(\'#ag\').click(function() {\n\t\t$(\'#calendar\').fullCalendar(\'changeView\', \'agendaWeek\');\n\t});\n\n\t$(\'#td\').click(function() {\n\t\t$(\'#calendar\').fullCalendar(\'changeView\', \'agendaDay\');\n\t});\n\n\t/*\n\t * CHAT\n\t */\n\n\t$.filter_input = $(\'#filter-chat-list\');\n\t$.chat_users_container = $(\'#chat-container > .chat-list-body\')\n\t$.chat_users = $(\'#chat-users\')\n\t$.chat_list_btn = $(\'#chat-container > .chat-list-open-close\');\n\t$.chat_body = $(\'#chat-body\');\n\n\t/*\n\t * LIST FILTER\n\t */\n\n\t( function($) {\n\t\t\t// custom css expression for a case-insensitive contains()\n\t\t\tjQuery.expr[\':\'].Contains = function(a, i, m) {\n\t\t\t\treturn (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0;\n\t\t\t};\n\n\t\t\tfunction listFilter(list) {// header is any element, list is an unordered list\n\t\t\t\t// create and add the filter form to the header\n\n\t\t\t\t$.filter_input.change(function() {\n\t\t\t\t\tvar filter = $(this).val();\n\t\t\t\t\tif (filter) {\n\t\t\t\t\t\t// this finds all links in a list that contain the input,\n\t\t\t\t\t\t// and hide the ones not containing the input while showing the ones that do\n\t\t\t\t\t\t$.chat_users.find("a:not(:Contains(" + filter + "))").parent().slideUp();\n\t\t\t\t\t\t$.chat_users.find("a:Contains(" + filter + ")").parent().slideDown();\n\t\t\t\t\t} else {\n\t\t\t\t\t\t$.chat_users.find("li").slideDown();\n\t\t\t\t\t}\n\t\t\t\t\treturn false;\n\t\t\t\t}).keyup(function() {\n\t\t\t\t\t// fire the above change event after every letter\n\t\t\t\t\t$(this).change();\n\n\t\t\t\t});\n\n\t\t\t}\n\n\t\t\t//ondomready\n\t\t\t$(function() {\n\t\t\t\tlistFilter($.chat_users);\n\t\t\t});\n\n\t\t}(jQuery));\n\n\t$.chat_list_btn.click(function() {\n\t\t$(this).parent(\'#chat-container\').toggleClass(\'open\');\n\t})\n\n\t$.chat_body.animate({\n\t\tscrollTop : $.chat_body[0].scrollHeight\n\t}, 500);\n\n</script>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}
});

;require.register("templates/medication/medication_list_item_template", function(exports, require, module) {
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
      __out.push('<div class="dd-handle">\n\t');
    
      __out.push(__sanitize(this.name));
    
      __out.push('\n\t<a class="remove label label-danger pull-right padding-5 js-delete-medication" href="#"  data-id="');
    
      __out.push(__sanitize(this.id));
    
      __out.push('">\n\t\t<i class="glyphicon glyphicon-remove"></i> remove\n\t</a>\t\t\t\t\t\n</div>');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}
});

;require.register("templates/medication/medication_list_template", function(exports, require, module) {
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
      __out.push('<ol class="dd-list js-medication-ol">\n\t\t\t\t\t\t\t\t\t\t\t\n</ol>');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}
});

;require.register("templates/medication/medication_search_template", function(exports, require, module) {
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
      __out.push('<div class="row">\n\t<div class="col-sm-12">\n\t\t<div class="form-group">\n\t\t\t<div class="input-group margin-bottom-sm">\n\t\t\t\t<div class="inline-group">\n\t\t\t\t\t<div class="bbf-editor">\n\t\t\t\t\t\t<input class="form-control input-lg js-search-terms" autocomplete="off" placeholder="Search for medication" type="text" name="medication" id="m2_medication" value="');
    
      __out.push(__sanitize(this.name));
    
      __out.push('">\t\t\t\t\t\t\t\t\n\t\t\t\t\t</div>\t\t\t\t\t\t\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}
});

;require.register("templates/medication/medications_template", function(exports, require, module) {
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
      __out.push('<div class="modal-dialog">\n\t<div class="modal-content">\n\t\t<div class="modal-header class="smart-form client-form"">\n\t\t\t<button type="button" class="close" data-dismiss="modal" aria-hidden="true">\n\t\t\t\t&times;\n\t\t\t</button>\n\t\t\t<header>\n\t\t\t\t<h2>Add Medication</h2>\t\t\t\t\t\t\t\t\t\n\t\t\t</header>\t\t\t\t\n\t\t</div>\n\t\t<div class="modal-body">\n\t\t\t<div class="row">\t\t\t\t\n\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t<form id="searchmedication" novalidate="novalidate">\n\t\t\t\t\t\t<div id="search_medication_container"></div>\t\n\t\t\t\t\t\t<div class="panel-body no-padding">            \n\t\t\t\t\t\t\t<strong>');
    
      __out.push(__sanitize(this.name));
    
      __out.push('</strong> \n\t\t\t\t\t\t\t<input type="hidden" name="medsynonyms" id="m2_synonyms" value="');
    
      __out.push(__sanitize(this.synonyms));
    
      __out.push('">\n\t\t\t\t\t\t\t<input type="hidden" name="medconceptId" id="m2_conceptId" value="');
    
      __out.push(__sanitize(this.conceptId));
    
      __out.push('">\t\t\t\t\t\n\t\t\t\t\t    </div> \n\t\t\t\t\t</form>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\t\t\t\t\n\n\t\t<div class="modal-footer">\t\t\t\t\n\t\t\t<button type="button" class="btn btn-primary" data-dismiss="modal">\n\t\t\t\tCancel\n\t\t\t</button>\n\t\t\t<button type="submit" class="btn btn-primary js-save-btn">\n\t\t\t\t<i class="fa fa-save"></i>\n\t\t\t\tSave\n\t\t\t</button>\n\t\t</div>\t\t\t\n\t</div>\n</div>\t');
    
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
      __out.push('<div class="modal-dialog">\n\t<div class="modal-content">\n\t\t<div class="modal-header class="smart-form client-form"">\n\t\t\t<button type="button" class="close" data-dismiss="modal" aria-hidden="true">\n\t\t\t\t&times;\n\t\t\t</button>\n\t\t\t<header>\n\t\t\t\t<h2>Patient Registration form </h2>\t\t\t\t\t\t\t\t\t\n\t\t\t</header>\t\t\t\t\n\t\t</div>\n\t\t<div class="modal-body">\n\t\t\t<form id="newpatient" novalidate="novalidate">\n\t\t\t\t<div class="row">\n\t\t\t\t\t<div class="col-sm-12">\n\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t<div class="input-group margin-bottom-sm">\n\t\t\t\t\t\t\t\t<label class="control-label"><h4>Salutation</h4></label>\n\t\t\t\t\t\t\t\t<div class="inline-group">\n\t\t\t\t\t\t\t\t\t<label class="radio  radio-inline">\n\t\t\t\t\t\t\t\t\t\t<input type="radio" name="salutation" value="Mr." id="optionsMr" checked>\n\t\t\t\t\t\t\t\t\t\t<i></i>Mr.</label>\n\t\t\t\t\t\t\t\t\t<label class="radio radio-inline">\n\t\t\t\t\t\t\t\t\t\t<input type="radio" name="salutation" value="Mrs." id="optionsMrs">\n\t\t\t\t\t\t\t\t\t\t<i></i>Mrs.</label>\t\n\t\t\t\t\t\t\t\t\t<label class="radio radio-inline">\n\t\t\t\t\t\t\t\t\t\t<input type="radio" name="salutation" value="Miss" id="optionsMiss">\n\t\t\t\t\t\t\t\t\t\t<i></i>Miss</label>\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<label class="radio radio-inline">\n\t\t\t\t\t\t\t\t\t\t<input type="radio" name="salutation" value="Ms." id="optionsMs">\n\t\t\t\t\t\t\t\t\t\t<i></i>Ms.</label>\t\n\t\t\t\t\t\t\t\t\t<label class="radio radio-inline">\n\t\t\t\t\t\t\t\t\t\t<input type="radio" name="salutation" id="optionsDr" value="Dr.">\n\t\t\t\t\t\t\t\t\t\t<i></i>Dr.</label>\n\t\t\t\t\t\t\t\t\t<label class="radio radio-inline">\n\t\t\t\t\t\t\t\t\t\t<input type="radio" name="salutation" id="optionsProf" value="Prof">\n\t\t\t\t\t\t\t\t\t\t<i></i>Prof.</label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class="row">\n\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t\t\t<span class="input-group-addon"><i class="fa fa-user fa-lg fa-fw"></i></span>\n\t\t\t\t\t\t\t\t<input class="form-control input-lg" placeholder="First Name" type="text" name="fname" id="fname">\n\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t\n\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t\t\t<span class="input-group-addon"><i class="fa fa-user fa-lg fa-fw"></i></span>\n\t\t\t\t\t\t\t\t<input class="form-control input-lg" placeholder="Last Name" type="text" name="lname" id="lname">\n\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t\n\t\t\t\t<div class="row">\n\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t\t\t<span class="input-group-addon"><i class="fa fa-user fa-lg fa-fw"></i></span>\n\t\t\t\t\t\t\t\t<select class="form-control input-lg" id="relationshipStatus" name="relationshipStatus">\n\t\t\t\t\t\t\t\t\t<option value="None" selected="selected">Marital Status</option>\n\t\t\t\t\t\t\t\t\t<option value="Married">Married</option>\n\t\t\t\t\t\t\t\t\t<option value="Single">Single</option>\n\t\t\t\t\t\t\t\t\t<option value="Divorced">Divorced</option>\n\t\t\t\t\t\t\t\t\t<option value="Common Law">Common Law</option>\n\t\t\t\t\t\t\t\t\t<option value="Separated">Separated</option>\n\t\t\t\t\t\t\t\t\t<option value="Widowed">Widowed</option>\n\t\t\t\t\t\t\t\t</select>\t\t\t\t\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t\t\t<span class="input-group-addon"><i class="fa fa-calendar fa-lg fa-fw"></i></span>\n\t\t\t\t\t\t\t\t<input type="text" name="dob" placeholder="Date Of Birth" class="form-control input-lg clsDatePicker" id="dob" data-dateformat="dd/mm/yy">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class="row">\n\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t\t\t<span class="input-group-addon"><i class="fa fa-user fa-lg fa-fw"></i></span>\n\t\t\t\t\t\t\t\t<select class="form-control input-lg" id="gender" name="gender">\n\t\t\t\t\t\t\t\t\t<option value="" selected="selected">Gender</option>\n\t\t\t\t\t\t\t\t\t<option value="M">Male</option>\n\t\t\t\t\t\t\t\t\t<option value="F">Female</option>\n\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class="row">\n\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t\t\t<span class="input-group-addon"><i class="fa fa-mobile fa-lg fa-fw"></i></span>\n\t\t\t\t\t\t\t\t<input class="form-control input-lg" data-mask="9999 999-999" data-mask-placeholder= "X" placeholder="Phone" type="text" name="phone" id="phone">\t\t\t\t\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t\t\t<span class="input-group-addon"><i class="fa fa-envelope fa-lg fa-fw"></i></span>\n\t\t\t\t\t\t\t\t<input class="form-control input-lg" placeholder="email@address.com" type="text" name="email" id="email">\n\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t\n\t\t\t\t<div class="row">\n\t\t\t\t\t<div class="col-sm-12">\n\t\t\t\t\t\t<h4>Address </h4>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="row">\n\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t\t\t<span class="input-group-addon"><i class="fa fa-building fa-lg fa-fw"></i></span>\n\t\t\t\t\t\t\t\t<input class="form-control input-lg" placeholder="Building Name/House Number" type="text" name="building" id="building">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t\t\t<span class="input-group-addon"><i class="fa fa-envelope-o fa-lg fa-fw"></i></span>\n\t\t\t\t\t\t\t\t<input class="form-control input-lg" placeholder="Street Name" type="text" name="street" id="street">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t\t</div>\n\t\t\t\t<div class="row">\n\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t\t\t<span class="input-group-addon"><i class="fa fa-map-marker fa-lg fa-fw"></i></span>\n\t\t\t\t\t\t\t\t<input class="form-control input-lg" placeholder="Area Locality" type="text" name="locality" id="locality">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t\t\t<span class="input-group-addon"><i class="fa fa-map-marker fa-lg fa-fw"></i></span>\n\t\t\t\t\t\t\t\t<select class="form-control input-lg" name="city" id="city">\n\t\t\t\t\t\t\t\t\t<option value="" selected="selected">Select City/Town</option>\n\t\t\t\t\t\t\t\t\t<option value="Harare">Harare</option>\n\t\t\t\t\t\t\t\t\t<option value="Bulawayo">Bulawayo</option>\n\t\t\t\t\t\t\t\t\t<option value="Chitungwiza">Chitungwiza</option>\n\t\t\t\t\t\t\t\t\t<option value="Gweru">Gweru</option>\n\t\t\t\t\t\t\t\t\t<option value="Mutare">Mutare</option>\n\t\t\t\t\t\t\t\t\t<option value="Chegutu">Chegutu</option>\n\t\t\t\t\t\t\t\t\t<option value="Chinhoyi">Chinhoyi</option>\n\t\t\t\t\t\t\t\t\t<option value="Bindura">Bindura</option>\n\t\t\t\t\t\t\t\t\t<option value="Mt. Darwin">Mt. Darwin</option>\n\t\t\t\t\t\t\t\t\t<option value="Kariba">Kariba</option>\n\t\t\t\t\t\t\t\t\t<option value="Chipinge">Chipinge</option>\n\t\t\t\t\t\t\t\t\t<option value="Rusape">Rusape</option>\n\t\t\t\t\t\t\t\t\t<option value="Marondera">Marondera</option>\n\t\t\t\t\t\t\t\t\t<option value="Kwekwe">Kwekwe</option>\n\t\t\t\t\t\t\t\t\t<option value="Kadoma">Kadoma</option>\n\t\t\t\t\t\t\t\t\t<option value="Gwanda">Gwanda</option>\n\t\t\t\t\t\t\t\t\t<option value="Triangle">Triangle</option>\n\t\t\t\t\t\t\t\t\t<option value="Beitbridge">Beitbridge</option>\n\t\t\t\t\t\t\t\t\t<option value="Masvingo">Masvingo</option>\n\t\t\t\t\t\t\t\t\t<option value="Zvishavane">Zvishavane</option>\n\t\t\t\t\t\t\t\t\t<option value="Hwange">Hwange</option>\n\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t\t</div>\n\n\t\t\t\t<div class="row">\n\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t\t\t<span class="input-group-addon"><i class="fa fa-map-marker fa-lg fa-fw"></i></span>\n\t\t\t\t\t\t\t\t<select class="form-control input-lg" name="province" id="province">\n\t\t\t\t\t\t\t\t\t<option value="" selected="selected">Select Province</option>\n\t\t\t\t\t\t\t\t\t<option value="Bulawayo">Bulawayo</option>\n\t\t\t\t\t\t\t\t\t<option value="Harare">Harare</option>\n\t\t\t\t\t\t\t\t\t<option value="Manicaland">Manicaland</option>\n\t\t\t\t\t\t\t\t\t<option value="Mashonaland Central">Mashonaland Central</option>\n\t\t\t\t\t\t\t\t\t<option value="Mashonaland East">Mashonaland East</option>\n\t\t\t\t\t\t\t\t\t<option value="Mashonaland West">Mashonaland West</option>\n\t\t\t\t\t\t\t\t\t<option value="Masvingo">Masvingo</option>\n\t\t\t\t\t\t\t\t\t<option value="Matabeleland North">Matabeleland North</option>\n\t\t\t\t\t\t\t\t\t<option value="Matabeleland South">Matabeleland South</option>\n\t\t\t\t\t\t\t\t\t<option value="Midlands">Midlands</option>\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t\t\t<span class="input-group-addon"><i class="fa fa-map-marker fa-lg fa-fw"></i></span>\n\t\t\t\t\t\t\t\t<select class="form-control input-lg" name="addressType" id="addressType">\n\t\t\t\t\t\t\t\t\t<option value="" selected="selected">Address Type</option>\n\t\t\t\t\t\t\t\t\t<option value="Residential">Residential</option>\n\t\t\t\t\t\t\t\t\t<option value="Industrial">Industrial</option>\n\t\t\t\t\t\t\t\t\t<option value="Commercial">Commercial</option>\n\t\t\t\t\t\t\t\t\t<option value="Military">Military</option>\n\t\t\t\t\t\t\t\t\t<option value="Agricultural">Agricultural</option>\n\t\t\t\t\t\t\t\t\t<option value="Educational">Educational</option>\n\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</form>\t\t\t\t\t\n\n\t\t<div class="modal-footer">\t\t\t\t\n\t\t\t<button type="button" class="btn btn-primary" data-dismiss="modal">\n\t\t\t\tCancel\n\t\t\t</button>\n\t\t\t<button type="submit" class="btn btn-primary js-save-btn">\n\t\t\t\t<i class="fa fa-save"></i>\n\t\t\t\tSave Changes\n\t\t\t</button>\n\t\t</div>\t\t\t\n\t</div>\n</div>\t');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}
});

;require.register("templates/patient_edit_template", function(exports, require, module) {
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
      __out.push('<div class="modal-dialog">\n\t\t<div class="modal-content">\n\t\t\t<div class="modal-header class="smart-form client-form"">\n\t\t\t\t<button type="button" class="close" data-dismiss="modal" aria-hidden="true">\n\t\t\t\t\t&times;\n\t\t\t\t</button>\n\t\t\t\t<header>\n\t\t\t\t\t<h2>Edit Patient Details </h2>\t\t\t\t\t\t\t\t\t\n\t\t\t\t</header>\t\t\t\t\n\t\t\t</div>\n\t\t\t<div class="modal-body">\n\t\t\t\t<form id="newpatient" novalidate="novalidate">\n\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t<div class="col-sm-12">\n\t\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t\t<div class="input-group margin-bottom-sm">\n\t\t\t\t\t\t\t\t\t<label class="control-label"><h4>Salutation</h4></label>\n\t\t\t\t\t\t\t\t\t<div class="inline-group">\n\t\t\t\t\t\t\t\t\t\t<label class="radio  radio-inline">\n\t\t\t\t\t\t\t\t\t\t\t<input type="radio" name="salutation" value="Mr." id="optionsMr" checked>\n\t\t\t\t\t\t\t\t\t\t\t<i></i>Mr.</label>\n\t\t\t\t\t\t\t\t\t\t<label class="radio radio-inline">\n\t\t\t\t\t\t\t\t\t\t\t<input type="radio" name="salutation" value="Mrs." id="optionsMrs">\n\t\t\t\t\t\t\t\t\t\t\t<i></i>Mrs.</label>\t\n\t\t\t\t\t\t\t\t\t\t<label class="radio radio-inline">\n\t\t\t\t\t\t\t\t\t\t\t<input type="radio" name="salutation" value="Miss" id="optionsMiss">\n\t\t\t\t\t\t\t\t\t\t\t<i></i>Miss</label>\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<label class="radio radio-inline">\n\t\t\t\t\t\t\t\t\t\t\t<input type="radio" name="salutation" value="Ms." id="optionsMs">\n\t\t\t\t\t\t\t\t\t\t\t<i></i>Ms.</label>\t\n\t\t\t\t\t\t\t\t\t\t<label class="radio radio-inline">\n\t\t\t\t\t\t\t\t\t\t\t<input type="radio" name="salutation" id="optionsDr" value="Dr.">\n\t\t\t\t\t\t\t\t\t\t\t<i></i>Dr.</label>\n\t\t\t\t\t\t\t\t\t\t<label class="radio radio-inline">\n\t\t\t\t\t\t\t\t\t\t\t<input type="radio" name="salutation" id="optionsProf" value="Prof">\n\t\t\t\t\t\t\t\t\t\t\t<i></i>Prof.</label>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t\t\t\t<span class="input-group-addon"><i class="fa fa-user fa-lg fa-fw"></i></span>\n\t\t\t\t\t\t\t\t\t<input class="form-control input-lg" value="');
    
      __out.push(__sanitize(this.firstName));
    
      __out.push('" type="text" name="fname" id="fname">\n\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\n\t\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t\t\t\t<span class="input-group-addon"><i class="fa fa-user fa-lg fa-fw"></i></span>\n\t\t\t\t\t\t\t\t\t<input class="form-control input-lg" value="');
    
      __out.push(__sanitize(this.lastName));
    
      __out.push('" type="text" name="lname" id="lname">\n\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t\n\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t\t\t\t<span class="input-group-addon"><i class="fa fa-user fa-lg fa-fw"></i></span>\n\t\t\t\t\t\t\t\t\t<select class="form-control input-lg" id="relationshipStatus" name="relationshipStatus">\n\t\t\t\t\t\t\t\t\t\t<option value="" selected="selected">Marital Status</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Married">Married</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Single">Single</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Divorced">Divorced</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Common Law">Common Law</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Separated">Separated</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Widowed">Widowed</option>\n\t\t\t\t\t\t\t\t\t</select>\t\t\t\t\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\n\t\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t\t\t\t<span class="input-group-addon"><i class="fa fa-calendar fa-lg fa-fw"></i></span>\n\t\t\t\t\t\t\t\t\t<input type="text" name="dob" value="');
    
      __out.push(__sanitize(this.dob));
    
      __out.push('" class="form-control input-lg" id="dob" data-dateformat="dd/mm/yy">\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t\t\t\t<span class="input-group-addon"><i class="fa fa-user fa-lg fa-fw"></i></span>\n\t\t\t\t\t\t\t\t\t<select class="form-control input-lg" id="gender" name="gender">\n\t\t\t\t\t\t\t\t\t\t<option value="" selected="selected">Gender</option>\n\t\t\t\t\t\t\t\t\t\t<option value="M">Male</option>\n\t\t\t\t\t\t\t\t\t\t<option value="F">Female</option>\n\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t\t\t\t<span class="input-group-addon"><i class="fa fa-mobile fa-lg fa-fw"></i></span>\n\t\t\t\t\t\t\t\t\t<input class="form-control input-lg" value="');
    
      __out.push(__sanitize(this.phone));
    
      __out.push('" type="text" name="phone" id="phone">\t\t\t\t\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t\t\t\t<span class="input-group-addon"><i class="fa fa-envelope fa-lg fa-fw"></i></span>\n\t\t\t\t\t\t\t\t\t<input class="form-control input-lg" value="');
    
      __out.push(__sanitize(this.email));
    
      __out.push('" type="text" name="email" id="email">\n\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t\n\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t<div class="col-sm-12">\n\t\t\t\t\t\t\t<h4>Address </h4>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t\t\t\t<span class="input-group-addon"><i class="fa fa-building fa-lg fa-fw"></i></span>\n\t\t\t\t\t\t\t\t\t<input class="form-control input-lg" value="');
    
      __out.push(__sanitize(this.address.split(',')[0]));
    
      __out.push('" type="text" name="building" id="building">\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t\t\t\t<span class="input-group-addon"><i class="fa fa-envelope-o fa-lg fa-fw"></i></span>\n\t\t\t\t\t\t\t\t\t<input class="form-control input-lg" value="');
    
      __out.push(__sanitize(this.address.split(',')[1]));
    
      __out.push('" type="text" name="street" id="street">\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t\t\t\t<span class="input-group-addon"><i class="fa fa-map-marker fa-lg fa-fw"></i></span>\n\t\t\t\t\t\t\t\t\t<input class="form-control input-lg" value="');
    
      __out.push(__sanitize(this.address.split(',')[2]));
    
      __out.push('" type="text" name="locality" id="locality">\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t\t\t\t<span class="input-group-addon"><i class="fa fa-map-marker fa-lg fa-fw"></i></span>\n\t\t\t\t\t\t\t\t\t<select class="form-control input-lg" name="city" id="city">\n\t\t\t\t\t\t\t\t\t\t<option value="" selected="selected">Select City/Town</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Harare">Harare</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Bulawayo">Bulawayo</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Chitungwiza">Chitungwiza</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Gweru">Gweru</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Mutare">Mutare</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Chegutu">Chegutu</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Chinhoyi">Chinhoyi</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Bindura">Bindura</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Mt. Darwin">Mt. Darwin</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Kariba">Kariba</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Chipinge">Chipinge</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Rusape">Rusape</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Marondera">Marondera</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Kwekwe">Kwekwe</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Kadoma">Kadoma</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Gwanda">Gwanda</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Triangle">Triangle</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Beitbridge">Beitbridge</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Masvingo">Masvingo</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Zvishavane">Zvishavane</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Hwange">Hwange</option>\n\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t\t\t\t<span class="input-group-addon"><i class="fa fa-map-marker fa-lg fa-fw"></i></span>\n\t\t\t\t\t\t\t\t\t<select class="form-control input-lg" name="province" id="province">\n\t\t\t\t\t\t\t\t\t\t<option value="" selected="selected">Select Province</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Bulawayo">Bulawayo</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Harare">Harare</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Manicaland">Manicaland</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Mashonaland Central">Mashonaland Central</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Mashonaland East">Mashonaland East</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Mashonaland West">Mashonaland West</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Masvingo">Masvingo</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Matabeleland North">Matabeleland North</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Matabeleland South">Matabeleland South</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Midlands">Midlands</option>\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t\t\t\t<span class="input-group-addon"><i class="fa fa-map-marker fa-lg fa-fw"></i></span>\n\t\t\t\t\t\t\t\t\t<select class="form-control input-lg" name="addressType" id="addressType">\n\t\t\t\t\t\t\t\t\t\t<option value="" selected="selected">Address Type</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Residential">Residential</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Industrial">Industrial</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Commercial">Commercial</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Military">Military</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Agricultural">Agricultural</option>\n\t\t\t\t\t\t\t\t\t\t<option value="Educational">Educational</option>\n\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</form>\t\t\t\t\t\n\n\t\t\t<div class="modal-footer">\t\t\t\t\n\t\t\t\t<button type="button" class="btn btn-primary" data-dismiss="modal">\n\t\t\t\t\tCancel\n\t\t\t\t</button>\n\t\t\t\t<button type="submit" class="btn btn-primary js-save-btn">\n\t\t\t\t\t<i class="fa fa-save"></i>\n\t\t\t\t\tSave Changes\n\t\t\t\t</button>\n\t\t\t</div>\t\t\t\n\t\t</div>\n\t</div>\t');
    
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
      __out.push('<td>\n    <img src="img/avatars/');
    
      __out.push(__sanitize(this.gender.toLowerCase()));
    
      __out.push('.png" class="img-square avatar hidden-phone" />\n    <a href="#view/patients/');
    
      __out.push(__sanitize(this.id));
    
      __out.push('" class="name">');
    
      __out.push(__sanitize(this.firstName));
    
      __out.push(' ');
    
      __out.push(__sanitize(this.lastName));
    
      __out.push('</a>\n    <span class="subtext">Registered: ');
    
      __out.push(__sanitize(this.dateRegistered));
    
      __out.push('</span>\n</td>\n<td>');
    
      __out.push(__sanitize(this.age));
    
      __out.push('</td>\n<td>');
    
      __out.push(__sanitize(this.address));
    
      __out.push('</td>\n<td>\n    <i class="fa fa-mobile"></i>\n    <span>');
    
      __out.push(__sanitize(this.phone));
    
      __out.push('</span>\n</td>\n<td class="align-right">\n    <a href="mailto:');
    
      __out.push(__sanitize(this.email));
    
      __out.push('">');
    
      __out.push(__sanitize(this.email));
    
      __out.push('</a>\n</td>\n<td class="align-center ">\n    <a href="#view/patients/');
    
      __out.push(__sanitize(this.id));
    
      __out.push('" rel="tooltip" title="View">\n        <i class="fa fa-user"></i> \n    </a>&nbsp;&nbsp;&nbsp;\n\t<a href="#" rel="tooltip" class="js-edit" title="Edit">\n\t   <i class="fa fa-pencil"></i>\n    </a>&nbsp;&nbsp;&nbsp;\n\t<a href="#" rel="tooltip" class="smart-mod-del" title="Delete">\n\t   <i class="fa fa-trash-o"></i>\n\t</a>&nbsp;&nbsp;&nbsp;\n</td>');
    
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
      __out.push('\t\t<div class="container-fluid">\n            <div id="pad-wrapper" class="users-list">\n                <div class="row-fluid header">\n                    <div class="collapse navbar-collapse bg-color-white">\n                        <ul class="nav navbar-nav">                            \n                            <li class="dropdown">\n                                <a class="dropdown-toggle" data-toggle="dropdown" href="#"> Filter patients by <b class="caret"></b> </a>\n                                <ul class="dropdown-menu">\n                                    <li>\n                                        <a href="#?filter=adults">Adults (>18)</a>\n                                    </li>\n                                    <li>\n                                        <a href="#?filter=children">Children </a>\n                                    </li>\n                                    <li>\n                                        <a href="#?filter=removed">Removed</a>\n                                    </li>\n                                    <li>\n                                        <a href="#?filter=recent">Recently added</a>\n                                    </li>                                    \n                                </ul>\n                            </li>\n                        </ul>\n                        <div class="patient-search"></div>\n                        <ul class="nav navbar-nav navbar-right">\n                            <li>\n                                <a href="#create" class="btn btn-primary" title="+ Add new patient">\n                                    <span>\n                                        <i class="fa fa-plus"></i>\n                                    </span>                            \n                                </a>\n                            </li>                            \n                        </ul>            \n                    </div>\n\n                    <h2><strong>My Patients</strong></h2>                   \n                </div>\n\n                <!-- Patients table -->\n                <div class="row-fluid table">\n                    <table class="table table-hover">\n                        <thead>\n                            <tr>\n                                <th class="span4 sortable">\n                                    Name\n                                </th>\n                                <th class="span3 sortable">\n                                    <span class="line"></span>Age\n                                </th>\n                                <th class="span2 sortable">\n                                    <span class="line"></span>Address\n                                </th>\n                                 <th class="span3 sortable">\n                                    <span class="line"></span>Phone\n                                </th>\n                                <th class="span3 sortable align-right">\n                                    <span class="line"></span>Email\n                                </th>\n                                <th class="span3 sortable align-right">\n                                \t<span class="line"></span>Actions\n                                </th>  \n                            </tr>\n                        </thead>\n                        <tbody class="patient-grid">\n                            <p class="no-results" style="display:none;">No Results</p>\n                        </tbody>\n                    </table>\n                </div>\n                <!-- Load More "Link" -->  \n\t            <div class="load-more text-center">\n                    <a href="#" class="btn btn-sm btn-default js-patients-loadmore">\n                        <i class="fa fa-arrow-down text-muted"></i> LOAD MORE\n                    </a>\n\t                <!-- <a href="#" class="js-patients-loadmore">\n\t                    <button class="btn btn-primary btn-lg btn-block" type="button" id="loader">\n\t\t\t\t\t\t\tLoad More\n\t\t\t\t\t\t</button>\n\t                </a> -->\t                \n\t            </div>                  \n                <!-- end users table -->\n            </div>\n        </div>');
    
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
      var _ref;
    
      __out.push('<!-- Bread crumb is created dynamically -->\n<!-- row -->\n<div class="row">\n\n\t<!-- col -->\n\t<div class="col-xs-12 col-sm-7 col-md-7 col-lg-4">\n\t\t<h1 class="page-title txt-color-blueDark"><!-- PAGE HEADER --><i class="fa-fw fa fa-file-o"></i> <a href="#view/patients">My Patients</a> <span>>\n\t\t\tView Patient </span></h1>\n\t</div>\n\t<!-- end col -->\n\n\t<!-- right side of the page with the sparkline graphs -->\n\t<!-- col -->\n\t<div class="col-xs-12 col-sm-5 col-md-5 col-lg-8">\n\t\t<!-- sparks -->\n\t\t<ul id="sparks">\n\t\t\t<li class="sparks-info">\n\t\t\t\t<h5> Surgery Income <span class="txt-color-blue">$47,171</span></h5>\n\t\t\t\t<div class="sparkline txt-color-blue hidden-mobile hidden-md hidden-sm">\n\t\t\t\t\t1300, 1877, 2500, 2577, 2000, 2100, 3000, 2700, 3631, 2471, 2700, 3631, 2471\n\t\t\t\t</div>\n\t\t\t</li>\n\t\t\t<li class="sparks-info">\n\t\t\t\t<h5> Patient Visits <span class="txt-color-purple"><i class="fa fa-arrow-circle-up" data-rel="bootstrap-tooltip" title="Increased"></i>&nbsp;45%</span></h5>\n\t\t\t\t<div class="sparkline txt-color-purple hidden-mobile hidden-md hidden-sm">\n\t\t\t\t\t110,150,300,130,400,240,220,310,220,300, 270, 210\n\t\t\t\t</div>\n\t\t\t</li>\n\t\t\t<li class="sparks-info">\n\t\t\t\t<h5> Test <span class="txt-color-greenDark"><i class="fa fa-shopping-cart"></i>&nbsp;2447</span></h5>\n\t\t\t\t<div class="sparkline txt-color-greenDark hidden-mobile hidden-md hidden-sm">\n\t\t\t\t\t110,150,300,130,400,240,220,310,220,300, 270, 210\n\t\t\t\t</div>\n\t\t\t</li>\n\t\t</ul>\n\t\t<!-- end sparks -->\n\t</div>\n\t<!-- end col -->\n\n</div>\n<!-- end row -->\n\n<!-- row -->\n\n<div class="row">\n\n\t<div class="col-sm-12">\n\n\n\t\t\t<div class="well well-sm">\n\n\t\t\t\t<div class="row">\n\n\t\t\t\t\t<div class="col-sm-12 col-md-12 col-lg-6">\n\t\t\t\t\t\t<div class="well well-light well-sm no-margin no-padding">\n\n\t\t\t\t\t\t\t<div class="row">\n\n\t\t\t\t\t\t\t\t<div class="col-sm-12">\n\t\t\t\t\t\t\t\t\t<div id="myCarousel" class="carousel fade profile-carousel">\n\t\t\t\t\t\t\t\t\t\t<div class="air air-bottom-right padding-10">\n\t\t\t\t\t\t\t\t\t\t\t<a href="#" class="btn txt-color-white btn-primary btn-sm js-edit"><i class="fa fa-pencil"></i> Edit Details</a>&nbsp; <a href="#" class="btn txt-color-white bg-color-red btn-sm js-delete"><i class="fa fa-trash-o"></i> Delete</a>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class="air air-top-left padding-10">\n\t\t\t\t\t\t\t\t\t\t\t<h4 class="txt-color-white font-md">Last visit - Jan 1, 2014</h4>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<ol class="carousel-indicators">\n\t\t\t\t\t\t\t\t\t\t\t<li data-target="#myCarousel" data-slide-to="0" class="active"></li>\n\t\t\t\t\t\t\t\t\t\t\t<li data-target="#myCarousel" data-slide-to="1" class=""></li>\n\t\t\t\t\t\t\t\t\t\t\t<li data-target="#myCarousel" data-slide-to="2" class=""></li>\n\t\t\t\t\t\t\t\t\t\t</ol>\n\t\t\t\t\t\t\t\t\t\t<div class="carousel-inner">\n\t\t\t\t\t\t\t\t\t\t\t<!-- Slide 1 -->\n\t\t\t\t\t\t\t\t\t\t\t<div class="item active">\n\t\t\t\t\t\t\t\t\t\t\t\t<img src="img/demo/s1.jpg" alt="">\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t<!-- Slide 2 -->\n\t\t\t\t\t\t\t\t\t\t\t<div class="item">\n\t\t\t\t\t\t\t\t\t\t\t\t<img src="img/demo/s2.jpg" alt="">\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t<!-- Slide 3 -->\n\t\t\t\t\t\t\t\t\t\t\t<div class="item">\n\t\t\t\t\t\t\t\t\t\t\t\t<img src="img/demo/m3.jpg" alt="">\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t<div class="col-sm-12">\n\n\t\t\t\t\t\t\t\t\t<div class="row">\n\n\t\t\t\t\t\t\t\t\t\t<div class="col-sm-3 profile-pic">\n\t\t\t\t\t\t\t\t\t\t\t<img src=\'img/avatars/');
    
      __out.push(__sanitize(this.gender.toLowerCase()));
    
      __out.push('-big.png\'>\n\t\t\t\t\t\t\t\t\t\t\t<div class="padding-10">\n\t\t\t\t\t\t\t\t\t\t\t\t<h4 class="font-md">Age: <strong>');
    
      __out.push(__sanitize(this.age));
    
      __out.push('</strong>\n\t\t\t\t\t\t\t\t\t\t\t\t<small>year');
    
      if (this.age > 1) {
        __out.push('s');
      }
    
      __out.push(' old</small></h4>\n\t\t\t\t\t\t\t\t\t\t\t\t<br>\n\t\t\t\t\t\t\t\t\t\t\t\t<h4 class="font-md">Gender: <strong>');
    
      __out.push(__sanitize(this.gender));
    
      __out.push('</strong></h4>\n\t\t\t\t\t\t\t\t\t\t\t\t<br>\n\t\t\t\t\t\t\t\t\t\t\t\t<h4 class="font-md">Relationship Status: <strong>');
    
      __out.push(__sanitize(this.relationshipStatus));
    
      __out.push('</strong></h4>\t\n\t\t\t\t\t\t\t\t\t\t\t\t<br>\n\t\t\t\t\t\t\t\t\t\t\t\t');
    
      if ((_ref = this.vitals) != null ? _ref.length : void 0) {
        __out.push('\n\t\t\t\t\t\t\t\t\t\t\t\t\t<h4 class="font-md">Weight: <strong>');
        __out.push(__sanitize(this.vitals[0].weight));
        __out.push(' kg</strong></h4>\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t<br>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<h4 class="font-md">Height: <strong>');
        __out.push(__sanitize(this.vitals[0].height));
        __out.push(' m</strong>\t</h4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<br>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<h4 class="font-md">Blood Pressure: <strong>');
        __out.push(__sanitize(this.vitals[0].diastolicBp));
        __out.push('/');
        __out.push(__sanitize(this.vitals[0].systolicBp));
        __out.push(' mmHg</strong></h4>\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t<br>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<h4 class="font-md">Blood Glucose: <strong>');
        __out.push(__sanitize(this.vitals[0].bloodGlucose));
        __out.push('</strong></h4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<br>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<h4 class="font-md">Temperature: <strong>');
        __out.push(__sanitize(this.vitals[0].bodyTemperature));
        __out.push(' &deg;C</strong></h4>\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t<br>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<h4 class="font-md">Pulse: <strong>');
        __out.push(__sanitize(this.vitals[0].pulse));
        __out.push('</strong>\t</h4>\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t');
      }
    
      __out.push('\t\n\t\t\t\t\t\t\t\t\t\t\t\t<br>\n\t\t\t\t\t\t\t\t\t\t\t\t<a href="#" class="js-add-vitals"><i class="fa fa-lg fa-fw fa-user-md fa-2x"></i>  <span class="menu-item-parent">Add vitals</span></a>\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t\t\t\t\t\t<h1>');
    
      __out.push(__sanitize(this.firstName));
    
      __out.push(' <span class="semi-bold">');
    
      __out.push(__sanitize(this.lastName));
    
      __out.push('</span>\n\t\t\t\t\t\t\t\t\t\t\t<br><small>Patient since: <strong>');
    
      __out.push(__sanitize(this.dateRegistered));
    
      __out.push('</strong></small>\n\t\t\t\t\t\t\t\t\t\t\t</h1>\n\n\t\t\t\t\t\t\t\t\t\t\t<ul class="list-unstyled">\n\t\t\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<p class="text-muted">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<i class="fa fa-phone"></i>&nbsp;&nbsp; <span class="txt-color-darken">');
    
      __out.push(__sanitize(this.phone));
    
      __out.push('</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<p class="text-muted">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<i class="fa fa-envelope"></i>&nbsp;&nbsp;<a href="mailto:');
    
      __out.push(__sanitize(this.email));
    
      __out.push('">');
    
      __out.push(__sanitize(this.email));
    
      __out.push('</a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<p class="text-muted">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<i class="fa fa-building"></i>&nbsp;&nbsp;<span class="txt-color-darken">');
    
      __out.push(__sanitize(this.address));
    
      __out.push('</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<p class="text-muted">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<i class="fa fa-calendar"></i>&nbsp;&nbsp;<span class="txt-color-darken">Next appointment on <a href="javascript:void(0);" rel="tooltip" title="" data-placement="top" data-original-title="Create an Appointment">4:30 PM</a></span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t\t\t\t<br>\n\t\t\t\t\t\t\t\t\t\t\t<p class="font-md">\n\t\t\t\t\t\t\t\t\t\t\t\t<i>Patient summary...</i>\n\t\t\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t\t<p>\n\n\t\t\t\t\t\t\t\t\t\t\t\tEt harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio\n\t\t\t\t\t\t\t\t\t\t\t\tcumque nihil impedit quo minus id quod maxime placeat facere\n\n\t\t\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t\t\t\t<br>\n\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);" class="btn btn-default btn-xs"><i class="fa fa-envelope-o"></i> Send Message</a>\n\t\t\t\t\t\t\t\t\t\t\t<br>\n\t\t\t\t\t\t\t\t\t\t\t<br>\n\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<div class="col-sm-3">\n\t\t\t\t\t\t\t\t\t\t\t<h1><small>Healthcare team:</small></h1>\n\t\t\t\t\t\t\t\t\t\t\t<ul class="list-inline friends-list">\n\t\t\t\t\t\t\t\t\t\t\t\t<li><img src="img/avatars/1.png" alt="friend-1">\n\t\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t<li><img src="img/avatars/2.png" alt="friend-2">\n\t\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t<li><img src="img/avatars/3.png" alt="friend-3">\n\t\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t<li><img src="img/avatars/4.png" alt="friend-4">\n\t\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t<li><img src="img/avatars/5.png" alt="friend-5">\n\t\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t<li><img src="img/avatars/male.png" alt="friend-6">\n\t\t\t\t\t\t\t\t\t\t\t\t</li>\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t<div class="row">\n\n\t\t\t\t\t\t\t\t<div class="col-sm-12">\n\n\t\t\t\t\t\t\t\t\t<hr>\n\n\t\t\t\t\t\t\t\t\t<div class="padding-10">\n\n\t\t\t\t\t\t\t\t\t\t<ul class="nav nav-tabs tabs-pull-right">\n\t\t\t\t\t\t\t\t\t\t\t<li class="active">\n\t\t\t\t\t\t\t\t\t\t\t\t<a href="#a1" data-toggle="tab">Conditions</a>\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t\t<a href="#a2" data-toggle="tab">Visits</a>\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t<li class="pull-left">\n\t\t\t\t\t\t\t\t\t\t\t\t<span class="margin-top-10 display-inline"><i class="fa fa-plus-circle text-success"></i> Metrics</span>\n\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t</ul>\n\n\t\t\t\t\t\t\t\t\t\t<div class="tab-content padding-top-10">\n\t\t\t\t\t\t\t\t\t\t\t<div class="tab-pane fade in active" id="a1">\n\n\t\t\t\t\t\t\t\t\t\t\t\t<div class="row">\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t<article class="col-xs-12 col-sm-12 col-md-12 col-lg-12 sortable-grid ui-sortable">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- Widget ID (each widget will need unique ID)-->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="jarviswidget jarviswidget-color-blue" id="p-wid-id-1" role="widget">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- widget div-->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div>\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- widget content -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="widget-body">\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="tree js-conditions-list">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class="btn btn-sm btn-success condition-add" type="button">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tAdd +\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</button>\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t <i class="fa fa-plus-o fa-lg"></i>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- end widget div -->\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t</article>\n\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t<div class="tab-pane fade" id="a2">\n\n\t\t\t\t\t\t\t\t\t\t\t\t<div class="alert alert-info fade in">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<button class="close" data-dismiss="alert">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t×\n\t\t\t\t\t\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<i class="fa-fw fa fa-info"></i>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<strong>51 new members </strong>joined today!\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t<div class="user" title="email@company.com">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<img src="img/avatars/female.png"><a href="javascript:void(0);">Jenn Wilson</a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="email">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\ttravis@company.com\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t<div class="user" title="email@company.com">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<img src="img/avatars/male.png"><a href="javascript:void(0);">Marshall Hitt</a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="email">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tmarshall@company.com\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t<div class="user" title="email@company.com">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<img src="img/avatars/male.png"><a href="javascript:void(0);">Joe Cadena</a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="email">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tjoe@company.com\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t<div class="user" title="email@company.com">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<img src="img/avatars/male.png"><a href="javascript:void(0);">Mike McBride</a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="email">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tmike@company.com\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t<div class="user" title="email@company.com">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<img src="img/avatars/male.png"><a href="javascript:void(0);">Travis Wilson</a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="email">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\ttravis@company.com\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t<div class="user" title="email@company.com">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<img src="img/avatars/male.png"><a href="javascript:void(0);">Marshall Hitt</a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="email">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tmarshall@company.com\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t<div class="user" title="Joe Cadena joe@company.com">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<img src="img/avatars/male.png"><a href="javascript:void(0);">Joe Cadena</a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="email">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tjoe@company.com\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t<div class="user" title="email@company.com">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<img src="img/avatars/male.png"><a href="javascript:void(0);">Mike McBride</a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="email">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tmike@company.com\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t<div class="user" title="email@company.com">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<img src="img/avatars/male.png"><a href="javascript:void(0);">Marshall Hitt</a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="email">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tmarshall@company.com\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t<div class="user" title="email@company.com">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<img src="img/avatars/male.png"><a href="javascript:void(0);">Joe Cadena</a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="email">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tjoe@company.com\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t<div class="user" title="email@company.com">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<img src="img/avatars/male.png"><a href="javascript:void(0);"> Mike McBride</a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="email">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\tmike@company.com\n\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t\t<div class="text-center">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<ul class="pagination pagination-sm">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li class="disabled">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);">Prev</a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li class="active">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);">1</a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);">2</a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);">3</a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);">...</a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);">99</a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:void(0);">Next</a>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t</div><!-- end tab -->\n\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<!-- end row -->\n\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="col-sm-12 col-md-12 col-lg-6">\n\t\t\t\t\t\t<!-- row -->\n\t\t\t\t\t\t<div class="row">\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<!-- NEW WIDGET START -->\n\t\t\t\t\t\t\t<article class="col-xs-12 col-sm-12 col-md-12 col-lg-12">\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t<!-- Widget ID (each widget will need unique ID)-->\n\t\t\t\t\t\t\t\t<div class="jarviswidget" id="wid-id-bpgraph" data-widget-editbutton="false">\n\t\t\t\t\t\t\t\t\t<header>\n\t\t\t\t\t\t\t\t\t\t<span class="widget-icon"> <i class="fa fa-bar-chart-o"></i> </span>\n\t\t\t\t\t\t\t\t\t\t<h2>Blood Pressure</h2>\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</header>\n\t\t\t\t\t\t\t\t\t<!-- widget div-->\n\t\t\t\t\t\t\t\t\t<div>\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t<!-- widget edit box -->\n\t\t\t\t\t\t\t\t\t\t<div class="jarviswidget-editbox">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<!-- end widget edit box -->\n\t\t\t\t\t\t\t\t\t\t<!-- widget content -->\n\t\t\t\t\t\t\t\t\t\t<div class="widget-body no-padding">\n\t\t\t\t\t\t\t\t\t\t\t<div id="bp-stats" class="chart has-legend"></div>\n\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t<!-- end widget content -->\t\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<!-- end widget div -->\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<!-- end widget -->\n\t\t\t\t\t\t\t</article>\n\t\t\t\t\t\t\t<!-- WIDGET END -->\t\t\t\t\t\t\t\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n<!-- end row -->\n</section>\n<!-- end widget grid -->\n\n<script type="text/javascript">\n// DO NOT REMOVE : GLOBAL FUNCTIONS!\npageSetUp()\n\n// PAGE RELATED SCRIPTS\n\n</script>\n');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}
});

;require.register("templates/search/search_template", function(exports, require, module) {
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
      __out.push('<form class="navbar-form navbar-left" role="search" action="" id="searchForm" method="post" name="search">\n\t<div class="form-group">\n\t\t<input id="SearchCriterion" name="SearchCriterion" class="form-control js-search-terms" type="text" id="glyph-search" placeholder="Search Patients" ');
    
      if (this.searchTerms) {
        __out.push('value="');
        __out.push(__sanitize(this.searchTerms));
        __out.push('"');
      }
    
      __out.push('>\n\t</div>\n\t<button class="btn btn-default btn-primary js-submit" type="submit">\n\t\t<i class="fa fa-fw fa-lg fa-search"></i>Search\n\t</button>\n</form>');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}
});

;require.register("templates/vitals/vitals_add_template", function(exports, require, module) {
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
      __out.push('<div class="modal-dialog">\n\t<div class="modal-content">\n\t\t<div class="modal-header class="smart-form client-form"">\n\t\t\t<button type="button" class="close" data-dismiss="modal" aria-hidden="true">\n\t\t\t\t&times;\n\t\t\t</button>\n\t\t\t<header>\n\t\t\t\t<h2>Patient Vitals</h2>\t\t\t\t\t\t\t\t\t\n\t\t\t</header>\t\t\t\t\n\t\t</div>\n\t\t<div class="modal-body">\n\t\t\t<form id="addvitals" novalidate="novalidate">\n\t\t\t\t<div class="row">\n\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t\t\t<span class="input-group-addon"><i class="fa fa-calendar fa-lg fa-fw"></i></span>\n\t\t\t\t\t\t\t\t<input class="form-control input-lg clsDatePicker" placeholder="Date" type="text" name="date" id="date">\n\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t\n\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t\t\t<span class="input-group-addon"><i class="fa fa-clock fa-lg fa-fw"></i></span>\n\t\t\t\t\t\t\t\t<input class="form-control input-lg" placeholder="Time (Example: 15:23)" type="text" name="time" id="time">\n\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class="row">\n\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t\t\t<span class="input-group-addon"><i class="fa fa-user fa-lg fa-fw"></i></span>\n\t\t\t\t\t\t\t\t<input class="form-control input-lg" placeholder="Weight (kg)" type="text" name="weight" id="weight">\n\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t\n\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t\t\t<span class="input-group-addon"><i class="fa fa-user fa-lg fa-fw"></i></span>\n\t\t\t\t\t\t\t\t<input class="form-control input-lg" placeholder="Height (m)" type="text" name="height" id="height">\n\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t\n\t\t\t\t<div class="row">\n\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t\t\t<span class="input-group-addon"><i class="fa fa-heart fa-lg fa-fw"></i></span>\n\t\t\t\t\t\t\t\t<input class="form-control input-lg" placeholder="Systolic (larger number)/mmHg" type="text" name="systolic" id="systolic">\n\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t\n\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t\t\t<span class="input-group-addon"><i class="fa fa-heart fa-lg fa-fw"></i></span>\n\t\t\t\t\t\t\t\t<input class="form-control input-lg" placeholder="Diastolic (smaller number)/mmHg" type="text" name="diastolic" id="diastolic">\n\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class="row">\n\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t\t\t<span class="input-group-addon"><i class="fa fa-user fa-lg fa-fw"></i></span>\n\t\t\t\t\t\t\t\t<input class="form-control input-lg" placeholder="Blood Glucose (mmol/L)" type="text" name="bloodGlucose" id="bloodGlucose">\n\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t\t\t<span class="input-group-addon"><i class="fa fa-user fa-lg fa-fw"></i></span>\n\t\t\t\t\t\t\t\t<select class="form-control input-lg" id="bloodType" name="bloodType">\n\t\t\t\t\t\t\t\t\t<option value="" selected="selected">Select</option>\n\t\t\t\t\t\t\t\t\t<option value="serum">Serum</option>\n\t\t\t\t\t\t\t\t\t<option value="whole-blood">Whole blood</option>\n\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\t\t\t\t\t\n\t\t\t\t</div>\n\n\t\t\t\t<div class="row">\n\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t\t\t<span class="input-group-addon"><i class="fa fa-user fa-lg fa-fw"></i></span>\n\t\t\t\t\t\t\t\t<input class="form-control input-lg" placeholder="Body Temperature" type="text" name="temperature" id="temperature">\t\t\t\t\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="col-sm-6">\n\t\t\t\t\t\t<div class="form-group">\n\t\t\t\t\t\t\t<div class="input-group">\n\t\t\t\t\t\t\t\t<span class="input-group-addon"><i class="fa fa-user fa-lg fa-fw"></i></span>\n\t\t\t\t\t\t\t\t<input class="form-control input-lg" placeholder="Pulse" type="text" name="pulse" id="pulse">\t\t\t\t\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</form>\t\n\t\t</div>\t\t\t\t\t\t\t\n\n\t\t<div class="modal-footer">\t\t\t\t\n\t\t\t<button type="button" class="btn btn-primary" data-dismiss="modal">\n\t\t\t\tCancel\n\t\t\t</button>\n\t\t\t<button type="submit" class="btn btn-primary js-save-btn">\n\t\t\t\t<i class="fa fa-save"></i>\n\t\t\t\tSave Changes\n\t\t\t</button>\n\t\t</div>\t\t\t\n\t</div>\n</div>\t');
    
    }).call(this);
    
  }).call(__obj);
  __obj.safe = __objSafe, __obj.escape = __escape;
  return __out.join('');
}
});

;
//# sourceMappingURL=app.js.map