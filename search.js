var app = angular.module('regexDict', [])
app.controller('regexSearch', function($scope, $http) {
	$scope.search = function () {
		if (/[a-z]/i.test($scope.pattern)) $http({
			method: 'GET',
			url: '/search',
			params: {
				pattern: $scope.pattern,
				results: 20
			}
		}).then(function (response) {
			console.log(response);
			$scope.searchTerms = response.data.value
		})
		else {
			$scope.searchTerms = [];
			$scope.$apply();
		}
	}
}).directive('searchBar', function () {
	return {
		restrict: 'E',
		replace: true,
		template:
		`<form class="container">
			<div class="row">
		        <div class="col-md-8 col-lg-8">
		            <div id="custom-search-input">
		                <div class="input-group col-md-12 col-lg-12">
												<label class="slash text-muted">/</label>
		                    <input id="pattern" type="text" class="input-lg"
												autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
												ng-model="pattern" placeholder="insert your regular expression"/>
												<label class="slash text-muted">/i</label>
												<span class="input-group-btn">
		                        <button class="btn btn-info btn-lg" type="button">
		                            <i class="glyphicon glyphicon-search"></i>
		                        </button>
		                    </span>
		                </div>
		            </div>
		        </div>
			</div>
			<br>
			<div class="row">
				<div class="col-md-8 col-lg-8">
					<ul class="list-group">
						<li class="list-group-item" ng-repeat="i in searchTerms">
							<a data-toggle="modal" data-target="#{{i.key}}">{{i.key}}</a>
							<div id="{{i.key}}" class="modal fade">
								<div class="modal-dialogue">
									<div class="modal-content">
										<div class="modal-header">
											<button type="button" class="close" data-dismiss="modal">&times;</button>
											<h4 class="modal-title">{{i.key}}</h4>
										</div>
										<div class="modal-body">
											<p>{{i.definition}}</p>
										</div>
										<div class="modal-footer">
											<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
										</div>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</form>`,
		link: function (scope, elem, attr) {
				elem.bind('keyup', function (e) {
					try {
						new RegExp(scope.pattern)
						$('#custom-search-input').removeClass('bg-danger', 250, 'easeOut')
						$('input[type=text]').removeClass('bg-danger', 250, 'easeOut')
						scope.search()
					} catch (e) {
						console.log('test2');
						$('#custom-search-input').addClass('bg-danger', 250, 'easeOut')
						$('input[type=text]').addClass('bg-danger', 250, 'easeOut')
					}
				})
			}
	};
});
