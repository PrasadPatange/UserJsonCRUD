import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Interface/user';
import { UserdataService } from 'src/app/service/userdata.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  starRating = 1;
  constructor(
    private userService: UserdataService,
    private route: Router,
    public fb: FormBuilder
  ) {}

  ngOnInit(): void {}
  userDataform = this.fb.group({
    id: [0],
    Name: ['', [Validators.required]],
    photo: [
      'https://i.pinimg.com/originals/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg',
      [Validators.required],
    ],
    Mobile: [
      '',
      [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('^[0-9]+$'),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    channel: ['', [Validators.required]],
    Courses: ['', [Validators.required]],
    rating: [0],
  });
  // Getter method to access formcontrols
  get f() {
    return this.userDataform.controls;
  }

  postData() {
    this.userService.addData(this.userDataform.value).subscribe({
      next: (user) => {
        this.route.navigate(['/userData/home']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
