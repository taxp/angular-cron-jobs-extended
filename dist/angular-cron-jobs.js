/** 
 * UI Component For Creating Cron Job Syntax To Send To Server
 * @version v1.3.3 - 2015-07-07 * @link https://github.com/jacobscarter/angular-cron-jobs
 * @author taxp
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
angular.module('templates-angularcronjobs', ['cronselection.html']);

angular.module("cronselection.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("cronselection.html",
    "<div class=\"cron-wrap\">\n" +
    "    <div>\n" +
    "        <span class=\"left-col\">Every: </span>\n" +
    "        <select class=\"cron-select\" ng-model=\"myFrequency.base\" ng-options=\"item.value as item.label for item in frequency\"></select>\n" +
    "    </div>\n" +
    "    <div>\n" +
    "        <span class=\"left-col\">Interval: </span>\n" +
    "        <select class=\"cron-select\" ng-model=\"myFrequency.interval\" ng-options=\"interval for interval in intervalValues\"></select>\n" +
    "        <span ng-switch=\"myFrequency.base\">\n" +
    "            <span ng-switch-when=\"3\"><span ng-if=\"myFrequency.interval == 1\">day</span><span ng-if=\"myFrequency.interval > 1\">days</span></span>\n" +
    "            <span ng-switch-when=\"4\"><span ng-if=\"myFrequency.interval == 1\">week</span><span ng-if=\"myFrequency.interval > 1\">weeks</span></span>\n" +
    "            <span ng-switch-when=\"5\"><span ng-if=\"myFrequency.interval == 1\">month</span><span ng-if=\"myFrequency.interval > 1\">months</span></span>\n" +
    "            <span ng-switch-when=\"6\"><span ng-if=\"myFrequency.interval == 1\">year</span><span ng-if=\"myFrequency.interval > 1\">years</span></span>\n" +
    "        </span>\n" +
    "    </div>\n" +
    "    <div>\n" +
    "        <span ng-show=\"myFrequency.base == 4\" class=\"left-col\">On: </span>\n" +
    "\n" +
    "        <span ng-show=\"myFrequency.base == 4\">\n" +
    "            <label ng-repeat=\"value in dayValue\">\n" +
    "                <input type=\"checkbox\" value=\"value\" name=\"weekdays[]\" ng-checked=\"myFrequency.dayValue.indexOf(value) > -1\" ng-click=\"toggleWeekday(value)\">\n" +
    "                {{value | shortDayName}}\n" +
    "            </label>\n" +
    "        </span>\n" +
    "\n" +
    "\n" +
    "\n" +
    "        <span ng-show=\"extended\">\n" +
    "            <span ng-show=\"myFrequency.base >= 5\" class=\"left-col\">on the </span>\n" +
    "            <input ng-show=\"myFrequency.base == 5\" type=\"radio\" ng-model=\"myFrequency.monthIntervalType\" value=\"1\">\n" +
    "            <select ng-show=\"myFrequency.base >= 5\" class=\"cron-select day-of-month-value\" ng-model=\"myFrequency.dayOfMonthValue\" ng-options=\"(value | numeral) for value in dayOfMonthValue\"\n" +
    "                    ng-disabled=\"myFrequency.base == 5 && myFrequency.monthIntervalType == 2\"></select>\n" +
    "\n" +
    "            <span ng-show=\"myFrequency.base == 6\" class=\"left-col\">of </span>\n" +
    "            <select ng-show=\"myFrequency.base == 6\" class=\"cron-select month-value\" ng-model=\"myFrequency.monthValue\" ng-options=\"(value | monthName) for value in monthValue\"></select>\n" +
    "        </span>\n" +
    "        <!--\n" +
    "		<span ng-show=\"myFrequency.base >= 2\">at </span>\n" +
    "		<select ng-show=\"myFrequency.base >= 3\" class=\"cron-select hour-value\" ng-model=\"myFrequency.hourValue\" ng-options=\"value for value in hourValue\"></select>\n" +
    "		<span ng-show=\"myFrequency.base >= 3\"> : </span>\n" +
    "		<select ng-show=\"myFrequency.base >= 2\" class=\"cron-select minute-value\" ng-model=\"myFrequency.minuteValue\" ng-options=\"value for value in minuteValue\"></select>\n" +
    "		<span ng-show=\"myFrequency.base == 2\"> past the hour</span>\n" +
    "		-->\n" +
    "    </div>\n" +
    "    <div ng-show=\"myFrequency.base == 5 && extended\">\n" +
    "        <span class=\"left-col\">Every </span>\n" +
    "        <input type=\"radio\" ng-model=\"myFrequency.monthIntervalType\" value=\"2\">\n" +
    "        <select class=\"cron-select number-of-week\" ng-model=\"myFrequency.numberOfWeek\" ng-options=\"(value | numeral) for value in numberOfWeek\"\n" +
    "                ng-disabled=\"myFrequency.base == 5 && myFrequency.monthIntervalType == 1\"></select>\n" +
    "        <select class=\"cron-select day-of-week\" ng-model=\"myFrequency.dayOfWeek\" ng-options=\"(value | dayName) for value in dayValue\"\n" +
    "                ng-disabled=\"myFrequency.base == 5 && myFrequency.monthIntervalType == 1\"></select>\n" +
    "    </div>\n" +
    "    <div>\n" +
    "        <span class=\"left-col\">Begin at: </span>\n" +
    "        <input type=\"date\" ng-model=\"myFrequency.beginDate\">\n" +
    "    </div>\n" +
    "    <div>\n" +
    "        <span class=\"left-col top\">End at: </span>\n" +
    "        <div class=\"inline-block\">\n" +
    "            <div>\n" +
    "                <label>\n" +
    "                    <input type=\"radio\" value=\"1\" ng-model=\"myFrequency.endType\" />Never\n" +
    "                </label>\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                <label>\n" +
    "                    <input type=\"radio\" value=\"2\" ng-model=\"myFrequency.endType\" />After\n" +
    "                </label>\n" +
    "                <input type=\"text\" ng-model=\"myFrequency.endCount\" ng-disabled=\"myFrequency.endType != '2'\" />\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                <label>\n" +
    "                    <input type=\"radio\" value=\"3\" ng-model=\"myFrequency.endType\" />\n" +
    "                </label>\n" +
    "                <input type=\"date\" ng-model=\"myFrequency.endDate\" ng-disabled=\"myFrequency.endType != '3'\" />\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

'use strict';

angular.module('angular-cron-jobs', ['templates-angularcronjobs']);

angular.module('angular-cron-jobs').directive('cronSelection', ['cronService', function(cronService) {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            scope: {
                config : '=',
                output : '=?',
                init   : '=?',
                extended: '='
            },
            templateUrl: function(element, attributes) {
                return attributes.template || 'cronselection.html';
            },
            link: function($scope) {

                var originalInit = undefined;
                var initChanged = false;

                $scope.frequency = [
                    {
                        value : 1,
                        label : 'Minute'
                    },
                    {
                        value : 2,
                        label : 'Hour'
                    },
                    {
                        value : 3,
                        label : 'Day'
                    },
                    {
                        value : 4,
                        label : 'Week'
                    },
                    {
                        value : 5,
                        label : 'Month'
                    },
                    {
                        value : 6,
                        label : 'Year'
                    }
                ];

                if (angular.isDefined($scope.init.cronString)) {
                    //console.log('init value found: ', $scope.init);
                    originalInit = angular.copy($scope.init);

                    $scope.myFrequency = cronService.fromCron($scope.init.cronString, !!$scope.extended);
                    $scope.myFrequency.beginDate = $scope.init.beginDate;
                    $scope.myFrequency.endType = $scope.init.endType;
                    $scope.myFrequency.endCount = $scope.init.endCount;
                    $scope.myFrequency.endDate = $scope.init.endDate;
                }

                $scope.$watch('init', function(newValue){
                    //console.log('watch on init fired!', newValue, originalInit);
                    if(angular.isDefined(newValue) && newValue && (newValue !== originalInit)){
                        initChanged = true;

                        $scope.myFrequency = cronService.fromCron($scope.init.cronString, !!$scope.extended);
                        $scope.myFrequency.beginDate = $scope.init.beginDate;
                        $scope.myFrequency.endType = $scope.init.endType;
                        $scope.myFrequency.endCount = $scope.init.endCount;
                        $scope.myFrequency.endDate = $scope.init.endDate;
                    }
                });

                if(typeof $scope.config === 'object' && !$scope.config.length){
                    var optionsKeyArray = Object.keys($scope.config.options);
                    for (var i in optionsKeyArray) {
                        if(optionsKeyArray.hasOwnProperty(i)) {
                            var currentKey = optionsKeyArray[i].replace(/^allow/, '');
                            var originalKey = optionsKeyArray[i];
                            if(!$scope.config.options[originalKey]){
                                for(var b in $scope.frequency){
                                    if($scope.frequency.hasOwnProperty(b)) {
                                        if($scope.frequency[b].label === currentKey){
                                            $scope.frequency.splice(b, 1);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                $scope.minuteValue = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
                $scope.hourValue = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
                $scope.dayOfMonthValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
                $scope.dayValue = [0, 1, 2, 3, 4, 5, 6];
                $scope.monthValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
                $scope.intervalValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
                $scope.numberOfWeek = [1, 2, 3, 4, 5];

                $scope.$watch('myFrequency', function(n, o){
                    //console.log('myFrequency changed: ', n, initChanged);
                    if(n && (!o || n.base !== o.base) && !initChanged){
                        //console.log('base changed!', n, o);
                        if(n && n.base){
                            n.base = parseInt(n.base);
                        }
                        if(n && n.base && n.base >= 2) {
                            n.minuteValue = $scope.minuteValue[0];
                        }

                        if(n && n.base && n.base >= 3) {
                            n.hourValue = $scope.hourValue[0];
                        }

                        if(n && n.base && n.base === 4) {
                            n.dayValue = [$scope.dayValue[0]];
                        }

                        if(n && n.base && n.base === 5) {
                            if(!$scope.extended) {
                                n.dayOfMonthValue = $scope.dayOfMonthValue[0];
                            } else {
                                n.monthIntervalType = 1;
                                n.numberOfWeek = $scope.numberOfWeek[0];
                                n.dayOfWeek = $scope.dayValue[0];
                            }
                        }

                        if(n && n.base && n.base === 6) {
                            n.dayOfMonthValue = $scope.dayOfMonthValue[0];
                            n.monthValue = $scope.monthValue[0];
                        }
                    } else if(n && n.base && o && o.base){
                        initChanged = false;
                    }
                    //$scope.output = cronService.setCron(n);
                    var cronString = cronService.setCron(n, !!$scope.extended);
                    $scope.output = {
                        cronString: cronString,
                        beginDate: n.beginDate,
                        endType: n.endType,
                        endCount: n.endCount,
                        endDate: n.endDate
                    };
                    //console.log($scope.output);
                }, true);

                $scope.toggleWeekday = function toggleWeekday(value) {
                    var idx = $scope.myFrequency.dayValue.indexOf(value);

                    if (idx > -1) {
                        $scope.myFrequency.dayValue.splice(idx, 1);
                    } else {
                        $scope.myFrequency.dayValue.push(value);
                    }
                };

            }
        };
    }]).filter('numeral', function() {
    return function(input) {
        if(input === null) {
            return null;
        } else if([10, 11, 12, 13].indexOf(input % 100) != -1) {
            return input + 'th';
        } else if(input % 10 == 1) {
            return input + 'st';
        } else if(input % 10 == 2) {
            return input + 'nd';
        } else if(input % 10 == 3) {
            return input + 'rd';
        } else {
            return input + 'th';
        }
    };
}).filter('monthName', function() {
    return function(input) {
        var months = {
            1: 'January',
            2: 'February',
            3: 'March',
            4: 'April',
            5: 'May',
            6: 'June',
            7: 'July',
            8: 'August',
            9: 'September',
            10: 'October',
            11: 'November',
            12: 'December'
        };

        if (input !== null && angular.isDefined(months[input])) {
            return months[input];
        } else {
            return null;
        }
    };
}).filter('dayName', function() {
    return function(input) {
        var days = {
            0: 'Sunday',
            1: 'Monday',
            2: 'Tuesday',
            3: 'Wednesday',
            4: 'Thursday',
            5: 'Friday',
            6: 'Saturday'
        };

        if (input !== null && angular.isDefined(days[input])) {
            return days[input];
        } else {
            return null;
        }
    };
}).filter('shortDayName', function() {
    return function(input) {
        var days = {
            0: 'Su',
            1: 'Mo',
            2: 'Tu',
            3: 'We',
            4: 'Th',
            5: 'Fr',
            6: 'Sa'
        };

        if (input !== null && angular.isDefined(days[input])) {
            return days[input];
        } else {
            return null;
        }
    };
});

'use strict';

angular.module('angular-cron-jobs').factory('cronService', function() {
    var service = {};

    service.setCron = function(n, extended) {
        //  console.log('set cron called: ', n);
        var cron = ['*', '*', '*', '*', '*', '*'];

        if(n && n.base && n.base >= 2) {
            cron[0] = typeof n.minuteValue !== undefined ? n.minuteValue : '*';
        }

        if(n && n.base && n.base >= 3) {
            cron[1] = typeof n.hourValue !== undefined ? n.hourValue  : '*';

            if(n.base === 3 && n.interval) {
                cron[2] = '*/' + n.interval;
            }
        }

        if(n && n.base && n.base === 4) {
            if(n.dayValue.length && n.interval) {
                cron[6] = n.dayValue.join(',') + '/' + n.interval;
            }
        }

        if(n && n.base && n.base === 5) {
            if(!extended) {
                cron[2] = typeof n.dayOfMonthValue !== undefined ? n.dayOfMonthValue : '1';
            } else {
                if(n.monthIntervalType == '1') {
                    cron[2] = typeof n.dayOfMonthValue !== undefined ? n.dayOfMonthValue : '1';
                } else if(n.monthIntervalType == '2') {
                    var dayOfWeek = typeof n.dayOfWeek !== undefined ? n.dayOfWeek : '1';
                    var numberOfWeek = typeof n.numberOfWeek !== undefined ? n.numberOfWeek : '1';

                    cron[4] = dayOfWeek + '#' + numberOfWeek;
                }
            }
            if(n.interval) {
                cron[3] = '*/' + n.interval;
            }
        }

        if(n && n.base && n.base === 6) {
            cron[2] = typeof n.dayOfMonthValue !== undefined ? n.dayOfMonthValue : '1';
            cron[3] = typeof n.monthValue !== undefined ? n.monthValue : '1';
            cron[5] = '*/' + n.interval;
        }
        //console.log('cron after setCron ', cron.join(' '));
        return cron.join(' ');
    };

    service.fromCron = function(value, extended) {
        //  console.log('set cron fired!');
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

        // console.log('freq ', frequency);
        return frequency;
    };

    return service;
});
