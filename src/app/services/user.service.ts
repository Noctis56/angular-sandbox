import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable()
export class UserService {

  usersSubject = new Subject<User[]>();
  
  private users: User[];

  constructor(private httpClient: HttpClient) { 
    this.getUsers();
  }

  emitUsersSubject() {
    this.usersSubject.next(this.users);
  }

  addUser(user: User) {
    user.id = this.users[(this.users.length - 1)].id + 1;
    this.users.push(user);
    this.emitUsersSubject();

    this.saveUser(user);
  }

  saveUser(user: User) {
    this.httpClient
      .post('http://localhost:3000/api/v1/users', user)
      .subscribe(
        (response) => {
          console.log(response);
          console.log('Enregistrement terminé !');
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
    );
  }

  saveUsers() {
    for(let user of this.users) {
      this.saveUser(user);
    }
  }

  getUsers() {
    this.httpClient
      .get<User[]>('http://localhost:3000/api/v1/users')
      .subscribe(
        (response) => {
          console.log(response);
          this.users = response;
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
    );
    this.emitUsersSubject();
  }

}
  