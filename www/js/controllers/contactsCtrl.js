'use strict';

var ContactsCtrl = function($scope, userService, $http) {
  $scope.find = function() {
    navigator.contacts.find(["phoneNumbers"],function(contacts) {
      var contactsObj = {contacts: contacts};
      $http.post(userService.oaktreeUrl+'user/phonefind/', JSON.stringify(contactsObj))
        .success(function(contacts, status){
          // $scope.contacts = contacts;
          // console.log('friends', contacts);
          $scope.users = contacts;
          var matchUserObj = {};
          for (var j = 0; j < $scope.users.length; j++){
            if (userService.currentUser._id === $scope.users[j]._id){
              $scope.users.splice(j, 1);
            } else {
              matchUserObj[$scope.users[j]._id] = j;
            }
          }
          for (var i = 0; i < userService.currentUser.friends.length; i++){
            if (matchUserObj[userService.currentUser.friends[i]._id]){ // if the userId is in the match user Obj
              $scope.users[matchUserObj[userService.currentUser.friends[i]._id]].added = 1; // find array slot. add a new property to it. array slot j.
            }
          }
        })
        .error(function(response, status){
          console.log('error on contacts', response);
        });
    },function(e){console.log("Error finding contacts " + e.code);},{multiple: true});
  };
};