import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  error: string = '';
  username_error: string = '';
  password_error: string = '';
  isLoading = false;
  islogin: Boolean = false;
  apiResponse: any;
  isloaderHidden = true;
  isOtpVerified= false;
  constructor(
    private router: Router,
    private toast: ToastrService,
    private data: DataService,private cookieService:CookieService
  ) {}

  ngOnInit(): void {}

  async onClickLogin(username: any, password: any) {
    this.isLoading = true;

    if (username == '' && password == '') {
      this.username_error = 'Please Enter Email';
      this.password_error = 'Please Enter Password';
      setTimeout(() => {
        this.username_error = '';
        this.password_error = '';
      }, 3000);
      this.isLoading = false;
      return;
    }

    if (username == '') {
      this.username_error = 'Please Enter Email';
      setTimeout(() => {
        this.username_error = '';
      }, 3000);
      this.isLoading = false;
      return;
    }

    if (password == '') {
      this.password_error = 'Please Enter Password';
      setTimeout(() => {
        this.password_error = '';
      }, 3000);
      this.isLoading = false;
      return;
    }

    this.isloaderHidden = false;

    console.log(username);
    console.log(password);
    let body = {
      username: username,
      password: password,
    };
    console.log(body);
    let url = await this.data.login(body).subscribe(
      (response: any) => {
        this.isloaderHidden = true;
        console.log(response.body);
        this.apiResponse = response.text;
        console.log(response.body['token']);
        this.cookieService.set('SessionId',response.body['token']);
        // Swal.fire({
        //   position: 'top-end',
        //   icon: 'success',
        //   title: 'Login Successfully',
        //   showConfirmButton: false,
        //   timer: 1500
        // });
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully'
        })
        setTimeout(() => {
                          this.router.navigate(['dashboard']);
                        }, 3000);
      



      },
      (apierror) => {
        this.isloaderHidden = true;

        console.log(apierror);
        //-------------------------Alert----------------------
        Swal.fire({
          icon: 'error',
          title: 'Invalid Username or Password',
          text: 'Please Enter Correct Username or Password! ',
          footer: `
        <p>Contact Admin if issues remain same</p>
        `,
        });
        //-------------------------Alert----------------------
        setTimeout(() => {
          this.username_error = '';
          this.password_error = '';
        }, 3000);
        this.isLoading = false;
        return;
      }
    );

    console.log(this.apiResponse);

  
  }

  onSubmit() {}
}
