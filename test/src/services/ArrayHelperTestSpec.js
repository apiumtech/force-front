/**
 * Created by justin on 5/17/15.
 */


describe("ArrayHelper", function () {
    var ArrayHelper = app.getService('services/ArrayHelper');

    describe("flatten", function () {
        it("should return correct flattened array", function () {
            var input = [
                {
                    "id": 1,
                    "name": "Antonio",
                    "children": [{
                        "id": 3,
                        "name": "Beck",
                        "idParent": 1,
                        "checked": false
                    }, {
                        "id": 4,
                        "name": "Victoria",
                        "idParent": 1,
                        "children": [
                            {
                                "id": 41,
                                "name": "Hank",
                                "idParent": 4,
                                "checked": false
                            },
                            {
                                "id": 42,
                                "name": "John",
                                "idParent": 4,
                                "checked": false
                            }
                        ],
                        "checked": false
                    }]
                },
                {
                    "id": 2,
                    "name": "Kevin",
                    "children": [{
                        "id": 5,
                        "name": "Thomas",
                        "idParent": 2,
                        "checked": false
                    }, {
                        "id": 6,
                        "name": "Cindy",
                        "idParent": 2,
                        "children": [
                            {
                                "id": 61,
                                "name": "Alex",
                                "idParent": 6,
                                "children": [
                                    {
                                        "id": 611,
                                        "name": "Tom",
                                        "idParent": 61,
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
                "id": 3, "name": "Beck", "idParent": 1, "checked": false
            }, {
                "id": 41,
                "name": "Hank",
                "idParent": 4,
                "checked": false,
            }, {"id": 42, "name": "John", "idParent": 4, "checked": false}, {
                "id": 4,
                "name": "Victoria",
                "idParent": 1,
                "checked": false
            }, {"id": 1, "name": "Antonio"}, {
                "id": 5,
                "name": "Thomas",
                "idParent": 2,
                "checked": false
            }, {"id": 611, "name": "Tom", "idParent": 61, "checked": false}, {
                "id": 61,
                "name": "Alex",
                "idParent": 6,
                "checked": false
            }, {"id": 6, "name": "Cindy", "idParent": 2, "checked": false}, {"id": 2, "name": "Kevin"}];

            var actual = ArrayHelper.flatten(input, 'children');
            expect(actual).toEqual(expectedOutput);
        });
    });

    describe("makeTree", function () {
        it("should return correct tree", function () {
            var input = [
                {
                    "id": 1,
                    "name": "A",
                    "idParent": -1,
                    "isEnvironment": true
                },
                {
                    "id": 2,
                    "name": "B",
                    "idParent": -1,
                    "isEnvironment": true
                },
                {
                    "id": 3,
                    "name": "C",
                    "idParent": -1,
                    "isEnvironment": true
                },
                {
                    "id": 4,
                    "name": "D",
                    "idParent": -1,
                    "isEnvironment": true
                },
                {
                    "id": 5,
                    "name": "Child of A",
                    "idParent": 1,
                    "isEnvironment": false
                },
                {
                    "id": 6,
                    "name": "Child of B 1",
                    "idParent": 2,
                    "isEnvironment": false
                },
                {
                    "id": 7,
                    "name": "Child of B 2",
                    "idParent": 2,
                    "isEnvironment": false
                },
                {
                    "id": 8,
                    "name": "Child of D 1",
                    "idParent": 4,
                    "isEnvironment": false
                },
                {
                    "id": 9,
                    "name": "Child of D 2",
                    "idParent": 4,
                    "isEnvironment": false
                },
                {
                    "id": 10,
                    "name": "Child of Child of D 2",
                    "idParent": 9,
                    "isEnvironment": false
                },
                {
                    "id": 11,
                    "name": "Child of Child of Child of D 2",
                    "idParent": 10,
                    "isEnvironment": false
                }];

            var expected = [
                {
                    "id": 1,
                    "name": 'A',
                    "idParent": -1,
                    "isEnvironment": true,
                    "children": [
                        {
                            "id": 5,
                            "name": "Child of A",
                            "idParent": 1,
                            "isEnvironment": false
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "B",
                    "idParent": -1,
                    "isEnvironment": true,
                    children: [
                        {
                            "id": 6,
                            "name": "Child of B 1",
                            "idParent": 2,
                            "isEnvironment": false
                        },
                        {
                            "id": 7,
                            "name": "Child of B 2",
                            "idParent": 2,
                            "isEnvironment": false
                        }
                    ]
                },
                {
                    "id": 3,
                    "name": "C",
                    "idParent": -1,
                    "isEnvironment": true
                },
                {
                    "id": 4,
                    "name": "D",
                    "idParent": -1,
                    "isEnvironment": true,
                    children: [
                        {
                            "id": 8,
                            "name": "Child of D 1",
                            "idParent": 4,
                            "isEnvironment": false
                        },
                        {
                            "id": 9,
                            "name": "Child of D 2",
                            "idParent": 4,
                            "isEnvironment": false,
                            children: [
                                {
                                    "id": 10,
                                    "name": "Child of Child of D 2",
                                    "idParent": 9,
                                    "isEnvironment": false,
                                    children: [
                                        {
                                            "id": 11,
                                            "name": "Child of Child of Child of D 2",
                                            "idParent": 10,
                                            "isEnvironment": false
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ];

            var actual = ArrayHelper.makeTree(input, 'idParent', 'id', 'children', -1);
            expect(actual).toEqual(expected);
        });
    });

    describe("findParents", function () {
        it("should return correct list of parents", function () {
            var input = [
                {
                    "id": 1,
                    "name": "A",
                    "idParent": -1,
                    "isEnvironment": true
                },
                {
                    "id": 2,
                    "name": "B",
                    "idParent": -1,
                    "isEnvironment": true
                },
                {
                    "id": 3,
                    "name": "C",
                    "idParent": -1,
                    "isEnvironment": true
                },
                {
                    "id": 4,
                    "name": "D",
                    "idParent": -1,
                    "isEnvironment": true
                },
                {
                    "id": 5,
                    "name": "Child of A",
                    "idParent": 1,
                    "isEnvironment": false
                },
                {
                    "id": 6,
                    "name": "Child of B 1",
                    "idParent": 2,
                    "isEnvironment": false
                },
                {
                    "id": 7,
                    "name": "Child of B 2",
                    "idParent": 2,
                    "isEnvironment": false
                },
                {
                    "id": 8,
                    "name": "Child of D 1",
                    "idParent": 4,
                    "isEnvironment": false
                },
                {
                    "id": 9,
                    "name": "Child of D 2",
                    "idParent": 4,
                    "isEnvironment": false
                },
                {
                    "id": 10,
                    "name": "Child of Child of D 2",
                    "idParent": 9,
                    "isEnvironment": false
                },
                {
                    "id": 11,
                    "name": "Child of Child of Child of D 2",
                    "idParent": 10,
                    "isEnvironment": false
                }];

            var expectedOutput = [
                {
                    "id": 4,
                    "name": "D",
                    "idParent": -1,
                    "isEnvironment": true
                },
                {
                    "id": 9,
                    "name": "Child of D 2",
                    "idParent": 4,
                    "isEnvironment": false
                },
                {
                    "id": 10,
                    "name": "Child of Child of D 2",
                    "idParent": 9,
                    "isEnvironment": false
                }];

            var actual = ArrayHelper.findParents(input, 'idParent', 'id', 10, -1);
            expect(actual).toEqual(expectedOutput);
        });
    });

    describe("queryTree", function () {
        var input;

        beforeEach(function () {
            input = [
                {
                    "id": 1,
                    "name": 'not-matched',
                    "idParent": -1,
                    "isEnvironment": true,
                    "children": [
                        {
                            "id": 5,
                            "name": "matched-test-keywordishere",
                            "idParent": 1,
                            "isEnvironment": false
                        }
                    ]
                },
                {
                    "id": 2,
                    "name": "match-2-keywordishere",
                    "idParent": -1,
                    "isEnvironment": true,
                    children: [
                        {
                            "id": 6,
                            "name": "no-matched 2",
                            "idParent": 2,
                            "isEnvironment": false
                        },
                        {
                            "id": 7,
                            "name": "no matched-3",
                            "idParent": 2,
                            "isEnvironment": false
                        }
                    ]
                },
                {
                    "id": 3,
                    "name": "no-match-4",
                    "idParent": -1,
                    "isEnvironment": true
                },
                {
                    "id": 4,
                    "name": "no-mached-5",
                    "idParent": -1,
                    "isEnvironment": true,
                    children: [
                        {
                            "id": 8,
                            "name": "no-matched-6",
                            "idParent": 4,
                            "isEnvironment": false
                        },
                        {
                            "id": 9,
                            "name": "mached-keywordishere",
                            "idParent": 4,
                            "isEnvironment": false,
                            children: [
                                {
                                    "id": 10,
                                    "name": "no-match",
                                    "idParent": 9,
                                    "isEnvironment": false,
                                    children: [
                                        {
                                            "id": 11,
                                            "name": "matched-keywordishere-12345",
                                            "idParent": 10,
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

        describe("getting flatten array", function () {
            it("should return the correct found values in flat array", function () {
                var expectedOutput = [
                    {
                        "id": 2,
                        "name": "match-2-keywordishere",
                        "idParent": -1,
                        "isEnvironment": true
                    },
                    {
                        "id": 5,
                        "name": "matched-test-keywordishere",
                        "idParent": 1,
                        "isEnvironment": false
                    },
                    {
                        "id": 9,
                        "name": "mached-keywordishere",
                        "idParent": 4,
                        "isEnvironment": false
                    },
                    {
                        "id": 11,
                        "name": "matched-keywordishere-12345",
                        "idParent": 10,
                        "isEnvironment": false

                    }
                ];

                var actual = ArrayHelper.queryTree(input, 'children', 'name', 'keywordishere', 'id');
                expect(actual).toEqual(expectedOutput);
            });
        });


        describe("getting tree", function () {
            it("should return the correct found values in tree", function () {
                var expectedOutput = [
                    {
                        "id": 1,
                        "name": 'not-matched',
                        "idParent": -1,
                        "isEnvironment": true,
                        "children": [
                            {
                                "id": 5,
                                "name": "matched-test-keywordishere",
                                "idParent": 1,
                                "isEnvironment": false
                            }
                        ]
                    },
                    {
                        "id": 2,
                        "name": "match-2-keywordishere",
                        "idParent": -1,
                        "isEnvironment": true
                    },
                    {
                        "id": 4,
                        "name": "no-mached-5",
                        "idParent": -1,
                        "isEnvironment": true,
                        children: [
                            {
                                "id": 9,
                                "name": "mached-keywordishere",
                                "idParent": 4,
                                "isEnvironment": false,
                                children: [
                                    {
                                        "id": 10,
                                        "name": "no-match",
                                        "idParent": 9,
                                        "isEnvironment": false,
                                        children: [
                                            {
                                                "id": 11,
                                                "name": "matched-keywordishere-12345",
                                                "idParent": 10,
                                                "isEnvironment": false
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ];

                var actual = ArrayHelper.queryTree(input, 'children', 'name', 'keywordishere', 'id', true, 'idParent', 'id', -1);
                expect(actual).toEqual(expectedOutput);
            });
        });
    });
});