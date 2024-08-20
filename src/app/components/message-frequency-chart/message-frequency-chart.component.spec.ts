import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageFrequencyChartComponent } from './message-frequency-chart.component';

describe('MessageFrequencyChartComponent', () => {
  let component: MessageFrequencyChartComponent;
  let fixture: ComponentFixture<MessageFrequencyChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageFrequencyChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageFrequencyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
