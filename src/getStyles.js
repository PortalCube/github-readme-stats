// @ts-check
/**
 * Calculates progress along the boundary of the circle i.e it's circumference.
 *
 * @param {number} value The rank value to calculate progress for.
 * @returns {number} Progress value.
 */
const calculateCircleProgress = (value) => {
  const radius = 40;
  const c = Math.PI * (radius * 2);

  if (value < 0) value = 0;
  if (value > 100) value = 100;

  return ((100 - value) / 100) * c;
};

/**
 * Retrieves the animation to display progress along the circumference of circle
 * from the beginning to the given value in a clockwise direction.
 *
 * @param {{progress: number}} progress The progress value to animate to.
 * @returns {string} Progress animation css.
 */
const getProgressAnimation = ({ progress }) => {
  return `
    @keyframes rankAnimation {
      from {
        stroke-dashoffset: ${calculateCircleProgress(0)};
      }
      to {
        stroke-dashoffset: ${calculateCircleProgress(progress)};
      }
    }
  `;
};

/**
 * Retrieves css animations for a card.
 *
 * @returns {string} Animation css.
 */
const getAnimations = () => {
  return `
    /* Animations */
    @keyframes scaleInAnimation {
      from {
        transform: translate(-5px, 5px) scale(0);
      }
      to {
        transform: translate(-5px, 5px) scale(1);
      }
    }
    @keyframes fadeInAnimation {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    @keyframes SlideInAnimation {
      from {
        opacity: 0;
        transform: translateX(10px);
      }
      to {
        opacity: 1;
        transform: translateX(25px);
      }
    }
  `;
};

/**
 * Retrieves CSS styles for a card.
 *
 * @param {Object} colors The colors to use for the card.
 * @param {string} colors.titleColor The title color.
 * @param {string} colors.textColor The text color.
 * @param {string} colors.iconColor The icon color.
 * @param {string} colors.ringColor The ring color.
 * @param {boolean} colors.show_icons Whether to show icons.
 * @param {number} colors.progress The progress value to animate to.
 * @returns {string} Card CSS styles.
 */
const getStyles = ({
  titleColor,
  textColor,
  iconColor,
  ringColor,
  show_icons,
  progress,
}) => {
  return `
    @font-face {
      font-family: 'SUITE';
      src: local('SUITE Regular'), url('data:font/woff2;charset=utf-8;base64,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') format('woff2');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }

    .stat {
      font: 600 14px 'SUITE', 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif; fill: ${textColor};
    }
    @supports(-moz-appearance: auto) {
      /* Selector detects Firefox */
      .stat { font-size:14px; }
    }
    .stagger {
      opacity: 0;
      animation: SlideInAnimation 0.5s ease-out forwards;
    }
    .rank-text {
      font: 800 24px 'SUITE', 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor};
      animation: scaleInAnimation 0.5s ease-out forwards;
    }
    .rank-percentile-header {
      font-size: 14px;
    }
    .rank-percentile-text {
      font-size: 16px;
    }
    
    .not_bold { font-weight: 400 }
    .bold { font-weight: 700 }
    .icon {
      fill: ${iconColor};
      display: ${!!show_icons ? "block" : "none"};
    }

    .rank-circle-rim {
      stroke: ${ringColor};
      fill: none;
      stroke-width: 8;
      opacity: 0.2;
    }
    .rank-circle {
      stroke: ${ringColor};
      stroke-dasharray: 250;
      fill: none;
      stroke-width: 8;
      stroke-linecap: round;
      opacity: 0.8;
      transform-origin: -10px 8px;
      transform: rotate(-90deg);
      animation: rankAnimation 1.5s forwards ease-out;
    }
    ${process.env.NODE_ENV === "test" ? "" : getProgressAnimation({ progress })}
  `;
};

export { getAnimations, getStyles };
