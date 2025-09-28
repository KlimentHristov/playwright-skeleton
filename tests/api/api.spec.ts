import { test, expect } from '@playwright/test';
import { ApiRequestBuilder } from '../../src/builders/apiRequestBuilder';

test('HTTP methods GET', async ({ request }) => {
	const builder = new ApiRequestBuilder()
		.setUrl('https://httpbin.org/get')
        .setHeaders({ 'Accept': 'application/json' })
		.setMethod('GET')

	const response = await builder.send(request);

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
    
    const json = await response.json();
    expect(json).toHaveProperty('headers');
    expect(json.headers).toHaveProperty('Accept', 'application/json');
    expect(json).toHaveProperty('url', 'https://httpbin.org/get');
});
