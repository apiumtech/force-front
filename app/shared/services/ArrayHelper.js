/**
 * Created by justin on 5/17/15.
 */
define([
    'underscore'
], function (_) {
    'use strict';

    var flatten = function (array, nestedProp, target) {
        if (!target){
            target = [];
        }

        array.forEach(function (arr) {
            if (Array.isArray(arr[nestedProp])) {
                flatten(arr[nestedProp], nestedProp, target);
                delete arr[nestedProp];
            }

            target.push(arr);
        });

        return target;
    };

    var findParents = function (flattenedArray, parentKey, elementIdentifier, parentValue, rootValue, output, notRecursive) {
        if (!output) {
            output = [];
        }

        if (parentValue == rootValue) {
            return output;
        }

        for(var key in flattenedArray) {
          if (flattenedArray[key][elementIdentifier] == parentValue) {
            output.unshift(flattenedArray[key]);
            output = findParents(flattenedArray, parentKey, elementIdentifier, flattenedArray[key][parentKey], rootValue, output);
            break;
          }
        }

        return output;
    };

    var removeAccents = function(lowercaseString){
        return lowercaseString
                    .replace( /[áàäâ]/g, 'a' )
                    .replace( /[éèëê]/g, 'e' )
                    .replace( /[íìïî]/g, 'i' )
                    .replace( /[óòöô]/g, 'o' )
                    .replace( /[úùüû]/g, 'u' );
    };

    var queryFlatTree = function (flattened, nestedProp, propToQuery, queryString, sortBy, makeTreeAfterSearch, parentKey, elementIdentifier, rootValue) {
        var sortFunction;
        if(String.prototype.localeCompare) {
            sortFunction = function(a,b){
                return a[sortBy].localeCompare(b[sortBy]);
            };
        } else {
            sortFunction = function (a, b) {
                //return a[sortBy] - b[sortBy]; // --> Numbers
                if(a[sortBy] < b[sortBy]){ return -1; }
                if(a[sortBy] > b[sortBy]){ return 1; }
                return 0;
            };
        }

        var queriedNodes;
        if(queryString && queryString !== ""){
            queriedNodes = flattened.filter(function (node) {
                return removeAccents(node[propToQuery].toLowerCase())
                            .indexOf(removeAccents(queryString.toLowerCase())) > -1;
            });
        } else {
            queriedNodes = flattened;
        }

        if (!makeTreeAfterSearch){
            return queriedNodes;
        }

        var allNodes = [];
        queriedNodes.forEach(function (node) {
            allNodes = findParents(flattened, parentKey, elementIdentifier, node[parentKey], rootValue, allNodes);
        });
        allNodes = _.uniq(allNodes.concat(queriedNodes));

        return allNodes;
    };

    var queryTree = function (array, nestedProp, propToQuery, queryString, sortBy, makeTreeAfterSearch, parentKey, elementIdentifier, rootValue) {
        var allNodes = queryFlatTree(array, nestedProp, propToQuery, queryString, sortBy, makeTreeAfterSearch, parentKey, elementIdentifier, rootValue);
        return makeTree(allNodes, parentKey, elementIdentifier, nestedProp, rootValue);
    };

    var clone = function (array) {
        array = array || [];
        return JSON.parse(JSON.stringify(array));
    };

    var makeTree = function (array, parentKey, elementIdentifier, nestedKey, rootValue) {
        var groupedData = _.groupBy(array, function (record) {
            return record[parentKey];
        });

        _.each(groupedData, function (value, key) {
            _.each(value, function (record) {
                if (groupedData['' + record[elementIdentifier] + '']) {
                    record[nestedKey] = groupedData['' + record[elementIdentifier] + ''];
                }
            });
        });

        return clone(groupedData[rootValue]);
    };

    return {
        flatten: flatten,
        makeTree: makeTree,
        queryTree: queryTree,
        queryFlatTree: queryFlatTree,
        clone: clone,
        findParents: findParents
    };
});
