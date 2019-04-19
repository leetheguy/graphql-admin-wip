import { Component, Event } from '@stencil/core';
import { EventEmitter } from 'events';

@Component({
  tag: 'gqa-admin-menu',
})
export class AdminMenu {
  @Event() navTo: EventEmitter;

  render() {
    return[
      <ul class="ul pl0">
        <li class="menu-item bb mb2 hover-light-green pointer" onClick={() => window.location.href = window.location.origin + '/gqa-admin/biomass_inventory/'}>
          <b>Biomass Inv.</b>
        </li>
        <li class="mb4">
          <ul class="ul pl0">
            <li class="menu-item mb2 pl2 hover-light-green pointer" onClick={() => window.location.href = window.location.origin + '/gqa-admin/runs/'}>Runs</li>
            <li class="menu-item mb2 pl2 hover-light-green pointer" onClick={() => window.location.href = window.location.origin + '/gqa-admin/run_columns/'}>Run Columns</li>
            <li class="menu-item mb2 pl2 hover-light-green pointer" onClick={() => window.location.href = window.location.origin + '/gqa-admin/extractions/'}>Extractions</li>
          </ul>
        </li>
        <li class="menu-item bb mb2 hover-light-green pointer" onClick={() => window.location.href = window.location.origin + '/gqa-admin/concentrate_inventory/'}>
          <b>Concentrate Inv.</b>
        </li>
        <li class="mb4">
          <ul class="ul pl0">
              <li class="menu-item mb2 mt2 pl2 hover-light-green pointer" onClick={() => window.location.href = window.location.origin + '/gqa-admin/concentrate_sales/'}>Concentrate Sales</li>
          </ul>
        </li>
        <li class="menu-item bb mb4 hover-light-green pointer" onClick={() => window.location.href = window.location.origin + '/gqa-admin/contacts/'}>
          <b>Contacts</b>
        </li>
        <li class="menu-item bb mb2 hover-light-green pointer" onClick={() => window.location.href = window.location.origin + '/gqa-admin/employees/'}>
          <b>Employees</b>
        </li>
        <li class="mb4">
          <ul class="ul pl0">
            <li class="menu-item mb2 mt2 pl2 hover-light-green pointer" onClick={() => window.location.href = window.location.origin + '/gqa-admin/employee_hours/'}>Employee Hours</li>
            <li class="menu-item mb2 mt2 pl2 hover-light-green pointer" onClick={() => window.location.href = window.location.origin + '/gqa-admin/employee_payroll/'}>Employee Payroll</li>
            <li class="menu-item mb2 mt2 pl2 hover-light-green pointer" onClick={() => window.location.href = window.location.origin + '/gqa-admin/employee_notes/'}>Employee Notes</li>
          </ul>
        </li>
        <li class="menu-item bb mb4 hover-light-green pointer" onClick={() => window.location.href = window.location.origin + '/gqa-admin/expendable_inventory/'}>
          <b>Expendable Inv.</b>
        </li>
        <li class="menu-item bb mb2 hover-light-green pointer" onClick={() => window.location.href = window.location.origin + '/gqa-admin/suppliers/'}>
          <b>Suppliers</b>
        </li>
        <li class="mb4">
          <ul class="ul pl0">
            <li class="menu-item mb2 mt2 pl2 hover-light-green pointer" onClick={() => window.location.href = window.location.origin + '/gqa-admin/purchases/'}>Purchases</li>
          </ul>
        </li>
      </ul>
    ]
  }
}
