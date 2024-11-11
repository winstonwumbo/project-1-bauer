/**
 * Copyright 2024 Pbauer34
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

import "./item-component.js"

/**
 * `project-1`
 * 
 * @demo index.html
 * @element project-1
 */
export class project1 extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "project-1";
  }

  constructor() {
    super();
    this.title = "";
    this.siteName="";
    this.description="";
    this.url ="";
    this.items =[];
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/project-1.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      siteName : {type: String},
      description : {type: String},
      url : {type: String},
      items :  {type: Array}
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);}

      .results{
        display: inline-flex;
        justify-content: space-evenly;
        width: 100%;
        
        background-color: var(--ddd-theme-default-pughBlue);
      }
      h3 span {
        font-size: var(--project-1-label-font-size, var(--ddd-font-size-s));
      }
      .results 
      {
        font-style: italic;
      }
    `];
  }

    _updateResults() {
      this.loading = true;
      fetch(this.url).then(d => d.ok ? d.json(): {}).then(data => {
        if (data.items && data.metadata) {
          this.items = [];
          this.items = data.items;
          this.siteName = data.metadata.site.name;
          this.description = data.description;
          this.title = data.items.title;
          this.loading = false;

        
        }  
      });
    }

    _updateUrl(event){
      this.url = event.target.value;
    }

    updated(changedProperties) {
      if (changedProperties.has("url") && this.url){
        if (!this.url.endsWith(".json")) {
          this.url = `${this.url}.json`;
        }

      }
      
    }


  // Lit render the HTML
  render() {
    return html`
      <div class="wrapper">
        <input 
          id="siteUrl" 
          placeholder="Enter site URL" 
          @input="${this._updateUrl}" 
          .value="${this.url}"
        />
        <button 
          @click="${this._updateResults}"
          
        >
          ${this.loading ? "Loading..." : "Analyze"}
        </button>

        
        ${this.siteName || this.description ? html`
          <div class="overview">
            <h3>${this.siteName}</h3>
            <p>${this.description}</p>

            <div class="results">
              ${this.items.length
                ? this.items.map(
                    (item) => html`
                      <item-component
                        .pageTitle="${this.title}"
                        .description="${item.description}"
                        .image="${item.image}"
                        .link="${item.link}"
                      ></item-component>
                    `
                  )
                : html`<p>No items available.</p>`}
                </div>








            </div>
        ` : ""}
      </div>
    `;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(project1.tag, project1);