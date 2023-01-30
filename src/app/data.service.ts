import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



let headers: HttpHeaders = new HttpHeaders();

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // URL = 'http://localhost:9000/api';
  // URLLogin = 'http://localhost:8080';
  URL ='http://smartgrowbusiness.com/api';

  constructor(private http: HttpClient, private cookieService: CookieService) {
    headers = headers.set(
      'Authorization',
      'Bearer ' + this.cookieService.get('SessionId')
    );
  }

  getDatabyTitleIndustryandCoutnry(body: any) {
    let url = this.URL + '/getbythree';
    return this.http.post(url, body, { headers });
  }

  getByTitleandCountry(body: any): Observable<any> {
    let url = this.URL + '/getbytwo';
    return this.http.post(url, body, { headers });
  }

  getDatabyEmail(body: any) {
    console.log(headers);
    console.log(body);
    let url = this.URL + '/serachbyemail';
    return this.http.post(url, body, { headers });
  }

  download(body: any) {
    let headersbody = this.cookieService.get('SessionId');
    let url = this.URL + '/download';
    return this.http.post(url, body, { headers });
  }
  //---------------------------------login and Uthorization------------------------------------

  login(body: any) {
    let url = this.URL + '/login';
    return this.http.post(url, body, { observe: 'response' });
  }
  //---------------------------------Sending OTP------------------------------------

  sentotp(body: any) {
    let url = this.URL + '/sentotp';
    return this.http.post(url, body, { observe: 'response' });
  }
  //---------------------------------Verify OTP------------------------------------

  verifyotp(body: any) {
    let url = this.URL + '/verifyotp';
    return this.http.post(url, body, { observe: 'response' });
  }
}
