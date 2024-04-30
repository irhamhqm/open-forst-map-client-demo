const findLabel = (labels, evt) => {
  let found = false;
  let res = null;
  labels.forEach((label) => {
    if (
      evt.x > label.x &&
      evt.x < label.x2 &&
      evt.y > label.y &&
      evt.y < label.y2
    ) {
      res = {
        label: label.label,
        index: label.index,
      };
      found = true;
    }
  });
  return [found, res];
};

const getLabelHitBoxes = (x) => {
  return x._labelItems.map((e, i) => ({
    x: e.options.translation[0] - x._labelSizes.widths[i],
    x2: e.options.translation[0] + x._labelSizes.widths[i] / 2,
    y: e.options.translation[1] - x._labelSizes.heights[i] / 2,
    y2: e.options.translation[1] + x._labelSizes.heights[i] / 2,
    label: e.label,
    index: i,
  }));
};

const xAxisEventPlugin = (onClick) => ({
  id: "chartClickXLabel",
  afterEvent: (chart, event) => {
    const evt = event.event;

    if (evt.type !== "click") {
      return;
    }

    const [found, labelInfo] = findLabel(getLabelHitBoxes(chart.scales.x), evt);

    if (found) {
      onClick && onClick(labelInfo);
      // opts.listeners.click();
    }
  },
});

export default xAxisEventPlugin;
