import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: any[];
  userSubscription: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userSubscription = this.userService.usersSubject.subscribe(
      (users: any[]) => {
        this.users = users;
      }
    );
    this.userService.emitUserSubject();
  }

  onSave() {
    this.userService.saveUser();
  }

  onFetch() {
    this.userService.getUser();
  }

}
