ko.components.register("accordion", {
  viewModel: function (params) {
    this.isOpen = ko.observable(true);
    this.toggleAccordion = function () {
      //this.isOpen(!this.isOpen());
    };

    this.title = params.title;
    this.options = params.options;
  },
  template: `
    <div>
      <div>
        <div data-bind="click:toggleAccordion">
          <div data-bind="text:title"></div>
        </div>
        <div>
          <div data-bind="foreach:options">
          <div data-bind="text: label"></div></div>
        </div>
      </div>
    </div>
  `,
});
