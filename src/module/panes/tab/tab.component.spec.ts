import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IconLoaderService } from '../../../index';
import { AmexiodialoguePaneComponent } from './../dialogue/dialogue.pane.component';
import { AmexioTabComponent } from './tab.component';
import { AmexioTabPillComponent } from './tab.pill.component';
import { AmexioButtonComponent } from './../../forms/buttons/button.component';
import { CommonIconComponent } from './../../base/components/common.icon.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Component, ComponentFactoryResolver, NO_ERRORS_SCHEMA } from '@angular/core';

@Component({
    selector: 'test-cmp',
    template: `
    <amexio-tab-view>
    <amexio-tab [enable-confirm-box]="true">
    </amexio-tab>
    </amexio-tab-view>
       `,
})
class TestTabComponent { }
describe('amexio-tab', () => {
    let comp: AmexioTabComponent;
    let fixture: ComponentFixture<TestTabComponent>;
    let tabNode: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [NO_ERRORS_SCHEMA],
            declarations: [
                AmexiodialoguePaneComponent,
                AmexioTabComponent,
                TestTabComponent,
                AmexioTabPillComponent,
                AmexioButtonComponent,
            ],
            providers: [ComponentFactoryResolver, IconLoaderService],
        }).overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [AmexioTabPillComponent] } }).compileComponents();
    });
    beforeEach(() => {
        // service = TestBed.get(DeviceQueryService);
        fixture = TestBed.createComponent(TestTabComponent);
        comp = fixture.debugElement.children[0].componentInstance;
        event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
        fixture.detectChanges();
        tabNode = AmexioTabPillComponent;
    });


    it('onCloseClick  method check', () => {
        comp.openDialogue = true;
        comp.onCancelClick();
        comp.openDialogue = false;
    });

    it('onCancelClick method', () => {
        comp.onCancelClick();
        comp.openDialogue = false;
    })


    it('closeTab method if condition', () => {
        fixture.detectChanges();
        comp.enableConfirmBox = true;
        comp.tabPillClose(tabNode);
        expect(comp.enableConfirmBox).toEqual(true);
        comp.openDialogue = true;
        comp.tempTab = tabNode;
        comp.onCloseClick.subscribe((g: any) => {
            expect(tabNode).toEqual(g);
        });

    });
    it('closeTab method second if condition', () => {
        fixture.detectChanges();
        comp.enableConfirmBox = false;
        comp.tabPillClose(tabNode);
        expect(comp.enableConfirmBox).toEqual(false);
        comp.tabPillClose(tabNode);
        comp.onCloseClick.subscribe((g: any) => {
            expect(tabNode).toEqual(g);
        });
    });
    it('Close Tab method Call', () => {
        comp.openDialogue = true;
        comp.closeTab(tabNode)
        comp.enableConfirmBox = true;
        expect(comp.openDialogue).toBeTruthy();
        comp.tempTab = tabNode;
        comp.onCloseClick.emit(tabNode);
    });

    it('Close Tab Else method Call', () => {
        comp.closeTab(tabNode)
        comp.enableConfirmBox = false;
        comp.tabPillClose(tabNode);
        comp.onCloseClick.emit(tabNode);
    });
    it('tabPillClose method', () => {
        comp.tabPillClose(tabNode);
        const newTab: AmexioTabPillComponent[] = [];
        let index = 0;
        let tabHighlightIndex = 0;
        comp.tabCollection.forEach((tab: any, i: number) => {
            tab.active = false;
            tabNode.tabId = tab.tabId;
            expect(tab.tabId).toEqual(tabNode.tabId);
            tabHighlightIndex = index;

        });
    })
    it('Ok method Call', () => {
        comp.tabCollection.forEach((tab: any, i: number) => {
            comp.tempTab = tab;
        })
        comp.onOkClick();
        comp.tabPillClose(comp.tempTab);
        comp.openDialogue = false;
    });

    it ('calls in constructor' , () => {
        TestBed.createComponent(AmexioTabComponent);
    })

});

