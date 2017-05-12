
var app = angular.module('rkApp', []);

app.controller('TodoListController', ['$scope', function($scope) {

    $scope.table = [];

    // default values

    $scope.equation = "2 + y - x";
    $scope.loops = 4;
    $scope.stepsize = 0.0001;
    $scope.xstart = 0;
    $scope.ystart = 2;

    //  evaluate the input equation

    $scope.runEquation = function(x, y){
        var varScope = {
            x: parseFloat(x),
            y: parseFloat(y),
        }

        var eqTotal = math.eval($scope.equation, varScope);
        return eqTotal;
    }

    // K1 to k4 definitions

    $scope.kOne = function(xn, yn){
        return $scope.runEquation(xn, yn);
    };

    $scope.kTwo = function(xn, yn, h, kOne){
        var xnResult = xn + (h/2);
        var ynResult = yn + ((h/2) * kOne);
        return $scope.runEquation(xnResult, ynResult);
    };

    $scope.kThree = function(xn, yn, h, kTwo){
        var xnResult = xn + (h/2);
        var ynResult = yn + ((h/2) * kTwo);
        return $scope.runEquation(xnResult, ynResult);
    };

    $scope.kFour = function(xn, yn, h, kThree){
        var xnResult = xn + h;
        var ynResult = yn + (h * kThree);
        return $scope.runEquation(xnResult, ynResult);
    };

    // Defines Y+1 and fill the table

    $scope.yIteration = function(xvalue, yvalue, pass){

        var kone = $scope.kOne(xvalue, yvalue);
        var ktwo = $scope.kTwo(xvalue, yvalue, pass, kone);
        var kthree = $scope.kThree(xvalue, yvalue, pass, ktwo);
        var kfour = $scope.kFour(xvalue, yvalue, pass, kthree);

        var resKpart = (kone + (2 * ktwo) + (2 * kthree) + kfour);
        var res = yvalue + ((pass / 6) * resKpart);

        var kList = {kone: kone, ktwo: ktwo, kthree: kthree, kfour:kfour};

        $scope.table.push({xn: xvalue, yn: yvalue, ynPlusOne: res, kList: kList});
    };

    // principal function with the main loop

    $scope.start = function(){

        $scope.table = [];

        var iterations = ($scope.ystart - $scope.xstart) /  parseFloat($scope.stepsize);

        for (var i = 0; i < iterations; i++) {

            if(i == 0)
                $scope.yIteration(parseFloat($scope.xstart), parseFloat($scope.ystart), parseFloat($scope.stepsize), parseInt(i)+1);
            else
                $scope.yIteration(parseFloat($scope.table[i-1].xn) + parseFloat($scope.stepsize), parseFloat($scope.table[i-1].ynPlusOne), parseFloat($scope.stepsize));
        }

    };

  }]);
