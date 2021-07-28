import { injectable } from '@core/di';
import { Http } from './config';
import { HttpConfig, HttpRequestConfig, HttpSuccessResponse, IHttpClient } from './types';

@injectable()
export class HttpClient implements IHttpClient {
	private http: Http;

	initialize = (config: HttpConfig) => {
		this.http = new Http(config);
	}

	createInstance() {
		return this.http.createHttpClient();
	}

	get<T = unknown>(url: string, config?: HttpRequestConfig): Promise<HttpSuccessResponse<T>> {
		return this.http.client.get<T>(url, config);
	}

	post<T = unknown>(url: string, body?: unknown, config?: HttpRequestConfig): Promise<HttpSuccessResponse<T>> {
		return this.http.client.post<T>(url, body, config);
	}

	put<T = unknown>(url: string, body?: unknown, config?: HttpRequestConfig): Promise<HttpSuccessResponse<T>> {
		return this.http.client.put<T>(url, body, config);
	}

	patch<T = unknown>(url: string, body?: unknown, config?: HttpRequestConfig): Promise<HttpSuccessResponse<T>> {
		return this.http.client.patch<T>(url, body, config);
	}

	delete<T = unknown>(url: string, config?: HttpRequestConfig): Promise<HttpSuccessResponse<T>> {
		return this.http.client.delete<T>(url, config);
	}
}