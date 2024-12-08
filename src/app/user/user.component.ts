import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { error } from 'console';
import { NgClass, NgIf } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,NgIf,LoaderComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  ngOnInit(): void {
    if(this.activatedRoute.snapshot.paramMap.get('userId')){
       this.isEdite=true
       let uId=this.activatedRoute.snapshot.paramMap.get('userId')
       this.getUserDetailes(uId)
    }
    
  }
   constructor( private activatedRoute:ActivatedRoute,private router:Router , private toastr:ToastrService ,private service:ApiService){}

   loading=false
   isEdite=false
   userForm=new FormGroup({
    fullName:new FormControl('',Validators.required),
    userName:new FormControl('',[Validators.required,Validators.email]),
    mobileNo:new FormControl('',[Validators.required]),
    age:new FormControl('',[Validators.required]),

   })

   goBack(){
    this.router.navigateByUrl('')
   }
   onSubmit(){
    if(!this.isEdite){
      this.service.setAction('Adding user...')
      this.loading=true
      setTimeout(()=>{
       this.service.addUser(this.userForm.value).subscribe({
        next:(data:any)=>{
         if(data.status){
          this.loading=false
          this.toastr.success('User Added ...','Success',{timeOut:1200,closeButton:true})
          this.userForm.reset()
         }
         else{
          this.toastr.error('Something went wrong','Error',{timeOut:1200,closeButton:true})
         }
        }
       })
      },1200);
    }else{
      this.service.setAction('Updating user...')
      this.loading=true
      setTimeout(()=>{
        let uId=this.activatedRoute.snapshot.paramMap.get('userId')
       this.service.updateUser(uId,this.userForm.value).subscribe({
        next:(data:any)=>{
         if(data.status){
          this.loading=false
          this.toastr.success('User updated ...','Success',{timeOut:1200,closeButton:true})
          this.userForm.reset()
          this.router.navigateByUrl('')
         }
         else{
          this.toastr.error('Something went wrong','Error',{timeOut:1200,closeButton:true})
         }
        }
       })
      },1200);
    }
   }

   getUserDetailes(userId:any){
    this.service.getUserDetails(userId).subscribe({
      next:(data:any)=>{
        if(data.status){
           this.userForm.controls['fullName'].setValue(data.message.fullName)
           this.userForm.controls['userName'].setValue(data.message.userName)
           this.userForm.controls['mobileNo'].setValue(data.message.mobileNo)
           this.userForm.controls['age'].setValue(data.message.age)
        }else{
          this.toastr .error('intenal server error','Error',{timeOut:1200,closeButton:true})
        }
      }
    })
   }

}
