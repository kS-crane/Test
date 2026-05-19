const _ = require('lodash');
const fs = require('fs');
const path = require('path');

console.log('Building spaceman-analytics...');
console.log(`lodash version: ${_.VERSION}`);

const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const output = `/**
 * spaceman-analytics v2.4.1
 * (c) Dr. Leo Spaceman
 * Released under the MIT License.
 */
(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
    ? define(['exports'], factory)
    : factory((global.SpacemanAnalytics = {}));
})(this, function(exports) {
  'use strict';

  var _version = '2.4.1';

  function track(event, data) {
    var payload = {
      event: event,
      data: data || {},
      timestamp: Date.now(),
      version: _version
    };
    console.log('[spaceman]', JSON.stringify(payload));
    return payload;
  }

  function identify(userId, traits) {
    return track('identify', { userId: userId, traits: traits || {} });
  }

  function page(name, properties) {
    return track('page', { name: name, properties: properties || {} });
  }

  exports.track = track;
  exports.identify = identify;
  exports.page = page;
  exports.version = _version;
});
`;

fs.writeFileSync(path.join(distDir, 'spaceman-analytics.js'), output.trim());

const stats = fs.statSync(path.join(distDir, 'spaceman-analytics.js'));
console.log(`Build complete — dist/spaceman-analytics.js (${stats.size} bytes)`);
