import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCategoriesAdminComponent } from './view-categories-admin.component';

describe('ViewCategoriesAdminComponent', () => {
  let component: ViewCategoriesAdminComponent;
  let fixture: ComponentFixture<ViewCategoriesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCategoriesAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCategoriesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
