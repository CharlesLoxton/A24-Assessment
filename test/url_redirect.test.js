import * as chai from 'chai';
import chaiHttp from 'chai-http';
import supertest from 'supertest';
import dotenv from 'dotenv';
dotenv.config();
const { expect } = chai;
import app from '../app.js';

chai.use(chaiHttp);

describe('GET /:url', () => {

    //I did not write a test for if the user passes an empty short url because it would just direct the user to the default '/' route

    it('should return 404 if short url does not exist', (done) => {
        supertest(app)
            .get('/doesnotexist')
            .expect(404)
            .end((err, res) => {
                expect(res.body).to.have.property('error', 'URL not found');
                done(err);
            });
    });

    //This will only pass if the short url exists in your database.
    it('should redirect to the original URL for a valid short URL', (done) => {
        supertest(app)
          .get('/zkngx6')
          .expect(302) // Checking for a redirection status code
          .end((err, res) => {
              expect(res.header.location).to.equal('https://example.com');
              done(err);
          });
    });
});

