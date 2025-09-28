import { test, expect } from '@playwright/test';
import { playerUsers } from '../../src/utils/constants/users';
import { ApiRequestBuilder } from '../../src/builders/apiRequestBuilder';

// Примерен тест с двама различни играча

test('API returns different results for two different player users', async ({ request }) => {
  const [player1, player2] = playerUsers;

  // Примерен API endpoint, който приема userId като параметър
  const url = 'https://api.publicapis.org/entries'; // Заменете с вашия реален endpoint

  // Първа заявка с player1
  const response1 = await new ApiRequestBuilder()
    .setUrl(url)
    .setMethod('GET')
    .setParam('userId', player1.id)
    .send(request);

  expect(response1.ok()).toBeTruthy();
  const json1 = await response1.json();
  expect(json1).toHaveProperty('entries');

  // Втора заявка с player2
  const response2 = await new ApiRequestBuilder()
    .setUrl(url)
    .setMethod('GET')
    .setParam('userId', player2.id)
    .send(request);

  expect(response2.ok()).toBeTruthy();
  const json2 = await response2.json();
  expect(json2).toHaveProperty('entries');

  // Примерна проверка, че резултатите са различни (ако API връща различни данни за различни userId)
  // Ако не, може да се премахне тази проверка
  expect(JSON.stringify(json1)).not.toBe(JSON.stringify(json2));
});
