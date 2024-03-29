import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import IUser from 'src/app/interface/user.interface';
import { DemoService } from 'src/app/services/demo.service';

@Component({
  selector: 'app-specific-user',
  templateUrl: './specific-user.component.html',
  styleUrls: ['./specific-user.component.css'],
})
export class SpecificUserComponent implements OnInit {
  ID: number = 0;
  user: IUser | undefined;
  isLoading: boolean = true;

  constructor(public myService: DemoService, myActived: ActivatedRoute) {
    this.ID = myActived.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.myService.getUserByID(this.ID).subscribe({
      next: (res) => {
        this.user = res.data;
        this.isLoading = false;
      },
    });
  }
}
