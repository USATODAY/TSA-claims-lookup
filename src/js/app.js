define(
  [
    'jquery',
    'underscore',
    'angular',
    'd3',
    'templates',
    'api/analytics',
    'config'
  ],
  function(jQuery, _, angular, d3, templates, Analytics, config) {

    var blnIframeEmbed = window != window.parent;
    var hostname = window.location.hostname;

    var dataURL;

    var defaultShare = "Share Language";

    if ((hostname == "localhost" || hostname == "10.0.2.2")) {
        dataURL = 'data/data.json';
    } else if (hostname == "www.gannett-cdn.com") {
        dataURL = "http://www.gannett-cdn.com/experiments/usatoday/2015/06/tsa/data/data.json";
    } else {


        dataURL = "http://" + hostname + "/services/webproxy/?url=http://www.gannett-cdn.com/experiments/usatoday/2015/06/tsa/data/data.json";

    }


      angular.module('dataSearch', [])
        .controller('SearchController', ['$http', '$scope', '$filter', '$location', 'numberFilter', 'currencyFilter', function($http, $scope, $filter, $location, numberFilter, currencyFilter) {

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

        // var numberResults = $(".list-group-item").length;

        $scope.filteredArray = $filter("filter")($scope.data, {
          $: $scope.filterTerm
        }, false);


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
        var copy;

        if (airportObj) {
            copy = "TSA paid passengers " + currencyFilter(airportObj.Total_Paid) + " for damaged, lost items at " + airportObj.Airport_Code + " over last 5 years. Find out more:";
        } else {
            copy = defaultShare;
        }
        $scope.share = $scope.createShare(copy);
      };

        
      $scope.createShare = function(shareString) {
            var shareURL = window.location.href;
            var fbShareURL = encodeURI(shareURL.replace('#', '%23'));
            var twitterShareURL = encodeURIComponent(shareURL);
            var emailLink = "mailto:?body=" + encodeURIComponent(shareString) +  "%0d%0d" + twitterShareURL + "&subject=";
            
            return {
                'fb_id': config.fb_app_id,
                fbShare:  encodeURI(shareURL.replace('#', '%23')),
                stillimage: "http://www.gannett-cdn.com/experiments/usatoday/2015/05/broadway/images/fb-post.jpg",
                encodedShare: encodeURIComponent(shareString),
                copy: shareString,
                fb_redirect: 'http://' + window.location.hostname + '/pages/interactives/fb-share/',
                email_link: "mailto:?body=" + encodeURIComponent(shareString) +  "%0d%0d" + encodeURIComponent(shareURL) + "&subject=",
                twitterShare: encodeURIComponent(shareURL)
            };

        };

        $scope.shareClick = function(e) {
            Analytics.trackEvent('Page social share button clicked');
            e.preventDefault();
            $scope.windowPopup(e.currentTarget.href, 500, 300);
        };

        $scope.windowPopup = function(url, width, height) {
            // Calculate the position of the popup so
            // it’s centered on the screen.
            var left = (screen.width / 2) - (width / 2),
            top = (screen.height / 2) - (height / 2);

            window.open(
                url,
                "",
                "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left
            );
        };


    }]);

    return {
      init: function() {
        jQuery(".iapp-page-wrap").append(templates["app.html"]());
        if (blnIframeEmbed) {
            console.log("iFrame");
            $("body").addClass("iFrame");
            $("#header").hide();
            $(".mobile-footer-link").hide();
            $(".mobile-company-info-box").hide();
        }
        angular.bootstrap(document.getElementById('iapp-app'), ['dataSearch']);

      }
    };

  });
