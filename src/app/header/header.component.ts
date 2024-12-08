import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';
import { NgFor, NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LoaderComponent,NgIf,NgFor],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  loading= false
  constructor(private service:ApiService,private router:Router,private  toastr:ToastrService){}
  ngOnInit(): void {
     this.getAllusers()
    
  }
  
  users:any=[]

  adduser(){
     
    this.router.navigateByUrl('add')
  }
  editUser(id:any){
    this.router.navigateByUrl(`update/${id}`)
  }
  deleteUser(id:any){
    this.service.setAction("deleting Users...")
    this.loading=true
    setTimeout(()=>{
     this.service.deleteUser(id).subscribe({
       next:(data:any)=>{
         this.loading=false
         if(data.status){
          this.toastr .success(' User deleted ','Success',{timeOut:1200,closeButton:true})
          this.getAllusers()
         }
       },
       error:(err:any)=>{
          this.toastr.error('Inernal server error',"Error",{timeOut:1200,closeButton:true})
       }
     })

    },1200);
  }

  getAllusers(){
     this.service.setAction("Getting Users...")
     this.loading=true
     setTimeout(()=>{
      this.service.getAllUsers().subscribe({
        next:(data:any)=>{
          this.users=data.message
          this.loading=false
        },
        error:(err:any)=>{
           this.toastr.error('Inernal server error',"Error",{timeOut:1200,closeButton:true})
        }
      })

     },1200);
  }

}
