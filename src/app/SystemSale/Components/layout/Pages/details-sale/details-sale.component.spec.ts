import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSaleComponent } from './details-sale.component';

describe('DetailsSaleComponent', () => {
  let component: DetailsSaleComponent;
  let fixture: ComponentFixture<DetailsSaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsSaleComponent]
    });
    fixture = TestBed.createComponent(DetailsSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
