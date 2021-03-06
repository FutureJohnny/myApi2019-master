// During the test the ENV variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Film = require('../models/film');

//Require the dev dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../bin/www');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Film', () => {
    beforeEach((done) => { //before each test we empty the database
        Film.deleteMany({}, (err) => {
            done();
        });
    });

    let ID;
    let testFilm = {
        "title": "Star Wars: The Empire Strikes Back",
        "director": "George Lucas",
        "studio": "Lucas Films",
        "year": "1981\n",
        "review": "the 2nd one",
        "reviewer": "dave",
        "image": "./images/test.png"
    };

    describe('/GET film', () => {
        it('it should GET all the films', (done) => {
            chai.request(server)
                .get('/api/film')
                .set({
                    Authorization: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicmVhZGVyIiwiX2lkIjoiNWM0NzAzZDlhM2NmYzExMWE4NjE3NjlhIiwiZW1haWwiOiJlbWFpbEBlbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQwNSRiMzI2Q2I3Mm5rM0NYdHdicFR1OFRlMWlmOTdrQy95MXBaNktvcHZLbFU2YWtqWms0djNFbSIsImNyZWF0ZWRBdCI6IjIwMTktMDEtMjJUMTE6NTE6NTMuNjc5WiIsInVwZGF0ZWRBdCI6IjIwMTktMDEtMjJUMTE6NTE6NTMuNjc5WiIsIl9fdiI6MCwiaWF0IjoxNTQ4MTU3OTE5fQ.UZhEp9VRXF35jwicXEamoxoTP3FYIbARuTuds13vHiI'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST film', () => {
        it('it should create a new film', (done) => {
            chai.request(server)
                .post('/api/film')
                .send(testFilm)
                .set({
                    Authorization: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicmVhZGVyIiwiX2lkIjoiNWM0NzAzZDlhM2NmYzExMWE4NjE3NjlhIiwiZW1haWwiOiJlbWFpbEBlbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQwNSRiMzI2Q2I3Mm5rM0NYdHdicFR1OFRlMWlmOTdrQy95MXBaNktvcHZLbFU2YWtqWms0djNFbSIsImNyZWF0ZWRBdCI6IjIwMTktMDEtMjJUMTE6NTE6NTMuNjc5WiIsInVwZGF0ZWRBdCI6IjIwMTktMDEtMjJUMTE6NTE6NTMuNjc5WiIsIl9fdiI6MCwiaWF0IjoxNTQ4MTU3OTE5fQ.UZhEp9VRXF35jwicXEamoxoTP3FYIbARuTuds13vHiI'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('Object');
                    res.body.success.valueOf(true);
                    chai.request(server)
                        .get('/api/film')
                        .set({
                            Authorization: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicmVhZGVyIiwiX2lkIjoiNWM0NzAzZDlhM2NmYzExMWE4NjE3NjlhIiwiZW1haWwiOiJlbWFpbEBlbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQwNSRiMzI2Q2I3Mm5rM0NYdHdicFR1OFRlMWlmOTdrQy95MXBaNktvcHZLbFU2YWtqWms0djNFbSIsImNyZWF0ZWRBdCI6IjIwMTktMDEtMjJUMTE6NTE6NTMuNjc5WiIsInVwZGF0ZWRBdCI6IjIwMTktMDEtMjJUMTE6NTE6NTMuNjc5WiIsIl9fdiI6MCwiaWF0IjoxNTQ4MTU3OTE5fQ.UZhEp9VRXF35jwicXEamoxoTP3FYIbARuTuds13vHiI'
                        })
                        .end((err, res) => {
                            ID = res.body[0]._id;
                            console.log(ID);
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                            res.body.length.should.be.eql(1);
                            done();
                        });
                });
        });
    });
});
