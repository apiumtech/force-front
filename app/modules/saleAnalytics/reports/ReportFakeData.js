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
                id: 5,
                name: "Analisis Oportunidades IN/OUT 5",
                description: "Imforme que muestra riesgo por bajo uso por cliente",
                idParent: 3,
                type: 'report'
            },
            {
                id: 6,
                name: "Analisis Oportunidades IN/OUT 6",
                description: "Imforme que muestra riesgo por bajo uso por cliente",
                idParent: 4,
                type: 'report'
            },
            {
                id: 7,
                name: "Analisis Oportunidades IN/OUT 7",
                description: "Imforme que muestra riesgo por bajo uso por cliente",
                idParent: 4,
                type: 'report'
            },
            {
                id: 8,
                name: "Analisis Oportunidades IN/OUT 8",
                description: "Imforme que muestra riesgo por bajo uso por cliente",
                idParent: 4,
                type: 'report'
            },
            {
                id: 9,
                name: "Analisis Oportunidades IN/OUT 9",
                description: "Imforme que muestra riesgo por bajo uso por cliente",
                idParent: 4,
                type: 'report'
            },
            {
                id: 10,
                name: "Analisis Oportunidades IN/OUT 10",
                description: "Imforme que muestra riesgo por bajo uso por cliente",
                idParent: 2,
                type: 'report'
            },
            {
                id: 11,
                name: "Analisis Oportunidades IN/OUT 11",
                description: "Imforme que muestra riesgo por bajo uso por cliente",
                idParent: 2,
                type: 'report'
            }
        ]);
    };

    return getFakeData;
});