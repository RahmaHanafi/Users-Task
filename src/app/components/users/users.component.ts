import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { PageEvent } from '@angular/material/paginator';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';
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
    return this.myService
      .getAllUsers(this.pageIndex + 1)
      .pipe(
        catchError((err) => throwError(() => err)),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((res) => {
        this.allUsers = res.data;
        this.filteredUsers = res.data;
        this.length = res.total;
        this.pageSize = res.per_page;
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
      this.myService
        .getUserByID(+id)
        .pipe(
          catchError((err) => {
            this.filteredUsers = [];
            return throwError(() => err);
          }),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe((res) => {
          this.filteredUsers = [res.data];
        });
    }

    // this.dataFromSearch = data;
    // // if (data === '') return;
    // this.filteredUsers = this.allUsers.filter((user) => user.id == data);
    // console.log(this.filteredUsers);

    // if (data === '') return;
    // this.allUsers = this.allUsers.filter((user) => user.id === data);

    // console.log(id);
  }
}
