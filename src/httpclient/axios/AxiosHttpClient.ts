import {HttpClient} from "../HttpClient";
import {AxiosInstance, AxiosRequestConfig} from "axios";
import axios from 'axios';
import {HttpClientPromise} from "../HttpClientPromise";
import {AxiosHttpClientPromise} from "./AxiosHttpClientPromise";

export class AxiosHttpClient implements HttpClient
{
    private axiosInstance: AxiosInstance;
    public additionalHeaders: any;

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
    setAdditionalHeaders(additionalHeaders: any): void{
        this.additionalHeaders = additionalHeaders || {};
    }
    private getAdditionalHeaders(method?: string): any{
        const addHeaders = {};
        for (const key in Object.keys(this.additionalHeaders))
        {
            addHeaders[key] = this.additionalHeaders[key](method);
        }

        return addHeaders;
    }
    private getConfig(method?: string): AxiosRequestConfig
    {
        const config = {};
        const headers = this.getAdditionalHeaders(method);
        if (Object.keys(headers)){
            config['headers'] = headers
        }
        return config
    }
    setWithCredentials(withCredientials: boolean): void
    {
        this.axiosInstance.defaults.withCredentials = withCredientials;
    }

    get(url: string): HttpClientPromise {
        const config = this.getConfig('get');
        return new AxiosHttpClientPromise(this.axiosInstance.get(url, config));
    }

    delete(url: string): HttpClientPromise {
        const config = this.getConfig('delete');
        return new AxiosHttpClientPromise(this.axiosInstance.delete(url, config));
    }

    head(url: string): HttpClientPromise {
        const config = this.getConfig('head');
        return new AxiosHttpClientPromise(this.axiosInstance.head(url, config));
    }

    post(url: string, data?: any): HttpClientPromise {
        const config = this.getConfig('post');
        return new AxiosHttpClientPromise(this.axiosInstance.post(url, data, config));
    }

    put(url: string, data?: any): HttpClientPromise {
        const config = this.getConfig('put');
        return new AxiosHttpClientPromise(this.axiosInstance.put(url, data, config));
    }

    patch(url: string, data?: any): HttpClientPromise {
        const config = this.getConfig('patch');
        return new AxiosHttpClientPromise(this.axiosInstance.patch(url, data, config));
    }

    public getImplementingClient(): AxiosInstance
    {
        return this.axiosInstance;
    }
}
