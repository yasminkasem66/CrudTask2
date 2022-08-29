import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/@AppService/models/user';
import { UserService } from 'src/app/@AppService/services/user.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss'],
})
export class AddEditUserComponent implements OnInit {
  userForm!: FormGroup;
  userModel!: User;
  id!: any;
  action!: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log({ id: this.id });
    if (this.id) {
      this.action = 'Edit';
      this.getUser(this.id);
    } else {
      this.action = 'Add';
      this.createForm();
    }
  }

  ngOnInit(): void {}

  getUser(id: any) {
    this.userService.getUserById(id).subscribe((data) => {
      this.userModel = data;
      console.log({ data: this.userModel });
      this.createForm();
      // this.getPhoneFromModel();
    });
  }

  createForm(): void {
    this.userForm = this.fb.group({
      name: [this.userModel ? this.userModel.name : '', [Validators.required]],
      email: [
        this.userModel ? this.userModel.email : '',
        [Validators.required],
      ],
      phone: this.userModel
        ? this.getPhoneFromModel()
        : this.fb.array([this.fb.control('')]),
      gender: [this.userModel ? this.userModel.gender : ''],
      address: [this.userModel ? this.userModel.address : ''],
    });
  }

  getPhoneFromModel() {
    let phoneArrayHolder: FormArray = this.fb.array([]);
    for (let i = 0; i < this.userModel.phone.length; i++) {
      phoneArrayHolder.push(new FormControl(this.userModel.phone[i]));
    }
    console.log({ phoneArrayHolder });

    return phoneArrayHolder;
  }

  get fc() {
    return this.userForm.controls;
  }
  get phone() {
    return this.userForm.get('phone') as FormArray;
  }

  addPhone() {
    this.phone.push(this.fb.control(''));
  }

  onSubmit() {
    console.warn(this.userForm.value);
    if (this.id) {
      this.userService
        .updateUser(this.userForm.value, this.id)
        .subscribe((users) => {
          this.router.navigate(['/common/user/']);
        });
    } else {
      this.userService.addUser(this.userForm.value).subscribe((users) => {
        this.router.navigate(['/common/user/']);
      });
    }
  }
}
