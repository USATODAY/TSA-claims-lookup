define(function(){

this["templates"] = this["templates"] || {};

this["templates"]["app.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="wrap mobile-wrap" id="iapp-app" ng-controller="SearchController as search" ng-click="isFormOpen = false">\n\n    <div class="panel-inner-wrap">\n      <div class="mobile-back-bar"></div>\n      <div class="inner-wrap">\n        <h2 class="mobile-head">TSA Claims</h2>\n        <h3 class="sub-head">Search for claims at your airport</h3>\n      </div>\n      \n      <div class="inner-wrap">\n        <div id="search_cont" class="pull-left" >\n          <input type="text" class="form-control" id="company_search_box" placeholder="Enter your airport here" ng-model="filterTerm"  ng-change="search.mobileSearch()" >\n          <!-- <div class="clear-button" ng-click ="search.clear()"><img src="img/close-icon.svg" alt=""></div> -->\n          <ul class="list-group" ng-show="isFormOpen" id="search_results" ng-focus="isFormOpen = True">\n              <li class="list-group-item ng-cloak" ng-repeat="airport in filteredArray" ng-click="setFocus(airport)">\n                  <h3 class="search-name">{{airport.Airport_Name}}</h3>\n                  <h4 class="search-detail">{{airport.State}}</h4>\n                  \n              </li>\n          </ul>\n          <div class="mobile-company-info-box">Use the search box above to find your airport.</div>\n            </div>\n      </div>\n      \n      <div class="panel-wrap" ng-show="isDetailShow">\n        <div class="panel-info inner-wrap">\n            <h3 class="data-head" id="panel-head">{{current.Airport_Name}}</h3>\n            <h4 class="data-sub" id="panel-sub">{{current.State}}</h4>\n          </div>\n          <div class="data-chart"></div>\n          <div class="data-group inner-wrap group">\n            <h2 class="total-number">{{current.Total_Claims}}</h2>\n            <h2 class="total-label">Total Claims</h2>\n            \n            <div class="sub-group">\n              <h4 class="data-number">{{current.Approved_or_Settled}}</h4>\n              <h3 class="section-head">Claims approved or settled</h3>\n              \n            </div>\n            <div class="sub-group">\n              <h4 class="data-number">$ {{current.Total_Paid}}</h4>\n              <h3 class="section-head incident-label" ng-click="showInfo()">Total Paid</h3>\n              \n            </div>\n             \n          </div>\n        <div class="inner-wrap buttom-buttons">\n          <div class="info-button" ng-click="showInfo()"><img src="http://www.gannett-cdn.com/experiments/usatoday/2014/11/airport-interactive/img/info.svg" alt="info" ></div>\n          <a href="#" target="_blank" class="article-button button" >Read Story</a>\n          <div class="share-button" ng-click="showShare()"><img src="http://www.gannett-cdn.com/experiments/usatoday/2014/11/airport-interactive/img/options.svg" alt="share" ></div>\n        </div>\n      </div>      \n    </div>\n    <div class="share-page">\n        <div class="share-close-button" ng-click="hideShare()"><img src="http://www.gannett-cdn.com/experiments/usatoday/2014/11/airport-interactive/img/close.svg" alt="close" class="close-icon"></div>\n        <h2 class="share-title">Share</h2>\n        <p class="share-copy">{{share.copy}}</p>\n        <div class="iapp-share-buttons">\n            <a href="https://twitter.com/intent/tweet?url={{share.twitterShare}}&text={{share.encodedShare}}{{ share.twitterShareImage }}" ng-click="shareClick($event)" class="iapp-share-button iapp-share-twitter iapp-share-popup" target="_blank"><img src="http://www.gannett-cdn.com/experiments/usatoday/2015/06/emoji-index/img/twitter.svg" alt="Twitter share"></a>\n            <a href="https://www.facebook.com/dialog/feed?display=popup&app_id={{share.fb_id}}link={{share.fbShare}}&picture={{share.stillimage}}&name=&description={{share.encodedShare}}&redirect_uri={{share.fb_redirect}}" ng-click="shareClick($event)"  class="iapp-share-button iapp-share-facebook iapp-share-popup" target="_blank"><img src="http://www.gannett-cdn.com/experiments/usatoday/2015/06/emoji-index/img/fb.svg" alt="Facebook share"></a>\n        </div>\n            \n          </a>\n      \n      </div>\n    <div class="info-page">\n      <div class="info-close-button" ng-click="hideInfo()"><img src="http://www.gannett-cdn.com/experiments/usatoday/2014/11/airport-interactive/img/close.svg" alt="close" class="close-icon"></div>\n      <h2 class="info-title share-title">Info</h2>\n      <p class="info-text">Info Paragraph</p>\n      <h2 class="info-title share-title">Credits</h2>\n      <p class="info-text">Nicholas Penzenstadler, John Kelly, Mitchell Thorson USA TODAY</p>\n      <p class="info-text"><strong>Source: </strong> FAA</p>\n      <p class="info-text"><strong>Photo Credits: </strong>KARIM SAHIB/AFP/Getty Images</p>\n    </div>\n\n  </div>\n';

}
return __p
};

this["templates"]["template.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<h3>' +
((__t = (test)) == null ? '' : __t) +
'</h3>\n';

}
return __p
};

  return this["templates"];

});