import { inject, Injectable } from "@angular/core"
import { NgxSpinnerService } from "ngx-spinner"
import { delay } from "rxjs"

@Injectable({
    providedIn: 'root'
})

export class LoadingService {
    loadingRequestCount = 0
    private spinner = inject(NgxSpinnerService)
    constructor() { }

    loading() {
        this.loadingRequestCount++
        this.spinner.show(undefined, {
            type: "ball-8bits",
            bdColor: 'rgba(0, 0, 0, 0.8)',
            color: 'rgba(255, 255, 255, 0.8)'
        })
    }

    idle() {
        this.loadingRequestCount--
        if (this.loadingRequestCount <= 0) {
            this.loadingRequestCount = 0
            this.spinner.hide()
        }
    }

}