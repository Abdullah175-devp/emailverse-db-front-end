import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // URL ='http://localhost:8080/api';
  URL ='http://smartgrowbusiness.com/api';
 
  constructor(private http:HttpClient) { 
  }

  getDatabyTitleIndustryandCoutnry(body:any){
    
    let url = this.URL+"/getbythree";
    return this.http.post(url,body);
        }

        
  getByTitleandCountry(body:any):Observable<any>{


    let url = this.URL+"/getbytwo";
    return this.http.post(url,body);
        }

        getDatabyEmail(body:any){
    
          let url = this.URL+"/serachbyemail";
          return this.http.post(url,body);
              }



        download(body:any){
    
          let url = this.URL+"/download";
          return this.http.get(url,body);
              }
//---------------------------------login and Uthorization------------------------------------

login(body:any){

let url = this.URL+"/login";
return this.http.post(url,body,{ observe: 'response' });


}
//---------------------------------Sending OTP------------------------------------

sentotp(body:any){

  let url = this.URL+"/sentotp";
  return this.http.post(url,body,{ observe: 'response' });
  
  
  }
//---------------------------------Verify OTP------------------------------------

verifyotp(body:any){

  let url = this.URL+"/verifyotp";
  return this.http.post(url,body,{ observe: 'response' });
  
  
  }
}
