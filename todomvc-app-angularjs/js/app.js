(function (angular) {
	'use strict';

	// Your starting point. Enjoy the ride!
	/**
	 * MyTodoMvc Module
	 * 应用程序的主要模块
	 */
	var myApp = angular.module('MyTodoMvc', []);
	//注册一个主要的控制器
	myApp.controller('MainController', ['$scope', function ($scope) {
		//文本框需要的模型

		$scope.text = '';
		switch (location.hash) {
			case '#/active':
			$scope.completed = false;
				break;
			case '#/completed':
			$scope.completed = true;
				break;
			default:
			$scope.completed = undefined;
				break;
		}

		//任务列表也需要一个
		//每一个任务的结构{id:1 , text:'学习',completed:true}
		$scope.todos= JSON.parse(localStorage.todos?localStorage.todos:"[]");
		//添加todo
		$scope.add = function () {
			if (!$scope.text) return false
			$scope.todos.push({
				//自动增长
				id: $scope.todos.length ? $scope.todos[$scope.todos.length - 1].id + 1 : 1,
				//由于$scope.text是双向绑定的
				text: $scope.text,
				completed: false
			});
			//清空文本框
			$scope.text = '';
		};
		//删除处理
		$scope.remove = function (id) {
			//删除谁
			for (var i = 0; i < $scope.todos.length; i++) {
				if ($scope.todos[i].id === id) {
					$scope.todos.splice(i, 1);
					break;
				}
			}
		};
		//清空已完成
		$scope.clear = function () {
			for (var i = 0; i < $scope.todos.length;) {
				if ($scope.todos[i].completed) {
					$scope.todos.splice(i, 1);
					continue;
				}
				i++;
			}
		};
		//是否有已经完成的
		$scope.existCompleted = function () {
			for (var i = 0; i < $scope.todos.length; i++) {
				if ($scope.todos[i].completed) {
					return true;
				}
			}
			return false;
		};

		//当前编辑的元素
		$scope.currentEditingId = -1;
		$scope.editing = function (id) {
			$scope.currentEditingId = id;
		};
		$scope.save = function () {
			$scope.currentEditingId = -1;
		};

		$scope.num = 0;
		$scope.$watch('todos', function () {
			$scope.num = 0;
			for (var i = 0; i < $scope.todos.length; i++) {
				if (!$scope.todos[i].completed) {
					$scope.num++
				}
			}
			if ($scope.num === 0) {
				$scope.checkall = true;
			} else {
				$scope.checkall = false;
			}
			localStorage.todos = JSON.stringify(angular.copy($scope.todos))
		}, true);

		$scope.checkall = true;
		$scope.toggleAll = function () {
			for (var i = 0; i < $scope.todos.length; i++) {
				$scope.todos[i].completed = !$scope.checkall;
			}
		};
	}])

})(angular);
