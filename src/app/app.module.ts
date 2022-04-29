import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {Ng7MatBreadcrumbModule} from 'ng7-mat-breadcrumb';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AssignmentsComponent } from './assignments/assignments.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { LoginGuard } from './shared/login.guard';
import { NonRenduDirective } from './shared/non-rendu.directive';
import { RenduDirective } from './shared/rendu.directive';
import { ErreurDirective } from './shared/erreur.directive';
import { IconsModule } from './shared/icons/icons.module';
const routes: Routes = [
  {
    path: '',
    component: AssignmentsComponent,
    canActivate: [LoginGuard],
    data:{
      breadcrumb:[
        {
          label:'home',
          url:'/home'
        },
        {
          label:'list assignment',
          url:''
        }
      ]
    }
  },
  {
    path: 'home',
    component: AssignmentsComponent,
    canActivate: [LoginGuard],
    data:{
      breadcrumb:[
        {
          label:'home',
          url:''
        }
      ]
    }
  },
  {
    path: 'assignment/add',
    component: AddAssignmentComponent,
    canActivate: [LoginGuard],
    data:{
      breadcrumb:[
        {
          label:'home',
          url:'/home'
        },
        {
          label:'list assignment',
          url:'/'
        },
        {
          label:'add assignment',
          url:''
        }
      ]
    }
  },
  {
    path: 'assignment/:id',
    component: AssignmentDetailComponent,
    canActivate: [LoginGuard],
    data:{
      breadcrumb:[
        {
          label:'home',
          url:'/home'
        },
        {
          label:'list assignment',
          url:'/'
        },
        {
          label:'{{id}}',
          url:''
        },
        {
          label:'detail',
          url:''
        }
      ]
    }
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'assignment/:id/edit',
    component: EditAssignmentComponent,
    canActivate: [LoginGuard, AuthGuard],
    data:{
      breadcrumb:[
        {
          label:'home',
          url:'/home'
        },
        {
          label:'list assignment',
          url:'/'
        },
        {
          label:'{{id}}',
          url:'/assignment/:id'
        },
        {
          label:'edit',
          url:''
        }
      ]
    }
  },
];
@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    NonRenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    LoginComponent,
    ErreurDirective,
  ],
  imports: [
    IconsModule,
    MatStepperModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatTableModule,
    MatSelectModule,  
    Ng7MatBreadcrumbModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ScrollingModule,
  ],
  providers: [
     
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
