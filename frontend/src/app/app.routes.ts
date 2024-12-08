import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/teacher/dashboard/dashboard.component';
import { WelcomeComponent } from './pages/teacher/welcome/welcome.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ViewCategoriesComponent } from './pages/teacher/view-categories/view-categories.component';
import { AddCategoryComponent } from './pages/teacher/add-category/add-category.component';
import { AddQuestionComponent } from './pages/teacher/add-question/add-question.component';
import { AddQuizComponent } from './pages/teacher/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/teacher/update-quiz/update-quiz.component';
import { ViewQuizQuestionsComponent } from './pages/teacher/view-quiz-questions/view-quiz-questions.component';
import { ViewQuizzesComponent } from './pages/teacher/view-quizzes/view-quizzes.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { StartComponent } from './pages/user/start/start.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { TeacherGuard } from './services/teacher.guard';
import { NormalGuard } from './services/normal.guard';
import { AdminGuard } from './services/admin.guard';
import { AdminWelcomeComponent } from './pages/admin/admin-welcome/admin-welcome.component';
import { ViewTeachersComponent } from './pages/admin/view-teachers/view-teachers.component';
import { ViewStudentsComponent } from './pages/admin/view-students/view-students.component';
import { ViewCategoriesAdminComponent } from './pages/admin/view-categories-admin/view-categories-admin.component';
import { AddCategoryAdminComponent } from './pages/admin/add-category-admin/add-category-admin.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UserDetailsComponent } from './pages/admin/user-details/user-details.component';
import { AdminViewQuizComponent } from './pages/admin/admin-view-quiz/admin-view-quiz.component';
import { AdminMessagesComponent } from './pages/admin/admin-messages/admin-messages.component';
import { TeacherMessagesComponent } from './pages/teacher/teacher-messages/teacher-messages.component';
import { UserMessagesComponent } from './pages/user/user-messages/user-messages.component';
import { UserHomeComponent } from './pages/user/user-home/user-home.component';
import { AttemptsComponent } from './pages/teacher/attempts/attempts.component';
import { AnalyticsComponent } from './pages/admin/analytics/analytics.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: AdminWelcomeComponent,
      },
      {
        path: 'teachers',
        component: ViewTeachersComponent,
      },
      {
        path: 'students',
        component: ViewStudentsComponent,
      },
      {
        path: 'categories',
        component: ViewCategoriesAdminComponent,
      },
      {
        path: 'add-category-admin',
        component: AddCategoryAdminComponent,
      },
      {
        path: 'userdetails/:username',
        component: UserDetailsComponent,
      },
      {
        path: 'admin-view-quiz/:cid',
        component: AdminViewQuizComponent,
      },
      {
        path: 'messages',
        component: AdminMessagesComponent,
      },
      {
        path:'analytics',
        component: AnalyticsComponent
      }
    ],
  },
  {
    path: 'teacher/:userId',
    component: DashboardComponent,
    canActivate: [TeacherGuard],
    children: [
      {
        path: '',
        component: WelcomeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'categories',
        component: ViewCategoriesComponent,
      },
      {
        path: 'add-category',
        component: AddCategoryComponent,
      },
      {
        path: 'quizzes',
        component: ViewQuizzesComponent,
      },
      {
        path: 'add-quiz',
        component: AddQuizComponent,
      },
      {
        path: 'quiz/:qid',
        component: UpdateQuizComponent,
      },
      {
        path: 'view-questions/:qid/:title',
        component: ViewQuizQuestionsComponent,
      },
      {
        path: 'add-question/:qid/:title',
        component: AddQuestionComponent,
      },
      {
        path: 'teacher-messages',
        component: TeacherMessagesComponent,
      },
      {
        path:'quiz/:qid/attempts',
        component: AttemptsComponent
      }
    ],
  },
  {
    path: 'user-dashboard/:userId',
    component: UserDashboardComponent,
    canActivate: [NormalGuard],
    children: [
      {
        path: '',
        component: ProfileComponent,
      },
      {
        path: 'user-messages',
        component: UserMessagesComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: ':catId',
        component: LoadQuizComponent,
      },
      {
        path: 'instructions/:qid',
        component: InstructionsComponent,
      },
    ],
  },
  {
    path: 'start/:qid',
    component: StartComponent,
    canActivate: [NormalGuard],
  },
];
