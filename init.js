'use strict';

const firstline = require('firstline');
const replace = require('replace');

firstline("./serverless.yml").then(
    (data) => {
        let serviceName = data.slice(data.indexOf(":") + 2, data.length);
        replace({
            regex: "ItemService",
            replacement: serviceName,
            paths: ['./serverless.yml', './package.json', './package-lock.json', './src/resources/MicroService Collection.postman_collection.json'],
            recursive: true,
            silent: true,
        });
    }
);