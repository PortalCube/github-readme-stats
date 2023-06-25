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
        transform: translateX(0px);
      }
      to {
        opacity: 1;
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
      font-weight: 400;
      src: local('SUITE Regular'), url('data:font/woff2;charset=utf-8;base64,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') format('woff2');
    }

    .stat {
      font: 600 14px 'SUITE', 'Segoe UI', Ubuntu, "Helvetica Neue", Sans-Serif; fill: ${textColor};
    }
    @supports(-moz-appearance: auto) {
      /* Selector detects Firefox */
      .stat { font-size:12px; }
    }
    .stagger {
      opacity: 0;
      animation: fadeInAnimation 0.5s ease-out forwards;
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
