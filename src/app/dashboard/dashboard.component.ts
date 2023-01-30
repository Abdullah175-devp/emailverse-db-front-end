import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, retry } from 'rxjs/operators';
import { DataService } from '../data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  title: any[] = [
    'director',
    ' Marketing Manager',
    ' Business Owner CEO',
    'Owner',
    'Manager',
    'CEO',
    'Ceo',
    'Business/Office Manager, Exec Asst to CEO/Founder',
    'Business Advisor & CEO',
    'ceo',
  ];

  industry: any[] = [
    'mechanical or industrial engineering',
    'public relations & communications',
    'animation',
    'hospital & health care',
    'research',
    'defense & space',
    'higher education',
    'industrial automation',
    'facilities services',
    'utilities',
    'management consulting',
    'apparel & fashion',
    'electrical/electronic manufacturing',
    'construction',
    'printing',
    'international trade & development',
    'oil & energy',
    'information technology & services',
    'marketing & advertising',
    'insurance',
    'restaurants',
    'events services',
    'real estate',
    'logistics & supply chain',
    'transportation/trucking/railroad',
    'civic & social organization',
    'professional training & coaching',
    'financial services',
    'design',
    'international affairs',
    'food & beverages',
    'museums & institutions',
    'market research',
    'medical devices',
    'mental health care',
    'luxury goods & jewelry',
    'architecture & planning',
    'pharmaceuticals',
    'chemicals',
    'health, wellness & fitness',
    'education management',
    'machinery',
    'wholesale',
    'mining & metals',
    'sporting goods',
    'hospitality',
    'packaging & containers',
    'fishery',
    'investment management',
    'textiles',
    'furniture',
    'manufacturing',
    'cosmetics',
    'semiconductors',
    'computer & network security',
    'medical practice',
    'business supplies & equipment',
  ];

  country: any[] = ['Arginaitna', 'United States'];

  public modelTitle: any;
  public modelIndustry: any = null;
  public modelCountry: any;
  public modelTotalRecords: any;
  public modelEmail: any;
  dataresponse: any;
  // data:any='';
  selectedValue = 0;
  tableHidden = true;
  inputbox = false;
  enableEmailBox = true;
  searchByEmailButton = true;
  searchButton = false;
  isloaderHidden = true;
  // page:any;
  //---------------new ------------

  // data!:Array<any>;
  data!: any;
  totalRecords: any;
  page: any = 1;
  url: any;

  length = 50;
  pageSize = 10;
  getTotalPages = 5;
  pageIndex = 0;
  pageSizeOptions = [10];
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  pageEvent?: PageEvent;

  constructor(
    private dataservice: DataService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  validation() {
    if (this.enableEmailBox == true) {
      if (this.modelTitle == '' || this.modelTitle == null) {
        this.toastmessage('question','Missing Entry','Please Enter "Title"')

        this.toast.error('Please Enter Title');
        return;
      }
      if (this.modelCountry == '' || this.modelCountry == null) {
        this.toastmessage('question','Missing Entry','Please Enter "Country"')
        this.toast.error('Please Enter Country');
        return;
      }
      if (
        this.modelTotalRecords == '' ||
        this.modelTotalRecords == null ||
        this.modelTotalRecords == 0
      ) {
        this.toastmessage('question','Missing Entry','Please select Range for "Download"')
        
        this.toast.error('Please select Range for Download');
        return;
      }
      if (this.modelIndustry == '' || this.modelIndustry == null) {
        console.log('Searrch with 3Filter');
        this.isloaderHidden = false;
        this.onsearchbytitleandcountry(false);
      } else {
        console.log('Searrch by Industry');
        this.onsearchbytitleIndustryandcountry(false);
        return;
      }
    } else {
      if (this.modelEmail == '' || this.modelEmail == null) {
        this.toastmessage('question','Missing Entry','Please Enter "Email"')
        
        this.toast.error('Please Enter Email');
        return;
      }
      this.onsearchbyEmail();
      console.log('Searrch by Email');
      return;
    }
  }

  setAll(event: Event) {}

  oncheckboxclick(event: any) {
    // if you want to search by email
    console.log(event.srcElement.checked);
    if (event.srcElement.checked == true) {
      this.inputbox = true;
      this.enableEmailBox = false;
      this.searchButton = true;
      this.searchByEmailButton = false;
    }
    // want to search by filters
    if (event.srcElement.checked == false) {
      this.inputbox = false;
      this.enableEmailBox = true;
      this.searchButton = false;
      this.searchByEmailButton = true;
    }
  }

  //-----------------------------------Search by Title and Country only------------------------------//

  onsearchbytitleandcountry(download: Boolean) {
    const body = {
      title: this.modelTitle,
      country: this.modelCountry,
      recordsize: JSON.stringify(this.modelTotalRecords),
      download: download,
    };
    this.dataservice.getByTitleandCountry(body).subscribe((response) => {
      // this.data= data;
      // this.length= data.results.length
      // this.tableHidden= false;
      this.isloaderHidden = true;

      console.log(response);
      this.data = response;
      this.totalRecords = response.length;
      // console.log(this.data)
      // console.log(this.totalRecords)
      console.log(response.length)
      this.toast.success('Success');
      if (this.data.length == '0') {
      this.toastmessage('error','No Record Found','Result 0')
        // this.toast.error('No Record Found');
        return;
      }
      this.toastmessage('success','Record Found','Records: '+ this.totalRecords)

      this.tableHidden = false;
    },
    (error: any) => {
      // for 403 or other errors
      this.errormessage(error);
    }
    );
  }

  //-----------------------------------Search by Title Industry and Country------------------------------//

  onsearchbytitleIndustryandcountry(download: boolean) {
    const body = {
      title: this.modelTitle,
      country: this.modelCountry,
      industry: this.modelIndustry,
      recordsize: JSON.stringify(this.modelTotalRecords),
      download: download,
    };

    this.dataservice
      .getDatabyTitleIndustryandCoutnry(body)
      .subscribe((response) => {
        this.isloaderHidden = true;
        console.log(response);
        this.data = response;
        this.totalRecords = this.data.length;
        this.toastmessage('success','Success','Data Fetch Successfully')
        this.toast.success('Success');
        if (this.data.length == '0') {
      this.toastmessage('error','No Record Found','Result 0')
          // this.toast.error('No Record Found');
          return;
        }
      this.toastmessage('success','Record Found','Records: '+ this.totalRecords)

        this.tableHidden = false;
      },
      (error: any) => {
        // for 403 or other errors
        this.errormessage(error);
      }
      );
  }

  //-----------------------------------Search by Email------------------------------//

  onsearchbyEmail() {
    const body = {
      email: this.modelEmail,
    };

    this.url = this.dataservice.getDatabyEmail(body).subscribe(
      (response) => {
        this.isloaderHidden = true;
        console.log(response);

        this.data = response;
        this.totalRecords = this.data.length;

        this.toast.success('Success');
        if (this.data.length == '0') {
      this.toastmessage('error','No Record Found','Result 0')
          // this.toast.error('No Record Found');
          return;
        }
      this.toastmessage('success','Record Found','Records: '+ this.totalRecords)

        this.tableHidden = false;
      },
      (error: any) => {
        // for 403 or other errors
        this.errormessage(error);
      }
    );
  }

  //------------------___DOwnlaod Option
  download() {
    if (this.enableEmailBox == true) {
      if (this.modelTitle == '' || this.modelTitle == null) {
        this.toast.error('Please Enter Title');
        return;
      }
      if (this.modelCountry == '' || this.modelCountry == null) {
        this.toast.error('Please Enter Country');
        return;
      }
      if (
        this.modelTotalRecords == '' ||
        this.modelTotalRecords == null ||
        this.modelTotalRecords == 0
      ) {
        this.toast.error('Please select Range for Download');
        return;
      }
      if (this.modelIndustry == '' || this.modelIndustry == null) {
        console.log('Download with 3Filter');
        let title = this.modelTitle.replace(' ', '-');
        let coutnry = this.modelCountry.replace(' ', '-');

        let url =
          this.dataservice.URL +
          '/downloadgetbytwo' +
          '?gettitle=' +
          title +
          '&getcountry=' +
          coutnry +
          '&recordsize=' +
          this.modelTotalRecords;
        window.open(url, '_blank');
        this.toast.info('File Download Successfully');
      } else {
        console.log('Download by Industry');
        let title = this.modelTitle.replace(' ', '-');
        let coutnry = this.modelCountry.replace(' ', '-');
        let industr = this.modelIndustry.replace(' ', '-');

        let url =
          this.dataservice.URL +
          '/downloadgetbythree' +
          '?gettitle=' +
          title +
          '&getcountry=' +
          coutnry +
          '&getindustry=' +
          industr +
          '&recordsize=' +
          this.modelTotalRecords;
        window.open(url, '_blank');
        this.toast.info('File Download Successfully');
        return;
      }
    } else {
      // this.onsearchbyEmail(true);
      console.log('Download by Email');
      let url =
        this.dataservice.URL +
        '/downloadserachbyemail' +
        '?email=' +
        this.modelEmail;
      window.open(url, '_blank');
      this.toast.info('File Download Successfully');

      return;
    }
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    // this.dataservice.getDatabyIndustry(this.modelIndustry,this.pageIndex).subscribe(
    //   (data) => {
    //     console.log(data);
    //       this.data= data;
    //       this.length= this.data.totalItems
    //       // this.length=  this.data.totalPages;
    //       // console.log(this.pagelenght);
    //       this.tableHidden= false;
    // }

    //   );
  }

  isEmpty() {
    return Object.keys(this.data).length === 0;
  }

  onChangeSelect() {
    // if(this.data != '' || this.data != null){
    //   this.data = '';
    //   // this.currentpage=0;
    // }
  }

  // pageChanged(event: PageChangedEvent): void {

  //     // this.dataservice.getDatabyIndustry(this.modelIndustry,event.page-1).subscribe((data)=>{
  //     //   this.data=data;

  //     //    },
  //     //    err=>{

  //     //    })

  // }

  formatter = (result: string) => result.toUpperCase();

  searchTitle: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term === ''
          ? []
          : this.title
              .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10)
      )
    );

  searchIndustry: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term === ''
          ? []
          : this.industry
              .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10)
      )
    );

  searchCountry: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term === ''
          ? []
          : this.country
              .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10)
      )
    );

  errormessage(error: any) {
    console.log('error');
    console.log(error);
    Swal.fire({
      icon: 'error',
      title: 'Login Error',
      text: 'Login Expired!',
    }).then((result) => {
      this.router.navigate(['login']);
    });
  }
  toastmessage(icon:any,title:any,text:any){
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    })


  }
}
