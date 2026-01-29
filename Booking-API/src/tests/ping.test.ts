import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import { TIMEOUT } from '../environment/environment.js';
import BookingClient from '../client/booking.client.js';

describe('PING TEST', function () {
  this.timeout(TIMEOUT);

  const client = new BookingClient();
  let response: any;

  before(async function () {
    response = await client.ping();
  });

  it('Ping response time is under 1000ms', function () {
    expect(response.timings.phases.total).to.be.below(1000);
  });

  it('Response Status is 201', async function () {
    expect(response.statusCode).to.equal(201);
  });

  it('Response includes correct text ("Created")', async function () {
    expect(response.body).to.include('Created');
  });
});