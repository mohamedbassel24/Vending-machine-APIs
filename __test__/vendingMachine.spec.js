const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe("Testing the Vending Machine API", () => {
 

	it("Create user endpoint => test Post Method", async () => {

        let user =
        {
        "username":"buyerUser",
        "password":"123",
        "deposit":"0",
        "role": "buyer"
        }
		const response = await supertest(app).post('/user').send(user);
		expect(response.status).toBe(200);
		expect(response.body.status).toBe('success');
		expect(response.body.message).toBe('User is Created Successfully.');
        globalSellerId = response.body.user._id; // get the seller ID for a specifc user
	});


	
	it("Create user endpoint => test Post Method", async () => {

        let user =
        {
        "username":"VendingSeller",
        "password":"123",
        "deposit":"0",
        "role": "seller"
        }
		const response = await supertest(app).post('/user').send(user);
		expect(response.status).toBe(200);
		expect(response.body.status).toBe('success');
		expect(response.body.message).toBe('User is Created Successfully.');
        globalSellerId = response.body.user._id; // get the seller ID for a specifc user
	});




    it("Create user endpoint => test Post Method", async () => {

        let user =
        {
        "username":"buyerUserWithDeposit",
        "password":"123",
        "deposit":"50",
        "role": "buyer"
        }
		const response = await supertest(app).post('/user').send(user);
		expect(response.status).toBe(200);
		expect(response.body.status).toBe('success');
		expect(response.body.message).toBe('User is Created Successfully.');
        globalSellerId = response.body.user._id; // get the seller ID for a specifc user
	});
     // Testing the POST /product endpoint
	it("Create Product with a seller user endpoint => test Post Method", async () => {

        let product =
        {
        amountAvailable: 9,
        cost: 5,
        productName: 'Coca Cola',
        username:"VendingSeller"
        }
		const response = await supertest(app).post('/product').send(product);
		expect(response.status).toBe(200);
		expect(response.body.status).toBe('success');
		expect(response.body.message).toBe('Product is Created Successfully.');

	});


	it("Test Depsoit/ endpoint => test Put Method", async () => {

        let data =
        {
        "username":"buyerUser",
        "coin":50
        }
		const response = await supertest(app).put('/deposit').send(data);
		expect(response.status).toBe(200);
		expect(response.body.status).toBe('success');
		expect(response.body.message).toBe('Coins is Deposited Successfully.');
        globalSellerId = response.body.user._id; // get the seller ID for a specifc user
	});
	



	it("Test Depsoit/ with unauthitztaed user endpoint => test Put Method", async () => {

        let data =
        {
        "username":"VendingSeller",
        "coin":5
        }
		const response = await supertest(app).put('/deposit').send(data);
		expect(response.status).toBe(200);
		expect(response.body.status).toBe('failed');
		expect(response.body.message).toBe('User is not authiticated');
	});

   
    it("Test buy/ endpoint => test Put Method", async () => {

        let data =
        {
        "username":"buyerUser",
        "amount2Buy":2,
        "productName":"Coca Cola"
        }
		const response = await supertest(app).put('/buy').send(data);
		//console.log('hereee1',response.body)
        expect(response.status).toBe(200);
        
		expect(response.body.status).toBe('success');
		expect(response.body.message).toBe('User Buy a Product Successfully.');
        
    });

    it("Test reset/ endpoint => test Put Method", async () => {

        let data =
        {
        "username":"buyerUserWithDeposit"
        }
		const response = await supertest(app).put('/reset').send(data);
		expect(response.status).toBe(200);
		//console.log('hereee2',response.body)
        expect(response.body.status).toBe('success');
		expect(response.body.message).toBe('Deposit is reset Successfully.');
        //check if the updated deposit is rest
        expect(response.body.user.deposit).toBe(0);
    });




     






});