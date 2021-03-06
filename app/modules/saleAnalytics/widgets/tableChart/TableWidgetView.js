/**
 * Created by justin on 12/22/14.
 */
define([
    'modules/saleAnalytics/widgets/WidgetBaseView',
    'modules/saleAnalytics/widgets/tableChart/TableWidgetModel',
    'modules/saleAnalytics/widgets/tableChart/TableWidgetPresenter',
    'modules/widgets/BaseWidgetEventBus',
    'modules/saleAnalytics/eventBus/UserTreeListEventBus',
    'underscore',
    'jquery',
    'numbro'
], function (WidgetBaseView, TableWidgetModel, TableWidgetPresenter, BaseWidgetEventBus, UserTreeListEventBus, _, $, numbro) {
    'use strict';

    function TableWidgetView(scope, element, presenter) {
      var self = this;
        presenter = presenter || new TableWidgetPresenter();
        WidgetBaseView.call(self, scope, element, presenter);
        self.dataSource = [];
        self.configureEvents();
        self.sortingState = {
            column: null,
            asc: false,
            desc: false
        };
    }

    TableWidgetView.inherits(WidgetBaseView, {
        dataSource: {
            get: function () {
                return this.$scope.dataSource;
            },
            set: function (value) {
                this.$scope.dataSource = value;
            }
        },
        sortingState: {
            get: function () {
                return this.$scope.sortingState;
            },
            set: function (value) {
                this.$scope.sortingState = value;
            }
        },
        eventChannel: {
            get: function () {
                return this.$scope.eventChannel || (this.$scope.eventChannel = BaseWidgetEventBus.newInstance());
            },
            set: function (value) {
                this.$scope.eventChannel = value;
            }
        }
    });

    TableWidgetView.prototype.configureEvents = function () {
        var self = this;
        var eventChannel = self.eventChannel;
        eventChannel.onReloadCommandReceived(self.onReloadCommandReceived.bind(self));
        eventChannel.onExpandingWidget(self.renderChart.bind(self));

        self.fn.sortColumnBy = function (column, $event) {
            var columnKey = column.key;
            if(!self.sortingState.column || (self.sortingState.column.key !== columnKey)){
                self.sortingState.asc = false;
            }
            self.sortingState.column = column;
            self.sortingState.asc = !self.sortingState.asc;
            self.sortingState.desc = !self.sortingState.asc;
            self.renderChart();
        };

        self.fn.toggleColumn = function (column, $event) {
            // prevent the popup from disappearing
            if ($event && $event.stopPropagation){
                $event.stopPropagation();
            }
            self.data.columns.forEach(function (col) {
                if (col.key === column.key) {
                    col.visible = !col.visible;
                }
            });
            self.renderChart();
        };

        self.fn.restoreColumnDisplay = function () {
            self.data.columns.forEach(function (column) {
                column.visible = true;
            });
            self.renderChart();
        };

        self.fn.secondsToTime = function (totalSeconds) {
            return self._secondsToHM(totalSeconds);
        };

        self.fn.tableInit = function() {
          setTimeout(function(){
            $('.userColumnLink').mouseover(function () {
              var icon = $(this).find('.glyphicon.glyphicon-filter');
              icon.css('visibility', 'visible');
            });
            $('.userColumnLink').mouseout(function () {
              var icon = $(this).find('.glyphicon.glyphicon-filter');
              icon.css('visibility', 'hidden');
            });
          }, 3000);
        };

        self.fn.singleSelectUser = function(row) {
            UserTreeListEventBus.getInstance().fireSelectSingleNode({
                Id: row.Id
            });
        };

        var decimalsFormat = function(decimals, optionalDecimals){
          var format = '0,0';
          if(optionalDecimals===true) {
            format += '[.]';
          } else {
            format += '.';
          }
          decimals = decimals===undefined ? 2 : decimals;
          while(decimals>0) {
            format += '0';
            decimals--;
          }
          return format;
        };

        self.fn.localizeFloat = function(value, nDecimals, optionalDecimals) {
          return isNaN(value) ? '0' : numbro(value).format(decimalsFormat(nDecimals, optionalDecimals));
        };

        self.fn.localizeInt = function(value) {
          return isNaN(value) ? '0' : numbro(value).format(decimalsFormat(0));
        };

        /**
         *
         * Doughnut drawing
         */

        var _toRadians = function(deg) {
            return deg * Math.PI / 180;
        };
        var canvas = document.createElement('canvas');
        var wh = 72;
        canvas.width = wh;
        canvas.height = wh;
        var ctx = canvas.getContext('2d');
        var context = ctx;

        var X = wh/2;
        var Y = wh/2;
        var outterRadius = 36;
        var innerRadius = 26;
        function drawDonut(sRadian, eRadian){

            context.beginPath();
            context.arc(X, Y, outterRadius, sRadian, eRadian, false); // Outer: CCW
            context.arc(X, Y, innerRadius, eRadian, sRadian, true); // Inner: CW
            context.closePath();

            // add shadow
            //addShadow();

            context.fill();
        }

        /*function addShadow(){
            context.shadowColor = "#333";
            context.shadowBlur = 3;
            context.shadowOffsetX = 0;
            context.shadowOffsetY = 0;
        }*/

        function setRadialGradient(sgc, bgc){
            var grd = context.createRadialGradient(X, Y, innerRadius + 5, X, Y, outterRadius);
            grd.addColorStop(0,sgc);
            grd.addColorStop(1,bgc);
            context.fillStyle = grd;
        }

        self.fn.generateDoughnutImageData = function (score) {
            ctx.clearRect(0, 0, wh, wh);
            var percent = score * 10;
            var percent360 = percent * (360/100);

            if(score === 0){
                // BELOW
                setRadialGradient("#91B7DA", "#91B7DA");
                drawDonut(0, _toRadians(360));
            } else {
                // BELOW
                setRadialGradient("#91B7DA", "#91B7DA");
                drawDonut(_toRadians(percent360 - 90), _toRadians(-90));

                // AVOBE
                setRadialGradient("#226EB4", "#226EB4");
                drawDonut(_toRadians(-90), _toRadians(percent360 - 90));
            }

            ctx.font = '16px Roboto';
            ctx.fillStyle = '#000000';
            ctx.textBaseline = "middle";
            ctx.textAlign = 'center';
            var p = (score).toFixed(1);
            if(p.substr(-2) === '.0'){
                p = p.split(".")[0];
            }
            ctx.fillText(p, wh/2, wh/2);

            var imageData = canvas.toDataURL('image/png');
            return imageData;
        };

        self.event.parseData = function(){};
    };



    TableWidgetView.prototype._secondsToHM = function (secs) {
        if(secs===0){
            return "0";
        }

        var t = this._secondsDescomposition(secs);
        return t.h + "h " +
            t.m + "m";
    }

    TableWidgetView.prototype._secondsDescomposition = function (secs) {
        var sec_num = parseInt(secs, 10);
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
        return {
            h: hours,
            m: minutes,
            s: seconds
        };
    };

    TableWidgetView.prototype.renderChart = function () {
        var self = this;
        if(self.sortingState.column) {
            var key = self.sortingState.column.key;
            var numberSortFunction = function(_a, _b) {
                var a = parseFloat(_a[key]);
                var b = parseFloat(_b[key]);
                if (a === b) { return 0; }
                return (a < b) ? -1 : 1;
            };
            var stringSortFunction = function(a, b) {
                a = a[key].toLowerCase(); b = b[key].toLowerCase();
                if(a < b) {return -1;}
                if(a > b) {return 1;}
                return 0;
            };
            if( ['int','float','seconds', 'doughnut'].indexOf(self.sortingState.column.type) > -1 ){
                self.data.data.sort(numberSortFunction);
            } else {
                self.data.data.sort(stringSortFunction);
            }
            if(self.sortingState.desc) {
                self.data.data.reverse();
            }
        }
        self.dataSource = self.data.data;
        
        for (var i = 0; i < self.dataSource.length; i++) {
          self.dataSource[i].PhotoUrl = self.dataSource[i].PhotoUrl.replace(/\+/g, '%2b');
        }
    };


    TableWidgetView.prototype.onReloadWidgetSuccess = function (data) {
        var self = this;
        if(data && data.length > 0) {
            var res = this.event.parseData(data, this.widget.option);
            self.data.data = self.precalculateCellRendererData(res.data);
            self.data.columns = res.columns;
            // self.data.columns.sort(function (a, b) {
            //     if (a.order > b.order) { return 1; }
            //     if (a.order < b.order) { return -1; }
            //     return 0;
            // });
        } else {
            self.data.data = [];
        }

        self.renderChart();
    };


    TableWidgetView.prototype.precalculateCellRendererData = function (data) {
        var self = this;
        data.forEach(function(item){
            if('ActivityScore' in item){
                item.$doughnut_cellData = self.fn.generateDoughnutImageData(item.ActivityScore);
            }
        });
        return data;
    };

    TableWidgetView.prototype.onMoveWidgetSuccess = function (data) {
    };


    TableWidgetView.prototype.onMoveWidgetError = function (error) {
        this.showError(error);
    };


    TableWidgetView.newInstance = function ($scope, $element, $viewRepAspect, $logErrorAspect) {
        var view = new TableWidgetView($scope, $element);
        return view._injectAspects($viewRepAspect, $logErrorAspect);
    };

    return TableWidgetView;
});
