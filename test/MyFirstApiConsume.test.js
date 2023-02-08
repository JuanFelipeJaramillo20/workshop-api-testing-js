const axios = require('axios');
const { expect } = require('chai');
const { StatusCodes } = require('http-status-codes');

describe('First Api Tests', () => {
    it('Consume GET Service', async () => {
        const response = await axios.get('https://httpbin.org/ip');
      
        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.data).to.have.property('origin');
      });

      it('Consume GET Service with query parameters', async () => {
        const query = {
          name: 'John',
          age: '31',
          city: 'New York'
        };
      
        const response = await axios.get('https://httpbin.org/get', { query });
      
        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.config.query).to.eql(query);
      });

      it('Consume HEAD Service', async () => {
        const response = await axios.head('https://httpbin.org/ip');
      
        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.data).to.equal("");
      });
      
      it('Consume HEAD Service with query parameters', async () => {
        const query = {
            name: 'John',
            age: '31',
            city: 'New York'
          };

        const response = await axios.head('https://httpbin.org/ip', {query});
      
        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.config.query).to.eql(query);
      });

      it('Consume PATCH Service', async () => {
        const response = await axios.patch('https://httpbin.org/patch');
      
        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.data).to.have.property("origin");
      });
      
      it('Consume PATCH Service with query parameters', async () => {
        const query = {
            name: 'John',
            age: '31',
            city: 'New York'
          };

        const response = await axios.patch('https://httpbin.org/patch', {query});
      
        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.data.json.query).to.eql(query);
      });

      it('Consume PUT Service', async () => {
        const response = await axios.put('https://httpbin.org/put');
      
        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.data).to.have.property("origin");
      });
      
      it('Consume PUT Service with query parameters', async () => {
        const query = {
            name: 'John',
            age: '31',
            city: 'New York'
          };

        const response = await axios.put('https://httpbin.org/put', {query});
      
        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.data.json.query).to.eql(query);
      });

      it('Consume DELETE Service', async () => {
        const response = await axios.delete('https://httpbin.org/delete');
      
        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.data).to.have.property("origin");
      });
      
      it('Consume DELETE Service with query parameters', async () => {
        const query = {
            name: 'John',
            age: '31',
            city: 'New York'
          };

        const response = await axios.delete('https://httpbin.org/delete', {query});
      
        expect(response.status).to.equal(StatusCodes.OK);
        expect(response.data).has.property("origin");
      });
});
