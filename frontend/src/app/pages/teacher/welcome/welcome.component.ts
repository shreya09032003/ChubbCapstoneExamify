import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../../services/statistics.service';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  // Data Variables
  totalMarks: number = 0;
  totalAttempts: number = 0;
  averageScore: number = 0;
  totalCorrectAnswers: number = 0;
  totalQuestionsAttempted: number = 0;
  categoryId: number = 0;
  teacherId: number | null = null;

  // Bar Chart Configurations
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: string[] = ['Marks', 'Attempts', 'Correct Answers', 'Questions Attempted'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      {
        data: [this.totalMarks, this.totalAttempts, this.totalCorrectAnswers, this.totalQuestionsAttempted],
        label: 'Category Performance',
        backgroundColor: 'rgba(63, 81, 181, 0.6)',
        borderColor: 'rgba(63, 81, 181, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Doughnut Chart Configurations
  public doughnutChartOptions: ChartOptions = {
    responsive: true,
  };
  public doughnutChartLabels: string[] = ['Average Score'];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [this.averageScore, 100 - this.averageScore], // Remaining percentage
        backgroundColor: ['rgba(63, 181, 63, 0.6)', 'rgba(220, 220, 220, 0.6)'],
        borderColor: ['rgba(63, 181, 63, 1)', 'rgba(220, 220, 220, 1)'],
        borderWidth: 1,
      },
    ],
  };

  constructor(
    private statisticsService: StatisticsService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    console.log('WelcomeComponent initialized');

    const user = this.loginService.getUser();
    this.teacherId = user.id;
    this.categoryId = user.category.cid;

    // Fetching Data
    this.fetchCategoryData();
  }

  private fetchCategoryData(): void {
    console.log('Fetching data for category:', this.categoryId);

    this.statisticsService.getTotalMarks(this.categoryId).subscribe(data => {
      console.log('Received Total Marks:', data);
      this.totalMarks = data;
      this.updateBarChart();
    });

    this.statisticsService.getTotalAttempts(this.categoryId).subscribe(data => {
      console.log('Received Total Attempts:', data);
      this.totalAttempts = data;
      this.updateBarChart();
    });

    this.statisticsService.getAverageScore(this.categoryId).subscribe(data => {
      console.log('Received Average Score:', data);
      this.averageScore = data;
      this.updateDoughnutChart();
    });

    this.statisticsService.getTotalCorrectAnswers(this.categoryId).subscribe(data => {
      console.log('Received Total Correct Answers:', data);
      this.totalCorrectAnswers = data;
      this.updateBarChart();
    });

    this.statisticsService.getTotalQuestionsAttempted(this.categoryId).subscribe(data => {
      console.log('Received Total Questions Attempted:', data);
      this.totalQuestionsAttempted = data;
      this.updateBarChart();
    });
  }

  private updateBarChart(): void {
    console.log('Updating Bar Chart Data...');
    this.barChartData = {
      labels: this.barChartLabels,
      datasets: [
        {
          data: [
            this.totalMarks,
            this.totalAttempts,
            this.totalCorrectAnswers,
            this.totalQuestionsAttempted
          ],
          label: 'Category Performance',
          backgroundColor: 'rgba(63, 81, 181, 0.6)',
          borderColor: 'rgba(63, 81, 181, 1)',
          borderWidth: 1,
        },
      ],
    };
    console.log('Updated Bar Chart Data:', this.barChartData);
  }

  private updateDoughnutChart(): void {
    console.log('Updating Doughnut Chart Data...');
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        {
          data: [this.averageScore, 100 - this.averageScore],
          backgroundColor: ['rgba(63, 181, 63, 0.6)', 'rgba(220, 220, 220, 0.6)'],
          borderColor: ['rgba(63, 181, 63, 1)', 'rgba(220, 220, 220, 1)'],
          borderWidth: 1,
        },
      ],
    };
    console.log('Updated Doughnut Chart Data:', this.doughnutChartData);
  }
}
