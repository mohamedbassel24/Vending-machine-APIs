const Product = require('../models/productModel')
const User = require('../models/userModel')
// Create and Save a new user
exports.deposit = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }
   
        const {username,coin} = req.body
   
        User.find({'username':username}).then(fetchedUser =>{    
        
            fetchedUser = fetchedUser[0]
            //check if the username has a buyer role
            if (fetchedUser.role === 'buyer')
            {
                // check is a valid coin
                const validCoins = [5, 10, 20, 50 ,100 ]
                
                if (validCoins.indexOf(+coin) != -1)
                {
                    // increment the coin
                    const newDeposit = Number(fetchedUser.deposit) + coin
                    // update user 
                    User.findOneAndUpdate({'username':username}, {
                        $set: {'deposit':newDeposit} 
                
                    }, {new: true})
                    .then(user => {
                        if(!user) {
                            return res.status(404).send({
                                message: "user not found with username " + req.params.username
                            });
                        }
                        res.json({ status: 'success'
                        , message: "Coins is Deposited Successfully." 
                        ,user:user});
                    }).catch(err => {
                        if(err.kind === 'ObjectId') {
                            return res.status(404).send({
                                message: "user not found with name " + req.params.username
                            });                
                        }
                        return res.status(500).send({
                            message: "Error updating user with name" + req.params.username
                        });
                    });

                }
                else
                {
                    // undefined coin 
                    res.json({ status: 'failed'
                    , message: "Undefined Coin Value" 
                    });
                }

            } 
            else
            {
                // User is not a buyer 
                res.json({ status: 'failed'
                , message: "User is not authiticated" 
                });
            }
        }).catch(err => {
        //console.log(err)
         // undefined coin 
         res.json({ status: 'failed'
         , message: "Invalid User" 
         });
      })
}
// Create and Save a new user

exports.buy = async (req, res) => {
    // Validate request
    
    if(!req.body) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }

    const {username,amount2Buy,productName} = req.body
    User.find({'username':username}).then(fetchedUser =>{    
    
        fetchedUser = fetchedUser[0]
        //check if the username has a buyer role
        if (fetchedUser.role === 'buyer')
        {     //find product

                Product.find({'productName':productName}).then(async(product) => {
                    // if the user can buy ?
                    product = product[0]
                    const newDeposit =  Number(fetchedUser.deposit) -(+product.cost*+amount2Buy)
                    if (+product.amountAvailable >= +amount2Buy && newDeposit >=0)
                    {
                        try{
                                
                           
           
                            // update product with new val 
                            newProductAmount = +product.amountAvailable - +amount2Buy
                            updatedProduct = await Product.findOneAndUpdate({'productName':productName}, {$set: {'amountAvailable':newProductAmount}  }, {new: true})
                            //update deposit 
                       
                            User.findOneAndUpdate({'username':username}, {
                                $set: {'deposit':newDeposit} 
                        
                            }, {new: true})
                            .then(user => {
                                if(!user) {
                                    return res.status(404).send({
                                        message: "user not found with username " + req.params.username
                                    });
                                }
                                res.json({ status: 'success'
                                , message: "User Buy a Product Successfully." 
                                });
                            }).catch(err => {
                                if(err.kind === 'ObjectId') {
                                    return res.status(404).send({
                                        message: "user not found with name " + req.params.username
                                    });                
                                }
                                return res.status(500).send({
                                    message: "Error updating user with name" + req.params.username
                                });
                            });
                        }
                        catch(err)
                        {
                            console.log(err);
                        }

                    }
                    else
                    {
                        res.json({ status: 'failed'
            , message: "Sorry cannot buy the product, insufficent funds" 
            });
                    }
            })
        }
        else
        {
            // User is not a buyer 
            res.json({ status: 'failed'
            , message: "User is not authiticated" 
            });
        }
    }).catch(err => {
    //console.log(err)
     // undefined coin 
     res.json({ status: 'failed'
     , message: "Invalid User" 
     });
  })
}
// Create and Save a new user
exports.reset = (req, res) => {
 // Validate request
 if(!req.body) {
     
    return res.status(400).send({
        message: "request body can not be empty"
    });
}

    const {username} = req.body
    
    User.find({'username':username}).then(fetchedUser =>{    
       // console.log('did you find the user?',fetchedUser)
        fetchedUser = fetchedUser[0]
        //check if the username has a buyer role
        if (fetchedUser.role === 'buyer')
        {
            // reset the deposit
                const newDeposit = 0
                // update user 
                User.findOneAndUpdate({'username':username}, {
                    $set: {'deposit':newDeposit} 
            
                }, {new: true})
                .then(user => {
                    if(!user) {
                        return res.status(404).send({
                            message: "user not found with username " + req.params.username
                        });
                    }
                    res.json({ status: 'success'
                    , message: "Deposit is reset Successfully." 
                    ,user:user});
                }).catch(err => {
                    if(err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "user not found with name " + req.params.username
                        });                
                    }
                    return res.status(500).send({
                        message: "Error updating user with name" + req.params.username
                    });
                });

            }
        else
        {
            // User is not a buyer 
            res.json({ status: 'failed'
            , message: "User is not authiticated" 
            });
        }
    }).catch(err => {
    //console.log(err)
     // undefined coin 
     res.json({ status: 'failed'
     , message: "Invalid User" 
     });
  })
}