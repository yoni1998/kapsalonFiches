import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any;
  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {}
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  loginCheck(): void {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.ngZone.run(() => {
          this.router.navigate(['/fiches']);
        });
      } else {
        this.ngZone.run(() => {
          this.router.navigate(['/login']);
        });
      }
    });
  }

  isLoggedIn(): boolean {
    if (
      this.user &&
      this.user.displayName === 'Yoni Vindelinckx' &&
      this.user.email === 'yoni.vindelinckx@hotmail.com' &&
      this.user.uid === 'Sut2YnqaroRABlNjTbhJyyYxrfn1'
    ) {
      return true;
    } else {
      return false;
    }
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithRedirect(provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
