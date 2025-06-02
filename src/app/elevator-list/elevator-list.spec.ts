import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevatorList } from './elevator-list';

describe('ElevatorList', () => {
  let component: ElevatorList;
  let fixture: ComponentFixture<ElevatorList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElevatorList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElevatorList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
