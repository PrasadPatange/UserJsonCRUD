import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Interface/user';
import { UserdataService } from 'src/app/service/userdata.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  userData: User = {
    id: 0,
    Name: '',
    photo: '',
    Mobile: '',
    email: '',
    channel: '',
    Courses: '',
    rating: 0,
  };
  starRating = 0;
  constructor(
    private userService: UserdataService,
    private router: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe((param) => {
      var id = Number(param.get('id'));
      this.getDataById(id);
    });
  }

  getDataById(id: number) {
    this.userService.getDataById(id).subscribe((data: any) => {
      this.userData = data;
    });
  }
  Update() {
    this.userService.updateData(this.userData).subscribe({
      next: (data) => {
        this.route.navigate(['/userData/home']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
