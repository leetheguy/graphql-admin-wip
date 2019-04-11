import { GQAWebService, GQATable } from "./GQAWebService";
import { GQAModel } from './GQAModel';
import { GQAAppState } from './GQAAppState';

import _ from 'lodash';

export class GQANavigation {
  webService: GQAWebService;
  appState: GQAAppState;

  constructor(appState) {
    this.appState = appState;
    this.webService = this.currentState.webService;
  }

  async buildDataFromUrl() {
    let path = _(window.location.pathname).split('/').compact().drop().value();
    let pathStructure = {
      leftModel: null,
      leftId: null,
      rightModel: null,
      rightId: null,
    };

    switch(path.length) {
      case 4:
        pathStructure.rightId = path[3];
      case 3:
        if(this.webService.getTableByName(path[2])) {
          pathStructure.rightModel = new GQAModel(this.appState, this.webService.getTableByName(path[2]));
        } else {
          pathStructure.rightId = path[2];
        }
      case 2:
        if(this.webService.getTableByName(path[1])) {
          pathStructure.rightModel = new GQAModel(this.appState, this.webService.getTableByName(path[1]));
        } else {
          pathStructure.leftId = path[1];
        }
      case 1:
        if(this.webService.getTableByName(path[0])) {
          pathStructure.leftModel = new GQAModel(this.appState, this.webService.getTableByName(path[0]));
        }
    }

    // There needs to be a model on the left.
    let pathError = pathStructure.leftModel ? false : true;

    if(!pathError) {
      await pathStructure.leftModel.getListData();
      if(pathStructure.rightModel) {
        await pathStructure.rightModel.getListData();
      }
    }

    // Any incorrect id, left or right, is an error.
    // Incorrect table names in part 2 or 3 automatically became ids.
    if(!pathError && pathStructure.leftId) {
      await pathStructure.leftModel.getItemData(pathStructure.leftId);
      pathError = pathStructure.leftModel.item ? pathError : true;
    }
    if(!pathError && pathStructure.rightModel && pathStructure.rightId) {
      await pathStructure.rightModel.getItemData(pathStructure.rightId);
      pathError = pathStructure.rightModel.item ? pathError : true;
    }

    console.info(pathStructure)
    // if(!pathError) {
    //   this.leftColumn = <ion-col> <gqa-main-view side="left" appState={this.appState}/> </ion-col>;

    //   this.rightColumn = pathStructure.rightModel
    //     ? <ion-col> <gqa-main-view side="right" appState={this.appState}/> </ion-col> : null;

    //   this.appState.store.dispatch({
    //     type: 'set_left_model',
    //     model: pathStructure.leftModel,
    //     id: pathStructure.leftId
    //   });
    //   this.appState.store.dispatch({
    //     type: 'set_right_model',
    //     model: pathStructure.rightModel,
    //     id: pathStructure.rightId
    //   });
    // } else {
    //   this.leftColumn = <gqa-error-view/>;
    // }
  }

  get currentState() { return this.appState.store.getState() }
}
