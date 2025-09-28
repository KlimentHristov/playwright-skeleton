
export class ApiRequestBuilder {
  private method: string = 'GET';
  private url: string = '';
  private headers: Record<string, string> = {};
  private body: any = null;
  private params: Record<string, string | number | boolean> = {};

  setUrl(url: string) {
    this.url = url;
    return this;
  }

  setMethod(method: string) {
    this.method = method;
    return this;
  }

  setHeaders(headers: Record<string, string>) {
    this.headers = headers;
    return this;
  }

  setBody(body: any) {
    this.body = body;
    return this;
  }

  setParam(key: string, value: string | number | boolean) {
    this.params[key] = value;
    return this;
  }

  setParams(params: Record<string, string | number | boolean>) {
    this.params = { ...this.params, ...params };
    return this;
  }
  
  buildUrlWithParams() {
    const urlObj = new URL(this.url);
    Object.entries(this.params).forEach(([key, value]) => {
      urlObj.searchParams.set(key, String(value));
    });
    return urlObj.toString();
  }


  async send(context: any) {
    const fullUrl = this.buildUrlWithParams();
    return await context.fetch(fullUrl, {
      method: this.method,
      headers: this.headers,
      data: this.body
    });
  }
}
