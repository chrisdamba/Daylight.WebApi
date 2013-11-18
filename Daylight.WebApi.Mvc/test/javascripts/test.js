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
require.register("test/components/collection_view_test", function(exports, require, module) {
var CollectionView;

CollectionView = require('components/collection_view');

describe('components/collection_view', function() {
  var sut;
  sut = null;
  beforeEach(function() {
    return sut = new CollectionView({
      collection: new Backbone.Collection(),
      itemView: Backbone.View
    });
  });
  describe('dispose()', function() {
    beforeEach(function() {
      return sut.dispose();
    });
    it('should remove the reference to _itemView', function() {
      return expect(sut._itemView).not.to.exist;
    });
    it('should remove the reference to _itemViews', function() {
      return expect(sut._itemViews).not.to.exist;
    });
    return it('should remove the reference to collection', function() {
      return expect(sut.collection).not.to.exist;
    });
  });
  describe('initialize()', function() {
    beforeEach(function() {
      sinon.stub(sut, '_renderItem');
      sinon.stub(sut, '_removeItem');
      sinon.stub(sut, '_reset');
      return sut.initialize({
        collection: new Backbone.Collection(),
        itemView: function() {}
      });
    });
    describe('when no collection is passed in', function() {
      return it('should throw an error', function() {
        return expect(function() {
          return new CollectionView({
            collection: void 0,
            itemView: Backbone.View
          });
        }).to["throw"]('ERROR: CollectionView.initialize() - collection option must be specified');
      });
    });
    describe('when no itemView method is passed in', function() {
      return it('should throw an error', function() {
        return expect(function() {
          return new CollectionView({
            collection: new Backbone.Collection(),
            itemView: void 0
          });
        }).to["throw"]('ERROR: CollectionView.initialize() - itemView option must be specified');
      });
    });
    it('should store a reference to the itemView', function() {
      var fn;
      fn = function() {};
      sut = new CollectionView({
        collection: new Backbone.Collection(),
        itemView: fn
      });
      expect(sut._itemView).to.exist;
      return sut._itemView.should.equal(fn);
    });
    it('should create the _itemViews array', function() {
      expect(sut._itemViews).to.exist;
      return expect(sut._itemViews).to.be.an.instanceOf(Array);
    });
    describe('when a model is added to the collection', function() {
      beforeEach(function() {
        return sut.collection.trigger('add');
      });
      return it('should call _renderItem()', function() {
        return sut._renderItem.should.have.been.called;
      });
    });
    describe('when a model is removed from the collection', function() {
      beforeEach(function() {
        return sut.collection.trigger('remove');
      });
      return it('should call _removeItem()', function() {
        return sut._removeItem.should.have.been.called;
      });
    });
    return describe('when the collection is reset', function() {
      beforeEach(function() {
        return sut.collection.trigger('reset');
      });
      return it('should call _reset()', function() {
        return sut._reset.should.have.been.called;
      });
    });
  });
  describe('render()', function() {
    var item0, item1, item2;
    item0 = item1 = item2 = null;
    beforeEach(function() {
      sinon.stub(sut, '_renderItem');
      item0 = new Backbone.Model({
        id: 'item0'
      });
      item1 = new Backbone.Model({
        id: 'item1'
      });
      item2 = new Backbone.Model({
        id: 'item2'
      });
      return sut.collection.reset([item0, item1, item2], {
        silent: true
      });
    });
    it('should return itself', function() {
      return sut.render().should.equal(sut);
    });
    return it('should call _renderItem() for each item in the collection', function() {
      sut.render();
      sut._renderItem.should.have.been.calledThrice;
      sut._renderItem.should.have.been.calledWith(item0);
      sut._renderItem.should.have.been.calledWith(item1);
      return sut._renderItem.should.have.been.calledWith(item2);
    });
  });
  describe('_renderItem()', function() {
    var itemModel, itemView;
    itemModel = itemView = null;
    beforeEach(function() {
      sut.renderChild = function() {};
      sut._itemView = Backbone.View;
      sinon.stub(sut, 'renderChild', function(view) {
        return view;
      });
      sinon.spy(sut, 'trigger');
      sinon.stub(sut.$el, 'append', function(el) {
        return sut.$el;
      });
      return itemModel = new Backbone.Model({
        id: 'item1'
      });
    });
    it('should return a new view for the model', function() {
      itemView = sut._renderItem(itemModel);
      expect(itemView).to.exist;
      return itemView.should.be.an.instanceOf(Backbone.View);
    });
    it('should pass the model into the view', function() {
      itemView = sut._renderItem(itemModel);
      expect(itemView.model).to.exist;
      return itemView.model.should.equal(itemModel);
    });
    it('should create and store a view for the model passed in', function() {
      itemView = sut._renderItem(itemModel);
      sut._itemViews.length.should.equal(1);
      return sut._itemViews[0].should.equal(itemView);
    });
    it('should render the item view as a child', function() {
      itemView = sut._renderItem(itemModel);
      sut.renderChild.should.have.been.calledOnce;
      return sut.renderChild.should.have.been.calledWith(itemView);
    });
    it('should append each item to the el', function() {
      itemView = sut._renderItem(itemModel);
      sut.$el.append.should.have.been.calledOnce;
      return sut.$el.append.should.have.been.calledWith(itemView.el);
    });
    describe('when itemView is a factory function', function() {
      beforeEach(function() {
        sinon.stub(sut, '_itemView', function(options) {
          return new Backbone.View(options);
        });
        return sut._renderItem(itemModel);
      });
      return it('should use it to create a new view instance for each item', function() {
        return sut._itemView.should.have.been.calledWith({
          model: itemModel
        });
      });
    });
    it('should trigger an \'itemAdded\' event before it is rendered', function(done) {
      sut.on('itemAdded', function(e) {
        e.target.should.equal(sut);
        e.itemView.should.equal(sut._itemViews[sut._itemViews.length - 1]);
        sut.trigger.should.not.have.been.calledWith('itemRendered');
        return done();
      });
      return sut._renderItem(itemModel);
    });
    return it('should trigger an \'itemRendered\' event', function(done) {
      sut.on('itemRendered', function(e) {
        e.target.should.equal(sut);
        e.itemView.should.equal(sut._itemViews[sut._itemViews.length - 1]);
        sut.trigger.should.have.been.calledWith('itemAdded');
        return done();
      });
      return sut._renderItem(itemModel);
    });
  });
  describe('_removeItem()', function() {
    var itemModel0, itemModel1, itemModel2, itemView0, itemView1, itemView2;
    itemModel0 = itemModel1 = itemModel2 = itemView0 = itemView1 = itemView2 = null;
    beforeEach(function() {
      sinon.stub(sut, 'trigger');
      itemModel0 = new Backbone.Model({
        id: 'item0'
      });
      itemModel1 = new Backbone.Model({
        id: 'item1'
      });
      itemModel2 = new Backbone.Model({
        id: 'item2'
      });
      itemView0 = new Backbone.View({
        model: itemModel0
      });
      itemView0.leave = sinon.stub();
      itemView1 = new Backbone.View({
        model: itemModel1
      });
      itemView1.leave = sinon.stub();
      itemView2 = new Backbone.View({
        model: itemModel2
      });
      itemView2.leave = sinon.stub();
      sut._itemViews = [itemView0, itemView1, itemView2];
      return sut._removeItem(itemModel1);
    });
    it('should remove the view that matches the model from _itemViews', function() {
      sut._itemViews.length.should.equal(2);
      sut._itemViews[0].should.equal(itemView0);
      return sut._itemViews[1].should.equal(itemView2);
    });
    it('should call leave() on the view that is removed', function() {
      return itemView1.leave.should.have.been.called;
    });
    return it('should trigger an \'itemRemoved\' event', function() {
      return sut.trigger.should.have.been.calledWith('itemRemoved', {
        target: sut,
        itemView: itemView1
      });
    });
  });
  describe('views()', function() {
    var result;
    result = null;
    describe('when there are no views', function() {
      beforeEach(function() {
        return result = sut.views();
      });
      return it('should return an empty Array', function() {
        expect(result).to.exist;
        return result.length.should.equal(0);
      });
    });
    return describe('when there are item views', function() {
      var view0, view1, view2;
      view0 = view1 = view2 = null;
      beforeEach(function() {
        view0 = new Backbone.View();
        view1 = new Backbone.View();
        view2 = new Backbone.View();
        sut._itemViews = [view0, view1, view2];
        return result = sut.views();
      });
      it('should return an Array of all the views in order', function() {
        expect(result).to.exist;
        result.length.should.equal(3);
        result[0].should.equal(view0);
        result[1].should.equal(view1);
        return result[2].should.equal(view2);
      });
      return describe('when the array is modified', function() {
        beforeEach(function() {
          return result.splice(0, 1);
        });
        return it('should not alter the internal Array', function() {
          return sut.views().length.should.equal(3);
        });
      });
    });
  });
  describe('size()', function() {
    describe('when there are no views', function() {
      return it('should return zero', function() {
        return sut.size().should.equal(0);
      });
    });
    return describe('when there are item views', function() {
      return it('should return the number of views', function() {
        sut._itemViews.push(new Backbone.View());
        sut.size().should.equal(1);
        sut._itemViews.push(new Backbone.View());
        sut.size().should.equal(2);
        sut._itemViews.push(new Backbone.View());
        return sut.size().should.equal(3);
      });
    });
  });
  return describe('_reset()', function() {
    var views;
    views = null;
    beforeEach(function() {
      sinon.stub(sut, 'render');
      views = [
        {
          leave: sinon.stub()
        }, {
          leave: sinon.stub()
        }
      ];
      sut._itemViews = views;
      return sut._reset();
    });
    it('should call leave on the views', function() {
      views[0].leave.should.have.been.called;
      return views[1].leave.should.have.been.called;
    });
    it('should set _itemViews to an empty array', function() {
      return sut._itemViews.should.deep.equal([]);
    });
    return it('should call render', function() {
      return sut.render.should.have.been.called;
    });
  });
});

});

;require.register("test/initialize", function(exports, require, module) {
var module, _i, _len, _ref;

_ref = window.require.list();
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  module = _ref[_i];
  if (/_test$/.test(module)) {
    require(module);
  }
}

});

;
//# sourceMappingURL=test.js.map