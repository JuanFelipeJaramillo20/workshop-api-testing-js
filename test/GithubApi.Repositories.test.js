const { StatusCodes } = require('http-status-codes');
const { expect } = require('chai');
const chai = require('chai');
const axios = require('axios');
// const md5 = require('md5');
const chaiSubset = require('chai-subset');
const md5 = require('md5');

const urlBase = 'https://api.github.com';
const githubUserName = 'aperdomob';
chai.use(chaiSubset);

describe('Github Api Test', () => {
  describe('Get Methods', () => {
    it('Get user data', async () => {
      const response = await axios.get(`${urlBase}/users/${githubUserName}`);
      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.data.name).equal('Alejandro Perdomo');
      expect(response.data.location).equal('Colombia');
      expect(response.data.company).equal('Perficient Latam');
    });

    it('Get user repo', async () => {
      const response = await axios.get(`${urlBase}/users/${githubUserName}/repos`);
      const repo = response.data.find((repository) => repository.name === 'jasmine-json-report');
      expect(response.status).to.equal(StatusCodes.OK);
      expect(repo.name).equal('jasmine-json-report');
      expect(repo.private).equal(false);
      expect(repo.description).equal('A Simple Jasmine JSON Report');
    });

    it('Check user repo download', async () => {
      const response = await axios.get(`${urlBase}/repos/${githubUserName}/jasmine-json-report/zipball/master`);
      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.headers['content-type']).to.equal('application/zip');
    });

    describe('Check README', async () => {
      it('Check user repo contents', async () => {
        const response = await axios.get(`${urlBase}/repos/${githubUserName}/jasmine-json-report/contents/`);
        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.data).to.containSubset([{
          name: 'README.md',
          path: 'README.md',
          sha: '360eee6c223cee31e2a59632a2bb9e710a52cdc0'
        }]);
      });
    });

    describe('md5', async () => {
      it('Download README file and check MD5', async () => {
        const response = await axios.get(`${urlBase}/repos/${githubUserName}/jasmine-json-report/contents/`);
        const readme = response.data.find((file) => file.name === 'README.md');
        const MD5Wanted = '3449c9e5e332f1dbb81505cd739fbf3f';
        const resReadMe = await axios.get(readme.download_url);

        expect(md5(resReadMe)).to.equal(MD5Wanted);
      });
    });
  });
});
