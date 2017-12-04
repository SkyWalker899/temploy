import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [AngularFireAuth]
})
export class RegistrationComponent implements OnInit {

  isEmployer = true;

  constructor(public afAuth: AngularFireAuth) {
  }

  ngOnInit() {
  }

  toggleViews(view: string) {
    this.isEmployer = (view === 'employer') ? true : false;
  }

  googleRegistration(event: any) {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  emailRegistration(event: any) {
    const email = event.email;
    const password = event.password;
    this.afAuth.auth.createUserWithEmailAndPassword(email, password);

  }

}
