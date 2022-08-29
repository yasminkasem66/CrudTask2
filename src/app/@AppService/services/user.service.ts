import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  usersUrl = 'http://localhost:3000/users';

  private _users: BehaviorSubject<User[]>;

  private dataStore: {
    users: User[];
  };

  constructor(private http: HttpClient) {
    this.dataStore = { users: [] };
    this._users = new BehaviorSubject<User[]>([]);
  }

  get users(): Observable<User[]> {
    return this._users.asObservable();
  }

  userById(id: number) {
    return this.dataStore.users.find((x) => x.id == id);
  }

  getUsers() {
    return this.http.get<User[]>(this.usersUrl);
  }
  addUser(user: User) {
    return this.http.post<User>(this.usersUrl, user);
  }
  updateUser(user: User, id: any) {
    return this.http.put<User>(`${this.usersUrl}/${id}`, user);
  }
  deleteUser(id: any) {
    return this.http.delete<any>(`${this.usersUrl}/${id}`);
  }

  getUserById(id: any) {
    return this.http.get<any>(`${this.usersUrl}/${id}`);
  }
  search(user: User) {
    return this.http.get<any>(`${this.usersUrl}?name=${user.name}`);
  }

  //   GET /posts?title=json-server&author=typicode
  // GET /posts?id=1&id=2
  // GET /comments?author.name=typicode
}
