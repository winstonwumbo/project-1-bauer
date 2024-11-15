/**
 * Copyright 2024 Pbauer34
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "@haxtheweb/simple-icon/simple-icon.js"; 
/**
 * `project-1`
 * 
 * @demo index.html
 * @element item-component
 */
export class ItemComponent extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "item-component";
  }

  constructor() {
    super();
    this.title = "";
    this.description="";
    this.updated="";
    this.src = "";
    this.href="";
    this.pageSource="";
    this.tags="";
    

  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      description: { type: String },
      updated: {type: String},
      src: { type: String },
      href: {type: String},
      pageSource: {type: String},
      tags: {type: String}
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: inline-block;
        color: var(--ddd-theme-default-potentialMidnight);
        background-color: var(--ddd-theme-white);
        font-family: var(--ddd-font-navigation);
        padding: var(--ddd-spacing-8); 
      }
      .wrapper {
        margin: var(--ddd-spacing-8);
        padding: var(--ddd-spacing-8);
      }
      h3 span {
        font-size: var(--project-1-label-font-size, var(--ddd-font-size-s));
      }
      .card{
        display: flex;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        width: 400px;
        height: 500px;
        box-shadow: var(--ddd-boxShadow-xl);
        border-radius: var(--ddd-spacing-3);
        margin-bottom: var(--ddd-spacing-2);
        margin-top: var(--ddd-spacing-2);
        margin-left: var(--ddd-spacing-4);
        background-color: var(--ddd-theme-default-white);
        text-align: center;
        color: var(--ddd-theme-default-nittanyNavy);
        box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
      }
      .card img {
        width: 60%;
        height: 60%;
        object-position: center;
      }

      .title
      {
        font-weight: var(--ddd-font-weight-bold);
        font-size: var(--ddd-font-size-m);
        color: var(--ddd-theme-default-nittanyNavy);
        text-decoration: none;
        
      }
      .description
      {
        font-size: var(--ddd-font-size-xxs);
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
    `];
  }

  _dateToString(timestamp) {
    timestamp *= 1000;
    const date = new Date(timestamp);
    return date.toUTCString();
  }

  // Lit render the HTML
  render() {
    return html`
<div class="card">
  <div class="title"><a href="${this.href}" target="_blank" rel="noopener noreferrer">${this.title}</a></div>
  <div class = image>${this.src ? html`<img src="${this.src}" alt="${this.siteName}"/>` : ''}</div>
  
  <div class="description">${this.description}</div>
  ${this.updated ? html`<div class="updated">Updated: ${this._dateToString(this.updated)}</div>` : ''}
  <div class="pageSource"><a href="${this.pageSource}" target="_blank" rel="noopener noreferrer">Open Page Source</a></div>
  <div class="tags">${this.tags ? html`<p>Tags: ${this.tags}</p>` : ''}</div>
 
  
</div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(ItemComponent.tag, ItemComponent);

