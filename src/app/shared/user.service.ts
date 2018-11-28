import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from './user-model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { FirebaseLoginModel } from './firebase-login-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn = false;

  private user: UserModel;
  private allUsers: UserModel[];

  constructor(private router: Router, private http: HttpClient) { }

  login(email: string, password: string): Observable<UserModel> {
    return this.http.post<FirebaseLoginModel>(
      `${environment.firebase.loginUrl}?key=${environment.firebase.apikey}`,
        {
        'email': email,
        'password': password,
        'returnSecureToken': true
        }
      ).pipe(switchMap(fbLogin => this.http.get<UserModel>(`${environment.firebase.baseUrl}/users/${fbLogin.localId}.json`)),
        tap(us => this.isLoggedIn = true),
        tap(us => this.user = us)
    );
  }

  register(name: string, email: string, password: string, gender: string, picture: string): Observable<UserModel> {
    return this.http.post<FirebaseLoginModel>(
      `${environment.firebase.registrationUrl}?key=${environment.firebase.apikey}`,
        {
          'email': email,
          'password': password,
          'returnSecureToken': true
        }).pipe(switchMap(fbLogin => this.http.put<UserModel>(`${environment.firebase.baseUrl}/users/${fbLogin.localId}.json`,
                {
                  'id': fbLogin.localId,
                  'name': name,
                  'email': email,
                  'gender': gender,
                  'profilepictureURL': picture
                })
              ),    
            switchMap(us => this.http.get<UserModel>(`${environment.firebase.baseUrl}/users/${us.id}.json`)),
              tap(us => this.isLoggedIn = true),
              tap(us => this.user = us)
            );
  }

  updateUser(id: string, name: string, email: string, password: string, gender: string, picture: string): Observable<UserModel> {
    return this.http.put<UserModel>(
      `${environment.firebase.baseUrl}/users/${id}.json`,
        {
          'id': id,
          'name': name,
          'email': email,
          'gender': gender,
          'profilepictureURL': picture
        }).pipe(switchMap(us => this.http.get<UserModel>(`${environment.firebase.baseUrl}/users/${us.id}.json`)),
          tap(us => this.isLoggedIn = true),
          tap(us => this.user = us)
          );
  }

  logout() {
    //delete(this.user); //ezzel undefined-re állítottuk a user értékét
    this.user = new UserModel(); // igy mindig usermodelunk van a userben
    this.isLoggedIn = false;
    this.router.navigate(['/home']);
  }

  getUserById(id: string) {
    return this.http.get<UserModel>(`${environment.firebase.baseUrl}/users/${id}.json`);
  }

  getCurrentUser() {
    return this.user;
  }
}
