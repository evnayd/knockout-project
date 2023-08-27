function AccordionViewModel(params) {
  var self = this;

  self.isOpen = ko.observable(false);
  self.title = ko.observable(params.title);
  self.options = ko.observableArray(params.options);

  self.toggleAccordion = function () {
    self.isOpen(!self.isOpen());
  };

  self.handleDragStart = function (data, event) {
    var draggedItemData = ko.toJSON(data);
    event.dataTransfer.setData("text/plain", draggedItemData);
  };

  self.handleDragOver = function (event) {
    event.preventDefault();
  };

  self.handleDrop = function (data, event) {
    event.preventDefault();

    var draggedItemData = event.dataTransfer.getData("text/plain");
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
      <div class="accordion" data-bind="css: { opened: isOpen },
          attr: { draggable: true },
          event: {
            dragstart: handleDragStart,
            dragover: handleDragOver,
            drop: handleDrop
          }">
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
            <div class="option" data-bind="attr: { draggable: true },
                  event: {
                    dragstart: $parent.handleDragStart,
                    dragover: $parent.handleDragOver,
                    drop: $parent.handleDrop
                  }">
              <h2 data-bind="text: label"></h2>
              <button class="accordion__dragndrop" data-bind="click: function(data, event) { event.stopPropagation(); }"></button>
            </>`,
});
