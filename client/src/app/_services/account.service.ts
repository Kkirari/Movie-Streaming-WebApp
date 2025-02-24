import { inject, Injectable, signal } from '@angular/core'
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http'

import { firstValueFrom } from 'rxjs'



import { User } from '../_model/user.model'
import { cacheManager } from '../_helpers/cache.helper'

@Injectable({
    providedIn: 'root'
})
export class AccountService {

    private _key = 'account';
    private _baseApiUrl = environment.baseUrl + 'api/account/'
    private _http = inject(HttpClient)

    data = signal<{ user: User, token: string } | null>(null)

    constructor() {
        this.loadDataFromLocalStorage()
    }

    logout() {
        localStorage.removeItem(this._key)
        this.data.set(null)
        cacheManager.clear('all')
    }

    async login(loginData: { username: string, password: string }): Promise<string> {
        try {
            const url = this._baseApiUrl + 'login'
            const response = this._http.post<{ user: User, token: string }>(url, loginData)
            const data = await firstValueFrom(response)
            this.data.set(data)
            this.saveDataToLocalStorage()
            return ''
        } catch (error: any) {
            return error.error?.message
        }
    }

    async register(registerData: User): Promise<string> {
        try {
            const url = this._baseApiUrl + 'register'
            const response = this._http.post<{ user: User, token: string }>(url, registerData)
            const data = await firstValueFrom(response)
            this.data.set(data)
            this.saveDataToLocalStorage()
            return ''
        } catch (error: any) {
            return error.error?.message
        }
    }

    private saveDataToLocalStorage() {
        const jsonString = JSON.stringify(this.data())
        localStorage.setItem(this._key, jsonString)
    }

    private loadDataFromLocalStorage() {
        const jsonString = localStorage.getItem(this._key)
        if (jsonString) {
            const data = JSON.parse(jsonString)
            this.data.set(data)
        }
    }








    public SetUser(user: User) {
        this.setUser(user)
    }
    private setUser(user: User) {
        const copyData = this.data()
        if (copyData)
            copyData.user = user
        this.data.set(copyData)
        this.saveDataToLocalStorage()
    }
}
