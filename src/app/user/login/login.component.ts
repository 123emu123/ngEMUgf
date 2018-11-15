import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public error: string;

  constructor(private userService: UserService, private location: Location) { 
    
  }

  ngOnInit() {
  }

  login(email: string, password: string) {
    if (!this.userService.login(email, password)) {
      this.error = 'Hiba a belépési adatokban!';
    }
    this.location.back();
  }

  clearError() {
    delete(this.error);
  }
}
