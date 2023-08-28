ko.components.register("form-component", {
  viewModel: function (params) {
    let self = this;
    let accordions = [
      {
        title: "Обязательные для всех",
        options: [
          { label: "Паспорт", value: "паспорт" },
          { label: "ИНН", value: "инн" },
        ],
      },
      {
        title: "Обязательные для трудоустройства",
        options: [{ label: "Трудовой договор", value: "трудовой договор" }],
      },
      {
        title: "Специальные",
        options: [{ label: "Водительские права", value: "водительские права" }],
      },
    ];

    var accordionsViewModels = accordions.map(function (accordionData) {
      return {
        title: accordionData.title,
        options: accordionData.options,
      };
    });

    self.handleDragStart = function (data, event) {
      //event.preventDefault();
      console.log("draggin");
      console.log("data", data);
      var draggedItemData = ko.toJSON(data);
      event.dataTransfer.setData("text/plain", draggedItemData);
      console.log("draggedItemData", draggedItemData);
    };

    self.handleDrop = function (data, event) {};

    self.handleDragOver = function (event) {
      console.log("over");
      event.preventDefault;
    };

    self.handleDragEnter = function (event) {
      console.log("enter");
      event.preventDefault;
    };

    return {
      accordions: accordionsViewModels,
    };
  },
  template: `
    <form >
      <div data-bind="foreach: accordions ">
        <accordion  params="title: title, options: options"></accordion>
      </div>
    </form>
  `,
});
