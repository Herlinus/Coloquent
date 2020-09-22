import {HttpClientPromise} from "./HttpClientPromise";
export interface HttpClient
{
    setBaseUrl(baseUrl: string): void

    /**
     * `withCredentials` indicates whether or not cross-site Access-Control requests
     * should be made using credentials
     *
     * @param withCredientials
     */
    setWithCredentials(withCredientials: boolean): void

    get(url: string, config?: any): HttpClientPromise;

    delete(url: string, config?: any): HttpClientPromise;

    head(url: string, config?: any): HttpClientPromise;

    post(url: string, data?: any, config?: any): HttpClientPromise;

    put(url: string, data?: any, config?: any): HttpClientPromise;

    patch(url: string, data?: any, config?: any): HttpClientPromise;

    getImplementingClient(): any;
}
