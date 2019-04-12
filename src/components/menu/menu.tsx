import { Component } from '@stencil/core';

@Component({
  tag: 'gqa-admin-menu',
})
export class AdminMenu {
  render() {
    return[
      <ul class="ul pl0">
        <li class="menu-item bb mb2 hover-light-green pointer" onClick={() => null}>
          <b>Biomass Inv.</b>
        </li>
        <li class="mb4">
          <ul class="ul pl0">
            <li class="menu-item mb2 pl2 hover-light-green pointer" onClick={() => null}>Runs</li>
            <li class="menu-item mb2 pl2 hover-light-green pointer" onClick={() => null}>Run Columns</li>
            <li class="menu-item mb2 pl2 hover-light-green pointer" onClick={() => null}>Extractions</li>
          </ul>
        </li>
        <li class="menu-item bb mb2 hover-light-green pointer" onClick={() => null}>
          <b>Concentrate Inv.</b>
        </li>
        <li class="mb4">
          <ul class="ul pl0">
              <li class="menu-item mb2 mt2 pl2 hover-light-green pointer" onClick={() => null}>Concentrate Sales</li>
          </ul>
        </li>
        <li class="menu-item bb mb4 hover-light-green pointer" onClick={() => null}>
          <b>Contacts</b>
        </li>
        <li class="menu-item bb mb2 hover-light-green pointer" onClick={() => null}>
          <b>Employees</b>
        </li>
        <li class="mb4">
          <ul class="ul pl0">
            <li class="menu-item mb2 mt2 pl2 hover-light-green pointer" onClick={() => null}>Employee Hours</li>
            <li class="menu-item mb2 mt2 pl2 hover-light-green pointer" onClick={() => null}>Employee Payroll</li>
            <li class="menu-item mb2 mt2 pl2 hover-light-green pointer" onClick={() => null}>Employee Notes</li>
          </ul>
        </li>
        <li class="menu-item bb mb4 hover-light-green pointer" onClick={() => null}>
          <b>Expendable Inv.</b>
        </li>
        <li class="menu-item bb mb2 hover-light-green pointer" onClick={() => null}>
          <b>Suppliers</b>
        </li>
        <li class="mb4">
          <ul class="ul pl0">
            <li class="menu-item mb2 mt2 pl2 hover-light-green pointer" onClick={() => null}>Purchases</li>
          </ul>
        </li>
      </ul>
    ]
  }
}
