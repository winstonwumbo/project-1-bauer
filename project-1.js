/**
 * Copyright 2024 Pbauer34
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "@haxtheweb/simple-icon/simple-icon.js"; 


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
    this.siteDescription="";
    this.siteLogo="";
    this.description="";
    this.url ="";
    this.siteCreated="";
    this.siteUpdated="";
    this.items =[];
    this.hexCode="";
    this.theme="";
    this.icon="";
    this.loading ="";
    
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
      siteLogo: { type: String},
      siteName : {type: String},
      siteDescription : {type: String},
      siteCreated : {type: String},
      siteUpdated : {type: String},
      description : {type: String},
      hexCode : {type: String},
      theme : {type: String},
      icon : {type : String},
      url : {type: String},
      loading : {type: String},
      items :  {type: Array}
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: inline;
        color: var(--ddd-theme-default-nittanyNavy);
        background-color: var(--ddd-theme-primary);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);}

      
      h3 span {
        font-size: var(--project-1-label-font-size, var(--ddd-font-size-s));
      }

      .input {
        display: flex;
        justify-content: center;  
        align-items: center;      
        flex-direction: row;   
        gap: var(--ddd-spacing-2);                
        margin-top: var(--ddd-spacing-5);        
      }

      input {
        display: inline-flex;
        align-items: center;
        font-size: var( --ddd-spacing-5);
        line-height: var(--ddd-spacing-10);
        width: 50%;
        border-radius: var(--ddd-spacing-2);
        margin-left: var(--ddd-spacing-10);
        padding-left: var(--ddd-spacing-5);
        
      }

      button {
        padding: var(--ddd-spacing-3) var(--ddd-spacing-5);
        font-size: var(--ddd-font-size-4xs);
        cursor: pointer;
        background-color: var(--ddd-theme-default-nittanyNavy);
        color: var(--ddd-theme-default-white);
        border: none;
        border-radius: var(--ddd-spacing-2);
      }

      button:hover {
        background-color: var(--ddd-theme-default-pughBlue);
      }

      .results 
      {
        margin-top: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-2);
        display: inline-flex;
        justify-content: space-evenly;
        width: 100%;
        background-color: var(--ddd-theme-default-white);
        visibility: visible;
        height: 100%;
        opacity: 1;
        transition-delay: .5s;
        transition: .5s all ease-in-out;
        display:flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        
        
        
      }

      .overview {
      display:inline-flexbox;
      justify-content: center;
      align-items: center;
      background-color: var(--site-hex-code);
      color: var(--ddd-theme-default-potentialMidnight); 
      padding-left: var(--ddd-spacing-12);
      text-align: center;
      }
      .siteImg
      {
        width: 25%;
        height: 25%;
        align-items: center;
        margin-top: var(--ddd-spacing-3);
        margin-bottom: var(--ddd-spacing-2);
      }
      
    `];
  }

  dateToString(timestamp) {
    timestamp *= 1000;
    const date = new Date(timestamp);
    return date.toUTCString();
  }
  domain(){
  const url = new URL(this.url)
  return `${url.origin}/`;
  }

  getSrc(item) {
    let images = item.metadata.images;
    if (images && images.length > 0) {
      const imgURL = images[0];
      
      const newIMG= imgURL.startsWith("http") ? imgURL : `${this.domain()}${imgURL}`;
      return newIMG;
    }
    return "";
  }
    

  _updateResults() {
    this.loading = true;
    fetch(this.url)
      .then((response) => response.ok ? response.json() : {})
      .then((data) => {
        this.items = data.items || [];
        this.loading = false;
        this.siteLogo = data.metadata.site.logo;
        this.siteName = data.title;
        this.siteDescription=data.description;
        this.siteCreated = this.dateToString(data.metadata.site.created);
        this.siteUpdated = this.dateToString(data.metadata.site.updated);
        this.hexCode= data.metadata.theme.variables.hexCode;
        this.theme = data.metadata.theme.name;
        this.icon = data.metadata.theme.variables.icon;
        
        
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        this.items = [];
        this.loading = false;
      });
  }
   
    _updateUrl(event){
      this.url = event.target.value;
    }

    _onEnterKeyPress(event) {
      if (event.key === 'Enter') {
          this._updateResults();
      }
  }


    updated(changedProperties) {
      if (changedProperties.has("url") && this.url){
        if (!this.url.endsWith("/site.json")) {
          this.url = `${this.url}/site.json`;
        }

      }
      
    }
    
  // Lit render the HTML
  render() {
    return html`
    <div class = input>
      <input 
            id="siteUrl" 
            placeholder="Enter HAX site URL" 
            @input="${this._updateUrl}" 
            @keypress="${this._onEnterKeyPress}"
            value="${this.url}"
          />
          <button id="analyze"
            @click="${this._updateResults}"
          >
            ${this.loading ? "Loading..." : "Analyze"}
          </button>
  </div>
  <div class="wrapper">
        

        <div class="overview" style="--site-hex-code: ${this.hexCode};" >
           
            ${this.siteLogo ? html`<img class="siteImg" src="${this.domain()}/${this.siteLogo}" alt="${this.siteName}"/>` : ''}
         
            ${this.siteName ? html`<h1>${this.siteName}</h1>` : ''} <simple-icon class="icon" icon="av:play-circle-outline"></simple-icon><br>
     
            ${this.siteDescription ? html`<h1>Description: ${this.siteDescription}</h1>` : ''}
         
            ${this.siteCreated ? html`<h1>Created: ${this.siteCreated}</h1>` : ''}
          
            ${this.siteUpdated ? html`<h1>Last Updated: ${this.siteUpdated}</h1>` : ''}
            ${this.theme ? html`<h1>Theme: ${this.theme}</h1>` : ''}
        </div>
         

            <div>
              
              <div class="results">
              
              ${this.items.map((item) => html`
                <item-component
                  src="${this.getSrc(item) || '' }"
                  href="${this.domain()}${item.slug}"
                  title="${item.title}"
                  description="${item.description}"
                  updated="${item.metadata.updated}"
                  pageSource="${this.domain()}${item.location}"
                  tags="${item.metadata.tags}"
                  
                ></item-component>
                
              `)}
              </div>
          </div>

          </div>
  
      </div>

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
