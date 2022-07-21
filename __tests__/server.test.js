// Assertion - check to see if something is what we expect

// expect(true).toBe(true); // SGTM
// expect(3).toBe(5); // ?? sus

// test organization - describe, it
//   describe groups tests
//   it is a single test case
// test setup
// need to start a server just for testing, then end the server after the testing is complete. 
const { it, expect } = require('@jest/globals')
const supertest = require("supertest");
const server = require("../src/server.js");
const {db} = require('../src/db');
// need to start a server just for testing, then end the server after the testing is complete. 
//sqlite initialization
beforeAll(async () => {
    await db.sync();
  })
  
  //sqlite termination
  afterAll(async () => {
    await db.drop();
  })


const request = supertest(server.app);
let createID;
describe("Node Server", () => {
    it("says hello world", async () => {

        const response = await request.get("/");
        expect(response.status).toBe(200);
        expect(response.text).toBe("Hello, World");
    });

    it("returns some data", async () => {
        const response = await request.get("/data");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            name: "Jim",
            role: "Student",
        });
    });
    it('is a bad route', async () => {
        const response = await request.get('/none');
        expect(response.status).toBe(404);
    })
    it('Has a name', async () => {
        const response = await request.get('/person/Jim');
        expect(response.status).toBe(200);
        expect(response.body.name).toMatch(/Jim/)
    });

    it('Has no name in query', async () => {
        const response = await request.get('/person/');
        expect(response.status).toBe(500);
    })

});

// Crud Testing Below

describe('CRUD Functionality Testing', () => {

    it('Creates Survivor', async () => {
        const res = await request.post('/survivor').send({
            username: 'Rick Grimes',
            strengths: 'Six Shooter Specialist',
            weaknesses: 'Helpless without Cowboy hat',
            abilities: 'Inifinite meme potential',
            powerLevel: 6
        });
        expect(res.status).toBe(201);
        expect(res.body).toMatchObject({
            username: 'Rick Grimes',
            strengths: 'Six Shooter Specialist',
            weaknesses: 'Helpless without Cowboy hat',
            abilities: 'Inifinite meme potential',
            powerLevel: 6
        })
    });

    it('Gets a Survivor', async () => {
        let createResponse = await request.post('/survivor').send({
            username: 'Rick Grimes',
            strengths: 'Six Shooter Specialist',
            weaknesses: 'Helpless without Cowboy hat',
            abilities: 'Inifinite meme potential',
            powerLevel: 6,
        });
        expect(createResponse.status).toBe(201);
        createID = createResponse.body.id;

        let retrieveResponse = await request.get(`/survivor/${createID}`);
        expect(retrieveResponse.status).toBe(200);
        expect(retrieveResponse.body).toMatchObject({
            id: createID,
            username: 'Rick Grimes',
            strengths: 'Six Shooter Specialist',
            weaknesses: 'Helpless without Cowboy hat',
            abilities: 'Inifinite meme potential',
            powerLevel: 6,
        })
    });

    it('Gets a list of Survivors', async () => {
        // get the list of survivors which has already been generated
        let retrieveResponse = await request.get('/survivor');
        expect(retrieveResponse.status).toBe(200);
        expect(retrieveResponse.body).toMatchObject([{
            id: 1,
            username: 'Rick Grimes',
            strengths: 'Six Shooter Specialist',
            weaknesses: 'Helpless without Cowboy hat',
            abilities: 'Inifinite meme potential',
            powerLevel: 6,
        }, {
            id: 2,
            username: 'Rick Grimes',
            strengths: 'Six Shooter Specialist',
            weaknesses: 'Helpless without Cowboy hat',
            abilities: 'Inifinite meme potential',
            powerLevel: 6,
        }])

    });
    it('Updates a single survivor', async () => {
        let updateResponse = await request.put(`/survivor/${createID}`).send({
            username: 'Derek',
            strengths: 'urdu',
            weaknesses: 'Cantoknees',
            abilities: 'sling bull with the best of them',
            powerLevel: 4,
        });
        expect(updateResponse.status).toBe(200);
        expect(updateResponse.request._data).toMatchObject({
            username: 'Derek',
            strengths: 'urdu',
            weaknesses: 'Cantoknees',
            abilities: 'sling bull with the best of them',
            powerLevel: 4,
        })
    });
    it('Deletes a Survivor', async () => {
        const deleteResponse = await request.delete(`/survivor/${createID}`);
        expect(deleteResponse.status).toBe(200);
        console.log('delete response console.log : ', deleteResponse.body);
        expect(deleteResponse.body).toMatchObject({});
    });

    it('Creates calamity', async () => {
        const res = await request.post('/calamity').send({
            type: 'Blizzard',
            intensity: 2,
            location: "your house",
        });
        expect(res.status).toBe(201);
        expect(res.body).toMatchObject({
            type: 'Blizzard',
            intensity: 2,
            location: "your house",
        })
    });

    it('Gets a calamity', async () => {
        let createResponse = await request.post('/calamity').send({
            type: 'Blizzard',
            intensity: 2,
            location: "your house",
        });
        expect(createResponse.status).toBe(201);
        createID = createResponse.body.id;

        let retrieveResponse = await request.get(`/calamity/${createID}`);
        expect(retrieveResponse.status).toBe(200);
        expect(retrieveResponse.body).toMatchObject({
            type: 'Blizzard',
            intensity: 2,
            location: "your house",
        })
    });

    it('Gets a list of calamitys', async () => {
        // get the list of calamitys which has already been generated
        let retrieveResponse = await request.get('/calamity');
        expect(retrieveResponse.status).toBe(200);
        expect(retrieveResponse.body).toMatchObject([{
            type: 'Blizzard',
            intensity: 2,
            location: "your house",
        }, {
            type: 'Blizzard',
            intensity: 2,
            location: "your house",
        }])

    });
    it('Updates a single calamity', async () => {
        let updateResponse = await request.put(`/calamity/${createID}`).send({
            type: 'A Raging Inferno',
            intensity: 7,
            location: "your house",
        });
        expect(updateResponse.status).toBe(200);
        expect(updateResponse.request._data).toMatchObject({
            type: 'A Raging Inferno',
            intensity: 7,
            location: "your house",
        })
    });
    it('Deletes a calamity', async () => {
        const deleteResponse = await request.delete(`/calamity/${createID}`);
        expect(deleteResponse.status).toBe(200);
        console.log('delete response console.log : ',deleteResponse.body);
        expect(deleteResponse.body).toMatchObject({});
    });
});