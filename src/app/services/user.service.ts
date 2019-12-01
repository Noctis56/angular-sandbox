import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  usersSubject = new Subject<any[]>();
  
  private users = [
    {
      "id": 20,
      "login": "FromAngular",
      "password": "strongPassword",
      "email": "test.test@test.fr"
    }
  ];

  constructor(private httpClient: HttpClient) { }

  getSingleUser() {
    return this.users[0];
  }

  emitUserSubject() {
    this.usersSubject.next(this.users);
  }

  saveUser() {
    this.httpClient
      .post('http://localhost:3000/api/v1/users', this.users[0])
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

  getUser() {
    this.httpClient
      .get<any>('http://localhost:3000/api/v1/users/1')
      .subscribe(
        (response) => {
          console.log(response);
          this.users[0] = response;
        },
        (error) => {
          console.log('Erreur ! : ' + error);
        }
    );
    this.emitUserSubject();
  }

}
  