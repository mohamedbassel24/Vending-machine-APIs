const User = require('../models/userModel')

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }

    // Create a user
    const user = new User({
        username: req.body.username || "Untitled user", 
        password: req.body.password,
        deposit:req.body.deposit,
        role: req.body.role
    });

   
    // Save user in the database
    user.save()
    .then(data => {
        res.json({ status: 'success', message: "User is Created Successfully." ,user:data});
    }).catch(err => {
        res.status(500);
    });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.status(200);

        res.json({ status: 'success', message: "User is Created Successfully." 
        ,users:users
    });
    
    }).catch(err => {
        res.status(500);
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    User.find({'username':req.params.username})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with username " + req.params.username
            });            
        }

        res.json({ status: 'success'
        , message: "User info is retrived Successfully." 
        ,user:user[0]});
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with username " + req.params.username
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with username " + req.params.username
        });
    });
};

// Update a user identified by the username in the request
exports.update = (req, res) => {
// Validate Request

    if(!req.body) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }

    //New Object
    let newUser = {}
    if (req.body.username)
    {
        newUser['username'] = req.body.username;
    }
    if (req.body.password)
    {
        newUser['password'] = req.body.password;    

    }
    if (req.body.deposit)
    {
        newUser['deposit'] = req.body.deposit;
    }
    if (req.body.role)
    {
        newUser['role'] = req.body.role;
    }

    // Find user and update it with the request body
    User.findOneAndUpdate({'username':req.params.username}, {
        $set: newUser 

    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with username " + req.params.username
            });
        }
        res.json({ status: 'success'
        , message: "User info is updated Successfully." 
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
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
User.findOneAndDelete({'username':req.params.username})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "user not found with username " + req.params.username
            });
        }
        res.send({message: "user deleted successfully!" ,  status: 'success'});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "user not found with name" + req.params.username
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with username " + req.params.username
        });
    });
};