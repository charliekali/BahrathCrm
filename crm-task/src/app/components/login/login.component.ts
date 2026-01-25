import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = '';
  password = '';
  error = '';

  constructor(
    private data: DataService,
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  login() {
    this.error = '';

    this.data.getData().subscribe(d => {
      const user = d.users.find((u: any) =>
        u.email === this.email && u.password === this.password
      );

      if (!user) {
        this.error = 'Invalid credentials or Access Required';
        return;
      }
      this.auth.login(user);
      if (user.role === 'superadmin') {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/sales-dashboard']);
      }

      this.cdr.detectChanges();
    });
  }
}
