import got from 'got';
import BaseClient from './base.client.js';
import { Endpoints } from '../types/endpoints.js';
import type { Booking, CreateBookingResponse } from '../types/booking.js';
import type { SearchField } from '../types/search.js';

export default class BookingClient extends BaseClient {
  async ping() {
    return await got.get(`${this.baseUrl}${Endpoints.Ping}`);
  }

  async createBooking(bookingData: Booking) {
    return await got.post(`${this.baseUrl}${Endpoints.Booking}`, {
      json: bookingData,
      responseType: 'json',
    });
  }

  async getBooking(bookingId: number) {
    return await got.get(`${this.baseUrl}${Endpoints.Booking}/${bookingId}`, {
      responseType: 'json',
    });
  }

  async searchBooking(field: SearchField, value: string) {
    return await got.get(`${this.baseUrl}${Endpoints.Booking}`, {
      searchParams: { [field]: value },
      responseType: 'json',
    });
  }

  async createBookingTyped(bookingData: Booking): Promise<CreateBookingResponse> {
    const res = await got.post(`${this.baseUrl}${Endpoints.Booking}`, {
      json: bookingData,
      responseType: 'json',
    });

    return res.body as CreateBookingResponse;
  }
}