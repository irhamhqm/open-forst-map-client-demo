const getOrCreateLegendList = (id) => {
  const legendContainer = document.getElementById(id);
  let listContainer = null;
  if (legendContainer) {
    listContainer = legendContainer.querySelector("ul");
  }
  if (legendContainer && !listContainer) {
    listContainer = document.createElement("ul");
    listContainer.style.display = "flex";
    listContainer.style.flexDirection = "row";
    listContainer.style.margin = "0";
    listContainer.style.padding = "0";

    legendContainer.appendChild(listContainer);
    return listContainer;
  }
};

export const htmlLegendPlugin = {
  id: "htmlLegend",
  afterUpdate(_, _1, options) {
    const ul = getOrCreateLegendList(options.containerID);
    const childs = document.querySelectorAll(`#${options.containerID}>li`);
    // Remove old legend items
    if (ul) {
      childs.forEach((_, index) => ul.removeChild(childs[index]));
    }
    // Reuse the built-in legendItems generator
    // if (chart.options.plugins?.legend?.labels?.generateLabels) {
    // const items =
    //   chart.options?.plugins?.legend?.labels?.generateLabels(chart);

    const items = [
      { text: "Fire Event", color: "#ff0000" },
      { text: "Policy", color: "#ebde34" },
      { text: "Program", color: "#9e14a8" },
    ];

    items.forEach((item) => {
      const li = document.createElement("li");
      li.style.alignItems = "center";
      // li.style.cursor = "pointer";
      li.style.display = "flex";
      li.style.flexDirection = "row";
      li.style.marginLeft = "10px";

      // li.onclick = () => {
      //   // console.log(item.datasetIndex);

      //   chart.setDatasetVisibility(
      //     item.datasetIndex || 0,
      //     !chart.isDatasetVisible(item.datasetIndex || 0)
      //   );
      //   chart.update();
      // };

      // Color box
      const boxSpan = document.createElement("span");
      boxSpan.style.background = item.color;
      boxSpan.style.borderColor = item.color;
      boxSpan.style.borderWidth = 3 + "px";
      boxSpan.style.display = "inline-block";
      boxSpan.style.flexShrink = "0";
      boxSpan.style.height = "20px";
      boxSpan.style.marginRight = "10px";
      boxSpan.style.width = "20px";

      // Text
      const textContainer = document.createElement("p");
      textContainer.style.color = "black";
      textContainer.style.margin = "0";
      textContainer.style.padding = "0";
      // textContainer.style.textDecoration = item.hidden ? "line-through" : "";

      const text = document.createTextNode(item.text);
      textContainer.appendChild(text);
      if (ul) {
        li.appendChild(boxSpan);
        li.appendChild(textContainer);
        ul.appendChild(li);
      }
    });
    // }
  },
};
