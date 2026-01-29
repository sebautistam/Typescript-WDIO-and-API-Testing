import got, { type Response } from 'got';
import { describe, it, before } from 'mocha';
import { expect } from 'chai';

import { BASE_URL, env, TIMEOUT } from '../environment/environment.js';
import { bookingSearchResponseSchema } from '../schemas/search.schemas.js';

import { Endpoints } from '../types/endpoints.js';
import type { Booking, CreateBookingResponse } from '../types/booking.js';
import type { SearchField } from '../types/search.js';

type BookingSearchItem = { bookingid: number };

describe('Search for a Booking Flow', function () {
  this.timeout(TIMEOUT);

  let createResponse: Response<CreateBookingResponse>;
  let bookingId: number;

  before(async function () {
    const bookingData: Booking = {
      firstname: env.first_name,
      lastname: env.last_name,
      totalprice: Number(env.total_price),
      depositpaid: env.deposit_paid === 'true',
      bookingdates: {
        checkin: env.checkin_date,
        checkout: env.checkout_date,
      },
      additionalneeds: env.additional_needs,
    };

    createResponse = await got.post(`${BASE_URL}${Endpoints.Booking}`, {
      json: bookingData,
      responseType: 'json',
    });

    bookingId = createResponse.body.bookingid;
  });

  async function searchBy(field: SearchField, value: string): Promise<Response<BookingSearchItem[]>> {
    return await got.get(`${BASE_URL}${Endpoints.Booking}`, {
      searchParams: { [field]: value },
      responseType: 'json',
    });
  }

  describe('Search for a booking by First Name', function () {
    let response: Response<BookingSearchItem[]>;
    let responseBody: BookingSearchItem[];

    before(async function () {
      response = await searchBy('firstname', env.first_name);
      responseBody = response.body;
    });

    it('Find Booking time by First Name is under 3000ms', async function () {
      expect(response.timings.phases.total).to.be.below(3000);
    });

    it('Search Booking by First Name returns status 200', async function () {
      expect(response.statusCode).to.equal(200);
    });

    it('Look for Booking by First Name', async function () {
      const found = responseBody.some((booking) => booking.bookingid === bookingId);
      expect(found).to.be.true;
    });

    it('Search Booking by First Name response matches schema', async function () {
      const { error } = bookingSearchResponseSchema.validate(responseBody);
      expect(error, error?.message).to.be.undefined;
    });
  });

  describe('Search for a booking by Last Name', function () {
    let response: Response<BookingSearchItem[]>;
    let responseBody: BookingSearchItem[];

    before(async function () {
      response = await searchBy('lastname', env.last_name);
      responseBody = response.body;
    });

    it('Find Booking time by Last Name is under 3000ms', async function () {
      expect(response.timings.phases.total).to.be.below(3000);
    });

    it('Search Booking by Last Name returns status 200', async function () {
      expect(response.statusCode).to.equal(200);
    });

    it('Look for Booking by Last Name', async function () {
      const found = responseBody.some((booking) => booking.bookingid === bookingId);
      expect(found).to.be.true;
    });

    it('Search Booking by Last Name response matches schema', async function () {
      const { error } = bookingSearchResponseSchema.validate(responseBody);
      expect(error, error?.message).to.be.undefined;
    });
  });

  describe('Update Only Name in Booking and look for it', function () {
    let response: Response<BookingSearchItem[]>;
    let responseBody: BookingSearchItem[];

    before(async function () {
      await got
        .patch(`${BASE_URL}${Endpoints.Booking}/${bookingId}`, {
          json: { firstname: env.first_name2 },
          headers: {
            Authorization: `Basic ${Buffer.from(
              `${env.admin_username}:${env.admin_password}`,
            ).toString('base64')}`,
          },
        })
        .json();

      response = await searchBy('firstname', env.first_name2);
      responseBody = response.body;
    });

    it('Find Booking time by Updated First Name is under 3000ms', async function () {
      expect(response.timings.phases.total).to.be.below(3000);
    });

    it('Search Booking by Updated First Name returns status 200', async function () {
      expect(response.statusCode).to.equal(200);
    });

    it('Look for Booking by Updated First Name', async function () {
      const found = responseBody.some((booking) => booking.bookingid === bookingId);
      expect(found).to.be.true;
    });

    it('Search Booking by Updated First Name response matches schema', async function () {
      const { error } = bookingSearchResponseSchema.validate(responseBody);
      expect(error, error?.message).to.be.undefined;
    });
  });
});
