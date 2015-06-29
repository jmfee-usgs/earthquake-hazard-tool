'use strict';

var DependencyFactory = require('DependencyFactory'),

    Model = require('mvc/Model'),

    Util = require('util/Util');

var SALT = 'analysis',
    SEQUENCE = 0;

var Analysis = function (options) {
  var _this,
      _initialize,

      _dependencyFactory,

      _createUniqueId;


  _this = Model(Util.extend({
    edition: DependencyFactory.getInstance().getAllEditions()[0].get('id'),
    region: null,

    location: null,

    imt: DependencyFactory.getInstance().getAllSpectralPeriods()[0].get('id'),
    vs30: DependencyFactory.getInstance().getAllSiteClasses()[0].get('id'),

    timeHorizon: 2475,
    contourType: null,

    curves: null
  }, options));

  _initialize = function (/*options*/) {
    _dependencyFactory = DependencyFactory.getInstance();

    if (typeof _this.id === 'undefined' || _this.id === null) {
      _this.set({id: _createUniqueId()});
    }
  };

  _createUniqueId = function () {
    return SALT + '-' + (new Date()).getTime() + '-' + (SEQUENCE++);
  };


  _this.destroy = Util.compose(_this.destroy, function () {
    _dependencyFactory = null;

    _createUniqueId = null;
  });

  _this.getEdition = function () {
    return _dependencyFactory.getEdition(_this.get('edition'));
  };

  // Not really needed, but for consistency with other methods ...
  _this.getLocation = function () {
    return _this.get('location');
  };

  _this.getRegion = function () {
    return _dependencyFactory.getRegion(_this.get('region'));
  };

  _this.getVs30 = function () {
    return _dependencyFactory.getSiteClass(_this.get('vs30'));
  };

  _this.getSpectralPeriod = function () {
    return _dependencyFactory.getSpectralPeriod(_this.get('imt'));
  };

  _initialize(options);
  options = null;
  return _this;
};

module.exports = Analysis;
