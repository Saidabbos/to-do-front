import { Component, OnInit } from '@angular/core';
import {RequestService} from '../services/request.service';
import {Plan} from '../models/plan';
import {MatDialog} from "@angular/material";
import {ConfirmationComponent} from "../confirmation/confirmation.component";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  page: number = 1;
  limit: number = 10;
  total: number;
  newPlan: Plan;
  loading = true;
  plans: Array<Plan>;
  constructor(private request: RequestService,
              private auth: AuthService,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.loadItems();
  }
  loadItems(push = false) {
    this.request.get(`plans`, {limit: this.limit, page: this.page}).then(response => {
     if (push) {
       this.plans = this.plans.concat(response.items);
       this.total = response.count;
     } else {
       this.plans = response.items;
       this.total = response.count;
     }
    this.loading = false;
    });
  }
  change(plan: Plan) {
    plan.saving = true;
    this.request.put(`plans/${plan.id}`, {name: plan.name}).then(response => {
      plan.editable = false;
      plan.saving = false;
    });
  }
  setStatus(plan: Plan) {
    plan.saving = true;
    this.request.put(`plans/${plan.id}`, {done: plan.done}).then(response => {
      plan.saving = false;
    });
  }
  scroll() {
    if (this.total > this.plans.length) {
      this.loading = true;
      this.page++;
      this.loadItems(true);
    }
  }
  add() {
    this.newPlan = new Plan();
  }
  save() {
    this.newPlan.saving = true;
    this.request.post('plans', this.newPlan).then(response => {
      delete this.newPlan;
      this.page = 1;
      this.loadItems();
    });
  }
  cancelAdd() {
    delete this.newPlan;
  }
  delete(plan: Plan) {
    this.dialog.open(ConfirmationComponent).afterClosed().subscribe(result => {
      if (result) {
        plan.saving = true;
        this.request.delete(`plans/${plan.id}`).then(response => {
          this.page = 1;
          this.loadItems();
        });
      }
      }
    );
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
