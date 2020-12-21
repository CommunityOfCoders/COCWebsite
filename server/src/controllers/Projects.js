const express = require("express");
const Mockaroo = require('mockaroo')
const path = require("path");
const fetch = require("node-fetch");
const { response } = require("../app");

const client = new Mockaroo.Client({
    apiKey: '01ead2f0'
});

module.exports = {
    async getProjectsByDomain(req, res){
        let domain = req.params.domain;
        domain = domain.toLowerCase().split('_').join(' ');
        client.generate({
            count: 25,
            schema: 'project_schema'
        }).then(records => {
            if(domain == 'all'){
                return res.send(records);
            } 
            var final = [];
            records.forEach(element => {
                if(element['domain'] === domain){
                    final.push(element);
                }
            });
            return res.send(final)
        }).catch(error => {
            if (error instanceof Mockaroo.errors.InvalidApiKeyError) {
                console.log('invalid api key');
            } else if (error instanceof Mockaroo.errors.UsageLimitExceededError) {
                console.log('usage limit exceeded');
            } else if (error instanceof Mockaroo.errors.ApiError) {
                console.log('api error: ' + error.message);
            } else {
                console.log('unknown error: ' + error);
            }; 
        });
    },

    async getDomains(req, res){
        const projectGroups = [
            {
                id: 1,
                url: 'https://www.goodcore.co.uk/blog/wp-content/uploads/2019/08/what-is-coding.png',
                title: 'Inheritance 2020',
                descr: 'Inheritance 2020 was completely online and we had some amazing projects built.'
            },
            {
                id: 2,
                url: 'https://www.elegantthemes.com/blog/wp-content/uploads/2018/12/top11.png',
                title: 'Web development',
                descr: 'Browse through a variety of projects from the widest domain: web dev.'
            },
            {
                id: 3,
                url: 'https://www.elegantthemes.com/blog/wp-content/uploads/2018/12/top11.png',
                title: 'Machine learning',
                descr: 'Browse through a variety of projects from the machine learning.'
            },
            {
                id: 4,
                url: 'https://www.elegantthemes.com/blog/wp-content/uploads/2018/12/top11.png',
                title: 'All',
                descr: 'View all projects'
            },
            {
                id: 5,
                url: 'https://www.elegantthemes.com/blog/wp-content/uploads/2018/12/top11.png',
                title: 'Game development',
                descr: 'View game development projects'
            }
        ]
        res.status(200).json(projectGroups);
        // res.send(projectGroups);
    }
}