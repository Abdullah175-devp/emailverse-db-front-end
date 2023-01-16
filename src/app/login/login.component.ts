import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error:string='';
  username_error:string='';
  password_error:string='';
  isLoading = false;
  constructor(private router:Router,private toast:ToastrService) { }

  ngOnInit(): void {
  }

  onClickLogin(username:any,password:any){
    this.isLoading = true;

    if(username == '' && password == ''){
      this.username_error = "Please Enter Email";
      this.password_error = "Please Enter Password";
      setTimeout(() => {
        this.username_error = "";
        this.password_error = "";
      }, 3000);
      this.isLoading = false;
      return
    }

    if(username == ''){
      this.username_error = "Please Enter Email";
      setTimeout(() => {
        this.username_error = "";
      }, 3000);
      this.isLoading = false;
      return
    }

    if(password == ''){
      this.password_error = "Please Enter Password";
      setTimeout(() => {
        this.password_error = "";
      }, 3000);
      this.isLoading = false;
      return
    }

    if(username =='abdullah@gmail.com' && password=='1111')
    {
      this.toast.info("Successfully Login");
      this.toast.info("Please wait");
      setTimeout(() => {
      this.router.navigate(['dashboard']);
       
      }, 3000);
    }
    else
    {
      this.username_error = "Invalid Email";
      this.password_error = "Invalid Password";
      this.toast.error("Invalid Username or Password");
      setTimeout(() => {
        this.username_error = "";
        this.password_error = "";
      }, 3000);
      this.isLoading = false;
      return
    }
}

}
