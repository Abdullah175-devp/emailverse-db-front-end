import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  ishidden:boolean = true;
  ishiddenAdmin:boolean= false;


  constructor(private router:Router) { }
  username:any;
  allowed_sms:any;
  ngOnInit(): void {
    // this.data.GetDetails().subscribe(
    //   (response:any)=>{
    //     this.username = response.username;
    //     this.allowed_sms = response.allowed_sms;
    //     if(this.username== 'admin@noeticworld.com'){
    //       this.ishidden=false;
    //       this.ishiddenAdmin= true
    //       this.router.navigate(['/dashboard/adminrights/adminview'])
    //     }
    //   },
    //   (error:any)=>{

    //   }
    // )

  }

  onClickLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

}
