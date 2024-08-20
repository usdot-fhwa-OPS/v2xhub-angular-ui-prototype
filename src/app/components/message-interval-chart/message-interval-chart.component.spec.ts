import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageIntervalChartComponent } from './message-interval-chart.component';

describe('MessageIntervalChartComponent', () => {
  let component: MessageIntervalChartComponent;
  let fixture: ComponentFixture<MessageIntervalChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageIntervalChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageIntervalChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
