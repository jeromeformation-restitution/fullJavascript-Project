import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMsgComponent } from './list-msg.component';

describe('ListMsgComponent', () => {
  let component: ListMsgComponent;
  let fixture: ComponentFixture<ListMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
