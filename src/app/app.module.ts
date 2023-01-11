import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'

import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatDividerModule } from '@angular/material/divider'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { MatListModule } from '@angular/material/list'
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatExpansionModule } from '@angular/material/expansion'

import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AssignmentsComponent } from './assignments/assignments.component'
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component'
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component'
import { Routes } from '@angular/router'
import { RouterModule } from '@angular/router'
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component'
import { AuthGuard } from './shared/auth.guard'
import { LoginGuard } from './shared/login.guard'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { LoginComponent } from './login/login.component'


const routes: Routes = [
    {
        path: '',
        component: AssignmentsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'home',
        component: AssignmentsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'add',
        component: AddAssignmentComponent,
    },
    {
        path: 'assignment/:id',
        component: AssignmentDetailComponent,
    },
    {
        path: 'assignment/:id/edit',
        component: EditAssignmentComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoginGuard],
    },
]

@NgModule({
    declarations: [
        AppComponent,
        AssignmentsComponent,
        AssignmentDetailComponent,
        AddAssignmentComponent,
        EditAssignmentComponent,
        LoginComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatListModule,
        MatCardModule,
        MatCheckboxModule,
        MatSlideToggleModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        MatPaginatorModule,
        MatGridListModule,
        MatExpansionModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
