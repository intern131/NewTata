import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryguyDashboardComponent } from './deliveryguy-dashboard.component';

describe('DeliveryguyDashboardComponent', () => {
  let component: DeliveryguyDashboardComponent;
  let fixture: ComponentFixture<DeliveryguyDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryguyDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryguyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
