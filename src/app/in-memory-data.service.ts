import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const user = {
      email: 'an.duong@terralogic.com',
      password: '123456'
    };
    const users = [
      {
        id: 1,
        name: 'Chantel Cruz',
        email: 'Chantel.Cruz@gmai.com',
        language: 'English',
        status: 'Active',
        lastServiceDate: Date.now(),
        registeredTime: Date.now()
      },
      {
        id: 2,
        name: 'Allan Fitzgerald',
        email: 'Allan.Fitzgerald@gmai.com',
        language: 'English',
        status: 'In Active',
        lastServiceDate: Date.now(),
        registeredTime: Date.now()
      },
      {
        id: 3,
        name: 'Martine Fletcher',
        email: 'Martine.Fletcher@gmai.com',
        language: 'English',
        status: 'Active',
        lastServiceDate: Date.now(),
        registeredTime: Date.now()
      },
      {
        id: 4,
        name: 'Chantel Cruz',
        email: 'Chantel.Cruz@gmai.com',
        language: 'English',
        status: 'Active',
        lastServiceDate: Date.now(),
        registeredTime: Date.now()
      },
      {
        id: 5,
        name: 'Allan Fitzgerald',
        email: 'Allan.Fitzgerald@gmai.com',
        language: 'English',
        status: 'In Active',
        lastServiceDate: Date.now(),
        registeredTime: Date.now()
      },
      {
        id: 6,
        name: 'Martine Fletcher',
        email: 'Martine.Fletcher@gmai.com',
        language: 'English',
        status: 'Active',
        lastServiceDate: Date.now(),
        registeredTime: Date.now()
      },
      {
        id: 7,
        name: 'Allan Fitzgerald',
        email: 'Allan.Fitzgerald@gmai.com',
        language: 'English',
        status: 'In Active',
        lastServiceDate: Date.now(),
        registeredTime: Date.now()
      },
      {
        id: 8,
        name: 'Martine Fletcher',
        email: 'Martine.Fletcher@gmai.com',
        language: 'English',
        status: 'Active',
        lastServiceDate: Date.now(),
        registeredTime: Date.now()
      }
    ];
    const logs = [
      {
        id: 12345,
        name: 'user1@gmail.com',
        createDate: Date.now(),
        timeUpload: Date.now()
      },
      {
        id: 21345,
        name: 'user2@gmail.com',
        createDate: Date.now(),
        timeUpload: Date.now()
      },
      {
        id: 31245,
        name: 'user3@gmail.com',
        createDate: Date.now(),
        timeUpload: Date.now()
      }
    ];
    return {user, users, logs};
  }

}
