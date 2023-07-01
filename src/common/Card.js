import { getAnimations } from "../getStyles.js";
import { encodeHTML, flexLayout } from "./utils.js";

class Card {
  /**
   * Creates a new card instance.
   *
   * @param {object} args Card arguments.
   * @param {number?=} args.width Card width.
   * @param {number?=} args.height Card height.
   * @param {number?=} args.border_radius Card border radius.
   * @param {string?=} args.customTitle Card custom title.
   * @param {string?=} args.defaultTitle Card default title.
   * @param {string?=} args.titlePrefixIcon Card title prefix icon.
   * @param {object?=} args.colors Card colors arguments.
   * @param {string} args.colors.titleColor Card title color.
   * @param {string} args.colors.textColor Card text color.
   * @param {string} args.colors.iconColor Card icon color.
   * @param {string|Array} args.colors.bgColor Card background color.
   * @param {string} args.colors.borderColor Card border color.
   * @returns {Card} Card instance.
   */
  constructor({
    width = 100,
    height = 100,
    border_radius = 4.5,
    colors = {},
    customTitle,
    defaultTitle = "",
    titlePrefixIcon,
  }) {
    this.width = width;
    this.height = height;

    this.hideBorder = false;
    this.hideTitle = false;

    this.border_radius = border_radius;

    // returns theme based colors with proper overrides and defaults
    this.colors = colors;
    this.title =
      customTitle !== undefined
        ? encodeHTML(customTitle)
        : encodeHTML(defaultTitle);

    this.css = "";

    this.paddingX = 25;
    this.paddingY = 35;
    this.titlePrefixIcon = titlePrefixIcon;
    this.animations = true;
    this.a11yTitle = "";
    this.a11yDesc = "";
  }

  disableAnimations() {
    this.animations = false;
  }

  /**
   * @param {{title: string, desc: string}} prop
   */
  setAccessibilityLabel({ title, desc }) {
    this.a11yTitle = title;
    this.a11yDesc = desc;
  }

  /**
   * @param {string} value
   */
  setCSS(value) {
    this.css = value;
  }

  /**
   * @param {boolean} value
   */
  setHideBorder(value) {
    this.hideBorder = value;
  }

  /**
   * @param {boolean} value
   */
  setHideTitle(value) {
    this.hideTitle = value;
    if (value) {
      this.height -= 30;
    }
  }

  /**
   * @param {string} text
   */
  setTitle(text) {
    this.title = text;
  }

  renderTitle() {
    const titleText = `
      <text
        x="0"
        y="0"
        class="header"
        data-testid="header"
      >${this.title}</text>
    `;

    const prefixIcon = `
      <svg
        class="icon"
        x="0"
        y="-13"
        viewBox="0 0 16 16"
        version="1.1"
        width="16"
        height="16"
      >
        ${this.titlePrefixIcon}
      </svg>
    `;
    return `
      <g
        data-testid="card-title"
        transform="translate(${this.paddingX}, ${this.paddingY})"
      >
        ${flexLayout({
          items: [this.titlePrefixIcon && prefixIcon, titleText],
          gap: 25,
        }).join("")}
      </g>
    `;
  }

  renderGradient() {
    if (typeof this.colors.bgColor !== "object") return "";

    const gradients = this.colors.bgColor.slice(1);
    return typeof this.colors.bgColor === "object"
      ? `
        <defs>
          <linearGradient
            id="gradient"
            gradientTransform="rotate(${this.colors.bgColor[0]})"
            gradientUnits="userSpaceOnUse"
          >
            ${gradients.map((grad, index) => {
              let offset = (index * 100) / (gradients.length - 1);
              return `<stop offset="${offset}%" stop-color="#${grad}" />`;
            })}
          </linearGradient>
        </defs>
        `
      : "";
  }

  /**
   * @param {string} body
   */
  render(body) {
    return `
      <svg
        width="${this.width}"
        height="${this.height}"
        viewBox="0 0 ${this.width} ${this.height}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="descId"
      >
        <defs>
          <pattern id="background" patternUnits="userSpaceOnUse"  width="${
            this.width
          }" height="${this.height}">
            <image href="data:image/webp;base64,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" preserveAspectRatio="xMidYMid slice" x="0" y="0" width="${
              this.width
            }" height="${this.height}" />
          </pattern>
        </defs>
        <title id="titleId">${this.a11yTitle}</title>
        <desc id="descId">${this.a11yDesc}</desc>
        <style>
          .header {
            font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
            fill: ${this.colors.titleColor};
            animation: fadeInAnimation 0.5s ease-in-out forwards;
          }
          @supports(-moz-appearance: auto) {
            /* Selector detects Firefox */
            .header { font-size: 15.5px; }
          }
          ${this.css}

          ${process.env.NODE_ENV === "test" ? "" : getAnimations()}
          ${
            this.animations === false
              ? `* { animation-duration: 0s !important; animation-delay: 0s !important; }`
              : ""
          }
        </style>

        ${this.renderGradient()}

        <rect
          data-testid="card-bg"
          x="0.5"
          y="0.5"
          rx="${this.border_radius}"
          height="99%"
          stroke="${this.colors.borderColor}"
          width="${this.width - 1}"
          fill="${
            "url(#background)"
            // typeof this.colors.bgColor === "object"
            //   ? "url(#gradient)"
            //   : this.colors.bgColor
          }"
          stroke-opacity="${this.hideBorder ? 0 : 1}"
        />

        ${this.hideTitle ? "" : this.renderTitle()}

        <g
          data-testid="main-card-body"
          transform="translate(0, ${
            this.hideTitle ? this.paddingX : this.paddingY + 20
          })"
        >
          ${body}
        </g>
      </svg>
    `;
  }
}

export { Card };
export default Card;
