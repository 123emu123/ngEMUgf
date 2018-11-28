import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/shared/user-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public error: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {  }

  login(email: string, password: string) {
    this.userService.login(email, password).subscribe(
      (user: UserModel) => {
        this.router.navigate(['/user']);
      },
      err => console.warn('hiba', err)
    );  
  }

  clearError() {
    delete(this.error);
  }
}
