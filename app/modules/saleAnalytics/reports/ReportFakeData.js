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
                name: 'Folder',
                type: 'folder',
                idParent: -1
            },
            {
                id: 2,
                name: 'Folder',
                type: 'folder',
                idParent: -1
            },
            {
                id: 3,
                name: 'Folder',
                type: 'folder',
                idParent: 1
            },
            {
                id: 4,
                name: 'Folder',
                type: 'folder',
                idParent: 3
            },
            {
                id: 11,
                name: "Analisis Oportunidades IN/OUT 11",
                description: "Imforme que muestra riesgo por bajo uso por cliente",
                idParent: 3,
                type: 'report',
                favourite: true,
                reportType: ['PDF', 'DOC (MS-Word)', 'XSL (MS-Excel)']
            },
            {
                id: 6,
                name: "Analisis Oportunidades IN/OUT 06",
                description: "Imforme que muestra riesgo por bajo uso por cliente",
                idParent: 4,
                type: 'report',
                favourite: false,
                reportType: ['PDF', 'DOC (MS-Word)']
            },
            {
                id: 7,
                name: "Analisis Oportunidades IN/OUT 07",
                description: "Imforme que muestra riesgo por bajo uso por cliente",
                idParent: 4,
                type: 'report',
                favourite: true,
                reportType: ['XSL (MS-Excel)']
            },
            {
                id: 8,
                name: "Analisis Oportunidades IN/OUT 08",
                description: "Imforme que muestra riesgo por bajo uso por cliente",
                idParent: 4,
                type: 'report',
                favourite: false,
                reportType: ['PDF', 'XSL (MS-Excel)']
            },
            {
                id: 9,
                name: "Analisis Oportunidades IN/OUT 09",
                description: "Imforme que muestra riesgo por bajo uso por cliente",
                idParent: 4,
                type: 'report',
                favourite: false,
                reportType: ['XSL (MS-Excel)']
            },
            {
                id: 10,
                name: "Analisis Oportunidades IN/OUT 10",
                description: "Imforme que muestra riesgo por bajo uso por cliente",
                idParent: 2,
                type: 'report',
                favourite: false,
                reportType: ['DOC (MS-Word)', 'XSL (MS-Excel)']
            },
            {
                id: 5,
                name: "Analisis Oportunidades IN/OUT 05",
                description: "Imforme que muestra riesgo por bajo uso por cliente",
                idParent: 2,
                type: 'report',
                favourite: true,
                reportType: ['PDF']
            }
        ]);
    };

    return getFakeData;
});