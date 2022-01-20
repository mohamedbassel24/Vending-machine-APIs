const supertest = require('supertest');
const app = require('../app');



describe("Testing the CRUD APIs for The Product Model.", () => {


    //get a Seller ID for the rest of testcases
    let globalSellerId = 0;
    // Testing the POST /user endpoint
	it("Create user endpoint => test Post Method", async () => {

        let user =
        {
        "username":"sellerUser",
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
        "username":"unAuthorized",
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

    // Testing the POST /product endpoint
	it("Create Product with a seller user endpoint => test Post Method", async () => {

        let product =
        {
        amountAvailable: 9,
        cost: 15,
        productName: 'Pepsi',
        username:"sellerUser"
        }
		const response = await supertest(app).post('/product').send(product);
		expect(response.status).toBe(200);
		expect(response.body.status).toBe('success');
		expect(response.body.message).toBe('Product is Created Successfully.');

	});

    //test the get /product/:productId method
    it("Retrive a product by name endpoint => test Get Method", async () => {

		const response = await supertest(app).get('/product/Pepsi');
        expect(response.status).toBe(200);
		expect(response.body.status).toBe('success');
		expect(response.body.message).toBe('Product info is retrived Successfully.');
        expect(response.body).toHaveProperty('product');
        expect(response.body.product.productName).toBe('Pepsi')     
       // console.log(response.body.products)
    });


	it("Retrive all product endpoint => test Get Method", async () => {

		const response = await supertest(app).get('/product');
        expect(response.status).toBe(200);
		expect(response.body.status).toBe('success');
		expect(response.body.message).toBe('Products are Retrived Successfully.');
        expect(response.body).toHaveProperty('products');        
       // console.log(response.body.products)
    });



    
	it("Update product of the user endpoint => test Put Method", async () => {

        let newData ={
            sellerName:'sellerUser',
            amountAvailable:24
        };
		const response = await (await supertest(app).put('/product/Pepsi').send(newData));
        expect(response.status).toBe(200);
		expect(response.body.status).toBe('success');
		expect(response.body.message).toBe('Product info is updated Successfully.');
        expect(response.body).toHaveProperty('product');
        expect(response.body.product.amountAvailable).toBe(24);
        
          
	});


    
	it("Update product of the unAuthicated user endpoint => test Put Method", async () => {

        let newData ={
            sellerName:'unAuthorized',
            amountAvailable:25
        };
		const response = await (await supertest(app).put('/product/Pepsi').send(newData));
        expect(response.status).toBe(200);
		expect(response.body.status).toBe('failed');
		expect(response.body.message).toBe('User is not authiticated to update the product');
          
	});
    it("Delete product of the user endpoint => test Put Method", async () => {

        let newData ={
            sellerName:'sellerUser'
        };
		const response = await (await supertest(app).delete('/product/Pepsi').send(newData));
        expect(response.status).toBe(200);
        
		expect(response.body.status).toBe('success');
		expect(response.body.message).toBe('Product deleted successfully!');
          
	});
  

    afterAll(done => {
        done()
      })

});


