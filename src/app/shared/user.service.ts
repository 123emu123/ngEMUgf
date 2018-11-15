import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from './user-model';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn = false;
  private user: UserModel;
  private allUsers: UserModel[];

  constructor(private router: Router) { //, private location: Location) {
    this.allUsers = [
      new UserModel({
        'id': 1, 
        'name': 'en',
        'email': 'en@en.hu',
        'gender': 'female', 
        'profilePictureURL': ''
      }),
      new UserModel({
        'id': 2, 
        'name': 'te',
        'email': 'te@te.hu',
        'gender': 'male', 
        'profilePictureURL': ''
      }),
      new UserModel({
        'id': 3, 
        'name': 'o',
        'email': 'o@o.hu',
        'gender': 'female', 
        'profilePictureURL': ''
      })
    ];
   }

  login(email: string, password: string): boolean {
    if (email ==='angular' && password === 'angular') {
      this.user = this.allUsers[2];
      this.isLoggedIn = true;
      return true;
    }
    return false;
  }

  register(param?: UserModel) {
    if (param) {
      this.user = new UserModel({
        id: 4, 
        ...param
      });

      this.allUsers = [
        ...this.allUsers,
        this.user
      ];
    } 
    this.isLoggedIn = true;
    this.router.navigate(['/user']);
  }

  logout() {
    //delete(this.user); //ezzel undefined-re állítottuk a user értékét
    this.user = new UserModel(); // igy mindig usermodelunk van a userben
    this.isLoggedIn = false;
    this.router.navigate(['/home']);
  }

updateUser(p: UserModel) {
  this.user=new UserModel(p);
}

  getUserById(id: number) {
    const user = this.allUsers.filter(u => u.id === +id);
    return user.length > 0 ? user[0] : new UserModel(UserModel.emptyUser);
  }

  getCurrentUser() {
    return this.user;
  }
}
