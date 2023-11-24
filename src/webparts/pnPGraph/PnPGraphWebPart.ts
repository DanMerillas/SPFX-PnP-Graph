/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'PnpGraphWebPartStrings';
import PnpGraph from './components/PnpGraph';

import '../pnpGraph/css/PnpGraph.css'


export interface IPnpGraphWebPartProps {
  description: string;
}

export default class PnpGraphWebPart extends BaseClientSideWebPart<IPnpGraphWebPartProps> {



  public render(): void {
    const element: React.ReactElement<any> = React.createElement(
      PnpGraph,
      {
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  // protected onInit(): Promise<void> {
  //   return this._getEnvironmentMessage().then(message => {
  //     this._environmentMessage = message;
  //   });
  // }





  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
