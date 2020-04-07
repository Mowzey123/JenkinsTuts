import { TestBed } from '@angular/core/testing';

import { RiskdashboardService } from './riskdashboard.service';

describe('RiskdashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RiskdashboardService = TestBed.get(RiskdashboardService);
    expect(service).toBeTruthy();
  });
});
