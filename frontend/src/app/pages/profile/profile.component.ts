import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';



@Component({
  selector: 'app-profile',
  imports: [CommonModule,NgIf,FormsModule,ReactiveFormsModule,MatFormFieldModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = null;
  profileForm!: FormGroup;
  isEditing = false;

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
    this.initializeForm();
  }

  loadUserProfile() {
    this.user = this.loginService.getUser();
    // Fetch user data if needed from an API in future
    this.loginService.getCurrentUser().subscribe(
      (user: any) => {
        this.user = user;

        if(user.authorities[0].authority == 'NORMAL') this.user.role = 'Student';
        if(user.authorities[0].authority == 'TEACHER') this.user.role = 'Teacher';
      },
      (error) => {
        Swal.fire('Error', 'Could not load user data', 'error');
      }
    );
  }

  initializeForm() {
    this.profileForm = this.fb.group({
      firstName: [this.user?.firstName || '', [Validators.required, Validators.maxLength(50)]],
      lastName: [this.user?.lastName || '', [Validators.required, Validators.maxLength(50)]],
      username: [this.user?.username || '', [Validators.required, Validators.maxLength(30)]],
      email: [this.user?.email || '', [Validators.required, Validators.email]],
      phone: [this.user?.phone || '', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    });
  }
  
  onUpdate() {
    this.isEditing = true;
    // Pre-fill form with current values
    this.profileForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      username: this.user.username,
      email: this.user.email,
      phone: this.user.phone,
    });
  }

  onSubmit() {
    if (this.profileForm.invalid) {
      return;
    }

    const updatedUser = this.profileForm.value;

  
    this.loginService.updateUser(updatedUser).subscribe(
      (response) => {
        this.user = { ...this.user, ...updatedUser }; // Update the local user object
        Swal.fire('Success', 'Profile updated successfully', 'success');
        this.isEditing = false; 
      },
      (error) => {
        Swal.fire('Error', 'Failed to update profile', 'error');
      }
    );
  }

  cancelEdit() {
    this.isEditing = false; // Exit edit mode without saving changes
  }
}