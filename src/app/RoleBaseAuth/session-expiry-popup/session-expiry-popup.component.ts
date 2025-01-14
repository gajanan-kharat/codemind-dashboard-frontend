import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-session-expiry-popup',
  templateUrl: './session-expiry-popup.component.html',
  styleUrls: ['./session-expiry-popup.component.scss']
})
export class SessionExpiryPopupComponent {

   constructor(private authService: AuthService,
               private dialogRef: MatDialogRef<SessionExpiryPopupComponent>
   ){}

  logOut() {
    this.authService.logout();
    this.dialogRef.close(); 
    console.log('Logged out');
  }

}
