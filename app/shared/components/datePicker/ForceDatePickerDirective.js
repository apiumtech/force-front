/**
 * Created by apium on 5/8/15.
 */
/**
 * Downloaded from Github
 */
define([
    'app',
    'moment'
], function (app, moment) {
    'use strict';

    function ForceDatePickerDirective($window, $compile, $locale, $filter) {

        var A_DAY_IN_MILLISECONDS = 86400000;
        return {
            'restrict': 'AEC',
            'scope': {
                'dateSet': '@',
                'dateMinLimit': '@',
                'dateMaxLimit': '@',
                'yearRange': '@',
                'isOpen': '@'
            },
            'link': function linkingFunction($scope, element, attr) {
                //get child input
                var selector = attr.selector
                    , thisInput = angular.element(selector ? element[0].querySelector('.' + selector) : element[0].children[0])
                    , theCalendar
                    , defaultPrevButton = '<b class="datepicker-default-button">&lang;</b>'
                    , defaultNextButton = '<b class="datepicker-default-button">&rang;</b>'
                    , prevButton = attr.buttonPrev || defaultPrevButton
                    , nextButton = attr.buttonNext || defaultNextButton
                    , dateFormat = attr.dateFormat
                    , yearRange
                    , dateMinLimit
                    , dateMaxLimit
                    , date = new Date()
                    , isMouseOn = false
                    , isMouseOnInput = false
                    , datetime = $locale.DATETIME_FORMATS
                    , pageDatepickers
                    , htmlTemplate = '<div class="force-datepicker-calendar" ng-click="$event.stopPropagation();">' +
                            //Mobile month+year pagination
                        '<div class="force-datepicker-calendar-header">' +
                        '<div class="force-datepicker-calendar-header-middle force-datepicker-mobile-item force-datepicker-calendar-month">' +
                        '<select ng-model="month" ng-change="selectedMonthHandle(month)" class="m-r-5">' +
                        '   <option ng-repeat="item in months" ng-selected="month === item" ' +
                        '           ng-if=\'isSelectableMinMonth(item + " " + day + ", " + year) && isSelectableMaxMonth(item + " " + day + ", " + year)\' ' +
                        '           ng-value="item">{{item}}' +
                        '   </option>' +
                        '</select>' +
                        '<select ng-model="mobileYear" ng-change="setNewYear(mobileYear)" class="m-l-5">' +
                        '   <option ng-repeat="item in paginationYears" ' +
                        '           ng-selected="year === item" ' +
                        '           ng-value="item" ng-disabled="!isSelectableMinYear(item) || !isSelectableMaxYear(item)">' +
                        '       {{item}}' +
                        '   </option>' +
                        '</select>' +

                        '</div>' +

                        '</div>' +
                            //years pagination header
                        '<div class="force-datepicker-calendar-header" ng-show="showYearsPagination">' +
                        '<div class="force-datepicker-calendar-years-pagination">' +
                        '<a ng-class="{\'force-datepicker-active\': y === year, \'force-datepicker-disabled\': !isSelectableMaxYear(y) || !isSelectableMinYear(y)}" href="javascript:void(0)" ng-click="$event.stopPropagation();setNewYear(y)" ng-repeat="y in paginationYears">{{y}}</a>' +
                        '</div>' +
                        '<div class="force-datepicker-calendar-years-pagination-pages">' +
                        '<a href="javascript:void(0)" ng-click="$event.stopPropagation();paginateYears(paginationYears[0])" ng-class="{\'force-datepicker-item-hidden\': paginationYearsPrevDisabled}">' + prevButton + '</a>' +
                        '<a href="javascript:void(0)" ng-click="$event.stopPropagation();paginateYears(paginationYears[paginationYears.length -1 ])" ng-class="{\'force-datepicker-item-hidden\': paginationYearsNextDisabled}">' + nextButton + '</a>' +
                        '</div>' +
                        '</div>' +
                            //days column
                        '<div class="force-datepicker-calendar-days-header">' +
                        '<div ng-repeat="d in daysInString"> {{d}} </div> ' +
                        '</div>' +
                            //days
                        '<div class="force-datepicker-calendar-body">' +
                        '<a href="javascript:void(0)" ng-repeat="px in prevMonthDays" class="force-datepicker-calendar-day force-datepicker-disabled">{{px}}</a>' +
                        '<a href="javascript:void(0)" ng-repeat="item in days" ng-click="$event.stopPropagation();setDatepickerDay(item)" ng-class="{\'force-datepicker-active\': day === item, \'force-datepicker-disabled\': !isSelectableMinDate(year + \'/\' + monthNumber + \'/\' + item ) || !isSelectableMaxDate(year + \'/\' + monthNumber + \'/\' + item)}" class="force-datepicker-calendar-day">{{item}}</a>' +
                        '<a href="javascript:void(0)" ng-repeat="nx in nextMonthDays" class="force-datepicker-calendar-day force-datepicker-disabled">{{nx}}</a>' +
                        '</div>' +
                        '</div>' +
                        '</div>';

                $scope.$watch('dateSet', function dateSetWatcher(value) {
                    if (value) {
                        date = new Date(value);
                        $scope.month = $filter('date')(date, 'MMMM');//December-November like
                        $scope.monthNumber = Number($filter('date')(date, 'MM')); // 01-12 like
                        $scope.day = Number($filter('date')(date, 'dd')); //01-31 like
                        $scope.year = Number($filter('date')(date, 'yyyy'));//2014 like
                    }
                });

                $scope.$watch('dateMinLimit', function dateMinLimitWatcher(value) {
                    if (value) {
                        dateMinLimit = value;
                    }
                });

                $scope.$watch('yearRange', function yearRangeWatcher(value) {
                    if (value) {
                        yearRange = value;
                    }
                });

                $scope.$watch('dateMaxLimit', function dateMaxLimitWatcher(value) {
                    if (value) {
                        dateMaxLimit = value;
                    }
                });

                if ($scope.isOpen) {
                    $scope.showCalendar();
                }

                $scope.month = $filter('date')(date, 'MMMM');//December-November like
                $scope.monthNumber = Number($filter('date')(date, 'MM')); // 01-12 like
                $scope.day = Number($filter('date')(date, 'dd')); //01-31 like
                $scope.year = Number($filter('date')(date, 'yyyy'));//2014 like
                $scope.months = datetime.MONTH;
                $scope.hour = 0;
                $scope.minute = 0;
                $scope.hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
                $scope.minutes = [];
                for(var i = 0; i < 60; i++){
                    $scope.minutes.push(i);
                }
                $scope.daysInString = ['0', '1', '2', '3', '4', '5', '6'].map(function mappingFunc(el) {

                    return $filter('date')(new Date(new Date('06/08/2014').valueOf() + A_DAY_IN_MILLISECONDS * el), 'EEE');
                });

                //create the calendar holder
                thisInput.after($compile(angular.element(htmlTemplate))($scope));

                //get the calendar as element
                theCalendar = element[0].querySelector('.force-datepicker-calendar');
                //some tricky dirty events to fire if click is outside of the calendar and show/hide calendar when needed
                thisInput.bind('focus click', function onFocusAndClick() {

                    isMouseOnInput = true;

                    $scope.showCalendar();
                });

                thisInput.bind('focusout', function onBlurAndFocusOut() {

                    isMouseOnInput = false;
                });

                angular.element(theCalendar).bind('mouseenter', function onMouseEnter() {

                    isMouseOn = true;
                });

                angular.element(theCalendar).bind('mouseleave', function onMouseLeave() {

                    isMouseOn = false;
                });

                angular.element(theCalendar).bind('focusin', function onCalendarFocus() {

                    isMouseOn = true;
                });

                angular.element($window).bind('click focus', function onClickOnWindow() {

                    if (!isMouseOn && !isMouseOnInput) {

                        $scope.hideCalendar();
                    }
                });

                $scope.isMobile = function isMobile() {

                    return true;
                    //if (navigator.userAgent && (navigator.userAgent.match(/Android/i)
                    //    || navigator.userAgent.match(/webOS/i)
                    //    || navigator.userAgent.match(/iPhone/i)
                    //    || navigator.userAgent.match(/iPad/i)
                    //    || navigator.userAgent.match(/iPod/i)
                    //    || navigator.userAgent.match(/BlackBerry/i)
                    //    || navigator.userAgent.match(/Windows Phone/i))){
                    //
                    //    return true;
                    //}
                };

                $scope.resetToMinDate = function manageResetToMinDate() {

                    $scope.month = $filter('date')(new Date(dateMinLimit), 'MMMM');
                    $scope.monthNumber = Number($filter('date')(new Date(dateMinLimit), 'MM'));
                    $scope.day = Number($filter('date')(new Date(dateMinLimit), 'dd'));
                    $scope.year = Number($filter('date')(new Date(dateMinLimit), 'yyyy'));
                };

                $scope.resetToMaxDate = function manageResetToMaxDate() {

                    $scope.month = $filter('date')(new Date(dateMaxLimit), 'MMMM');
                    $scope.monthNumber = Number($filter('date')(new Date(dateMaxLimit), 'MM'));
                    $scope.day = Number($filter('date')(new Date(dateMaxLimit), 'dd'));
                    $scope.year = Number($filter('date')(new Date(dateMaxLimit), 'yyyy'));
                };

                $scope.nextMonth = function manageNextMonth() {

                    if ($scope.monthNumber === 12) {

                        $scope.monthNumber = 1;
                        //its happy new year
                        $scope.nextYear();
                    } else {

                        $scope.monthNumber += 1;
                    }
                    //set next month
                    $scope.month = $filter('date')(new Date($scope.year + '/' + $scope.monthNumber + '/01'), 'MMMM');
                    //reinit days
                    $scope.setDaysInMonth($scope.monthNumber, $scope.year);

                    //check if max date is ok
                    if (dateMaxLimit) {
                        if (!$scope.isSelectableMaxDate($scope.year + '/' + $scope.monthNumber + '/' + $scope.day)) {

                            $scope.resetToMaxDate();
                        }
                    }
                    //deactivate selected day
                    $scope.day = undefined;
                };

                $scope.selectedMonthHandle = function manageSelectedMonthHandle(selectedMonth) {

                    $scope.monthNumber = Number($filter('date')(new Date('01 ' + selectedMonth + ' 2000'), 'MM'));
                    $scope.setDaysInMonth($scope.monthNumber, $scope.year);
                    $scope.setInputValue();
                };

                $scope.prevMonth = function managePrevMonth() {

                    if ($scope.monthNumber === 1) {

                        $scope.monthNumber = 12;
                        //its happy new year
                        $scope.prevYear();
                    } else {

                        $scope.monthNumber -= 1;
                    }
                    //set next month
                    $scope.month = $filter('date')(new Date($scope.year + '/' + $scope.monthNumber + '/01'), 'MMMM');
                    //reinit days
                    $scope.setDaysInMonth($scope.monthNumber, $scope.year);
                    //check if min date is ok
                    if (dateMinLimit) {

                        if (!$scope.isSelectableMinDate($scope.year + '/' + $scope.monthNumber + '/' + $scope.day)) {

                            $scope.resetToMinDate();
                        }
                    }
                    //deactivate selected day
                    $scope.day = undefined;
                };

                $scope.setNewYear = function setNewYear(year) {

                    //deactivate selected day
                    //$scope.day = undefined;

                    if (dateMaxLimit && $scope.year < Number(year)) {

                        if (!$scope.isSelectableMaxYear(year)) {

                            return;
                        }
                    } else if (dateMinLimit && $scope.year > Number(year)) {

                        if (!$scope.isSelectableMinYear(year)) {

                            return;
                        }
                    }

                    $scope.year = Number(year);
                    $scope.setDaysInMonth($scope.monthNumber, $scope.year);
                    $scope.paginateYears(year);
                    var lastDayInMonth = $scope.days[$scope.days.length-1];
                    $scope.day = $scope.day > lastDayInMonth ? $scope.days : $scope.day;
                };

                $scope.nextYear = function manageNextYear() {

                    $scope.year = Number($scope.year) + 1;
                };

                $scope.prevYear = function managePrevYear() {

                    $scope.year = Number($scope.year) - 1;
                };

                $scope.setInputValue = function manageInputValue() {

                    if ($scope.isSelectableMinDate($scope.year + '/' + $scope.monthNumber + '/' + $scope.day)
                        && $scope.isSelectableMaxDate($scope.year + '/' + $scope.monthNumber + '/' + $scope.day)) {

                        var modelDate = new Date($scope.year + '/' + $scope.monthNumber + '/' + $scope.day);

                        if (attr.dateFormat) {
                            thisInput.val($filter('date')(modelDate, dateFormat));
                        } else {

                            thisInput.val(modelDate);
                        }

                        thisInput.triggerHandler('input');
                        thisInput.triggerHandler('change');//just to be sure;
                    } else {

                        return false;
                    }
                };

                $scope.showCalendar = function manageShowCalendar() {


                    $scope.setDaysInMonth($scope.monthNumber, $scope.year);
                    $scope.setInputValue();

                    //lets hide all the latest instances of datepicker
                    pageDatepickers = $window.document.getElementsByClassName('force-datepicker-calendar');

                    angular.forEach(pageDatepickers, function forEachDatepickerPages(value, key) {

                        pageDatepickers[key].classList.remove('force-datepicker-open');
                    });

                    theCalendar.classList.add('force-datepicker-open');
                    $scope.$apply();
                };

                $scope.hideCalendar = function manageHideCalendar() {

                    theCalendar.classList.remove('force-datepicker-open');
                };

                $scope.setDaysInMonth = function setDaysInMonth(month, year) {

                    var i
                        , limitDate = new Date(year, month, 0).getDate()
                        , firstDayMonthNumber = new Date(year + '/' + month + '/' + 1).getDay()
                        , lastDayMonthNumber = new Date(year + '/' + month + '/' + limitDate).getDay()
                        , prevMonthDays = []
                        , nextMonthDays = []
                        , howManyNextDays
                        , howManyPreviousDays
                        , monthAlias;

                    $scope.days = [];

                    for (i = 1; i <= limitDate; i += 1) {

                        $scope.days.push(i);
                    }
                    //get previous month days is first day in month is not Sunday
                    if (firstDayMonthNumber !== 0) {

                        howManyPreviousDays = firstDayMonthNumber;

                        //get previous month
                        if (Number(month) === 1) {

                            monthAlias = 12;
                        } else {

                            monthAlias = month - 1;
                        }
                        //return previous month days
                        for (i = 1; i <= new Date(year, monthAlias, 0).getDate(); i += 1) {

                            prevMonthDays.push(i);
                        }
                        //attach previous month days
                        $scope.prevMonthDays = prevMonthDays.slice(-howManyPreviousDays);
                    } else {
                        //no need for it
                        $scope.prevMonthDays = [];
                    }

                    //get next month days is first day in month is not Sunday
                    if (lastDayMonthNumber < 6) {

                        howManyNextDays = 6 - lastDayMonthNumber;
                        //get previous month

                        //return next month days
                        for (i = 1; i <= howManyNextDays; i += 1) {

                            nextMonthDays.push(i);
                        }
                        //attach previous month days
                        $scope.nextMonthDays = nextMonthDays;
                    } else {
                        //no need for it
                        $scope.nextMonthDays = [];
                    }
                };

                $scope.setDatepickerDay = function setDatepickeDay(day) {

                    $scope.day = Number(day);
                    $scope.setInputValue();
                    $scope.hideCalendar();
                };

                $scope.paginateYears = function paginateYears() {
                    $scope.paginationYears = [];
                    var currentYear = new Date().getFullYear();

                    for (var y = currentYear; y > currentYear - $scope.yearRange; y--) {
                        $scope.paginationYears.push(y);
                    }
                };

                $scope.isSelectableMinMonth = function isSelectableMinMonth(date) {
                    if (!dateMinLimit) return true;
                    return moment(new Date(dateMinLimit)).isSame(new Date(date), 'month') || moment(new Date(dateMinLimit)).isBefore(new Date(date), 'month');
                };

                $scope.isSelectableMaxMonth = function isSelectableMaxMonth(date) {
                    if (!dateMaxLimit) return true;
                    return moment(new Date(dateMaxLimit)).isSame(new Date(date), 'month') || moment(new Date(dateMaxLimit)).isAfter(new Date(date), 'month');
                };

                $scope.isSelectableMinDate = function isSelectableMinDate(aDate) {
                    //if current date
                    if (!!dateMinLimit && !!new Date(dateMinLimit) &&
                        new Date(aDate).getTime() < new Date(dateMinLimit).getTime()) {

                        return false;
                    }
                    return true;
                };

                $scope.isSelectableMaxDate = function isSelectableMaxDate(aDate) {
                    if (!dateMaxLimit) return true;

                    var maxDateLimit;
                    try {
                        maxDateLimit = new Date(dateMaxLimit);
                    }
                    catch (e) {
                        return true;
                    }
                    var aDateTime = new Date(aDate).getTime();

                    var maxDateLimitTime = maxDateLimit.getTime();

                    return aDateTime < maxDateLimitTime;
                };

                $scope.isSelectableMaxYear = function isSelectableMaxYear(year) {

                    if (!!dateMaxLimit &&
                        year > new Date(dateMaxLimit).getFullYear()) {

                        return false;
                    }

                    return true;
                };

                $scope.isSelectableMinYear = function isSelectableMinYear(year) {

                    if (!!dateMinLimit &&
                        year < new Date(dateMinLimit).getFullYear()) {

                        return false;
                    }

                    return true;
                };

                //check always if given range of dates is ok
                if (dateMinLimit && !$scope.isSelectableMinYear($scope.year)) {

                    $scope.resetToMinDate();
                }

                if (dateMaxLimit && !$scope.isSelectableMaxYear($scope.year)) {

                    $scope.resetToMaxDate();
                }

                $scope.paginateYears($scope.year);
                $scope.setDaysInMonth($scope.monthNumber, $scope.year);
            }
        };
    }

    ForceDatePickerDirective.inherits(Object, {});

    app.register.directive('forceDatePicker', ['$window', '$compile', '$locale', '$filter', ForceDatePickerDirective]);

    return ForceDatePickerDirective;
});