import { Component, Event } from '@stencil/core';
import { EventEmitter } from 'events';

@Component({
  tag: 'ga-admin-menu',
})
export class AdminMenu {
  @Event() navTo: EventEmitter;

  render() {
    return[
      <ul class="ul pl0">
        <li class="menu-item bb mb2 hover-light-green pointer" onClick={() => window.location.href = window.location.origin + '/admin/biomass_inventory/'}>
          <b>Biomass Inv.</b>
        </li>
        <li class="mb4">
          <ul class="ul pl0">
            <li class="menu-item mb2 pl2 hover-light-green pointer" onClick={() => window.location.href = window.location.origin + '/admin/runs/'}>Runs</li>
            <li class="menu-item mb2 pl2 hover-light-green pointer" onClick={() => window.location.href = window.location.origin + '/admin/run_columns/'}>Run Columns</li>
            <li class="menu-item mb2 pl2 hover-light-green pointer" onClick={() => window.location.href = window.location.origin + '/admin/extractions/'}>Extractions</li>
          </ul>
        </li>
        <li class="menu-item bb mb2 hover-light-green pointer" onClick={() => window.location.href = window.location.origin + '/admin/concentrate_inventory/'}>
          <b>Concentrate Inv.</b>
        </li>
        <li class="mb4">
          <ul class="ul pl0">
              <li class="menu-item mb2 mt2 pl2 hover-light-green pointer" onClick={() => window.location.href = window.location.origin + '/admin/concentrate_sales/'}>Concentrate Sales</li>
          </ul>
        </li>
        <li class="menu-item bb mb4 hover-light-green pointer" onClick={() => window.location.href = window.location.origin + '/admin/contacts/'}>
          <b>Contacts</b>
        </li>
        <li class="menu-item bb mb2 hover-light-green pointer" onClick={() => window.location.href = window.location.origin + '/admin/employees/'}>
          <b>Employees</b>
        </li>
        <li class="mb4">
          <ul class="ul pl0">
            <li class="menu-item mb2 mt2 pl2 hover-light-green pointer" onClick={() => window.location.href = window.location.origin + '/admin/employee_hours/'}>Employee Hours</li>
            <li class="menu-item mb2 mt2 pl2 hover-light-green pointer" onClick={() => window.location.href = window.location.origin + '/admin/employee_payroll/'}>Employee Payroll</li>
            <li class="menu-item mb2 mt2 pl2 hover-light-green pointer" onClick={() => window.location.href = window.location.origin + '/admin/employee_notes/'}>Employee Notes</li>
          </ul>
        </li>
        <li class="menu-item bb mb4 hover-light-green pointer" onClick={() => window.location.href = window.location.origin + '/admin/expendable_inventory/'}>
          <b>Expendable Inv.</b>
        </li>
        <li class="menu-item bb mb2 hover-light-green pointer" onClick={() => window.location.href = window.location.origin + '/admin/suppliers/'}>
          <b>Suppliers</b>
        </li>
        <li class="mb4">
          <ul class="ul pl0">
            <li class="menu-item mb2 mt2 pl2 hover-light-green pointer" onClick={() => window.location.href = window.location.origin + '/admin/purchases/'}>Purchases</li>
          </ul>
        </li>
      </ul>
    ]
  }
}
