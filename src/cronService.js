'use strict';

angular.module('angular-cron-jobs').factory('cronService', function() {
    var service = {};

    service.setCron = function(n, extended) {
        var cron = ['*', '*', '*', '*', '*', '*'];

        if(n && n.base && n.base >= 2) {
            cron[0] = (typeof n.minuteValue !== 'undefined') ? n.minuteValue : '*';
        }

        if(n && n.base && n.base >= 3) {
            cron[1] = (typeof n.hourValue !== 'undefined') ? n.hourValue  : '*';

            if(n.base === 3 && n.interval) {
                cron[2] = '*/' + n.interval;
            }
        }

        if(n && n.base && n.base === 4) {
            if(n.dayValue.length && n.interval) {
                cron[6] = n.dayValue.join(',') + '/' + n.interval;
            } else {
                cron[6] = '/' + n.interval;
            }
        }

        if(n && n.base && n.base === 5) {
            if(!extended) {
                cron[2] = (typeof n.dayOfMonthValue !== 'undefined') ? n.dayOfMonthValue : '1';
            } else {
                if(parseInt(n.monthIntervalType) == 1) {
                    cron[2] = (typeof n.dayOfMonthValue !== 'undefined') ? n.dayOfMonthValue : '1';
                } else if(parseInt(n.monthIntervalType) == 2) {
                    var dayOfWeek = (typeof n.dayOfWeek !== 'undefined') ? n.dayOfWeek : '1';
                    var numberOfWeek = (typeof n.numberOfWeek !== 'undefined') ? n.numberOfWeek : '1';

                    cron[4] = dayOfWeek + '#' + numberOfWeek;
                    cron[2] = '*';
                }
            }
            if(n.interval) {
                cron[3] = '*/' + n.interval;
            }
        }

        if(n && n.base && n.base === 6) {
            cron[2] = (typeof n.dayOfMonthValue !== 'undefined') ? n.dayOfMonthValue : '1';
            cron[3] = (typeof n.monthValue !== 'undefined') ? n.monthValue : '1';
            cron[5] = '*/' + n.interval;
        }
        return cron.join(' ');
    };

    service.fromCron = function(value, extended) {
        var cron = value.replace(/\s+/g, ' ').split(' ');
        var frequency = {base: '1'}; // default: every minute


        if(cron[0] === '*' && cron[1] === '*' && cron[2] === '*' && cron[3] === '*'  && cron[4] === '*') {
            frequency.base = 1; // every minute
        } else if(cron[1] === '*' && cron[2] === '*' && cron[3] === '*'  && cron[4] === '*') {
            frequency.base = 2; // every hour
        } else if(cron[3] === '*'  && cron[4] === '*' && (cron[6] == undefined || cron[6] == '*')) {
            frequency.base = 3; // every day
            frequency.interval = parseInt(cron[2].split('/')[1]);
        } else if(cron[2] === '*' && cron[3] === '*' && cron[4] === '*' && cron[5] === '*') {
            frequency.base = 4; // every week
            var days = cron[6].split('/')[0];
            frequency.interval = parseInt(cron[6].split('/')[1]);
            if(days == '*') {
                frequency.dayValue = [1, 2, 3, 4, 5, 6, 7];
            } else {
                frequency.dayValue = days.split(',').map(function(el) { return parseInt(el); });
            }
        } else if(cron[4] === '*' && cron[5] === '*') {
            frequency.base = 5; // every month
            frequency.interval = parseInt(cron[3].split('/')[1]);

            if(extended) {
                frequency.dayOfWeek = 1;
                frequency.numberOfWeek = 1;
                frequency.monthIntervalType = 1;
            }
        } else if(cron[4] === '*') {
            frequency.base = 6; // every year
            frequency.interval = parseInt(cron[5].split('/')[1]);
        }

        if(extended) {
            if(cron[4].indexOf('#') != -1) {
                frequency.base = 5; // every month
                frequency.interval = parseInt(cron[3].split('/')[1]);
                frequency.dayOfMonthValue = 1;
            }
        }


        if (cron[0] !== '*') {
            frequency.minuteValue = parseInt(cron[0]);
        }
        if (cron[1] !== '*') {
            frequency.hourValue = parseInt(cron[1]);
        }
        if (cron[2] !== '*' && !isNaN(parseInt(cron[2]))) {
            frequency.dayOfMonthValue = parseInt(cron[2]);
        }
        if (cron[3] !== '*' && !isNaN(parseInt(cron[3]))) {
            frequency.monthValue = parseInt(cron[3]);
        }
        if (cron[4] !== '*') {
            //frequency.dayValue = parseInt(cron[4]);
            if(extended) {
                frequency.monthIntervalType = 2;
                frequency.dayOfWeek = parseInt(cron[4].split('#')[0]);
                frequency.numberOfWeek = parseInt(cron[4].split('#')[1]);
            }
        }


        //frequency.base += ''; // 'cast' to string in order to set proper value on "every" modal

        return frequency;
    };

    return service;
});