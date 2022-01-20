const supertest = require('supertest');
const app = require('../app');



describe("Testing the CRUD APIs for The User Model.", () => {


    
    	// Testing the POST /user endpoint
	it("Create user endpoint => test Post Method", async () => {

        let user =
        {
        "username":"testUser",
        "password":"123",
        "deposit":"0",
        "role": "seller"
        }
		const response = await supertest(app).post('/user').send(user);
		expect(response.status).toBe(200);
		expect(response.body.status).toBe('success');
		expect(response.body.message).toBe('User is Created Successfully.');
      
	});


    it("Retrive user endpoint by a certin username=> test Get Method", async () => {

		const response = await supertest(app).get('/user/testUser');
        expect(response.status).toBe(200);
		expect(response.body.status).toBe('success');
		expect(response.body.message).toBe("User info is retrived Successfully.");
        expect(response.body.user.username).toBe("testUser");
        expect(response.body.user.password).toBe("123");
        expect(response.body.user.deposit).toBe(+"0");
        expect(response.body.user.role).toBe("seller");
	});



	it("Retrive all user endpoint => test Get Method", async () => {

		const response = await supertest(app).get('/user');
        expect(response.status).toBe(200);
		expect(response.body.status).toBe('success');
		expect(response.body.message).toBe('User is Created Successfully.');
        expect(response.body).toHaveProperty('users');        
	});


    


	it("Update password of the user endpoint => test Put Method", async () => {

        let newPassword ={password:'myNewPassword'}
		const response = await (await supertest(app).put('/user/testUser').send(newPassword));
        expect(response.status).toBe(200);
		expect(response.body.status).toBe('success');
		expect(response.body.message).toBe('User info is updated Successfully.');
        expect(response.body).toHaveProperty('user');
        expect(response.body.user.password).toBe('myNewPassword');
          
	});


    it("Update role of the user endpoint => test Put Method", async () => {

        let newRole ={role:'buyer'}
		const response = await (await supertest(app).put('/user/testUser').send(newRole));
        expect(response.status).toBe(200);
		expect(response.body.status).toBe('success');
		expect(response.body.message).toBe('User info is updated Successfully.');
        expect(response.body).toHaveProperty('user');
        expect(response.body.user.role).toBe('buyer');
          
	});


    it("Update username of the user endpoint => test Put Method", async () => {

        let newUsername ={username:'newUserName'}
		const response = await (await supertest(app).put('/user/testUser').send(newUsername));
        expect(response.status).toBe(200);
		expect(response.body.status).toBe('success');
		expect(response.body.message).toBe('User info is updated Successfully.');
        expect(response.body).toHaveProperty('user');
        expect(response.body.user.username).toBe('newUserName');
          
	});


    
	it("Delete user endpoint by his username => test Delete Method", async () => {

		const response = await supertest(app).delete('/user/newUserName');
        expect(response.status).toBe(200);
		expect(response.body.status).toBe('success');
		expect(response.body.message).toBe('user deleted successfully!');
	});

    afterAll(done => {
        // Closing the DB connection allows Jest to exit successfully.
        //app.my_connection.disconnect();
        done()
      })

});


