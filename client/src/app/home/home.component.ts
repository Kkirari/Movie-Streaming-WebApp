import { Component, computed, inject, Signal } from '@angular/core'
import { User } from '../_model/user.model'
import { AccountService } from '../_services/account.service'
import { CommonModule } from '@angular/common'


@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isMonthly: boolean = true; // ค่าเริ่มต้นเป็น "รายเดือน"

  setPlan(monthly: boolean) {
    this.isMonthly = monthly
    console.log("isMonthly:", this.isMonthly)
  }

  private accountService = inject(AccountService)
  user: Signal<User | undefined>



  constructor() {
    this.user = computed(() => this.accountService.data()?.user)
  }
}
