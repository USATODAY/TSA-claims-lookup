define(
  [
    'jquery',
    'underscore',
    'angular',
    'd3',
    'templates',
    'api/analytics'
  ],
  function(jQuery, _, angular, d3, templates, Analytics) {

    var blnIframeEmbed = window != window.parent;
    var hostname = window.location.hostname;

    var dataURL;

    if ((hostname == "localhost" || hostname == "10.0.2.2")) {
        dataURL = 'data/data.json';
    } else {


        dataURL = "http://" + hostname + "/services/webproxy/?url=http://www.gannett-cdn.com/experiments/usatoday/2015/06/tsa/data/data.json";

    }


      angular.module('dataSearch', [])
        .controller('SearchController', ['$http', '$scope', '$filter', '$location', function($http, $scope, $filter, $location) {

      $scope.companies = [];

      $http.get(dataURL).then(function(data) {
        $scope.data = data.data;
        window.setTimeout(function() {
          $(".preloader-mobile").eq(0).fadeOut(500);
        }, 1000);

        if ($location.path().length > 0) {
          var airport_code = $location.path().substr(1);

          var result = $filter("filter")($scope.data, {
            Airport_Code: airport_code
          }, false);

          $scope.initial = result[0];
          $scope.setFocus(result[0]);
          $(".mobile-company-info-box").hide();
        }
      });



      this.blur = function() {
        $scope.filterTerm = "";
      };

      $scope.isDetailShow = false;

      $scope.setFocus = function(focusItem) {
        Analytics.trackEvent("Airport selected");
        // mobile.currentFocus = focusItem;
        // mobile.setPanelInfo(focusItem);
        $scope.setShare(focusItem);
        $location.path(focusItem.Airport_Code);
        $scope.current = focusItem;
        $scope.chart($scope.current);
        $scope.isDetailShow = true;

        $scope.isFormOpen = false;



        //set the filter term to be the full company name of the company selected
        // $scope.filterTerm = company.name;
        $scope.filterTerm = "";



        jQuery(window).on("resetSearch", function() {
          $scope.filterTerm = "";

          // mobile.searchCont.find("input").val("");
        });


      };

      $scope.showShare = function() {
        $(".panel-inner-wrap").addClass("blur");
        $(".share-page").addClass("show");
      };

      $scope.hideShare = function() {
        $(".panel-inner-wrap").removeClass("blur");
        $(".share-page").removeClass("show");
      };

      $scope.showInfo = function() {
        $(".panel-inner-wrap").addClass("blur");
        $(".info-page").addClass("show");
      };

      $scope.hideInfo = function() {
        $(".panel-inner-wrap").removeClass("blur");
        $(".info-page").removeClass("show");
      };

      this.clear = function() {
        $scope.filterTerm = "";
        this.setPanelInfo(null);
      };

      this.setPanelInfo = function(data) {
        console.log(data);
      };

      $scope.chart = function(current) {

        data = [current["2010"], current["2011"], current["2012"], current["2013"], current["2014"]];


        $el = $(".data-chart");
        $el.empty();

        var width = $(".mobile-wrap").width();


        var ratio = 16 / 9;
        var height = width / ratio;
        var padding = width * 0.1;

        var margin = {
          top: padding,
          left: padding,
          right: padding,
          bottom: padding + 30
        };

        var legendR = 5;

        var x = d3.scale.linear()
          .range([padding, width - padding]);

        var y = d3.scale.linear()
          .range([height - margin.bottom, padding]);

        var xAxis = d3.svg.axis()
          .scale(x)
          .tickFormat(function(d, i) {
            return "'" + (d + 9);

          })
          .orient("bottom")
          .ticks(5);

        var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .ticks(5);



        var line = d3.svg.line()
          .x(function(d, i) {
            return x(i + 1);
          })
          .y(function(d) {
            return y(d);
          });

        var svg = d3.select(".data-chart").append("svg")
          .attr("width", width)
          .attr("height", height);



        svg.append("rect")
          .attr("width", width)
          .attr("height", height)
          .attr("fill", " #E6E6E6");


        x.domain([1, 5]);
        y.domain([0, 250]);

        // function for the x grid lines
        function make_x_axis() {
          return d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .ticks(5);
        }

        // function for the y grid lines
        function make_y_axis() {
          return d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(5);
        }



        // Draw the y Grid lines
        svg.append("g")
          .attr("class", "grid")
          .attr("transform", "translate(" + margin.left + ", 0)")
          .call(make_y_axis()
            .tickSize(-(width - (margin.left + margin.right)), 0, 0)
            .tickFormat("")
          );

        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + (height - margin.bottom) + ")")
          .call(xAxis);

        svg.append("g")
          .attr("class", "y axis")
          .attr("transform", "translate(" + padding + ", 0)")
          .call(yAxis)
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .attr("fill", "#6D6E70")
          .style("text-anchor", "end");

        svg.append("path")
          .datum(data)
          .attr("class", "line")
          .attr("d", line)
          .attr("stroke-linejoin", "round")
          .attr("stroke-linecap", "round")
          .style("stroke", "#1B9CFA");

      };

      $(window).on("resize", function(e) {
        if ($scope.isDetailShow === true) {
          $scope.chart($scope.current);
        }

      });



      this.mobileSearch = function() {
        // Analytics.trackEvent("Typed in search box");
        // mobile.panelWrap.eq(0).hide();
        $scope.isDetailShow = false;
        console.log($scope.data);

        // var numberResults = $(".list-group-item").length;

        $scope.filteredArray = $filter("filter")($scope.data, {
          $: $scope.filterTerm
        }, false);

        console.log($scope.filteredArray);

        if ($scope.filteredArray.length === 0) {
          $(".mobile-company-info-box").show();
        } else {
          $(".mobile-company-info-box").hide();
        }

        if ($scope.filterTerm !== "") {
          // mobile.currentFocus = null;
          $scope.isFormOpen = true;
        } else {
          $scope.isFormOpen = false;
          $(".mobile-company-info-box").show();
        }
      };

      $scope.setShare = function(airportObj) {
        var copy,
          encodedURL,
          encodedURL2,
          encodedStr;

        var encodedBaseURL = encodeURIComponent("http://www.gannett-cdn.com/experiments/usatoday/2014/11/airport-interactive/");

        if (airportObj) {
          copy = airportObj.code + " has experienced " + airportObj.tot + " collision hazard incidents on its runways over the last 12 years. Read more:";
          encodedURL = encodeURIComponent("http://www.gannett-cdn.com/experiments/usatoday/2014/11/airport-interactive/" + "#/" + airportObj.code);
          encodedURL2 = encodeURI("http://www.gannett-cdn.com/experiments/usatoday/2014/11/airport-interactive/");
          encodedStr = encodeURIComponent(copy);
        } else {
          encodedURL = encodeURIComponent("http://www.gannett-cdn.com/experiments/usatoday/2014/11/airport-interactive/");
          encodedURL2 = encodeURI("http://www.gannett-cdn.com/experiments/usatoday/2014/11/airport-interactive/" + "#/" + airportObj.code);
          encodedStr = encodeURIComponent(copy);
        }

        var encodedTitle = encodeURIComponent("Hazards on the runway");
        var fbRedirectUrl = encodeURIComponent("http://www.gannett-cdn.com/usatoday/_common/_dialogs/fb-share-done.html");

        var tweetUrl = "https://twitter.com/intent/tweet?url=" + encodedURL + "&text=" + encodedStr + "";

        var fbUrl = "javascript: var sTop=window.screen.height/2-(218);var sLeft=window.screen.width/2-(313);window.open('https://www.facebook.com/dialog/feed?display=popup&app_id=215046668549694&link=" + encodedURL2 + "&picture=http://www.gannett-cdn.com/experiments/usatoday/2014/11/airport-interactive/img/fb-post.jpg&name=" + encodedTitle + "&description=" + copy + "&redirect_uri=http://www.gannett-cdn.com/experiments/usatoday/_common/_dialogs/fb-share-done.html','sharer','toolbar=0,status=0,width=580,height=400,top='+sTop+',left='+sLeft);Analytics.trackEvent('Facebook share');void(0);";


        var emailURL = "mailto:?body=" + encodedStr + "%0d%0d" + encodedURL + "&subject=" + encodedTitle;

        $scope.share = {
          copy: copy,
          tweetUrl: tweetUrl,
          fbUrl: fbUrl,
          emailURL: emailURL
        };
      };
    }]);

    return {
      init: function() {
        jQuery(".iapp-page-wrap").append(templates["app.html"]());
        angular.bootstrap(document.getElementById('iapp-app'), ['dataSearch']);

      }
    };

  });
