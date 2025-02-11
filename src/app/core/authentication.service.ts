import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

/**
 * @see https://firebase.google.com/docs/reference/rest/auth?hl=fr#section-create-email-password
 */
interface FirebaseResponseSignUp {
  idToken : string;
  email: string;
  refreshToken : string;
  expiresIn: string,
  localId: string;
}

interface FirebaseResponseSignIn {
  displayName: string;
  email: string;
  expiresIn: string;
  idToken : string;
  kind : string;
  localId: string;
  refreshToken : string;
  registered: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  
  readonly #http = inject(HttpClient);
  
  register(email: string, password : string): Observable<FirebaseResponseSignUp> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseConfig.apiKey}`;
    const body = {email, password, returnSecureToken:true};
    return this.#http.post<FirebaseResponseSignUp>(url, body);
  }

  login(email: string, password : string) : Observable<FirebaseResponseSignIn> {
    const url =`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseConfig.apiKey}`;
    const body = {email, password, returnSecureToken:true};
    return this.#http.post<FirebaseResponseSignIn>(url, body);
  }

  save(email : string, userId: string, bearerToken: string) {
    const baseUrl = `https://firestore.googleapis.com/v1/projects/${environment.firebaseConfig.projectId}/databases/(default)/documents`
    const userFirestoreCollectionId = 'users';
    const url = `${baseUrl}/${userFirestoreCollectionId}?key=${environment.firebaseConfig.apiKey}&documentId=${userId}`
    const body = {
      fields : {
        email: { stringValue: email }
      }
    }

    const headers = new HttpHeaders({
      'Content-type' : 'application/json',
      'Authorization': `Bearer ${bearerToken}`
    })
    
    return this.#http.post<unknown>(url, body, {headers})
}
}
