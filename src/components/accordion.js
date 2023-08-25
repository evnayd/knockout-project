ko.components.register("accordion", {
  viewModel: function (params) {
    this.isOpen = ko.observable(false); // Start with the accordion closed

    this.toggleAccordion = function () {
      this.isOpen(!this.isOpen());
    };

    this.title = params.title;
    this.options = params.options;
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
        <div class="accordion__options" data-bind="css: { open: isOpen }">
          <div data-bind="foreach: options">
            <div  class="option"  data-bind="text: label"></div>
          </div>
        </div>
      </div>
    </div>
  `,
});
