//testing for Facebook connector
//requires an auth.json file in the tests/Me/facebook-test folder

var assert = require('assert');
var vows = require('vows');
var RESTeasy = require('api-easy');
var http = require('http');
var querystring = require('querystring');
var events = require('events');
var fs = require('fs');
var sys = require('sys');
var request = require('request');
var lfs = require('../Common/node/lfs.js');
var locker = require('../Common/node/locker.js');
var lconfig = require('../Common/node/lconfig.js')
var path = require('path');
var testUtils = require(__dirname + "/test-utils.js");

var suite = RESTeasy.describe('Facebook Connector')

var id = 'facebook-test';
var eventCounts = {friends:0};
lconfig.load('config.json');

try {
    var stats = fs.statSync('Me/facebook-test/auth.json');
} catch(err) {
    console.log('\n\Facebook tests not run: Please add a valid auth.json file ' + 
                '(generated by a functional facebook connector) to your tests/Me.tests/facebook-test directory');
    return;
}

function addFriendSync() {
    var tpc = 'Facebook Connector can sync friends from Facebook';
    var test = {};
    test[tpc] = {
            topic:function() {
                var promise = new events.EventEmitter;
                console.log(lconfig.lockerBase + '/Me/' + id + '/getNew/friends');
                request({uri:lconfig.lockerBase + '/Me/' + id + '/getNew/friends'}, function(err, resp, body) {
                    if(err) {
                        promise.emit('error', err);
                        return;
                    }
                    //TODO: file size might not be a great way to determine if a file is done
                    testUtils.waitForFileToComplete('Me/' + id + '/friends/friends.json',
                                                    10000, 20, 1000, function(success) { //10KB doesn't really make any sense!!
                        if(success == true)
                            promise.emit('success', true);
                        else
                            promise.emit('error', new Error);
                    });
                });
                return promise;
            },
            'and returns within 60 seconds':function(err, stat) {
                assert.isNull(err);
            }
        };
    suite.next().suite.addBatch(test);
}

addFriendSync();

var mePath = '/Me/' + id;

var counts = {};
suite.next().use(lconfig.lockerHost, lconfig.lockerPort)
    .discuss('Facebook connector can get all')
        .discuss('friends entries')
            .path(mePath + '/getAll/friends')
            .get()
                .expect('returns some friends', function(err, res, body) {
                    assert.isNull(err);
                    var friends = JSON.parse(body);
                    assert.isNotNull(friends);
                    assert.ok(friends.length > 0);
                    counts.friends = friends.length;
                    eventCounts.friends += friends.length;
                })
            .unpath()
        .undiscuss()
    .undiscuss();

suite.next().use(lconfig.lockerHost, lconfig.lockerPort)
    .discuss('Facebook connector can get')
        .discuss('friends entries after recordID 1')
            .path(mePath + '/getSince/friends?recordID=1')
            .get()
                .expect('returns two fewer friends', function(err, res, body) {
                    assert.isNull(err);
                    var friends = JSON.parse(body);
                    assert.isNotNull(friends);
                    assert.ok(friends.length > 0);
                    assert.equal(friends.length, counts.friends - 2);
                })
            .unpath()
        .undiscuss()
    .undiscuss();
    
suite.export(module);