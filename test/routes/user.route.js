let mongoose=require('mongoose');

let user=require('./../models/user.js');

function getusers(req, res) {
    //Query the DB and if no errors, send all the users
    let query = user.find({});
    query.exec((err, users) => {
        if(err) res.send(err);
        //If no errors, send them back to the client
        res.json(users);
    });
}

/*
 * POST /user to save a new user.
 */
function postuser(req, res) {
    //Creates a new user
    var newuser = new user(req.body);
    //Save it into the DB.
    newuser.save((err,user) => {
        if(err) {
            res.send(err);
        }
        else { //If no errors, send it back to the client
            res.json({message: "user successfully added!", user });
        }
    });
}

/*
 * GET /user/:id route to retrieve a user given its id.
 */
function getuser(req, res) {
    user.findById(req.params.id, (err, user) => {
        if(err) res.send(err);
        //If no errors, send it back to the client
        res.json(user);
    });
}

    function deleteuser(req, res) {
        user.remove({_id : req.params.id}, (err, result) => {
            res.json({ message: "user successfully deleted!", result });
        });
    }
    
    /*
     * PUT /user/:id to updatea a user given its id
     */
    function updateuser(req, res) {
        user.findById({_id: req.params.id}, (err, user) => {
            if(err) res.send(err);
            Object.assign(user, req.body).save((err, user) => {
                if(err) res.send(err);
                res.json({ message: 'user updated!', user });
            });
        });
    }
module.exports={getusers,postuser,getuser,deleteuser,updateuser}