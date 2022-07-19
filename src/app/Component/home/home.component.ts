import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/Interface/user';
import { UserdataService } from 'src/app/service/userdata.service';
import { concatMap, debounceTime, distinctUntilChanged, map, pluck, switchMap, tap } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit,AfterViewInit {

  // Search
  @ViewChild('searchForm') searchForm!: NgForm;
  searchCount : any;
  // 
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
  // Search
  ngAfterViewInit(): void {
    const formValue = this.searchForm.valueChanges;
    formValue?.pipe(
      pluck('searchTerm'),      
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(data => this.userService.getUserList(data)),


    ).subscribe(res =>{
      this.allData = res;
      console.log("Search : ",this.allData )
      this.searchCount = Object.keys(res).length;
      console.log("searchCount : ",this.searchCount )
    })
    
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
}
