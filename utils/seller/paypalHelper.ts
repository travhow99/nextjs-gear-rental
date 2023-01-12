import axios from 'axios';

const base = 'https://api-m.sandbox.paypal.com';

/**
 * @todo should be backend request?
 */
export async function generateAccessToken() {
	const { data: auth } = await axios.get('/api/keys/paypalToken');

	console.log('GOT AUTH:', auth);

	const response = await fetch(`${base}/v1/oauth2/token`, {
		method: 'post',
		body: 'grant_type=client_credentials',
		headers: {
			Authorization: `Basic ${auth}`,
		},
	});

	const jsonData = await handleResponse(response);
	return jsonData.access_token;
}

async function handleResponse(response: Response) {
	if (response.status === 200 || response.status === 201) {
		return response.json();
	}

	const errorMessage = await response.text();
	throw new Error(errorMessage);
}
