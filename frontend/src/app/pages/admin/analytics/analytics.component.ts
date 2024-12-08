import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../../services/teacher.service';
import { CategoryService } from '../../../services/category.service';
import { QuizService } from '../../../services/quiz.service';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
  imports: [BaseChartDirective],
})
export class AnalyticsComponent implements OnInit {
  numberOfStudents: number = 0;
  numberOfTeachers: number = 0;
  numberOfCategories: number = 0;
  activeQuizzes: number = 0;
  inactiveQuizzes: number = 0;
  

  // Chart variables for Admin Analytics
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: string[] = ['Students', 'Teachers', 'Categories'];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartData: ChartData<'pie'> = {
    labels: this.pieChartLabels,
    datasets: [
      {
        data: [],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  // Chart variables for Active vs Inactive Quizzes
  public activeInactiveChartLabels: string[] = ['Active Quizzes', 'Inactive Quizzes'];
  public activeInactiveChartOptions: ChartOptions = {
    responsive: true,
  };
  public activeInactiveChartLegend = true;
  public activeInactiveChartData: ChartData<'pie'> = {
    labels: this.activeInactiveChartLabels,
    datasets: [
      {
        data: [this.activeQuizzes, this.inactiveQuizzes],
        backgroundColor: ['#4CAF50', '#FF9800'],
        hoverBackgroundColor: ['#4CAF50', '#FF9800'],
      },
    ],
  };

  constructor(
    private teacherService: TeacherService,
    private categoryService: CategoryService,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.getNumberOfStudents();
    this.getNumberOfTeachers();
    this.getNumberOfCategories();
    this.getActiveAndInactiveQuizzes();
  }

  getNumberOfStudents(): void {
    this.teacherService.getUsersByRole('NORMAL').subscribe({
      next: (data: any[]) => {
        this.numberOfStudents = data.length;
        this.updateChart();
      },
      error: (error: any) => console.error('Error fetching students:', error),
    });
  }

  getNumberOfTeachers(): void {
    this.teacherService.getUsersByRole('TEACHER').subscribe({
      next: (data: any[]) => {
        this.numberOfTeachers = data.length;
        this.updateChart();
      },
      error: (error: any) => console.error('Error fetching teachers:', error),
    });
  }

  getNumberOfCategories(): void {
    this.categoryService.categories2().subscribe({
      next: (data: any[]) => {
        this.numberOfCategories = data.length;
        this.updateChart();
      },
      error: (error: any) => console.error('Error fetching categories:', error),
    });
  }

  getActiveAndInactiveQuizzes(): void {
    this.quizService.getActiveQuizzes().subscribe({
      next: (active) => {
        this.activeQuizzes = (active as any[]).length; // Use type assertion here
        this.updateActiveInactiveChart();
      },
      error: (error: any) => console.error('Error fetching active quizzes:', error),
    });

    this.quizService.quizzes().subscribe({
      next: (all) => {
        const totalQuizzes = (all as any[]).length; // Use type assertion here
        this.inactiveQuizzes = totalQuizzes - this.activeQuizzes;
        this.updateActiveInactiveChart();
      },
      error: (error: any) => console.error('Error fetching all quizzes:', error),
    });
  }

  private updateChart(): void {
    this.pieChartData = {
      labels: this.pieChartLabels,
      datasets: [
        {
          data: [
            this.numberOfStudents,
            this.numberOfTeachers,
            this.numberOfCategories,
          ],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    };
  }

  private updateActiveInactiveChart(): void {
    this.activeInactiveChartData = {
      labels: this.activeInactiveChartLabels,
      datasets: [
        {
          data: [this.activeQuizzes, this.inactiveQuizzes],
          backgroundColor: ['#4CAF50', '#FF9800'],
          hoverBackgroundColor: ['#4CAF50', '#FF9800'],
        },
      ],
    };
  }
}

