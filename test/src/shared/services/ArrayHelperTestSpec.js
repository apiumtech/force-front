/**
 * Created by justin on 5/17/15.
 */

define([
    'shared/services/ArrayHelper'
], function (ArrayHelper) {
    'use strict';
    describe("ArrayHelper", function () {

        describe("flatten", function () {
            it("should return correct flattened array", function () {
                var input = [
                    {
                        "Id": 1,
                        "Name": "Antonio",
                        "children": [{
                            "Id": 3,
                            "Name": "Beck",
                            "IdParent": 1,
                            "checked": false
                        }, {
                            "Id": 4,
                            "Name": "Victoria",
                            "IdParent": 1,
                            "children": [
                                {
                                    "Id": 41,
                                    "Name": "Hank",
                                    "IdParent": 4,
                                    "checked": false
                                },
                                {
                                    "Id": 42,
                                    "Name": "John",
                                    "IdParent": 4,
                                    "checked": false
                                }
                            ],
                            "checked": false
                        }]
                    },
                    {
                        "Id": 2,
                        "Name": "Kevin",
                        "children": [{
                            "Id": 5,
                            "Name": "Thomas",
                            "IdParent": 2,
                            "checked": false
                        }, {
                            "Id": 6,
                            "Name": "Cindy",
                            "IdParent": 2,
                            "children": [
                                {
                                    "Id": 61,
                                    "Name": "Alex",
                                    "IdParent": 6,
                                    "children": [
                                        {
                                            "Id": 611,
                                            "Name": "Tom",
                                            "IdParent": 61,
                                            "checked": false
                                        }
                                    ],
                                    "checked": false
                                }
                            ],
                            "checked": false
                        }]
                    }
                ];

                var expectedOutput = [{
                    "Id": 3, "Name": "Beck", "IdParent": 1, "checked": false
                }, {
                    "Id": 41,
                    "Name": "Hank",
                    "IdParent": 4,
                    "checked": false,
                }, {"Id": 42, "Name": "John", "IdParent": 4, "checked": false}, {
                    "Id": 4,
                    "Name": "Victoria",
                    "IdParent": 1,
                    "checked": false
                }, {"Id": 1, "Name": "Antonio"}, {
                    "Id": 5,
                    "Name": "Thomas",
                    "IdParent": 2,
                    "checked": false
                }, {"Id": 611, "Name": "Tom", "IdParent": 61, "checked": false}, {
                    "Id": 61,
                    "Name": "Alex",
                    "IdParent": 6,
                    "checked": false
                }, {"Id": 6, "Name": "Cindy", "IdParent": 2, "checked": false}, {"Id": 2, "Name": "Kevin"}];

                var actual = ArrayHelper.flatten(input, 'children');
                expect(actual).toEqual(expectedOutput);
            });
        });

        describe("makeTree", function () {
            it("should return correct tree", function () {
                var input = [
                    {
                        "Id": 1,
                        "Name": "A",
                        "IdParent": -1,
                        "isEnvironment": true
                    },
                    {
                        "Id": 2,
                        "Name": "B",
                        "IdParent": -1,
                        "isEnvironment": true
                    },
                    {
                        "Id": 3,
                        "Name": "C",
                        "IdParent": -1,
                        "isEnvironment": true
                    },
                    {
                        "Id": 4,
                        "Name": "D",
                        "IdParent": -1,
                        "isEnvironment": true
                    },
                    {
                        "Id": 5,
                        "Name": "Child of A",
                        "IdParent": 1,
                        "isEnvironment": false
                    },
                    {
                        "Id": 6,
                        "Name": "Child of B 1",
                        "IdParent": 2,
                        "isEnvironment": false
                    },
                    {
                        "Id": 7,
                        "Name": "Child of B 2",
                        "IdParent": 2,
                        "isEnvironment": false
                    },
                    {
                        "Id": 8,
                        "Name": "Child of D 1",
                        "IdParent": 4,
                        "isEnvironment": false
                    },
                    {
                        "Id": 9,
                        "Name": "Child of D 2",
                        "IdParent": 4,
                        "isEnvironment": false
                    },
                    {
                        "Id": 10,
                        "Name": "Child of Child of D 2",
                        "IdParent": 9,
                        "isEnvironment": false
                    },
                    {
                        "Id": 11,
                        "Name": "Child of Child of Child of D 2",
                        "IdParent": 10,
                        "isEnvironment": false
                    }];

                var expected = [
                    {
                        "Id": 1,
                        "Name": 'A',
                        "IdParent": -1,
                        "isEnvironment": true,
                        "children": [
                            {
                                "Id": 5,
                                "Name": "Child of A",
                                "IdParent": 1,
                                "isEnvironment": false
                            }
                        ]
                    },
                    {
                        "Id": 2,
                        "Name": "B",
                        "IdParent": -1,
                        "isEnvironment": true,
                        children: [
                            {
                                "Id": 6,
                                "Name": "Child of B 1",
                                "IdParent": 2,
                                "isEnvironment": false
                            },
                            {
                                "Id": 7,
                                "Name": "Child of B 2",
                                "IdParent": 2,
                                "isEnvironment": false
                            }
                        ]
                    },
                    {
                        "Id": 3,
                        "Name": "C",
                        "IdParent": -1,
                        "isEnvironment": true
                    },
                    {
                        "Id": 4,
                        "Name": "D",
                        "IdParent": -1,
                        "isEnvironment": true,
                        children: [
                            {
                                "Id": 8,
                                "Name": "Child of D 1",
                                "IdParent": 4,
                                "isEnvironment": false
                            },
                            {
                                "Id": 9,
                                "Name": "Child of D 2",
                                "IdParent": 4,
                                "isEnvironment": false,
                                children: [
                                    {
                                        "Id": 10,
                                        "Name": "Child of Child of D 2",
                                        "IdParent": 9,
                                        "isEnvironment": false,
                                        children: [
                                            {
                                                "Id": 11,
                                                "Name": "Child of Child of Child of D 2",
                                                "IdParent": 10,
                                                "isEnvironment": false
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ];

                var actual = ArrayHelper.makeTree(input, 'IdParent', 'Id', 'children', -1);
                expect(actual).toEqual(expected);
            });
        });

        describe("findParents", function () {
            var input = [];
            beforeEach(function () {
                input = [
                    {
                        "Id": 1,
                        "Name": "A",
                        "IdParent": -1,
                        "isEnvironment": true
                    },
                    {
                        "Id": 2,
                        "Name": "B",
                        "IdParent": -1,
                        "isEnvironment": true
                    },
                    {
                        "Id": 3,
                        "Name": "C",
                        "IdParent": -1,
                        "isEnvironment": true
                    },
                    {
                        "Id": 4,
                        "Name": "D",
                        "IdParent": -1,
                        "isEnvironment": true
                    },
                    {
                        "Id": 5,
                        "Name": "Child of A",
                        "IdParent": 1,
                        "isEnvironment": false
                    },
                    {
                        "Id": 6,
                        "Name": "Child of B 1",
                        "IdParent": 2,
                        "isEnvironment": false
                    },
                    {
                        "Id": 7,
                        "Name": "Child of B 2",
                        "IdParent": 2,
                        "isEnvironment": false
                    },
                    {
                        "Id": 8,
                        "Name": "Child of D 1",
                        "IdParent": 4,
                        "isEnvironment": false
                    },
                    {
                        "Id": 9,
                        "Name": "Child of D 2",
                        "IdParent": 4,
                        "isEnvironment": false
                    },
                    {
                        "Id": 10,
                        "Name": "Child of Child of D 2",
                        "IdParent": 9,
                        "isEnvironment": false
                    },
                    {
                        "Id": 11,
                        "Name": "Child of Child of Child of D 2",
                        "IdParent": 10,
                        "isEnvironment": false
                    }];

            });
            it("should return correct list of parents", function () {

                var expectedOutput = [
                    {
                        "Id": 4,
                        "Name": "D",
                        "IdParent": -1,
                        "isEnvironment": true
                    },
                    {
                        "Id": 9,
                        "Name": "Child of D 2",
                        "IdParent": 4,
                        "isEnvironment": false
                    },
                    {
                        "Id": 10,
                        "Name": "Child of Child of D 2",
                        "IdParent": 9,
                        "isEnvironment": false
                    }];

                var actual = ArrayHelper.findParents(input, 'IdParent', 'Id', 10, -1);
                expect(actual).toEqual(expectedOutput);
            });

            describe('notRecursive is set to true', function () {
                it("should return the immediate parent", function () {
                    var expectedOutput = [{
                        "Id": 9,
                        "Name": "Child of D 2",
                        "IdParent": 4,
                        "isEnvironment": false
                    }];

                    var actual = ArrayHelper.findParents(input, 'IdParent', 'Id', 9, -1, null, true);
                    expect(actual).toEqual(expectedOutput);
                });
            });

        });

        describe("queryTree", function () {
            var input;

            beforeEach(function () {
                input = [
                    {
                        "Id": 1,
                        "Name": 'not-matched',
                        "IdParent": -1,
                        "isEnvironment": true,
                        "children": [
                            {
                                "Id": 5,
                                "Name": "matched-test-keywordishere",
                                "IdParent": 1,
                                "isEnvironment": false
                            }
                        ]
                    },
                    {
                        "Id": 2,
                        "Name": "match-2-keywordishere",
                        "IdParent": -1,
                        "isEnvironment": true,
                        children: [
                            {
                                "Id": 6,
                                "Name": "no-matched 2",
                                "IdParent": 2,
                                "isEnvironment": false
                            },
                            {
                                "Id": 7,
                                "Name": "no matched-3",
                                "IdParent": 2,
                                "isEnvironment": false
                            }
                        ]
                    },
                    {
                        "Id": 3,
                        "Name": "no-match-4",
                        "IdParent": -1,
                        "isEnvironment": true
                    },
                    {
                        "Id": 4,
                        "Name": "no-mached-5",
                        "IdParent": -1,
                        "isEnvironment": true,
                        children: [
                            {
                                "Id": 8,
                                "Name": "no-matched-6",
                                "IdParent": 4,
                                "isEnvironment": false
                            },
                            {
                                "Id": 9,
                                "Name": "mached-keywordishere",
                                "IdParent": 4,
                                "isEnvironment": false,
                                children: [
                                    {
                                        "Id": 10,
                                        "Name": "no-match",
                                        "IdParent": 9,
                                        "isEnvironment": false,
                                        children: [
                                            {
                                                "Id": 11,
                                                "Name": "matched-keywordishere-12345",
                                                "IdParent": 10,
                                                "isEnvironment": false
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ];
            });
        });
    });
});
