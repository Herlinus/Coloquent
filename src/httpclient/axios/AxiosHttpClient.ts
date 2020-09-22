import {HttpClient} from "../HttpClient";
import {AxiosInstance, AxiosRequestConfig} from "axios";
import axios from 'axios';
import {HttpClientPromise} from "../HttpClientPromise";
import {AxiosHttpClientPromise} from "./AxiosHttpClientPromise";

export class AxiosHttpClient implements HttpClient
{
    private axiosInstance: AxiosInstance;

    constructor()
    constructor(axiosInstance?: AxiosInstance) {
        if (axiosInstance === null || axiosInstance === undefined) {
            axiosInstance = axios.create();
            axiosInstance.defaults.headers['Accept'] = 'application/vnd.api+json';
            axiosInstance.defaults.headers['Content-type'] = 'application/vnd.api+json';
        }
        this.axiosInstance = axiosInstance;
    }

    setBaseUrl(baseUrl: string): void
    {
        this.axiosInstance.defaults.baseURL = baseUrl;
    }

    setWithCredentials(withCredientials: boolean): void
    {
        this.axiosInstance.defaults.withCredentials = withCredientials;
    }

    get(url: string, config?: any): HttpClientPromise {
        return new AxiosHttpClientPromise(this.axiosInstance.get(url, { ...config }));
    }

    delete(url: string, config?: any): HttpClientPromise {
        return new AxiosHttpClientPromise(this.axiosInstance.delete(url, { ...config }));
    }

    head(url: string, config?: any): HttpClientPromise {
        return new AxiosHttpClientPromise(this.axiosInstance.head(url, { ...config }));
    }

    post(url: string, data?: any, config?: any): HttpClientPromise {
        return new AxiosHttpClientPromise(this.axiosInstance.post(url, data, { ...config }));
    }

    put(url: string, data?: any, config?: any): HttpClientPromise {
        return new AxiosHttpClientPromise(this.axiosInstance.put(url, data, { ...config }));
    }

    patch(url: string, data?: any, config?: any): HttpClientPromise {
        return new AxiosHttpClientPromise(this.axiosInstance.patch(url, data, { ...config }));
    }

    public getImplementingClient(): AxiosInstance
    {
        return this.axiosInstance;
    }
}
