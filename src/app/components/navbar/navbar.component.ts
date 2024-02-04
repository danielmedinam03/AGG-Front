import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() sideNavToggled = new EventEmitter<boolean>();

  isLoggedIn = false;
  menuStatus: boolean = false;
  user:any = null;

  constructor(public login:LoginService,
    public route: Router
    ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubjec.asObservable().subscribe(
      data => {
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();
      }
    )
  }

  SideNavToggle(){
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }

  public logout(){
    this.login.logout();
    window.location.reload();
    this.route.navigateByUrl('/login');
  }

}
