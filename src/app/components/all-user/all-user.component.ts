import { Component, OnInit } from '@angular/core';
import { DemoService } from 'src/app/services/demo.service';
import { PageEvent } from '@angular/material/paginator';
import IUser from 'src/app/interface/user.interface';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css'],
})
export class AllUserComponent implements OnInit {
  constructor(public myService: DemoService) {}

  mybreakpoint: number = 1;

  pageIndex: number = 0;
  length: number | undefined;
  pageSize: number | undefined;
  pageEvent: PageEvent | undefined;
  isLoading: boolean = true;

  allUsers: IUser[] = [];

  getUser() {
    return this.myService.getAllUsers(this.pageIndex + 1).subscribe({
      next: (res) => {
        this.allUsers = res.data;
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
}
