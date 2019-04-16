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
        <li class="menu-item bb mb2 hover-light-green pointer" onClick={() => this.navTo.emit(({table: 'biomass_inventory'} as any))}>
          <b>Biomass Inv.</b>
        </li>
        <li class="mb4">
          <ul class="ul pl0">
            <li class="menu-item mb2 pl2 hover-light-green pointer" onClick={() => this.navTo.emit(({table: 'runs'} as any))}>Runs</li>
            <li class="menu-item mb2 pl2 hover-light-green pointer" onClick={() => this.navTo.emit(({table: 'run_columns'} as any))}>Run Columns</li>
            <li class="menu-item mb2 pl2 hover-light-green pointer" onClick={() => this.navTo.emit(({table: 'extractions'} as any))}>Extractions</li>
          </ul>
        </li>
        <li class="menu-item bb mb2 hover-light-green pointer" onClick={() => this.navTo.emit(({table: 'concentrate_inventory'} as any))}>
          <b>Concentrate Inv.</b>
        </li>
        <li class="mb4">
          <ul class="ul pl0">
              <li class="menu-item mb2 mt2 pl2 hover-light-green pointer" onClick={() => this.navTo.emit(({table: 'concentrate_sales'} as any))}>Concentrate Sales</li>
          </ul>
        </li>
        <li class="menu-item bb mb4 hover-light-green pointer" onClick={() => this.navTo.emit(({table: 'contacts'} as any))}>
          <b>Contacts</b>
        </li>
        <li class="menu-item bb mb2 hover-light-green pointer" onClick={() => this.navTo.emit(({table: 'employees'} as any))}>
          <b>Employees</b>
        </li>
        <li class="mb4">
          <ul class="ul pl0">
            <li class="menu-item mb2 mt2 pl2 hover-light-green pointer" onClick={() => this.navTo.emit(({table: 'employee_hours'} as any))}>Employee Hours</li>
            <li class="menu-item mb2 mt2 pl2 hover-light-green pointer" onClick={() => this.navTo.emit(({table: 'employee_payroll'} as any))}>Employee Payroll</li>
            <li class="menu-item mb2 mt2 pl2 hover-light-green pointer" onClick={() => this.navTo.emit(({table: 'employee_notes'} as any))}>Employee Notes</li>
          </ul>
        </li>
        <li class="menu-item bb mb4 hover-light-green pointer" onClick={() => this.navTo.emit(({table: 'expendable_inventory'} as any))}>
          <b>Expendable Inv.</b>
        </li>
        <li class="menu-item bb mb2 hover-light-green pointer" onClick={() => this.navTo.emit(({table: 'suppliers'} as any))}>
          <b>Suppliers</b>
        </li>
        <li class="mb4">
          <ul class="ul pl0">
            <li class="menu-item mb2 mt2 pl2 hover-light-green pointer" onClick={() => this.navTo.emit(({table: 'purchases'} as any))}>Purchases</li>
          </ul>
        </li>
      </ul>
    ]
  }
}
