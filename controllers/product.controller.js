const Product = require('../models/productModel')
const userModel = require('../models/userModel');

// Create and Save a new product


async function isAuthorized(username,product_SellerId)
{
    try{
    let fetchedUser = {};
    fetchedUser = await userModel.find({'username':username})
    
    if( !(fetchedUser[0]._id.toString() == product_SellerId  && fetchedUser[0].role === 'seller'))
    {
        
        throw  Error();
    }
    }
    catch (error) {
        throw Error(error);
      }

}

exports.create = (req, res) => {
    
    // Validate empty body
    if(!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }


    
    // get user Data from his username
     let fetchedUser = {};
     userModel.find({'username':req.body.username})
    .then(user => {
    fetchedUser = user[0];

    if(fetchedUser.role !== 'seller')
    {
        res.json({ status: 'fail', message: "User without a seller role cannot create a product" })
        return;
    }
    const product = new Product({
   
        amountAvailable: req.body.amountAvailable,
        cost: req.body.cost,
        productName: req.body.productName,
        sellerId:fetchedUser._id.toString()
    });
   
    // Save product in the database
    product.save()
    .then(data => {
         res.json({ status: 'success', message: "Product is Created Successfully." ,product:data});
    }).catch(err => {
        res.status(500);
    });    
    })
    .catch(err => console.log('error while fetching username',err))
    
};

// Retrieve and return all products from the database.
exports.findAll = (req, res) => {
    Product.find()
    .then(products => {
        res.status(200);

        res.json({ status: 'success', message: "Products are Retrived Successfully." 
        ,products:products
    });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving products."
        });
    });
};

// Find a single product with a productId
exports.findOne = (req, res) => {
    Product.find({'productName':req.params.productName})
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "product not found with name " + req.params.productName
            });            
        }
        else
        {
            res.json({ status: 'success'
        , message: "Product info is retrived Successfully." 
        ,product:product[0]});
        } 
        
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with name " + req.params.productName
            });                
        }
        return res.status(500).send({
            message: "Error retrieving product with name " + req.params.productName
        });
    });
};

// Update a product identified by the productName in the request
exports.update = (req, res) => {
// Validate Request

    if(!req.body) {
        return res.status(400).send({
            message: "product content can not be empty"
        });
    }

    //New Object
    Product.find({'productName':req.params.productName})
    .then(product => {
        isAuthorized(req.body.sellerName,product[0].sellerId).then(() =>
        {
         
            let newProduct = {}
            if (req.body.productName)
            {
                newProduct['productName'] = req.body.productName;
            }
            if (req.body.amountAvailable)
            {
                newProduct['amountAvailable'] = req.body.amountAvailable;    

            }
            if (req.body.cost)
            {
                newProduct['cost'] = req.body.cost;
            }
        

            // Find product and update it with the request body
            Product.findOneAndUpdate({'productName':req.params.productName}, {
                $set: newProduct 

            }, {new: true})
            .then(product => {
                if(!product) {
                    return res.status(404).send({
                        message: "product not found with productName " + req.params.productName
                    });
                }
                res.json({ status: 'success'
                , message: "Product info is updated Successfully." 
                ,product:product});
            }).catch(err => {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "product not found with name " + req.params.productName
                    });                
                }
                return res.status(500).send({
                    message: "Error updating product with name" + req.params.productName
                });
            });

        })
        .catch( (err)=>
        {
         // console.log(err)
            res.json({ status: 'failed'
            , message: "User is not authiticated to update the product" });
        
        })
    })    
};

// Delete a product with the specified producName in the request
exports.delete = (req, res) => {


    
    if(!req.body) {
        return res.status(400).send({
            message: "product content can not be empty"
        });
    }

    //New Object
    Product.find({'productName':req.params.productName})
    .then(product => {
       
        isAuthorized(req.body.sellerName,product[0].sellerId).then(() =>
        {
        
            Product.findOneAndDelete({'productName':req.params.productName})
                .then(product => {
                    if(!product) {
                        return res.status(404).send({
                            message: "product not found with productName " + req.params.productName
                        });
                    }
                    res.send({message: "Product deleted successfully!" ,  status: 'success'});
                }).catch(err => {
                    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                        return res.status(404).send({
                            message: "product not found with name" + req.params.productName
                        });                
                    }
                    return res.status(500).send({
                        message: "Could not delete product with productName " + req.params.productName
                    });
                });
                }).catch( (err)=>
                {
                    //console.log(err)
                    res.json({ status: 'failed'
                    , message: "User is not authiticated to update the product" });

                })
})
};