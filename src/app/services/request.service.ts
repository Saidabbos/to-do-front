import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {TokenService} from './token.service';


@Injectable()
export class RequestService {
  private urlPrefix: string = environment.url;
  private headers: any = {};
  constructor(private http: HttpClient,
              private auth: TokenService) {
    if (localStorage.getItem('user')) {
      this.headers['Authorization'] = 'Bearer ' + this.tokenParse(localStorage.getItem('user'));
    }
    this.hasToken();
  }
  private request(method: string, url: string, options?: any): Promise<any>  {
    if (this.headers) {
      options['headers'] = this.headers;
    }
    return this.http.request(method, this.urlPrefix + url, options)
      .toPromise()
      .then((response: any) => {
        if (response.status && response.data) {
          return response.data;
        } else {
          // this.errSer.setError({type: 'error', data: response.error});
          // this.handleError(response.error);
          return Promise.reject(response.error);
        }
      }, (error) => {
        return Promise.reject(error.error);
      })
      .catch(this.handleError);
  }
  get(url: string, search?: any) {
    return this.request('GET', url, {params: search}).catch(this.handleError)
      .then(response => response);
  }
  post(url: string, body: any, search?: any) {
    return this.request('POST', url, {body: body, params: search})
      .then(response => response).catch(this.handleError);
  }
  put(url: string, body: any) {
   return this.request('PUT', url, {body: body})
      .then(response => response).catch(this.handleError);
  }
  delete(url: string) {
    return this.request('DELETE', url, {})
      .then(response => response)
      .catch(this.handleError);
  }
  private handleError(error: Error): Promise<any> {
    return Promise.reject(error);
  }
  tokenParse(user: any) {
    user  = JSON.parse(user);
    return user.token;
  }
  private hasToken() {
    this.auth.hasToken.subscribe(data => {
      if (!data) {
        delete this.headers['Authorization'];
      } else {
        this.headers['Authorization'] = 'Bearer ' + this.tokenParse(localStorage.getItem('user'));
      }
    });
  }
}
