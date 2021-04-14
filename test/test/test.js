// SET ENV
process.env.NODE_ENV = "test";
//import db
let mongoose = require("mongoose");
let User = require("../models/user.js");
//iimported libraries

let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../app.js");
let should = chai.should();

chai.use(chaiHttp);

//Clear DB
describe("Users", () => {
  beforeEach((done) => {
    User.remove({}, (err) => {
      done();
    });
  });
  //TESTING GET ALL USERS
  describe("/GET ALL USERS", () => {
    it("It should return all User in DB", (done) => {
      chai
        .request(app)
        .get("/user/")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
  //TESTING ALL ROUTES
  describe("/POST new User", () => {
    //User not email
    it("It should not POST a User without email", (done) => {
      let user = {
        name: "hunf style",
        username: "hfsls",
        //lost email
      };
      chai
        .request(app)
        .post("/user")
        .send(user)
        .end((err, res) => {
          //send msgs
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          res.body.errors.should.have.property("email");
          res.body.errors.email.should.have.property("kind").eql("required");
          done();
        });
    });
    //Successful POST
    it("It should  POST a User with  all fields", (done) => {
      let user = {
        name: "hunf style",
        username: "hfsls",
        email: "hunf@gmail.com",
      };
      chai
        .request(app)
        .post("/user")
        .send(user)
        .end((err, res) => {
          //send msgs
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("user successfully added!");
          res.body.user.should.have.property("name");
          res.body.user.should.have.property("email");
          res.body.user.should.have.property("username");
          done();
        });
    });
  });
  //TESTING GET USER ID
  describe("/GET/:id  user ", () => {
    it("it should  get the user given id", (done) => {
      let user = new User({
        name: "robin chuld",
        username: "rchuls",
        email: "robinsc@gmail.com",
      });
      user.save((err, user) => {
        chai
          .request(app)
          .get("/user/" + user.id)
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("name");
            res.body.should.have.property("email");
            res.body.should.have.property("username");
            res.body.should.have.property("_id").eql(user.id);
            done();
          });
      });
    });
  });
  //TEST ING PUT USER ID
  describe("/PUT/:id user", () => {
    it("it should PUT a User given id ", (done) => {
      let user = new User({
        name: "forent  style",
        username: "forentsle",
        email: "foresty@gmail.com",
      });
      user.save((err, user) => {
        chai
          .request(app)
          .put("/user/" + user.id)
          .send({
            //send all fields user
            name: "foren  style",
            username: "forentsle",
            email: "foresty@gmail.com",
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("message").eql("user updated!");
            res.body.user.should.have.property("name").eql("foren  style");
            done();
          });
      });
    });
  });
  //TESTING DELETE USER Id
  describe("/DELETE/:id user", () => {
    it("It should /DELETE/:id a User given id", (done) => {
      let user = new User({
        name: "martin solveign",
        username: "solveignm",
        email: "martin@gmail.com",
      });
      user.save((err, user) => {
        chai
          .request(app)
          .delete("/user/" + user.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have
              .property("message")
              .eql("user successfully deleted!");
            res.body.result.should.have.property("ok").eql(1);
            res.body.result.should.have.property("n").eql(1);
            done();
          });
      });
    });
  });
});
//
