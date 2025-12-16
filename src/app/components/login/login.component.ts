import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';

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

  constructor(private data: DataService, private router: Router, private cdr: ChangeDetectorRef) {}

  login() {
     this.error = 'Invalid credentials or Access Required';
    this.data.getData().subscribe(d => {
        console.log(d.user,"sdf")
      const user = d.users.find((u: any) =>
        u.email === this.email && u.password === this.password
      );

      if (!user) {
        this.error = 'Invalid credentials or Access Required';
        return;
      }

      if (user.role === 'superadmin') {
        this.router.navigate(['/dashboard']);
      }
      this.cdr.detectChanges();
    });
  }

}
