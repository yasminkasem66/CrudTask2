import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/@AppService/services/user.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss'],
})
export class AddEditUserComponent implements OnInit {
  userForm!: FormGroup;
  id!: any;
  action!: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.createForm();
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log({ id: this.id });
    if (this.id) {
      this.action = 'Edit';
      this.getUser(this.id);
    } else {
      this.action = 'Add';
    }
  }

  ngOnInit(): void {}

  getUser(id: any) {
    this.userService.getUserById(id).subscribe((data) => {
      console.log({data});
      
    })
    
  }

  createForm(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: this.fb.array([this.fb.control('')]),
      gender: [null],
      address: [''],
    });
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
    this.userService.addUser(this.userForm.value).subscribe((users) => {
      this.router.navigate(['/common/user/']);
      console.log({ users });
    });
  }
}
