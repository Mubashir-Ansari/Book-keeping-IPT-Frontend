import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { isDefined } from '@angular/compiler/src/util';
import { MyserviceService } from 'src/app/services/myservice.service';

const baseUrl = environment.baseUrl;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  name: string;
  constructor(
    private router: Router,
    private http: HttpClient,
    private cookieService: CookieService,
    private myservice: MyserviceService
  ) {
    this.http
      .post(`${baseUrl}/Getinfo`, {
        withCredentials: true,
      })
      .subscribe(
        (res) => {
          console.log(res['name']);
          this.name = res['name'];
          //this.myservice.setheadername(this.headername);
        },
        (err) => {
          console.log(err);
          this.router.navigateByUrl('login');
        }
      );
  }
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {}
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
  logout() {
    console.log('here at logout');
    this.http
      .post(`${baseUrl}/Logout`, {
        withCredentials: true,
      })
      .subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
    this.router.navigateByUrl('login');
  }
  // logout() {
  //   console.log('here at logout');
  //   console.log('KJDSAKJDSAKDSAK:', document.cookie);
  //   this.cookieService.deleteAll();

  //   // this.http
  //   //   .get(`${baseUrl}/Logout`, {
  //   //     withCredentials: true,
  //   //   })
  //   //   .subscribe(
  //   //     (res) => console.log(res),
  //   //     (err) => console.log(err)
  //   //   );
  //   this.router.navigateByUrl('login');
  // }
}
