import {
  Component,
  Input,
  OnChanges,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/Interface/user';
import { UserdataService } from 'src/app/service/userdata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allData: any = [];
  modalRef!: BsModalRef;
  rating: any;
  stars: any[] = [0, 0, 0, 0, 0]; //five empty stars
  starRating = 1;
  iconClass: any = {
    0: 'bi bi-star ib',
    0.5: 'bi bi-star-half ib',
    1: 'bi bi-star-fill ib',
  };

  constructor(
    private userService: UserdataService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }
  getUserData() {
    this.userService.getData().subscribe((data) => {
      this.allData = data;
    });
  }

  deleteData(id: number) {
    this.userService.deleteData(id).subscribe((res) => {
      console.log('deleted Data : ', res);
      this.getUserData();
    });
  }
  // Modal
  UserSingleData!: User;
  openModal(template: TemplateRef<any>, userId: number) {
    this.userService.getData().subscribe((data) => {
      data.forEach((user, i) => {
        user = this.allData[i];
        if (userId == user.id) {
          this.modalRef = this.modalService.show(template);
          this.UserSingleData = user;
          this.rating = user.rating;
          this.rating == 0
            ? this.stars
            : this.rating == 1
            ? (this.stars = [1, 0, 0, 0, 0])
            : this.rating == 2
            ? (this.stars = [1, 1, 0, 0, 0])
            : this.rating == 3
            ? (this.stars = [1, 1, 1, 0, 0])
            : this.rating == 4
            ? (this.stars = [1, 1, 1, 1, 0])
            : (this.stars = [1, 1, 1, 1, 1]);
        }
      });
    });
  }

  // @Input()
  // rating!: any;
  // rating :any = this.allData[1]?.rating;
  //
  // ngOnChanges() {
  //   this.fillStars();
  // }
  // fillStars() {
  //   var starsToFill = Math.round(this.rating * 2)/2; //round to nearest 0.5
  //   var i = 0;
  //   while(starsToFill > 0.5){
  //     this.stars[i] = 1;
  //     i++;
  //     starsToFill--;
  //     console.log("starfill : ",this.stars)
  //   }
  //   if(starsToFill === 0.5){
  //     this.stars[i] = 0.5;
  //     console.log("starfillhaft : ",this.stars)
  //   }
  // }
}
