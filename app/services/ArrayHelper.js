/**
 * Created by justin on 5/17/15.
 */
app.registerService(function (container) {

    var _ = container.getFunction("underscore");

    var flatten = function (array, nestedProp, target) {
        if (!target) target = [];

        array.forEach(function (arr) {
            if (Array.isArray(arr[nestedProp])) {
                flatten(arr[nestedProp], nestedProp, target);
                delete arr[nestedProp];
            }

            target.push(arr);
        });

        return target;
    };

    var findParents = function (flattenedArray, parentKey, elementIdentifier, parentValue, rootValue, output) {
        if (!output) output = [];

        if (parentValue == rootValue) {
            return output;
        }

        var filtered = _.filter(flattenedArray, function (node) {
            return node[elementIdentifier] == parentValue;
        });

        var newFlatten = _.filter(flattenedArray, function (node) {
            return _.find(output, function (n) {
                    return n[elementIdentifier] == node[elementIdentifier];
                }) === undefined;
        });

        output = filtered.concat(output);

        filtered.forEach(function (node) {
            output = findParents(newFlatten, parentKey, elementIdentifier, node[parentKey], rootValue, output);
        });

        return output;
    };

    var queryTree = function (array, nestedProp, propToQuery, queryString, sortBy, makeTreeAfterSearch, parentKey, elementIdentifier, rootValue) {
        var newArray = clone(array);
        var flattened = flatten(newArray, nestedProp);

        var sortFunction = function (nodeBefore, nodeAfter) {
            return nodeBefore[sortBy] - nodeAfter[sortBy];
        };

        var queriedNodes = flattened.filter(function (node) {
            return node[propToQuery].toLowerCase().indexOf(queryString.toLowerCase()) > -1;
        }).sort(sortFunction);

        if (!makeTreeAfterSearch)
            return queriedNodes;

        var allNodes = [];
        queriedNodes.forEach(function (node) {
            allNodes = findParents(flattened, parentKey, elementIdentifier, node[parentKey], rootValue, allNodes);
        });
        allNodes = _.uniq(allNodes.concat(queriedNodes)).sort(sortFunction);

        return makeTree(allNodes, parentKey, elementIdentifier, nestedProp, rootValue);
    };

    var clone = function (array) {
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
        clone: clone,
        findParents: findParents
    };
});