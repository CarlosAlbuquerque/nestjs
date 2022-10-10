export class NestResponse {
  constructor(response: NestResponse) {
    // this.status = response.status;
    // this.headers = response.headers;
    // this.body = response.body;
    Object.assign(this, response);
  }

  status: number;
  headers: any;
  body: any;
}
