/**
 * Created by apium on 5/28/15.
 */
define([
    'shared/services/ArrayHelper'
], function (ArrayHelper) {
    'use strict';

    var getFakeData = function () {
        return ArrayHelper.clone([
            {
                id: 1,
                name: 'Animals (Folder)',
                type: 'folder',
                date: '12/01/2015',
                path: 'path/to/the/file',
                idParent: -1
            },
            {
                id: 2,
                name: 'Waterfalls (Folder)',
                type: 'folder',
                date: '04/12/2014',
                path: 'path/to/the/file',
                idParent: -1
            },
            {
                id: 3,
                name: 'Computers (Folder)',
                type: 'folder',
                date: '21/05/2015',
                path: 'path/to/the/file',
                idParent: 1
            },
            {
                id: 4,
                name: 'Forest (Folder)',
                type: 'folder',
                date: '07/08/2013',
                path: 'path/to/the/file',
                idParent: 3
            },
            {
                id: 11,
                name: "Daisy report",
                description: "Imforme que muestra riesgo por bajo uso por cliente",
                idParent: 3,
                type: 'report',
                date: '03/09/2014',
                favourite: true,
                path: 'path/to/the/file',
                reportType: ['PDF', 'DOC (MS-Word)', 'XSL (MS-Excel)']
            },
            {
                id: 6,
                name: "Windows phone report",
                description: "Imforme que muestra riesgo por bajo uso por cliente",
                idParent: 4,
                type: 'report',
                date: '01/01/2013',
                favourite: false,
                path: 'path/to/the/file',
                reportType: ['PDF', 'DOC (MS-Word)']
            },
            {
                id: 7,
                name: "OSX annual report",
                description: "Imforme que muestra riesgo por bajo uso por cliente",
                idParent: 4,
                type: 'report',
                date: '16/02/2015',
                favourite: true,
                path: 'path/to/the/file',
                reportType: ['XSL (MS-Excel)']
            },
            {
                id: 8,
                name: "Paris night lives report",
                description: "Imforme que muestra riesgo por bajo uso por cliente",
                idParent: 4,
                type: 'report',
                date: '24/03/2014',
                favourite: false,
                path: 'path/to/the/file',
                reportType: ['PDF', 'XSL (MS-Excel)']
            },
            {
                id: 9,
                name: "White lions report",
                description: "Imforme que muestra riesgo por bajo uso por cliente",
                idParent: 4,
                type: 'report',
                date: '29/10/2014',
                favourite: false,
                path: 'path/to/the/file',
                reportType: ['XSL (MS-Excel)']
            },
            {
                id: 10,
                name: "Skyscraper report",
                description: "Imforme que muestra riesgo por bajo uso por cliente",
                idParent: 2,
                type: 'report',
                date: '12/01/2013',
                favourite: false,
                path: 'path/to/the/file',
                reportType: ['DOC (MS-Word)', 'XSL (MS-Excel)']
            },
            {
                id: 5,
                name: "Blue whales report",
                description: "Imforme que muestra riesgo por bajo uso por cliente",
                idParent: 2,
                type: 'report',
                date: '08/07/2014',
                favourite: true,
                path: 'path/to/the/file',
                reportType: ['PDF']
            }
        ]);
    };

    return getFakeData;
});