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
            }" height="${this.height + 90}" />
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
