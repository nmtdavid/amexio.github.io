/**
 * Created by pratik on 1/12/17.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../../../public-api'
import { AmexioInputHelperComponent } from '../../../base/input.helper.component';
import { AmexioNumberInputComponent } from './numberinput.component';
describe('Amexio Number Input Component', () => {

  let comp: AmexioNumberInputComponent;
  let fixture: ComponentFixture<AmexioNumberInputComponent>;
  event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AmexioNumberInputComponent, AmexioInputHelperComponent],
      providers: [IconLoaderService],
    });
    fixture = TestBed.createComponent(AmexioNumberInputComponent);
    comp = fixture.componentInstance;
  });

  it('initialize innervalue', () => {
    comp.value = 'sagfaf';
    expect(comp['innerValue']).toEqual(comp.value);
  });

  it('ngOninit Method', () => {
    comp.ngOnInit();
    comp.componentId = comp.createCompId('numberinput', comp.name);
  });

  // wrking 1- set errormsg

  // get pattern
  it('get pattern', () => {
    expect(comp.pattern).toEqual(comp._pattern);
  });

  // set pattern
  // it('set pattern', () => {

  //   let obj = new RegExp(comp.pattern);
  //   expect(comp.value).not.toEqual(null);
  //   expect(comp.regEx).toEqual(obj);
  //  })

  it('register on change', () => {
    let fn: any;
    comp.registerOnChange(fn);
    expect(comp['onChangeCallback']).toEqual(fn);
  });

  it('register on touched', () => {
    let fn: any;
    comp.registerOnTouched(fn);
    expect(comp['onTouchedCallback']).toEqual(fn);
  });

  it('validate method call allowblank true', (): any => {
    comp.allowblank = true;
    let c: FormControl;
    comp.validate(c);
    expect(comp.allowblank).toEqual(true);
    const isValid = comp.allowblank;
    expect(isValid).toEqual(true);

  });

  it('validate method call allowblank false', () => {
    comp.allowblank = false;
    let c: FormControl;
    comp.validate(c);
    expect(comp.allowblank).toEqual(false);
    expect(comp.isFieldValidate()).toHaveBeenCalled;
    const isValid = comp.allowblank && comp.isFieldValidate();
    expect(isValid).toEqual(false);
    return {
      jsonParseError: {
        valid: true,
      },
    };;
  });

  it('validate method call isvalid true', (): any => {

    let c: FormControl;
    comp.validate(c);
    comp.allowblank = true;
    expect(comp.allowblank).toEqual(true);
    expect(comp.isFieldValidate()).toHaveBeenCalled;
    const isValid = comp.allowblank;
    expect(isValid).toEqual(true);

  });

});