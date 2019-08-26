/*
	@license Angular Treeview version 0.1.6
	? 2013 AHN JAE-HA http://github.com/eu81273/angular.treeview
	License: MIT


	[TREE attribute]
	angular-treeview-sub: the treeview directive
	tree-id-sub : each tree's unique id.
	tree-model-sub : the tree model on $scope.
	node-id-sub : each node's id
	node-label-sub : each node's label
	node-children-sub: each node's children

	<div
		data-angular-treeview-sub="true"
		data-tree-id-sub="tree"
		data-tree-model-sub="roleList"
		data-node-id-sub="roleId"
		data-node-label-sub="roleName"
		data-node-children-sub="children" >
	</div>
*/

(function (angular) {
    'use strict';

    angular.module('angularTreeviewSub', []).directive('treeModelSub', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                //tree id
                var treeIdSub = attrs.treeIdSub;

                //tree model
                var treeModelSub = attrs.treeModelSub;

                //node id
                var nodeIdSub = attrs.nodeIdSub || 'id';

                //node label
                var nodeLabelSub = attrs.nodeLabelSub || 'label';

                //children
                var nodeChildrenSub = attrs.nodeChildrenSub || 'children';

                //tree template
                var template =
                    '<ul>' +
                    '<li data-ng-repeat="node in ' + treeModelSub + '">' +
                    '<i class="collapsed" data-ng-show="node.' + nodeChildrenSub + '.length && node.collapsed" data-ng-click="' + treeIdSub + '.selectNodeHeadSub(node)"></i>' +
                    '<i class="expanded" data-ng-show="node.' + nodeChildrenSub + '.length && !node.collapsed" data-ng-click="' + treeIdSub + '.selectNodeHeadSub(node)"></i>' +
                    '<i class="normal" data-ng-hide="node.' + nodeChildrenSub + '.length"></i> ' +
                    '<span data-ng-click="' + treeIdSub + '.selectNodeLabelSub(node)"><span data-ng-class="{selectedClass:node.ID==SubTreeId}">{{node.' + nodeLabelSub + '}}</span></span>' +
                    '<div data-ng-show="node.collapsed" data-tree-id-sub="' + treeIdSub + '" data-tree-model-sub="node.' + nodeChildrenSub + '" data-node-id-sub=' + nodeIdSub + ' data-node-label-sub=' + nodeLabelSub + ' data-node-children-sub=' + nodeChildrenSub + '></div>' +
                    '</li>' +
                    '</ul>';


                //check tree id, tree model
                if (treeIdSub && treeModelSub) {

                    //root node
                    if (attrs.angularTreeviewSub) {

                        //create tree object if not exists
                        scope[treeIdSub] = scope[treeIdSub] || {};

                        //if node head clicks,
                        scope[treeIdSub].selectNodeHeadSub = scope[treeIdSub].selectNodeHeadSub || function (selectedNode) {

                            //Collapse or Expand
                            selectedNode.collapsed = !selectedNode.collapsed;
                        };

                        //if node label clicks,
                        scope[treeIdSub].selectNodeLabelSub = scope[treeIdSub].selectNodeLabelSub || function (selectedNode) {

                            //remove highlight from previous node
                            if (scope[treeIdSub].currentNode && scope[treeIdSub].currentNode.selectedSub) {
                                scope[treeIdSub].currentNode.selectedSub = undefined;
                            }

                            //set highlight to selected node
                            selectedNode.selectedSub = 'selected';

                            //set currentNode
                            scope[treeIdSub].currentNode = selectedNode;
                        };
                    }

                    //Rendering template.
                    element.html('').append($compile(template)(scope));
                }
            }
        };
    }]);
})(angular);
