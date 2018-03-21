import { Injectable } from '@angular/core';
import { loginAdmin } from './dataModel';

@Injectable()
export class DataService {

  adminDataList: loginAdmin = new loginAdmin();
  constructor() { }

}
