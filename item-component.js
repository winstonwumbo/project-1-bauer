/**
 * Copyright 2024 Pbauer34
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

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
    this.pageTitle = "";
    this.description="";
    this.image = "";
    this.link= "";

  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      pageTitle: { type: String },
      description: { type: String },
      image: { type: String },
      link: { type: String }
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
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--project-1-label-font-size, var(--ddd-font-size-s));
      }
      .card{
        display: inline-block;
      width: 240px;
      height: 240px;
      border: var(--ddd-border-sm);
      border-color: var(--ddd-theme-default-nittanyNavy);
      box-shadow: var(--ddd-boxShadow-xl);
      border-radius: var(--ddd-spacing-3);
      text-decoration: none;
      margin-bottom: var(--ddd-spacing-2);
      margin-top: var(--ddd-spacing-2);
      background-color: var(--ddd-theme-default-limestoneLight);
      text-align: center;
      }
      .title
      {
        font-weight: bold;
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
<div class="card">
  <img class="image" src="${this.source}" alt="${this.alt}"/>
  <br/>
  <div class="title">${this.pageTitle}</div>
  <div class="description">${this.description}</div>
  
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

