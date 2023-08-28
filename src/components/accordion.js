function AccordionViewModel(params) {
  let self = this;

  self.isOpen = ko.observable(false);
  self.title = ko.observable(params.title);
  self.options = ko.observableArray(params.options);

  self.toggleAccordion = function () {
    self.isOpen(!self.isOpen());
  };

  self.handleDragStart = function (data, event) {
    event.preventDefault();
    console.log("draggin");
    console.log("data", data);
    var draggedItemData = ko.toJSON(data);
    event.dataTransfer.setData("text/plain", draggedItemData);
    console.log("draggedItemData", draggedItemData);
  };

  self.handleDrop = function (data, event) {
    event.preventDefault();
    console.log("droppin");

    //var draggedItemData = event.dataTransfer.getData("text/plain");
    //console.log("draggedItemData", draggedItemData);
    /*var draggedItem = JSON.parse(draggedItemData);*/
  };

  self.handleDragOver = function (event) {
    console.log("over");
    event.preventDefault();
  };

  self.handleDragEnter = function (event) {
    console.log("enter");
    event.preventDefault();
  };
}

ko.components.register("accordion", {
  viewModel: {
    createViewModel: function (params, componentInfo) {
      return new AccordionViewModel(params);
    },
  },

  template: `
  <div>
  <div class="accordion" data-bind="css: { opened: isOpen }">
    <div class="accordion__label" data-bind="click: toggleAccordion">
      <div class="accordion__container">
        <button class="accordion__btn" data-bind="css: { active: isOpen }"></button>
        <h2 data-bind="text: title"></h2>
      </div>
      <button class="accordion__dragndrop"></button>
    </div>
    <div class="accordion__options" data-bind="css: { open: isOpen }, event: {
      dragover: handleDragOver,
      drop: handleDrop,
      dragenter: handleDragEnter
    }">
    <div data-bind="foreach: options">
        <div class="option" draggable="true" 
        dragstart="$parent.handleDragStart">
          <h2 data-bind="text: label"></h2>
          <button class="accordion__dragndrop" data-bind="click: function(data, event) { event.stopPropagation(); }"></button>
        </div>
      </div>
    </div>
  </div>
</div>`,
});
