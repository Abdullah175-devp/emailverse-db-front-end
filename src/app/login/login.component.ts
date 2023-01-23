import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

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
    private data: DataService
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
        //----------------------------_Sending OTP-----------------------------------

        this.data.sentotp(body).subscribe((response2: any) => {
                });
//----------------------------_TOast for sending OTP
        Swal.fire({
          icon: 'success',
          title: 'OTP Sent Successfully',
          text: 'Enter OTP',
          // confirmButtonText: 'Verify OTP Now',
          footer: `<p>Contact Admin if issues remain same</p>`,
        });
        //---------------------------Toast---------------------OTP-----------------------------------------

        //[abdullah@abdullah email-verse]$ npm install sweetalert^C
        // [abdullah@abdullah email-verse]$ npm install --save sweetalert2^C
        // [abdullah@abdullah email-verse]$

      setTimeout(() => {
        Swal.fire({
          title: 'OTP Verfication',
          text: 'OTP Sent on Email Please enter Here',
          input: 'text',
          showCancelButton: true,
          confirmButtonColor: 'green',
        }).then((result) => {
          let body = {
            username: username,
            password: password,
            otpnumber:result.value
          };
          this.data.verifyotp(body).subscribe((res:any) => {
              this.isOtpVerified = res.body
              if (this.isOtpVerified) {
                Swal.fire({
                  icon: 'success',
                  title: 'OTP Verified Successfully',
                  text: 'Please Wait you are redirecting',
                  // confirmButtonText: 'Verify OTP Now',
                  footer: `<p>Contact Admin if issues remain same</p>`,
                });
                   this.toast.info("Successfully Login");
          this.toast.info("Please wait");
                    setTimeout(() => {
                      this.router.navigate(['dashboard']);
                    }, 2000);
  
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'OTP Verification Failed',
                  text: 'Invalid OTP Enter Valid OTP ',
                  // confirmButtonText: 'Verify OTP Now',
                  footer: `
        <p>Contact Admin if issues remain same</p>
        `,
                });
              }
          })
          
        });
      }, 3000);

        // Swal.fire({
        //   icon: 'success',
        //   title: 'OTP Sent on Email',
        //   text: 'Please Verify your OTP Now ',
        //   confirmButtonText: 'Verify OTP Now',
        //   footer: `
        //   <p>Contact Admin if issues remain same</p>
        //   `
        // })

        // Swal.fire("Write something here:", {
        //   content: "input",
        // })
        // .then((value) => {
        //   swal(`You typed: ${value}`);
        // });

        //---------------------------____Toast---------------------OTP-----------------------------------------

        //   this.toast.info("Successfully Login");
        //   this.toast.info("Please wait");
        //   setTimeout(() => {
        //   this.router.navigate(['dashboard']);
        // }, 3000);
        // return;
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
        //  this.toast.error("Invalid Username or Password","LOGIN",{positionClass:'toast-top-center'});
        setTimeout(() => {
          this.username_error = '';
          this.password_error = '';
        }, 3000);
        this.isLoading = false;
        return;
      }
    );

    console.log(this.apiResponse);

    // if(username =='admin-emailverse@emailverse.com' && password=='KK1122_09876@1122')
    // {
    //   this.toast.info("Successfully Login");
    //   this.toast.info("Please wait");
    //   setTimeout(() => {
    //   this.router.navigate(['dashboard']);

    //   }, 3000);
    // }
    // else
    // {

    //   this.toast.error("Invalid Username or Password");
    //   setTimeout(() => {
    //     this.username_error = "";
    //     this.password_error = "";
    //   }, 3000);
    //   this.isLoading = false;
    //   return
    // }
  }

  onSubmit() {}
}
