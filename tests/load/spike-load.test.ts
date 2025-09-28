import { test, expect } from '@playwright/test';
import { ApiRequestBuilder } from '../../src/builders/apiRequestBuilder';
import { PlayerModel } from '../../src/models/PlayerModel';
import { API_URL } from '../../src/config/constants';

// Spike test: 100 паралелни GET заявки

test('Spike test: 100 parallel GET requests', async ({ request }) => {
  const requests = Array.from({ length: 100 }, (_, i) =>
    new ApiRequestBuilder()
      .setUrl(API_URL)
      .setMethod('GET')
      .setParam('test', i)
      .send(request)
  );
  const responses = await Promise.all(requests);
  const failedResponses: { index: number; status: number; body: string }[] = [];
  await Promise.all(responses.map(async (response, i) => {
    const body = await response.text();
    console.log(`Response #${i + 1} status: ${response.status()} ok: ${response.ok()}`);
    console.log(`Response #${i + 1} body:`, body);
    if (!response.ok()) {
      failedResponses.push({ index: i + 1, status: response.status(), body });
    }
  }));
  console.log(`Total requests: ${responses.length}`);
  console.log(`Failed requests: ${failedResponses.length}`);
  if (failedResponses.length > 0) {
    console.error('Failed responses:', failedResponses);
    throw new Error(`There are ${failedResponses.length} failed requests out of ${responses.length}`);
  }
});

// Load test: 50 паралелни POST заявки с различни PlayerModel

test('Load test: 50 parallel POST requests', async ({ request }) => {
  const requests = Array.from({ length: 50 }, (_, i) => {
    const player = new PlayerModel(i, `user${i}`, `user${i}@mail.com`, i * 10);
    return new ApiRequestBuilder()
      .setUrl(API_URL)
      .setMethod('POST')
      .setBody(player.toJson())
      .send(request);
  });
  const responses = await Promise.all(requests);
  const failedResponses: { index: number; status: number; body: string }[] = [];
  await Promise.all(responses.map(async (response, i) => {
    const body = await response.text();
    console.log(`Response #${i + 1} status: ${response.status()} ok: ${response.ok()}`);
    console.log(`Response #${i + 1} body:`, body);
    if (!response.ok()) {
      failedResponses.push({ index: i + 1, status: response.status(), body });
    }
  }));
  console.log(`Total requests: ${responses.length}`);
  console.log(`Failed requests: ${failedResponses.length}`);
  if (failedResponses.length > 0) {
    console.error('Failed responses:', failedResponses);
    throw new Error(`There are ${failedResponses.length} failed requests out of ${responses.length}`);
  }
});
