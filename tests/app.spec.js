describe('App', function () {
    'use strict';

    var assert = require('assert'),
        sinon = require('sinon'),
        bro = require('jsdom-test-browser'),
        React = require('react'),
        TestUtils = require('react/addons').addons.TestUtils;

    before(function (done) { bro.jQueryify(done); });

    describe('default HTML', function () {

        it('...', function () {
            assert(2 === 2);
        });
    });
});
