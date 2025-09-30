import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  getUserToken() {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoibWF0dGhldXNAaG90bWFpbC5jb20iLCJpYXQiOjE3NTkyNjMwNTgsImV4cCI6MTc1OTM0OTQ1OH0.YfJooC5XktCHAJ6kI-myOtaGICV8grEp_jO4VtRgAVE';
  }
}
