import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { UserModel } from 'src/app/shared/user-model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  user: UserModel;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {        
   this.user = this.userService.isLoggedIn ? this.userService.getCurrentUser() : new UserModel();
  }

  onSubmit(f:NgForm) {
    if (this.user.id) {
      this.userService.updateUser(this.user.id, f.value.name, f.value.email, f.value.pass1, f.value.gender, f.value.profilepictureURL).subscribe(
        (user: UserModel) => {
          this.router.navigate(['/user']);
        },
        err => console.warn('hiba', err)
      );
    } else {
      this.userService.register(f.value.name, f.value.email, f.value.pass1, f.value.gender, f.value.profilepictureURL)
      .subscribe(
        (user: UserModel) => {
          this.router.navigate(['/user']);
        },
        err => console.warn('hiba', err)
      );  
    }  
    this.router.navigate(['/user']);
  }
}
