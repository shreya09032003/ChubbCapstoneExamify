import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewQuizComponent } from './admin-view-quiz.component';

describe('AdminViewQuizComponent', () => {
  let component: AdminViewQuizComponent;
  let fixture: ComponentFixture<AdminViewQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminViewQuizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
