ko.components.register("form-component", {
  viewModel: function (params) {
    var accordions = [
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

    return {
      accordions: accordions,
    };
  },
  template: `
    <form>
      <div data-bind="foreach: accordions">
        <accordion params="title: $data.title, options: $data.options"></accordion>
      </div>
    </form>
  `,
});
