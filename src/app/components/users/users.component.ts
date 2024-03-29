import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { PageEvent } from '@angular/material/paginator';
import IUser from 'src/app/model/user.interface';

@Component({
  selector: 'app-all-user',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  constructor(public myService: UserService) {}

  mybreakpoint: number = 1;

  pageIndex: number = 0;
  length: number | undefined;
  pageSize: number | undefined;
  pageEvent: PageEvent | undefined;
  isLoading: boolean = true;

  allUsers: IUser[] = [];
  filteredUsers: IUser[] = [];
  dataFromSearch: string = '';

  getUser() {
    return this.myService.getAllUsers(this.pageIndex + 1).subscribe({
      next: (res) => {
        this.allUsers = res.data;
        this.filteredUsers = res.data;
        this.length = res.total;
        this.pageSize = res.per_page;
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.mybreakpoint = window.innerWidth <= 800 ? 2 : 3;
    this.getUser();
  }

  handleSize(event: any) {
    this.mybreakpoint = event.target.innerWidth <= 800 ? 2 : 3;
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.isLoading = true;

    this.getUser();
  }

  getDataFromSearch(id: string) {
    if (id === '') {
      this.filteredUsers = this.allUsers;
    } else {
      this.isLoading = true;
      this.myService.getUserByID(+id).subscribe({
        next: (res) => {
          this.filteredUsers = [res.data];
          this.isLoading = false;
        },
        error: (err) => {
          this.filteredUsers = [];
          this.isLoading = false;
          return err;
        },
      });
    }

    // this.dataFromSearch = data;
    // // if (data === '') return;
    // this.filteredUsers = this.allUsers.filter((user) => user.id == data);
    // console.log(this.filteredUsers);

    // if (data === '') return;
    // this.allUsers = this.allUsers.filter((user) => user.id === data);

    console.log(id);
  }
}
