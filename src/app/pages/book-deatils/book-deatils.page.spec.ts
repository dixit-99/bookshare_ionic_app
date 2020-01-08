import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDeatilsPage } from './book-deatils.page';

describe('BookDeatilsPage', () => {
  let component: BookDeatilsPage;
  let fixture: ComponentFixture<BookDeatilsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookDeatilsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDeatilsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
