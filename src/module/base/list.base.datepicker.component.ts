/*
* Copyright [2019] [Metamagic]
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import { ChangeDetectorRef, Component, ElementRef, Renderer2 } from '@angular/core';
import { AmexioFormValidator } from '../forms/form-validator/amexio.form.validator.component';
import { BaseInput } from './base.input.component';
@Component({
    selector: 'list.base.datepicker',
    template: './list.base.datepicker.component.html',
})

export class ListBaseDatepickerComponent<T> extends AmexioFormValidator {

    self = false;
    itemClick = false;
    dropdownstyle: any;
    documentClickListener: any;
    roundedgeclass: string;

    constructor(public renderer: Renderer2, public element: ElementRef, private cd: ChangeDetectorRef) {
        super();
        this.hide();
    }

    focus(event: any) {
        this.self = true;
        this.dropdownstyle = { visibility: 'visible' };
        this.bindDocumentClickListener();
    }

    blur(event: any) {
        this.itemClicked();
    }

    itemClicked() {
        this.itemClick = true;
        this.hide();
        this.unbindDocumentClickListener();
        this.clearClicks();
    }

    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer
                .listen('document', 'click', (event: any) => this.handleDocumentListener(event));

        }

    }

    handleDocumentListener(event: any) {
        if (!this.self && !this.itemClick) {
            this.hide();
            this.unbindDocumentClickListener();
        }
        this.clearClicks();
        this.cd.markForCheck();
    }

    clearClicks() {
        this.self = false;
        this.itemClick = false;
    }

    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }

    }

    hide() {
        this.dropdownstyle = { visibility: 'hidden' };
    }

    setRoundEdge(type: any) {
        if (type === 'round-edge') {
            this.roundedgeclass = 'roundEdgeCommonCss';
        } else if (type === 'classic') {
            this.roundedgeclass = 'classicCommonCss';
        }
    }
}
