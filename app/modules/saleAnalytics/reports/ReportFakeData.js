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
                Id: 1,
                Name: 'Animals (Folder)',
                Type: 'folder',
                Date: '12/01/2015',
                Path: 'Path/to/the/file',
                IdParent: -1
            },
            {
                Id: 2,
                Name: 'Waterfalls (Folder)',
                Type: 'folder',
                Date: '04/12/2014',
                Path: 'Path/to/the/file',
                IdParent: -1
            },
            {
                Id: 3,
                Name: 'Computers (Folder)',
                Type: 'folder',
                Date: '21/05/2015',
                Path: 'Path/to/the/file',
                IdParent: 1
            },
            {
                Id: 4,
                Name: 'Forest (Folder)',
                Type: 'folder',
                Date: '07/08/2013',
                Path: 'Path/to/the/file',
                IdParent: 3
            },
            {
                Id: 11,
                Name: "Daisy report",
                Description: "Imforme que muestra riesgo por bajo uso por cliente",
                IdParent: 3,
                Type: 'report',
                Date: '03/09/2014',
                Favorite: true,
                Path: 'Path/to/the/file',
                ReportType: ['PDF', 'DOC (MS-Word)', 'XSL (MS-Excel)']
            },
            {
                Id: 6,
                Name: "Windows phone report",
                Description: "Imforme que muestra riesgo por bajo uso por cliente",
                IdParent: 4,
                Type: 'report',
                Date: '01/01/2013',
                Favorite: false,
                Path: 'Path/to/the/file',
                ReportType: ['PDF', 'DOC (MS-Word)']
            },
            {
                Id: 7,
                Name: "OSX annual report",
                Description: "Imforme que muestra riesgo por bajo uso por cliente",
                IdParent: 4,
                Type: 'report',
                Date: '16/02/2015',
                Favorite: true,
                Path: 'Path/to/the/file',
                ReportType: ['XSL (MS-Excel)']
            },
            {
                Id: 8,
                Name: "Paris night lives report",
                Description: "Imforme que muestra riesgo por bajo uso por cliente",
                IdParent: 4,
                Type: 'report',
                Date: '24/03/2014',
                Favorite: false,
                Path: 'Path/to/the/file',
                ReportType: ['PDF', 'XSL (MS-Excel)']
            },
            {
                Id: 9,
                Name: "White lions report",
                Description: "Imforme que muestra riesgo por bajo uso por cliente",
                IdParent: 4,
                Type: 'report',
                Date: '29/10/2014',
                Favorite: false,
                Path: 'Path/to/the/file',
                ReportType: ['XSL (MS-Excel)']
            },
            {
                Id: 10,
                Name: "Skyscraper report",
                Description: "Imforme que muestra riesgo por bajo uso por cliente",
                IdParent: 2,
                Type: 'report',
                Date: '12/01/2013',
                Favorite: false,
                Path: 'Path/to/the/file',
                ReportType: ['DOC (MS-Word)', 'XSL (MS-Excel)']
            },
            {
                Id: 5,
                Name: "Blue whales report",
                Description: "Imforme que muestra riesgo por bajo uso por cliente",
                IdParent: 2,
                Type: 'report',
                Date: '08/07/2014',
                Favorite: true,
                Path: 'Path/to/the/file',
                ReportType: ['PDF']
            }
        ]);
    };

    return getFakeData;
});