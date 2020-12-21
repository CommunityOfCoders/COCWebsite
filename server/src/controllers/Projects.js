const express = require("express");
require("dotenv").config(); 
const Mockaroo = require('mockaroo')
const path = require("path");
const fetch = require("node-fetch");
const { response } = require("../app");

const client = new Mockaroo.Client({
    apiKey: process.env.MOCKAROO_API_KEY
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
            if(final.length == 0)   res.status(404).json({error: 'No projects in this domain found.'});
            return res.status(200).json(final);
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
            res.status(500).json({error: 'Server error. Please try again later'});
        });
    },

    async getDomains(req, res){
        const projectGroups = [
            {
                id: 1,
                url: 'https://www.elegantthemes.com/blog/wp-content/uploads/2018/12/top11.png',
                title: 'All',
                descr: 'View all projects'
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
                title: 'Game development',
                descr: 'View game development projects'
            },
            {
                id: 5,
                url: 'https://www.goodcore.co.uk/blog/wp-content/uploads/2019/08/what-is-coding.png',
                title: 'Blockchain',
                descr: 'View some awesome blockchain projects'
            },
            {
                id: 6,
                url: 'https://www.goodcore.co.uk/blog/wp-content/uploads/2019/08/what-is-coding.png',
                title: 'Inheritance 2020',
                descr: 'Inheritance 2020 was completely online and we had some amazing projects built.'
            }
        ]
        res.status(200).json(projectGroups);
    }
}