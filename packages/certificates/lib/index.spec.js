const chai = require('chai');
const getCertifacts = require('./index');

const {expect} = chai;

describe('Self Sign Certificates', () => {
 it('Expect to get key and certs back', async () => {
    const result = await getCertifacts();
    expect(result.certificate).to.be.a('String');
    expect(result.key).to.be.a('String');
 })
});
