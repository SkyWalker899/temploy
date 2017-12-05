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

  isEmployer = false;
  phoneRecaptchaVerifier: firebase.auth.RecaptchaVerifier;
  isCheckingPhone = false;
  hasSuccessFullPost = false;

  constructor(public afAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this.phoneRecaptchaVerifier = new firebase.auth.RecaptchaVerifier('phone-sign-in-recaptcha', {
      'size': 'invisible',
      'callback': function (response) {
        // reCAPTCHA solved - will proceed with submit function
      },
      'expired-callback': function () {
        // Reset reCAPTCHA?
      }
    });
  }

  toggleViews(view: string) {
    this.isEmployer = (view === 'employer') ? true : false;
  }

  googleRegistration(event: any) {
    const phone = event.phone;
    // this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  emailRegistration(event: any) {
    const email = event.email;
    const password = event.password;
    const phone = event.phone;
    this.phoneRegistration(email, password, phone);
    // this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  phoneRegistration(email: string, password: string, phoneNumber: string) {
    this.isCheckingPhone = true;
    this.afAuth.auth.signInWithPhoneNumber(phoneNumber, this.phoneRecaptchaVerifier).then( (confirmationResult) => {
      this.isCheckingPhone = false;
      const code = prompt(`We have send a code to ${phoneNumber}, please enter it here`, '');
      if (code) {
        confirmationResult.confirm(code).then( (result) => {
          this.hasSuccessFullPost = true;
          const user = firebase.auth().currentUser;
          if (user != null) {
            user.updateEmail(email);
            user.updatePassword(password);
          }
        }).catch( (error) => {
          console.log(error);
        });
      }
    }).catch( (error) => {
      console.log(error.message);
    });
  }

}
