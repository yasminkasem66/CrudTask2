import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { GenderEnum } from 'src/app/@AppService/enums/gender-enum';
import { User } from 'src/app/@AppService/models/user';
import { UserService } from 'src/app/@AppService/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, AfterViewInit {
  userForm!: FormGroup;
  displayedColumns: string[] = [
    'name',
    'email',
    'phone',
    'address',
    'gender',
    'actions',
  ];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('table') table!: MatTable<any>;
  GenderEnum: typeof GenderEnum = GenderEnum;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.getUsers();
    this.createForm();
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createForm(): void {
    this.userForm = this.fb.group({
      name: [''],
      email: [''],
      phone: this.fb.array([this.fb.control('')]),
      gender: [null],
      address: [''],
    });
  }

  getUsers() {
    console.log('xxxxxx');
    this.userService.getUsers().subscribe((users) => {
      console.log({ users });
      this.dataSource.data = users;
      this.table.renderRows();
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
    this.userService.search(this.userForm.value).subscribe((users) => {
      console.log({ users });

      this.dataSource.data = users;
      this.table.renderRows();
    });
  }

  deleteUser(id: any) {
    this.userService.deleteUser(+id).subscribe((data) => {
      this.getUsers();
    });
  }
  editUser(id: any) {
    this.router.navigate([`common/user/edit/${id}`]);
  }
}
