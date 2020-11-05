import axios from 'axios'
const assert = require('chai').assert;

var base_url = "http://localhost:8200/api/"

let server;

before( () => {
    server = require('../src/server')
});

after( () => {
    server.close();
});


describe("meli api server", () => {

    describe("GET items", () => {
        
        const resource = "items?=";

        it("returns status code 200", () => {
            axios.get( base_url + resource) 
               .then( response => {
                    assert.equal(response.status, 200);
                })
                .catch( (error) => {
                    console.log(error);
                })
        });
    });

    describe("GET item by ID", () => {
        
        const resource = "items/MLA848015734";

        it("returns status code 200", () => {
            axios.get( base_url + resource) 
               .then( response => {
                assert.equal(response.status, 200);
                })
                .catch( (error) => {
                    console.log(error);
                })
        });

    });
});