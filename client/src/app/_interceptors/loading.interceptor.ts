import { HttpInterceptorFn } from "@angular/common/http"
import { LoadingService } from "../_services/loading.service"
import { inject } from "@angular/core"
import { delay, finalize } from "rxjs"

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
    const loadingService = inject(LoadingService)

    loadingService.loading()
    delay(3000)
    return next(req).pipe(
        finalize(() => {
            loadingService.idle()
        })
    )
}