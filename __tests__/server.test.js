// Assertion - check to see if something is what we expect

// expect(true).toBe(true); // SGTM
// expect(3).toBe(5); // ?? sus

// test organization - describe, it
//   describe groups tests
//   it is a single test case
// test setup
const {it, expect} = require('@jest/globals')
const supertest = require("supertest");
const server = require("../src/server.js");

const request = supertest(server.app);

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
    it('is a bad route', async ()=>{
        const response=await request.get('/none');
        expect(response.status).toBe(404);
    })
    it('Has a name', async ()=> {
        const response = await request.get('/person/Jim');
        expect(response.status).toBe(200);
        expect(response.body.name).toMatch(/Jim/)
    });

    it('Has no name in query', async ()=>{
        const response = await request.get ('/person/');
        expect(response.status).toBe(500);
    })
   
});