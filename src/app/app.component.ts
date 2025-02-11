
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthenticationService } from './core/authentication.service';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

readonly #authService = inject(AuthenticationService);

  onClickConnect() {
    this.#authService.login('jojo.lasticot@gmail.com', 'azerty').pipe(
      switchMap((r) => {
        console.log(r);
        
        const { email, localId, idToken } = r;
       return this.#authService.save(email, localId, idToken)    
      })
    ).subscribe(
      (r) => console.log(r)
      
    )
}

  

}
