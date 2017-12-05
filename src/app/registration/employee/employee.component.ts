import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NewEmployee} from '../../models/newEmployee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  @Output() google: EventEmitter<any> = new EventEmitter();
  @Output() pureRegistration: EventEmitter<any> = new EventEmitter();
  newUser = new NewEmployee();
  confirmPassword: string;
  constructor() {
  }

  ngOnInit() {

  }

  googleRegistration() {
    this.google.emit();
  }

  emailRegistration() {
    this.pureRegistration.emit(this.newUser);
  }

}
