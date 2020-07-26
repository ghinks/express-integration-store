const chai = require("chai");

const { expect } = chai;
const superagent = require("superagent");

const PORT = process.env.PORT_NUM;
const HOST = "localhost";
const PROTOCOL = "http";

const formUrl = route => {
  return `${PROTOCOL}://${HOST}:${PORT}/${route}`;
};

describe("Express Session Smoke Test", () => {
  it("expect to get a response from the system under test", async () => {
    const url = formUrl("bar");
    const result = await superagent.get(url);
    expect(result.status).to.equal(200);
  });
});
