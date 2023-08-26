function AccordionViewModel(params) {
  var self = this;

  self.isOpen = ko.observable(false);
  self.title = ko.observable(params.title);
  self.options = ko.observableArray(params.options);
  console.log(" self.options", self.options());

  self.toggleAccordion = function () {
    self.isOpen(!self.isOpen());
  };

  self.stopPropagation = function (event) {
    event.stopPropagation();
  };

  self.handleDragStart = function (data, event) {
    var draggedItemData = ko.toJSON(data);
    event.dataTransfer.setData("text/plain", draggedItemData);
    console.log("draggedItemData when drag", draggedItemData);
  };

  self.handleDrop = function (data, event) {
    event.preventDefault();

    var draggedItemData = event.dataTransfer.getData("text/plain");
    console.log("draggedItemData", draggedItemData);
    var draggedItem = JSON.parse(draggedItemData);

    if (!event.dataTransfer.getData("text/plain")) {
      return;
    }

    var isInOptions = self.options().some(function (option) {
      return option.label === draggedItem.label;
    });

    if (isInOptions) {
      var index = self.options().findIndex(function (option) {
        return option.label === draggedItem.label;
      });

      if (index > -1) {
        self.options.splice(index, 1)[0];
        var removedItem = self.options.splice(index, 1)[0];
        console.log("removedItem", removedItem);

        var dropTargetIndex = self.options().findIndex(function (option) {
          return option.label === data.label;
        });

        if (dropTargetIndex > -1) {
          self.options.splice(dropTargetIndex + 1, 0, removedItem);
        }
      }
    } else {
      var draggedItemCopy = Object.assign({}, draggedItem);
      self.options.push(draggedItemCopy);
    }
  };

  self.initializeDragListeners = function () {
    var optionsElements = document.querySelectorAll(".option");

    optionsElements.forEach(function (element) {
      element.addEventListener("dragstart", function (event) {
        var data = ko.dataFor(element);
        self.handleDragStart(data, event);
      });

      element.addEventListener("dragover", function (event) {
        event.preventDefault();
      });

      element.addEventListener("drop", function (event) {
        var data = ko.dataFor(element);
        self.handleDrop(data, event);
      });
    });
  };
}

// Register the component using createViewModel
ko.components.register("accordion", {
  viewModel: {
    createViewModel: function (params, componentInfo) {
      return new AccordionViewModel(params);
    },
  },
  template: `
      <div>
          <div class="accordion" data-bind="css: { opened: isOpen }, event: { click: initializeDragListeners }">
              <div class="accordion__label" data-bind="click: toggleAccordion">
                  <div class="accordion__container">
                      <button class="accordion__btn" data-bind="css: { active: isOpen }"></button>
                      <h2 data-bind="text: title"></h2>
                  </div>
                  <button class="accordion__dragndrop"></button>
              </div>
              <div class="accordion__options" data-bind="css: { open: isOpen }">
                  <div data-bind="foreach: options">
                      <!-- Add draggable attribute to each option -->
                      <div class="option" data-bind="attr: { draggable: true }">
                          <h2 data-bind="text: label"></h2>
                          <button class="accordion__dragndrop" data-bind="click: function(data, event) { event.stopPropagation(); }"></button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  `,
});
